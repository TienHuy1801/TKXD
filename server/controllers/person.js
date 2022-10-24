import Person from '../models/person.js';
import Household from '../models/household.js';
import Identity from '../models/identity.js';
import DeathReport from '../models/deathReport.js';
import mongoose from 'mongoose';

const getPeople = async (req, res) => {
  try {
    const people = await Person.find().populate('household identity').populate({
      path: 'deathReport',
      populate: {
        path: 'reportPerson',
        select: 'name _id'
      }
    });

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPersonDetail = async (req, res) => {
  try {
    const personId = req.params.personId;
    if (!mongoose.isValidObjectId(personId))
      res.status(400).json('Nhân khẩu không tồn tại');

    const person = await Person.findOne({ _id: personId.toString() }).populate(
      'household'
    );
    !person && res.status(400).json('Nhân khẩu không tồn tại');

    const identity = await Identity.findOne({ _id: person.identity });

    res.status(200).json({
      ...person._doc,
      identity: identity,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addPerson = async (req, res) => {
  try {
    const householdId = req.body.householdId;
    const relationship = req.body.relationship;

    const name = req.body.name;
    const aliases = req.body.aliases;
    const gender = req.body.gender;
    const dateOfBirth = req.body.dateOfBirth;
    const birthPlace = req.body.birthPlace;
    const nation = req.body.nation;
    const job = req.body.job;
    const jobAddress = req.body.jobAddress;
    const note = req.body.note;

    const numberIdentity = req.body.numberIdentity;
    const dateOfIssue = req.body.dateOfIssue;
    const placeOfIssue = req.body.placeOfIssue;

    const identity = new Identity({
      numberIdentity: numberIdentity,
      dateOfIssue: dateOfIssue,
      placeOfIssue: placeOfIssue,
    });
    await identity.save();

    const person = new Person({
      household: householdId,
      identity: identity._id,
      name: name,
      aliases: aliases,
      gender: gender,
      dateOfBirth: dateOfBirth,
      birthPlace: birthPlace,
      nation: nation,
      job: job,
      jobAddress: jobAddress,
      relationship: relationship,
      note: note,
    });
    await person.save();

    const household = await Household.findOne({ _id: householdId });
    if (relationship == 0) {
      household.headMember = person._id;
      household.change.push({
        content: `Thêm chủ hộ: ${person.name}`,
        date: Date.now(),
      });
    } else {
      household.members.push(person._id);
      household.change.push({
        content: `Thêm nhân khẩu: ${person.name}`,
        date: Date.now(),
      });
    }
    await household.save();

    res.status(201).json('Thêm thành công');
  } catch (error) {
    res.status(500).json(error);
  }
};

const editPerson = async (req, res) => {
  try {
    const personId = req.params.personId;
    const relationship = req.body.relationship;

    const name = req.body.name;
    const aliases = req.body.aliases;
    const gender = req.body.gender;
    const dateOfBirth = req.body.dateOfBirth;
    const birthPlace = req.body.birthPlace;
    const nation = req.body.nation;
    const job = req.body.job;
    const jobAddress = req.body.jobAddress;
    const note = req.body.note;

    const numberIdentity = req.body.numberIdentity;
    const dateOfIssue = req.body.dateOfIssue;
    const placeOfIssue = req.body.placeOfIssue;

    const person = await Person.findOne({ _id: personId });

    const identity = await Identity.findOne({ _id: person.identity });
    identity.dateOfIssue = dateOfIssue;
    identity.placeOfIssue = placeOfIssue;
    identity.numberIdentity = numberIdentity;
    await identity.save();

    if (relationship != person.relationship) {
      const household = await Household.findOne({ _id: person.household });
      if (person.relationship == 0) {
        household.headMember = null;
      } else {
        household.members = household.members.filter(
          (mem) => mem.toString() != person._id.toString()
        );
      }
      if (relationship == 0) {
        household.headMember = person._id;
        household.change.push({
          content: `Thay đổi thông tin chủ hộ: ${person.name}`,
          date: Date.now(),
        });
      } else {
        household.members.push(person._id);
        household.change.push({
          content: `Chỉnh sửa thông tin nhân khẩu: ${person.name}`,
          date: Date.now(),
        });
      }
      await household.save();
    }

    person.name = name;
    person.aliases = aliases;
    person.gender = gender;
    person.nation = nation;
    person.job = job;
    person.jobAddress = jobAddress;
    person.dateOfBirth = dateOfBirth;
    person.birthPlace = birthPlace;
    person.relationship = relationship;
    person.note = note;
    await person.save();

    res.status(200).json('Chỉnh sửa thành công');
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePerson = async (req, res) => {
  try {
    const personId = req.params.personId;
    const person = await Person.findOne({ _id: personId });

    await Identity.deleteOne({ _id: person.identity });

    const household = await Household.findOne({ _id: person.household });
    if (household?.headMember?.toString() == personId.toString()) {
      if (household.members.length > 0) {
        household.headMember = null;
      } else {
        await Household.deleteOne({ _id: person.household });
      }
    } else {
      household.members = household.members.filter(
        (perId) => perId.toString() != personId.toString()
      );
    }
    await household.save();

    await Person.deleteOne({ _id: personId });
    res.status(200).json('Xóa thành công');
  } catch (error) {
    res.status(500).json(error);
  }
};

const registerForTemporaryResidence = async (req, res) => {
  try {
    const personId = req.params.personId;

    const place = req.body.place;
    const date = req.body.date;
    const note = req.body.note;

    const person = await Person.findOne({ _id: personId });
    person.note = 2;
    person.residencyHistory.push({
      place: place,
      date: date,
      note: note,
    });
    await person.save();
    res.status(200).json('Khai báo thành công');
  } catch (error) {
    res.status(500).json(error);
  }
};

const reportDeath = async (req, res) => {
  try {
    const personId = req.params.personId;
    const reportPersonId = req.body.reportPersonId;
    const deathReason = req.body.deathReason;
    const deathDay = req.body.deathDay;
    const deathPlace = req.body.deathPlace;

    const person = await Person.findOne({ _id: personId });

    if (person.relationship === 0) {
      await Household.findOneAndUpdate(
        { _id: person.household },
        {
          headMember: null,
          $push: {
            change: {
              content: `khai tử cho: ${person.name}`,
              date: Date.now(),
            },
          },
        }
      );
    } else {
      const household = await Household.findOne({ _id: person.household });
      household.members = household.members.filter(
        (per) => per._id.toString() != person._id.toString()
      );
      household.change.push({
        content: `khai tử cho: ${person.name}`,
        date: Date.now(),
      });
      await household.save();
    }

    const newReport = new DeathReport({
      deadPerson: personId,
      reportPerson: reportPersonId,
      deathReason: deathReason,
      deathDay: deathDay,
      deathPlace: deathPlace,
    });
    await newReport.save();
    person.deathReport = newReport._id;
    person.note = 3;
    await person.save();
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getPeople,
  getPersonDetail,
  addPerson,
  editPerson,
  deletePerson,
  registerForTemporaryResidence,
  reportDeath,
};
