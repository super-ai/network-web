import Logger from './Logger';
import superagent from 'superagent';
import globalConfig from '../config';

// superagent 不会用
// import { Promise } from 'es6-promise';
// import fetch from 'isomorphic-fetch';

const logger = new Logger('Ajax');

/**
 * 封装所有ajax逻辑, 为了配合async/await, 所有ajax请求都要返回promise对象
 */
class Ajax {

  // Ajax工具类提供的方法可以分为2种:
  // 1. 基础的get/post方法, 这些是通用的
  // 2. 在get/post基础上包装的业务方法, 比如getCurrentUser, 这些方法是有业务含义的

  // 作为缓存
  tableCache = new Map();

  /**
   * 内部方法, 在superagent api的基础上, 包装一些全局的设置
   *
   * @param method 要请求的方法
   * @param url 要请求的url
   * @param params url上的额外参数
   * @param data 要发送的数据
   * @param headers 额外设置的http header
   * @returns {Promise}
   */
  requestWrapper(method, url, {params, data, headers} = {}) {
    logger.debug('method=%s, url=%s, params=%o, data=%o, headers=%o', method, url, params, data, headers);
    return new Promise((resolve, reject) => {
      const tmp = superagent(method, url);
      // headers一部分
      tmp.set('Accept', 'application/json');
      // 是否是跨域请求
      globalConfig.isCrossDomain() ? tmp.withCredentials():null;
      // 设置全局的超时时间
      globalConfig.api.timeout && !isNaN(globalConfig.api.timeout) ? tmp.timeout(globalConfig.api.timeout):null;
      // 主参数
      headers ? tmp.set(headers):null;
      params ? tmp.query(params):null;
      data ? tmp.send(data):null;

      // 包装成promise
      tmp.end((err, res) => {
        logger.debug('err=%o, res=%o', err, res);
        if (res) {
          res.body ? resolve(res.body):null;
          res.text ? resolve(res.text):null;
        }else{
          reject(err || res);
        }
      });
    });
  }

  // params {'id':1,'name':'llp'}
  /**
  * 此处包装后 只用给get传递具体内容 在此把具体内容包装到params参数
  */
  get(url, params = {}) {
    return this.requestWrapper('GET', url, {params});
  }

  //data body传递 ; opts params接收
  post(url, data, opts = {}) {
    return this.requestWrapper('POST', url, {...opts, data});
  }

  //典型调用
  // get(url,{id:1,name:'llp'});
  // post(url,FormData,{params:{},headers:{}})
  // 这封装太烂了 还是使用requestWrapper 合适

  /**
  * 用户登录
  */
  login(username,password){
    var paramsUrl = `${globalConfig.api.host}${globalConfig.login.validate}`;
    /*结果返回*/
    var formData = new FormData();
    formData.append('username',username);formData.append('password',password);
    return this.post(paramsUrl,formData);
  }

  /**
  * 用户退出
  */
  logout(){
    var paramsUrl = `${globalConfig.api.host}${globalConfig.login.logout}`;
    return this.get(paramsUrl);
  }

  /**
   * 获取当前登录的用户
   * @returns {*}
   */
  getCurrentUser() {
    // 呢吗 ok的时候 啥都ok了 以下这句话可以直接使用
    // return this.get(`${globalConfig.login.getCurrentUser}`);
    var paramsUrl = `${globalConfig.api.host}${globalConfig.login.getCurrentUser}`;
    var fetchOpts = {
      method:'GET',
      credentials:'include',
      cache: 'default',
    };

    return fetch(paramsUrl,fetchOpts)
    .then((res)=>{
      if(res && res.redirected && res.url.indexOf('/login') > -1){
        return undefined;
      }
      else {
        return res.json();
      }
    })
    .catch((e) => {console.log('获取currentUser异常');});
  }

  /**
  * 参数展开到url
  */
  extendParams(params){
    var paramsStr='';
    Object.keys(params).forEach(function(val){
       paramsStr+= val + '=' + encodeURIComponent(params[val]) + '&';
    })
    return paramsStr;
  }

  /**
   *  封装CRUD相关操作
   *
   * @param tableName 要操作的表名
   * @returns {*}
   */
  CRUD(tableName) {
    if (this.tableCache.has(tableName)) {
      return this.tableCache.get(tableName);
    }

    const util = new CRUDUtil(tableName);
    util.ajax = this;
    this.tableCache.set(tableName, util);
    return util;
  }
}

