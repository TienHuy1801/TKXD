import { action, makeObservable, observable } from 'mobx';
import APIS from '../../services/common';
import { alertService } from '../Alert/alert.service';

class householdStore {
  householdList = [];

  constructor() {
    makeObservable(this, {
      householdList: observable,
      fetchResult: action,
      createHousehold: action,
      editHousehold: action,
      deleteHousehold: action,
    });
  }

  fetchResult() {
    APIS.household
      .getHouseholds()
      .then((res) => {
        this.householdList = res.data;
      })
      .catch((e) => alertService.error(e.response.data));
  }

  createHousehold(household) {
    APIS.household
      .createHousehold(household.data)

      .then((res) => {
        this.householdList.push(res.data);
        alertService.success('Thêm hộ khẩu thành công');
      })
      .catch((e) => alertService.error(e.response.data));
  }

  editHousehold(household) {
    const pos = this.householdList.findIndex(
      (element) => element._id === household.data._id
    );
    // const pos = this.householdList.findIndex((element) => element._id === household._id);

    // APIS.money.editMoney(money.data._id, money.data)
    APIS.household
      .editHousehold(household.data._id, household.data)
      .then((res) => {
        this.householdList[pos] = res.data;
        alertService.success('Chỉnh sửa hộ khẩu thành công');
      })
      .catch((e) => alertService.error(e.response.data));
  }

  deleteHousehold(household) {
    const pos = this.householdList.findIndex(
      (element) => element._id === household.data._id
    );
    this.householdList.splice(pos, 1);

    APIS.household
      .deleteHousehold(household.data._id)
      .then((res) => {
        alertService.success(res.data);
      })
      .catch((e) => alertService.error(e.response.data));
  }
}

export default new householdStore();
