import React from 'react';
import { withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import { User } from 'apps/user-app/src/app/store/model';

import './ui.less';
import { List } from 'antd-mobile';
import phone from 'apps/user-app/src/assets/phone.png';
import email from 'apps/user-app/src/assets/email.png';
import './ui.less';

const Item = List.Item;
const Brief = Item.Brief;

/* eslint-disable-next-line */
export interface UiProps {
  store: {
    items: User[];
  };
  history: any;
}

@inject('store')
@observer
class Ui extends React.Component<UiProps> {
  state = {
    userList: []
  };
  componentDidMount() {
    // const list: User = this.props.store.getUserList();
    // console.log("list333333=",list)
    // this.setState({userList: list})
  }
  render() {
    const { items = [] } = this.props.store;
    return (
      <>
        <List className="my-list">
          {items.map((user: User) => {
            return (
              <Item
                key={user.id}
                multipleLine
                platform="ios"
                onClick={() => {
                  this.props.history.push(`/single-contact/${user.id}`);
                }}
                extra={
                  <>
                    <img
                      className="ico-phone"
                      width="27"
                      src={phone}
                      alt="call"
                    />
                    <img className="ico-email" src={email} alt="email" />
                  </>
                }
              >
                {user.name}
                {user.isNew && <span className="icon-new">New</span>}

                <Brief>{user.email}</Brief>
              </Item>
            );
          })}
        </List>
      </>
    );
  }
}
export const UserList = withRouter(Ui);
