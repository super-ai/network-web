import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import globalConfig from 'config';
import ajax from '../../utils/ajax';
import Logger from '../../utils/Logger';
import {message,Form, Icon, Input, Button, Checkbox} from 'antd';
import './index.less';
import {loginSuccessCreator} from '../../redux/Login.js';

const FormItem = Form.Item;
const logger = Logger.getLogger('Login');

/**
 * 定义Login组件
 */
class Login extends React.PureComponent {

  // 这个login样式是直接从网上找的: https://colorlib.com/wp/html5-and-css3-login-forms/
  // 一般而言公司内部都会提供基于LDAP的统一登录, 用到这个登录组件的场景应该挺少的

  state = {
    username: '51847525',  // 当前输入的用户名
    password: 'Crcnet123456',  // 当前输入的密码
    requesting: false, // 当前是否正在请求服务端接口
  };

  // controlled components

  handleUsernameInput = (e) => {
    this.setState({username: e.target.value});
  };

  handlePasswordInput = (e) => {
    this.setState({password: e.target.value});
  };

  /**
   * 处理表单的submit事件
   *
   * @param e
   */
  handleSubmit = async(e) => {  // async可以配合箭头函数
    e.preventDefault();  // 这个很重要, 防止跳转
    this.setState({requesting: true});
    const hide = message.loading('正在验证...', 0);

    const username = this.state.username;
    const password = this.state.password;
    logger.debug('username = %s, password = %s', username, password);

    try {
      // 服务端验证
      const res = await ajax.login(username, password);
      hide();
      logger.debug('login validate return: result %o', res);
      console.info('返回的登录数据为:%o',res);
      if (res && res.success && res.data == 'LOGIN_SUCCESS' && !globalConfig.debug) {
        // 这里不需要setState了, 因为setState的目的是为了re-render, 而下一句会触发redux的状态变化, 也会re-render
        // 所以直接修改状态, 就是感觉这么做有点奇怪...
        this.state.tryingLogin = false;
        // App组件也可能触发loginSuccess action
        this.props.handleLoginSuccess(this.state.username);
      }
      else {
        message.error(`用户名或者密码错误，请重试！`);
        this.setState({requesting: false});
      }
    } catch (exception) {
      hide();
      message.error(`网络请求出错: ${exception.message}`);
      logger.error('login error, %o', exception);
      this.setState({requesting: false});
    }
  };

  render() {
    // 整个组件被一个id="loginDIV"的div包围, 样式都设置到这个div中
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="loginDIV">

        {/*debug模式下显示fork me on github*/}
        {
        false && <a href="#">
          <img style={{position: 'absolute', top: 0, right: 0, border: 0}}
               src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67"
               alt="Fork me on GitHub"
               data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"/>
        </a>}

        <div className="login">
          <h1>{globalConfig.name}</h1>

          <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}} method='POST'>
              <FormItem>
                  {getFieldDecorator('userName', {
                      initialValue:this.state.username,
                      rules: [{ required: true, message: '请输入用户名!' }],
                  })(
                      <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名"
                      onChange={this.handleUsernameInput}/>
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator('password', {
                      initialValue:this.state.password,
                      rules: [{ required: true, message: '请输入密码!' }],
                  })(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码"
                      onChange={this.handlePasswordInput}/>
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                  })(
                      <Checkbox>记住我</Checkbox>
                  )}
                  <a href="#" style={{float: 'right'}}>忘记密码</a>
                  <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                      登录
                  </Button>
                  或 <a href="#">现在就去注册!</a>
              </FormItem>
          </Form>

        </div>

      </div>
    );
  }

}

const LoginForm = Form.create()(Login);

const mapDispatchToProps = (dispatch) => {
  return {
    handleLoginSuccess: bindActionCreators(loginSuccessCreator, dispatch),
  };
};

// 不需要从state中获取什么, 所以传一个null
export default connect(null, mapDispatchToProps)(LoginForm);