/**
 * 封装CRUD相关操作, 有点内部类的感觉
 */
class CRUDUtil {
  constructor(tableName) {
    this.tableName = tableName;
  }

  /**
   * 查询某个表
   *
   * @param queryObj 查询条件封装为一个对象
   * @returns {*}
   */
  select(queryObj) {
    return this.ajax.get(`${globalConfig.api.host}${globalConfig.api.path}/${this.tableName}/select`, queryObj);
    // ok
    // return this.ajax.get('/api/ResMeter/select', queryObj);
    // err
    // return this.ajax.get('http://localhost:8080/api/ResMeter/select', queryObj);
  }

  /**
   * 给某个表新增一条数据
   *
   * @param dataObj 要新增的数据
   * @returns {*}
   */
  insert(dataObj) {
    return this.ajax.post(`${globalConfig.api.host}${globalConfig.api.path}/${this.tableName}/insert`, dataObj);
  }

  /**
   * 更新某个表的数据, 可以批量, 也可以单条
   *
   * @param keys 要更新的记录的主键
   * @param dataObj 要更新哪些字段
   * @returns {*}
   */
  update(keys = [], dataObj) {
    // 增加跨域试试 否则update和insert都不能使用
    var headers ;
    const tmp = keys.join(',');
    return this.ajax.post(`${globalConfig.api.host}${globalConfig.api.path}/${this.tableName}/update`, dataObj, {headers,params: {keys: tmp}});
  }

  /**
   * 删除某个表的数据, 可以批量, 也可以单条
   *
   * @param keys 要删除的记录的主键
   * @returns {*}
   */
  delete(keys = []) {
    const tmp = keys.join(',');
    return this.ajax.get(`${globalConfig.api.host}${globalConfig.api.path}/${this.tableName}/delete`, {keys: tmp});
  }

  /**
   * 从服务端获取某个表的schema, 会merge到本地的schema中
   *
   * @returns {*}
   */
  getRemoteSchema() {
    // return this.ajax.get(`${globalConfig.api.path}/${this.tableName}/schema`);
    return this.ajax.get(`${globalConfig.api.host}/api/${this.tableName}/schema`);
  }
}

export default Ajax;


// Useless Code

//
// /**
// *  fetch 实现
// *  security 登录
// *  useless
// */
// loginFetch(username, password){
//   var params = new Object();
//   var paramsUrl = `${globalConfig.api.host}${globalConfig.login.validate}`;
//   var fd = new FormData();
//   fd.append('username',username);fd.append('password',password);
//   var fetchOpts = {
//     method:'POST',
//     credentials:'include',
//     cache: 'default',
//     body:fd,
//   };
//
//   Object.keys(params).forEach(function(val){
//     paramsUrl += val + '=' + encodeURIComponent(params[val]) + '&';
//   })
//
//   return fetch(paramsUrl,fetchOpts)
//   .then((res)=>{
//     if(res && res.ok){
//       // 获取当前用户
//       this.getCurrentUser();
//       return res.text();
//     }
//   })
//   .catch((e) => {console.log('用户登录失败!%o',e);});
// }
//
// /**
// *
// *  security 退出
// *  useless
// */
// logoutFetch(){
//   var paramsUrl = `${globalConfig.api.host}${globalConfig.login.logout}`;
//   var fetchOpts = {
//     credentials:'include',
//     cache: 'default',
//   };
//
//   return fetch(paramsUrl,fetchOpts)
//   .then((res)=>{
//     if(res && res.ok)
//       return res.text();
//   })
//   .catch((e) => {console.log('用户退出失败!%o',e);});
// }
//
// // useless
// loginXhr(username, password){
//   var paramsUrl=`${globalConfig.api.host}${globalConfig.login.validate}`;
//   var fd = new FormData();fd.append('username',username);fd.append('password',password);
//   // 使用xhr提交
//   var xhr = new XMLHttpRequest();
//   xhr.addEventListener("load",  (data)=>{this.getListDataAfterLogin()}, false);
//   xhr.addEventListener("error", (data)=>{console.log('xhr fail!!!')}, false);
//   xhr.open("POST", paramsUrl);
//   // xhr.setRequestHeader('Access-Control-Allow-Origin', '*'); // 必须有
//   xhr.send(fd);
// }
//
// getListDataAfterLogin(){
//   console.warn('cnm 登陆成功了！');
// }
//
//
//
