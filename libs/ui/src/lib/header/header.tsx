import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import './header.less';

/* eslint-disable-next-line */
export interface HeaderProps {
  name: string;
  to: string;
}

export const Header = (props: HeaderProps) => {
  return (
    <div className="contact-header">
      <NavBar
        mode="dark"
        onLeftClick={() => console.log('onLeftClick')}
        leftContent={
          <Link className="back-icon" to={props.to}>
            <Icon type="left" style={{ marginRight: '16px' }} />
          </Link>
        }
      >
        {props.name}
      </NavBar>
    </div>
  );
};

export default Header;
