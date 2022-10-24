import { action, makeObservable, observable } from 'mobx';
import { alertService } from '../../Alert/alert.service';
import APIS from '../../../services/common';

class ContributionMoney {
  moneyList = [];

  constructor() {
    makeObservable(this, {
      moneyList: observable,
      fetchResult: action,
      addMoney: action,
      updateMoney: action,
      deleteMoney: action,
    });
  }

  fetchResult() {
    APIS.money
      .getContributionMoney()
      .then((res) => {
        this.moneyList = res.data;
      })
      .catch((e) => alertService.error(e.response.data));
  }

  addMoney(money) {
    APIS.money
      .addMoney(money.data)
      .then((res) => {
        this.moneyList[money.component.getRowIndexByKey(money.key)] = res.data;
        alertService.success('Thêm khoản đóng góp thành công');
      })
      .catch((e) => alertService.error(e.response.data));
  }

  updateMoney(money) {
    const pos = this.moneyList.findIndex(
      (element) => element._id === money.data._id
    );

    APIS.money
      .editMoney(money.data._id, money.data)
      .then((res) => {
        this.moneyList[pos] = res.data;
        alertService.success('Chỉnh sửa khoản đóng góp thành công');
      })
      .catch((e) => alertService.error(e.response.data));
  }

  deleteMoney(money) {
    const pos = this.moneyList.findIndex(
      (element) => element._id === money.data._id
    );
    this.moneyList.splice(pos, 1);

    APIS.money
      .deleteMoney(money.data._id)
      .then((res) => {
        alertService.success(res.data);
      })
      .catch((e) => alertService.error(e.response.data));
  }
}

export default new ContributionMoney();
