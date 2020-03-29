import React from 'react';
import ReactDOM from 'react-dom';

// import App from './app/app';
import RouterConfig from './app/router/index';

import { itemsStore } from './app/store/items';
import { Provider } from 'mobx-react';

ReactDOM.render(
  <Provider store={itemsStore}>
    <RouterConfig />
  </Provider>,
  document.getElementById('root')
);
// ReactDOM.render(<App />, document.getElementById('root'));
