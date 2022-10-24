import { action, makeObservable, observable } from 'mobx';

class CommonStore {
  isFullSize = false;

  constructor() {
    makeObservable(this, {
      isFullSize: observable,
      toggleLeftSideBarView: action,
    });
  }

  toggleLeftSideBarView() {
    this.isFullSize = !this.isFullSize;
  }
}

export default new CommonStore();
