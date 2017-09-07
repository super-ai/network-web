/**
 * 程序的入口, 类似java中的main
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import './utils/index.js';  // 引入各种prototype辅助方法
import store from 'redux/store.js';  // redux store

// 开始引入各种自定义的组件
import App from './components/App';
import Welcome from './components/Welcome';
import Error from './components/Error';
import Hello from './components/Hello';
//import DBTable from './components/DBTable';

// 将DBTable组件做成动态路由, 减小bundle size
// 注意不要再import DBTable了, 不然就没意义了
// 一些比较大/不常用的组件, 都可以考虑做成动态路由
const DBTableContainer = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./components/DBTable').default)
  }, 'DBTable');
};

// 路由表, 只要menu.js中所有的叶子节点配置了路由就可以了
// 我本来想根据menu.js自动生成路由表, 但那样太不灵活了, 还是自己配置好些
// 路由表index.js中的path 原则上使用小写中横线的方式
const routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome}/>

        <Route path="index">
          <Route path="option1" tableName="test" getComponent={DBTableContainer}/>
          <Route path="option2" tableName="testSms" getComponent={DBTableContainer}/>
          <Route path="option3" tableName="testAction" getComponent={DBTableContainer}/>
        </Route>

        <Route path="daohang">
          <Route path="555" component={Hello}/>
          <Route path="sanji">
            <Route path="666" component={Hello}/>
            <Route path="777" component={Hello}/>
            <Route path="888" component={Hello}/>
            <Route path="999" component={Hello}/>
          </Route>
        </Route>

        <Route path='resource'>
          <Route path='res-meter' tableName='ResMeter' getComponent={DBTableContainer}/>
        </Route>

        <Route path='sm'>
          <Route path='user' tableName='Staff' getComponent={DBTableContainer}/>
          <Route path='ou' tableName='OrganizationUnit' getComponent={DBTableContainer}/>
          <Route path='menu' tableName='Menu' getComponent={DBTableContainer}/>
          <Route path='auth' tableName='Authority' getComponent={DBTableContainer}/>
        </Route>

        <Route path='help'>
          <Route path='normal_question' component={Welcome}/>
        </Route>

        <Route path="*" component={Error}/>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('root'));
