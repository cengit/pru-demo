import React from 'react';
import { Header } from '@test-demo/ui';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Flex, WhiteSpace, Steps, Toast } from 'antd-mobile';
import {
  User,
  Log,
  LogType,
  UserStatus
} from 'apps/user-app/src/app/store/model';

import { formatDate } from '../../lib/util/date';

import './single-contact.less';
import phone from 'apps/user-app/src/assets/phone.png';
import email from 'apps/user-app/src/assets/email.png';
import message from 'apps/user-app/src/assets/message.png';
import avatar from 'apps/user-app/src/assets/avatar.png';
import calendar from 'apps/user-app/src/assets/calendar.png';
import create from 'apps/user-app/src/assets/create.png';

import call from 'apps/user-app/src/assets/call.png';
import form from 'apps/user-app/src/assets/form.png';
import badge from 'apps/user-app/src/assets/badge.png';
import add from 'apps/user-app/src/assets/add.png';

import { ActionSheet, Button } from 'antd-mobile';
import { isNull } from 'util';

const Step = Steps.Step;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(
  window.navigator.userAgent
);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault()
  };
}

/* eslint-disable-next-line */
export interface SingleContactProps {
  match: any;
  store: {
    updateStatus: (userId: number, status: UserStatus) => any;
    getUser: (userId: number) => any;
  };
}

@inject('store')
@observer
export class SingleContact extends React.Component<SingleContactProps> {
  state = {
    user: {}
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    if (!id) {
      return Toast.fail('Load user data failed !!!');
    }
    const userInfo: User = this.props.store.getUser(+id);

    this.setState({ user: userInfo });
  }
  // followUpUser(id:number){
  //   this.props.store.updateStatus(id,UserStatus.INPROGRESS);
  // }
  // hireUser(id:number){
  //   this.props.store.updateStatus(id,UserStatus.HIRED);
  // }
  getUserStatus(status: UserStatus) {
    let statusLabel = '';
    switch (status) {
      case UserStatus.HIRED:
        statusLabel = 'Hired';
        break;
      case UserStatus.INPROGRESS:
        statusLabel = 'In Progress';
        break;
      case UserStatus.OPEN:
        statusLabel = 'Open';
        break;
      default:
        break;
    }
    return statusLabel;
  }
  showActionSheet = () => {
    // this.props.store.addCount();
    const user: User = this.state.user;
    if (user.status === UserStatus.HIRED) {
      return;
    }
    const BUTTONS = ['Mark as Hired', 'Follow Up', 'Cancel'];
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        maskClosable: true,
        
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.store.updateStatus(user.id, UserStatus.HIRED);
        } else if (buttonIndex === 1) {
          this.props.store.updateStatus(user.id, UserStatus.INPROGRESS);
        }
        this.setState({ clicked: BUTTONS[buttonIndex] });
      }
    );
  };

  customIcon(log: LogType): JSX.Element {
    let icon: JSX.Element = null;
    switch (log) {
      case LogType.CALL:
        icon = <img className="step-ico step-call" src={call} />;
        break;
      case LogType.FOLLOW:
        icon = <img className="step-ico step-call" src={call} />;
        break;
      case LogType.FORM:
        icon = <img className="step-ico step-form" src={form} />;
        break;
      case LogType.HIRE:
        icon = <img className="step-ico step-badge" src={badge} />;
        break;
      case LogType.NEW:
        icon = <img className="step-ico step-add" src={add} />;
        break;
      default:
        break;
    }
    return icon;
  }

  getLogTitle(log: LogType) {
    let logTitle = '';
    switch (log) {
      case LogType.CALL:
        logTitle = 'Call';
        break;
      case LogType.FOLLOW:
        logTitle = 'Followed Up';
        break;
      case LogType.FORM:
        logTitle = 'Form filled';
        break;
      case LogType.HIRE:
        logTitle = 'Hired';
        break;
      case LogType.NEW:
        logTitle = 'New contact created';
        break;
      default:
        break;
    }
    return logTitle;
  }

  getSteps(log: Log[]) {
    if (!log) {
      return null;
    }
    log = log.reverse();
    return (
      <Steps size="lagre" current={0}>
        {log.map((log: Log, index: number) => {
          return (
            <Step
              icon={this.customIcon(log.type)}
              key={index}
              title={this.getLogTitle(log.type)}
              description={
                <>
                  {log.desc && <div>{log.desc}</div>}
                  <div>{formatDate(log.time)}</div>
                </>
              }
            />
          );
        })}
      </Steps>
    );
  }
  render() {
    const user: User = this.state.user;
    console.log('user log==', user.log);
    return (
      <div className="app">
        <Header name={user.name} to={`/user-list/${user.id}`}></Header>
        <div className="top-panel">
          <div className="inline-block">
            <img className="ico-avatar" src={avatar} alt={user.name} />
          </div>
          <div className="inline-block user-panel">
            <div className="">
              <span className="name">{user.name}</span>
              {user.isNew && <span className="icon-new text-top">new</span>}
            </div>
            <div>
              <span
                onClick={this.showActionSheet}
                className={'action action-' + user.status}
              >
                {this.getUserStatus(user.status)}
              </span>
            </div>
          </div>
          {/* icon line */}
          <Flex className="ml-20">
            <Flex.Item>
              <Link to={`/log-call/${user.id}`}>
                <img className="ico-item" src={phone} />
              </Link>
            </Flex.Item>
            <Flex.Item>
              <img className="ico-item ico-email" src={email} />
            </Flex.Item>
            <Flex.Item>
              <img className="ico-item" src={message} />
            </Flex.Item>
            <Flex.Item>
              <img className="ico-item" src={calendar} />
            </Flex.Item>
            <Flex.Item>
              <img className="ico-item ico-create" src={create} />
            </Flex.Item>
          </Flex>
        </div>

        <div className="contact-detail">
          <div>
            <span className="title">Contact Detail</span>
            <span className="right sub-title">
              <Link to={`/log-call/${user.id}`}>Edit</Link>
            </span>
          </div>
        </div>
        <div className="contact-email">
          <div>
            <label>Email</label>
            <span>{user.email}</span>
          </div>
          <div>
            <label>Phone</label>
            <span>{user.phone}</span>
          </div>
        </div>
        <div className="contact-detail">
          <div>
            <span className="title">Activites</span>
          </div>
        </div>
        <div className="steps">{this.getSteps(user.log)}</div>
      </div>
    );
  }
}
