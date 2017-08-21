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
      // 是否是跨域请求
      if (globalConfig.isCrossDomain()) {
        // tmp.withCredentials();
      }
      // 设置全局的超时时间
      if (globalConfig.api.timeout && !isNaN(globalConfig.api.timeout)) {
        tmp.timeout(globalConfig.api.timeout);
      }
      // 默认的Content-Type和Accept
      tmp.set('Content-Type', 'application/json').set('Accept', 'application/json');
      // 增加跨域
      tmp.set('Access-Control-Allow-Origin','*');

      // 如果有自定义的header
      if (headers) {
        tmp.set(headers);
      }
      // url中是否有附加的参数?
      if (params) {
        tmp.query(params);
      }
      // body中发送的数据
      if (data) {
        tmp.send(data);
      }
      // 包装成promise
      tmp.end((err, res) => {
        logger.debug('err=%o, res=%o', err, res);
        // 我本来在想, 要不要在这里把错误包装下, 即使请求失败也调用resolve, 这样上层就不用区分"网络请求成功但查询数据失败"和"网络失败"两种情况了
        // 但后来觉得这个ajax方法是很底层的, 在这里包装不合适, 应该让上层业务去包装
        if (res && res.body) {
          resolve(res.body);
        } else {
          reject(err || res);
        }
      });
    });
  }

  // 回头再封装
  fetchWrapper(method,url,{params,data,headers}={}){

  }

  // 基础的get/post方法

  get(url, opts = {}) {
    return this.requestWrapper('GET', url, {...opts});
  }

  //data body传递 ; opts params接收
  post(url, data, opts = {}) {
    return this.requestWrapper('POST', url, {...opts, data});
  }

  /**
  *
  *  security 登录
  */
  login(username, password){
    var params = new Object();
    var paramsUrl = `${globalConfig.login.validate}${this.extendParams(params)}`;
    var fd = new FormData();
    fd.append('username',username);fd.append('password',password);
    var fetchOpts = {
      method:'POST',
      credentials:'include',
      cache: 'default',
      body:fd
    };

    Object.keys(params).forEach(function(val){
      paramsUrl += val + '=' + encodeURIComponent(params[val]) + '&';
    })

    return fetch(paramsUrl,fetchOpts)
    .then((res)=>{
      if(res && res.redirected && res.url.indexOf('/login') > -1)
        console.warn('用户没有登录，跳转到登录页面!');
      else {
        return res.json();
      }
    })
    .catch((e) => {console.log('用户登录失败!');});
  }

  // 业务方法

  /**
   * 获取当前登录的用户
   *
   * @returns {*}
   */
  // 使用fetch获取数据
  getCurrentUser() {
    // 呢吗 ok的时候 啥都ok了 以下这句话可以直接使用
    // return this.get(`${globalConfig.login.getCurrentUser}`);
    var params = new Object();
    var paramsUrl = `${globalConfig.login.getCurrentUser}${this.extendParams(params)}`;
    var fetchOpts = {
      method:'GET',
      credentials:'include',
      cache: 'default',
    };

    return fetch(paramsUrl,fetchOpts)
    .then((res)=>{
      if(res && res.redirected && res.url.indexOf('/login') > -1)
        console.warn(`用户没有登录，跳转到登录页面!`,res);
      else {
        return res.json();
      }
    })
    .catch((e) => {debugger;console.log('获取currentUser异常');});
  }

  /**
  * url参数展开
  */
  extendParams(params){
    // 设置提交参数
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
    return this.ajax.get(`${globalConfig.api.path}/${this.tableName}/select`, queryObj);
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
    return this.ajax.post(`${globalConfig.api.path}/${this.tableName}/insert`, dataObj);
  }

  /**
   * 更新某个表的数据, 可以批量, 也可以单条
   *
   * @param keys 要更新的记录的主键
   * @param dataObj 要更新哪些字段
   * @returns {*}
   */
  update(keys = [], dataObj) {
    const tmp = keys.join(',');
    return this.ajax.post(`${globalConfig.api.path}/${this.tableName}/update`, dataObj, {params: {keys: tmp}});
  }

  /**
   * 删除某个表的数据, 可以批量, 也可以单条
   *
   * @param keys 要删除的记录的主键
   * @returns {*}
   */
  delete(keys = []) {
    const tmp = keys.join(',');
    return this.ajax.get(`${globalConfig.api.path}/${this.tableName}/delete`, {params: {keys: tmp}});
  }

  /**
   * 从服务端获取某个表的schema, 会merge到本地的schema中
   *
   * @returns {*}
   */
  getRemoteSchema() {
    // return this.ajax.get(`${globalConfig.api.path}/${this.tableName}/schema`);
    return this.ajax.get(`/api/${this.tableName}/schema`);
  }
}

export default Ajax;



// ok!
// var paramsUrl='/api/staff/getCurrentUser';
// error
// var paramsUrl = 'http://localhost:8080/api/staff/getCurrentUser';


// var myHeaders = {'Access-Control-Allow-Origin':'*'};
