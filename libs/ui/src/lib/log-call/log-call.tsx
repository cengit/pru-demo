import React from 'react';
import { Header } from '@test-demo/ui';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';
import { TextareaItem, Button, Toast } from 'antd-mobile';
import phone from 'apps/user-app/src/assets/phone.png';
import { User, Log, LogType } from 'apps/user-app/src/app/store/model';
import { formatDate } from '../../lib/util/date';

import './log-call.less';

/* eslint-disable-next-line */
export interface LogCallProps {
  store: {
    getUser: (userId: number) => any;
    logCall: (userId: number, logInfo: string) => any;
  };
  match: any;
  history: any;
}

@inject('store')
@observer
class LogCallComponent extends React.Component<LogCallProps> {
  state = {
    user: {},
    logInfo: ''
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    if (!id) {
      return Toast.fail('Load user data failed !!!');
    }
    const userInfo = this.props.store.getUser(+id);
    this.setState({ user: userInfo });
  }
  logCall() {
    const { user, logInfo } = this.state;
    this.props.store.logCall((user as User).id, logInfo);
    this.props.history.push(`/single-contact/${(user as User).id}`);
  }
  inputChange(val: string) {
    if(val && val.length>100){
      val = val.substring(0,100);
    }
    this.setState({ logInfo: val });
  }
  render() {
    const user: User = this.state.user;
    const curDate = formatDate(new Date());
    return (
      <div className="app">
        <Header name={user.name} to={`/single-contact/${user.id}`}></Header>
        <div className="log-call-head">
          <img src={phone} />
          <span>Log Call</span>
        </div>

        <div className="call-detail">
          <div>
            <span className="title">Call Detail</span>
            <span className="right sub-title">{curDate}</span>
          </div>
        </div>

        <div className="relative text-wrap">
          <TextareaItem
            count={100}
            onChange={this.inputChange.bind(this)}
            placeholder="What have you discussed?"
            rows={12}
          />
          <div className="log-btn">
            <Button
              onClick={this.logCall.bind(this)}
              disabled={!this.state.logInfo}
              type="ghost"
              inline
              size="small"
              className="am-button-borderfix"
            >
              Log
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export const LogCall = withRouter(LogCallComponent);
// export default LogCall;
