import React from 'react';
import { Form,Input,Button } from 'antd';
import './index.less';

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
  */
  handleSubmit = (e) => {
   e.preventDefault();
   this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       // 提交数据
       console.log('提交的表单数据为: ', values);
     }
   });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
          span: 14,
          offset: 6,
        },
      },
    };
    return(
      <Form onSubmit={this.handleSubmit}>
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
          <Button  type="primary" htmlType='submit'>保存</Button>
        </FormItem>
      </Form>
  )
  }
}

const ModifyPasswordForm = Form.create()(ModifyPassword);

export default ModifyPasswordForm;
