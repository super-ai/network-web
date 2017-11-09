import React from 'react';
import {Button,Form,Input} from 'antd';
import Ou from 'components/Custom/OuTreeSelect';
import configData from './configData.js';

const Component = React.Component;
const TextArea = Input.TextArea;
const FormItem = Form.Item;
const formItemLayout = configData.formItemLayout;

/**
* 转发
*/
class Transfer extends Component{

  handleReturn(){
    this.props.form.resetFields(); // 清空表单数据
    this.props.setPublicState({activeComp:'DetailView'});
  }

  handleSave(){
    
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
        <div>
          <Button icon='left-circle-o' type='primary' onClick={this.handleReturn.bind(this)}>返回</Button>
          <Button icon='save' onClick={this.handleSave.bind(this)}>保存</Button>
          <br />
          <Form style={{marginTop:'20px'}}>
            <FormItem label='范围'  {...formItemLayout}>
              {getFieldDecorator('ouIds',{initialValue:[]})
                (<Ou multiple allowClear labelInValue/>)}
            </FormItem>
          </Form>
        </div>
    )
  }
}

const TransferForm = Form.create()(Transfer);

export default TransferForm;

//         <div style={{display:this.state.activeComp=='Transfer' ? 'inline':'none' }}>
