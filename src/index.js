/**
 * 程序的入口, 类似java中的main 这是主分支么
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
import Question from './components/Question';
import Error from './components/Error';
import Hello from './components/Hello';
import ModifyPassword from './components/ModifyPassword';
import InPrgress from './components/InPrgress';
import Announcement from './components/Announcement';
// import TableList from './components/Announcement/TableList';
// import Detail from './components/Announcement/Detail';


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

        <Route path='resource'>
          <Route path='general' tableName='ResMeter' getComponent={DBTableContainer}/>
        </Route>

        <Route path='oa'>
          <Route path='announcement' component={Announcement}>
          </Route>
        </Route>

        <Route path='custom-manage'>
          <Route path='custom' tableName='Customer' getComponent={DBTableContainer}/>
          <Route path='contact' tableName='Contact' getComponent={DBTableContainer}/>
          <Route path='contract-business' tableName='ContractBusiness' getComponent={DBTableContainer}/>
        </Route>

        <Route path='business-manage'>
          <Route path='financial-subjects' tableName='FinancialSubjects' getComponent={DBTableContainer}/>
          <Route path='business' tableName='Business' getComponent={DBTableContainer}/>
        </Route>

        <Route path='contract-manage'>
          <Route path='contract' tableName='Contract' getComponent={DBTableContainer}/>
        </Route>

        <Route path='income-manage'>
          <Route path='business-volumn' tableName='BusinessVolumn' getComponent={DBTableContainer}/>
          <Route path='income-cost' tableName='IncomeCost' getComponent={DBTableContainer}/>
        </Route>

        <Route path='sm'>
          <Route path='menu' tableName='Menu' getComponent={DBTableContainer}/>
          <Route path='user' tableName='Staff' getComponent={DBTableContainer}/>
          <Route path='ou' tableName='OrganizationUnit' getComponent={DBTableContainer}/>
          <Route path='auth' tableName='Authority' getComponent={DBTableContainer}/>
        </Route>

        <Route path='help'>
          <Route path='question' component={Question}/>
        </Route>

        <Route path='userMenu' >
          <Route path='modify-password' component={ModifyPassword}/>
        </Route>

        <Route path="*" component={Error}/>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('root'));
