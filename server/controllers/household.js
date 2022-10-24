import Person from '../models/person.js';
import Identity from '../models/identity.js';
import { getHouseholdPaidStatus } from './money.js';
import Household from '../models/household.js';
import mongoose from 'mongoose';
import CollectStatus from '../models/collectStatus.js';

const getHousehold = async (req, res) => {
  try {
    const household = await Household.find();
    const data = [];
    for (let index = 0; index < household.length; index++) {
      const element = household[index];
      var name = null;
      if (element.headMember) {
        const data = await Person.findOne({ _id: element.headMember });
        name = data.name;
      }
      data.push({
        ...element._doc,
        head: name,
      });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createHousehold = async (req, res) => {
  try {
    const apartmentNumber = req.body.apartmentNumber;
    const place = req.body.place;

    const household = new Household({
      apartmentNumber: apartmentNumber,
      place: place,
    });
    await household.save();

    res.status(201).json(household);
  } catch (error) {
    res.status(500).json(error);
  }
};

const editHousehold = async (req, res) => {
  try {
    const householdId = req.params.householdId;

    const apartmentNumber = req.body.apartmentNumber;
    const place = req.body.place;

    const headMember = req.body.headMember;
    const newRole = req.body.newRole;

    const household = await Household.findOne({ _id: householdId });

    if (household.apartmentNumber != apartmentNumber) {
      household.change.push({
        content: `Thay đổi số nhà: ${household.apartmentNumber} -> ${apartmentNumber}`,
        date: Date.now(),
      });
      household.apartmentNumber = apartmentNumber;
    }
    if (household.place != place) {
      household.place = place;
      household.change.push({
        content: `Thay đổi địa chỉ: ${household.place} -> ${place}`,
        date: Date.now(),
      });
    }

    if (household.headMember != headMember) {
      if (household.headMember) {
        const oldHead = await Person.findOne({ _id: household.headMember });
        const newHead = await Person.findOne({ _id: headMember });
        oldHead.relationship = newRole;
        newHead.relationship = 0;
        await oldHead.save();
        await newHead.save();

        household.members = household.members.filter(
          (per) => per._id.toString() != newHead._id.toString()
        );
        household.members.push(oldHead._id);
        household.headMember = headMember;
        household.change.push({
          content: `Thay đổi chủ hộ: ${oldHead.name} -> ${newHead.name}`,
          date: Date.now(),
        });
      } else {
        const newHead = await Person.findOne({ _id: headMember });
        newHead.relationship = 0;
        await newHead.save();

        household.members = household.members.filter(
          (per) => per._id.toString() != newHead._id.toString()
        );
        household.headMember = headMember;
        household.change.push({
          content: `Thêm chủ hộ: ${newHead.name}`,
          date: Date.now(),
        });
      }
    }
    await household.save();
    res.status(200).json('Chỉnh sửa thành công');
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteHousehold = async (req, res) => {
  try {
    const householdId = req.params.householdId;
    if (!mongoose.isValidObjectId(householdId))
      res.status(400).json('Hộ khẩu không tồn tại');
    const household = await Household.findOne({
      _id: householdId.toString(),
    }).exec();
    !household && res.status(400).json('Hộ khẩu không tồn tại');

    if (household.headMember) {
      const person = await Person.findOne({ _id: household.headMember });
      await Identity.deleteOne({ _id: person.identity });
      await Person.deleteOne({ _id: person._id });
    }
    household.members.forEach(async (mem) => {
      const person = await Person.findOne({ _id: mem._id });
      await Identity.deleteOne({ _id: person.identity });
      await Person.deleteOne({ _id: person._id });
    });

    await CollectStatus.deleteMany({ household: householdId });

    await Household.deleteOne({ _id: householdId });
    res.status(200).json('Xóa hộ khẩu thành công');
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePersonFromHousehold = async (person) => {
  const household = await Household.findOne({ _id: person.household });
  if (household.headMember?.toString() == person._id.toString()) {
    household.headMember = null;
    household.change.push({
      content: `Chuyển chủ hộ: ${person.name}`,
      date: Date.now(),
    });
    await household.save();
  } else {
    household.members = household.members.filter(
      (per) => per._id.toString() != person._id.toString()
    );
    household.change.push({
      content: `Chuyển nhân khẩu: ${person.name}`,
      date: Date.now(),
    });
    await household.save();
  }
};

const getHouseholdDetail = async (req, res) => {
  try {
    const householdId = req.params.householdId;

    if (!mongoose.isValidObjectId(householdId))
      res.status(400).json('Hộ khẩu không tồn tại');
    const household = await Household.findOne({
      _id: householdId.toString(),
    }).exec();
    !household && res.status(400).json('Hộ khẩu không tồn tại');

    res.status(200).json({
      ...household._doc,
      paidStatus: await getHouseholdPaidStatus(householdId),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const separationHousehold = async (req, res) => {
  try {
    const householdId = req.body.householdId;
    var household;
    const people = req.body.people;
    const apartmentNumber = req.body.apartmentNumber;
    const place = req.body.place;

    if (householdId) {
      household = await Household.findOne({ _id: householdId });
    } else {
      household = new Household({
        apartmentNumber: apartmentNumber,
        place: place,
      });
    }

    people.forEach(async (per) => {
      const person = await Person.findOne({ _id: per.id });
      await deletePersonFromHousehold(person);
      if (per.relationship == 0) {
        household.headMember = per.id;
        await household.save();
      } else {
        household.members.push(per.id);
        await household.save();
      }

      person.relationship = per.relationship;
      person.household = household._id;
      person.note = 0;
      await person.save();

      household.change.push({
        content: `Thêm nhân khẩu: ${person.name}`,
        date: Date.now(),
      });
      await household.save();
    });

    res.status(201).json('Tách hộ khẩu thành công');
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getHousehold,
  editHousehold,
  deleteHousehold,
  createHousehold,
  separationHousehold,
  getHouseholdDetail,
};
