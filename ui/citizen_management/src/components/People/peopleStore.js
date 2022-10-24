import { action, makeObservable, observable } from 'mobx';
import APIS from '../../services/common';
import { alertService } from '../Alert/alert.service';

class PeopleStore {
  peopleList = [];
  isLoading = false;

  constructor() {
    makeObservable(this, {
      peopleList: observable,
      isLoading: observable,
      fetchResult: action,
      createPerson: action,
      editPerson: action,
      deletePerson: action,
    });
  }

  fetchResult() {
    this.isLoading = true;
    APIS.people
      .getPeople()
      .then((res) => {
        this.peopleList = res.data;
        this.isLoading = false;
      })
      .catch((e) => alertService.error(e.response.data));
  }

  createPerson(person) {
    APIS.people
      .addPerson(person.data)
      .then((res) => {
        this.peopleList.push(res.data);
        alertService.success('Thêm nhân khẩu thành công');
      })
      .catch((e) => alertService.error(e.response.data));
  }

  editPerson(person) {
    const pos = this.peopleList.findIndex(
      (element) => element._id === person.data._id
    );

    APIS.people
      .editPerson(person.data._id, person.data)
      .then((res) => {
        this.peopleList[pos] = res.data;
        alertService.success('Chỉnh sửa nhân khẩu thành công');
      })
      .catch((e) => alertService.error(e.response.data));
  }

  deletePerson(person) {
    const pos = this.peopleList.findIndex(
      (element) => element._id === person.data._id
    );
    this.peopleList.splice(pos, 1);

    APIS.people
      .deletePerson(person.data._id)
      .then((res) => {
        alertService.success(res.data);
      })
      .catch((e) => alertService.error(e.response.data));
  }
}

export default new PeopleStore();
