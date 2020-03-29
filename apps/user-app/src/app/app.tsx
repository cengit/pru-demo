import React from 'react';
import './style/index.less';
import './app.less';

import { NavBar, SearchBar } from 'antd-mobile';

import { UserList } from '@test-demo/ui';
import user from 'apps/user-app/src/assets/user.png';
import menu from 'apps/user-app/src/assets/menu.png';

export const App = () => {
  /*
  # Generate UI lib
nx g @nrwl/react:lib ui

# Add a component
nx g @nrwl/react:component xyz --project ui

   */
  return (
    <div className="app">
      <header className="flex">
        <NavBar
          mode="dark"
          icon={<img className="head-ico" src={menu} />}
          rightContent={<img className="head-ico" src={user} />}
          className="top-nav-bar"
        >
          CONTACTS
        </NavBar>
        <SearchBar
          placeholder="Search Contact"
          maxLength={8}
          cancelText="Cancel"
          showCancelButton={false}
        />
      </header>
      <div className="main">
        <UserList></UserList>
      </div>
    </div>
  );
};

export default App;
