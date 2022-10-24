import { makeObservable, observable, action } from 'mobx';
import APIS from '../../../services/common';
import { alertService } from '../../Alert/alert.service';

class MoneyDetailStore {
  moneyId = null;
  moneyDetail = null;
  loading = false;

  constructor() {
    makeObservable(this, {
      moneyId: observable,
      moneyDetail: observable,
      loading: observable,
      setMoneyId: action,
      fetchMoneyDetail: action,
      updateCollectStatus: action,
    });
  }

  setMoneyId(moneyid) {
    this.moneyId = moneyid;
  }

  fetchMoneyDetail() {
    this.loading = true;
    APIS.money
      .getMoneyDetail(this.moneyId)
      .then((res) => {
        this.moneyDetail = res.data;
        this.loading = false;
      })
      .catch((e) => alertService.error(e.response.data));
  }

  updateCollectStatus(money) {
    const pos = this.moneyDetail.collectStatus.findIndex(
      (element) =>
        element.household._id === money.oldData.household._id &&
        element.money === this.moneyDetail._id
    );

    APIS.money
      .updateMoneyCollectStatus(this.moneyDetail._id, {
        householdId: money.oldData.household._id,
        paidMoney: money.newData.updateMoney,
        paidDate: money.newData.paidDate.toString().substring(0, 28),
      })
      .then((res) => {
        this.moneyDetail.collectStatus[pos].paidHistory = res.data.paidHistory;
        this.moneyDetail.collectStatus[pos].paidMoney = res.data.paidMoney;
        alertService.success(
          `Cập nhật khoản tiền nộp cho hộ ${money.oldData.household.apartmentNumber} thành công`
        );
      });
  }
}

export default new MoneyDetailStore();
