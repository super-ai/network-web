import React from 'react';
import { Form,Input,Button,notification } from 'antd';
import './index.less';
import ajax from 'utils/ajax.js';
import globalConfig from 'config.js';

const Component = React.Component;
const FormItem = Form.Item;

class ModifyPassword extends Component{
  state = {
    confirmDirty: false,
  }

  // 验证两次密码是否相同
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['comfirmPassword'], { force: true });
    }
    callback();
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入不一致!');
    } else {
      callback();
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  /**
  * 提交密码修改
  * 不能使用箭头函数
  * 1. 使用await 就不能使用箭头函数
  * 2. 回调函数中 要使用类方法 需要把回调函数也绑定到this
  */
  async handleSubmit(e){
   e.preventDefault();
   let rlt = this.props.form.validateFields(
     async function cb(err, values){
     if (!err) {
       try{ // 提交数据
         console.log('提交的表单数据为: ',this.props.form.getFieldsValue());
         const res = await ajax.post(`${globalConfig.api.host}/api/staff/password`,null,{params:this.props.form.getFieldsValue()});

         if (res > 0) {
           notification.success({
             message: '修改密码成功',
             duration: 3,
           });
           this.props.form.resetFields();
         } else {
           this.error('修改密码失败');
         }
       }catch(ex){
         this.error(`网络请求出错: ${ex.message}`);
       }
     }
   }.bind(this));
  }

  error(errorMsg) {
    // 对于错误信息, 要很明显的提示用户, 这个通知框要用户手动关闭
    notification.error({
      message: '出错!',
      description: `请联系管理员, 错误信息: ${errorMsg}`,
      duration: 0,
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      // 1. 每个FormItem包含标签col和包装列
      // 2. xs为小于768px配置；sm为大于768px配置
      // 3. span表示控件的跨度；offset表示控件的偏移
      // 4. 所有的属性 都是相对于Form(父容器)
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    // 怎么能使得提交按钮缩进排列
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 18,
          offset: 6,
        },
      },
    };
    return(
      <Form onSubmit={this.handleSubmit.bind(this)} className='modify-password-form'>
        <FormItem label="旧密码" hasFeedBack {...formItemLayout}>
          {
            getFieldDecorator('oldPassword',{
              rules:[{require:true,message:'必填'}]
            })(
              <Input type="password"/>
            )
          }
        </FormItem>
        <FormItem label="新密码" hasFeedBack  {...formItemLayout}>
          {
            getFieldDecorator('newPassword',{
              rules:[{require:true,message:'必填'},{validator:this.checkConfirm}]
            })(
              <Input type="password"/>
            )
          }
        </FormItem>
        <FormItem label="再次输入" hasFeedBack  {...formItemLayout}>
          {
            getFieldDecorator('comfirmPassword',{
              rules:[{require:true,message:'必填'},{validator:this.checkPassword}]
            })(
              <Input type="password" onBlur={this.handleConfirmBlur}/>
            )
          }
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button  type="primary" htmlType="submit" icon="save">保存</Button>
        </FormItem>
      </Form>
  )
  }
}

const ModifyPasswordForm = Form.create()(ModifyPassword);

export default ModifyPasswordForm;
