import { observable, action, computed, autorun } from 'mobx';
import { User, Log, LogType, UserStatus } from './model';

class ItemsStore {
  @observable items: User[];
  @observable count;

  constructor() {
    this.items = [];
    this.count = 1;
    this.initData();
  }

  @computed get total() {
    return this.items.length;
  }

  @action
  updateStatus = (id: number, status: UserStatus) => {
    const arr: User[] = this.items.concat(); // make a copy
    arr.forEach(user => {
      if (user.id === id) {
        user.status =
          user.status === UserStatus.HIRED ? UserStatus.HIRED : status;
        user.isNew = false;
      }
    });
    this.items = arr;
    // const logDesc = status === UserStatus.HIRED ? 'A quick win!' : 'Follow up';
    if (status === UserStatus.HIRED) {
      this.logCall(id, 'A quick win!', status);
    }
  };

  @action
  getUserList = () => {
    return this.items;
  };

  @action
  addUser = (user: User) => {
    this.items.push(user);
  };

  @action
  getUser = (id: number) => {
    const user = this.items.filter(user => user.id === id);
    if (user) {
      return user[0];
    }
    return null;
  };

  @action
  logCall = (
    id: number,
    callInfo: string,
    status: UserStatus = UserStatus.INPROGRESS
  ) => {
    const user: User[] = this.items.filter(user => user.id === id);
    const info: Log = {
      type: status === UserStatus.INPROGRESS ? LogType.CALL : LogType.HIRE,
      desc: callInfo,
      time: new Date()
    };

    user[0].log.push(info);
    user[0].isNew = false;
    user[0].status =
      user[0].status === UserStatus.HIRED ? UserStatus.HIRED : status;
  };

  @action
  emptyData = () => {
    this.items = [];
  };
  /**
   * init 3 user data by default
   */
  initData() {
    for (let index = 0; index < 5; index++) {
      const element: User = {
        id: index,
        name: 'Michael Owen' + index,
        email: 'email' + index + '@mail.com',
        phone: '1234567' + index,
        status: UserStatus.OPEN,
        isNew: Math.random() > 0.5 ? true : false,
        log: [
          {
            type: LogType.FORM,
            time: new Date()
          },
          {
            type: LogType.NEW,
            time: new Date()
          }
        ]
      };
      this.addUser(element);
    }
  }

  //  defaultDate = autorun((e) => this.fetchData(123))
}

const itemsStore = new ItemsStore();

export { itemsStore };
