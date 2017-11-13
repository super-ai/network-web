import React from 'react';
import {Button,Form,Input,notification} from 'antd';
import Ou from 'components/Custom/OuTreeSelect';
import configData from './configData.js';
import utils from 'utils';
import ajax from 'utils/ajax';
import globalConfig from 'config.js';

const Component = React.Component;
const TextArea = Input.TextArea;
const FormItem = Form.Item;
const formItemLayout = configData.formItemLayout;

/**
* 转发
*/
class Transfer extends Component{

  handleReturn(){
    this.props.setPublicState({activeComp:'DetailView'});
  }

  async handleSave(){
    // 表单验证
    this.props.form.validateFieldsAndScroll(async (err,values)=>{
      if(!err){
        // 参数获取、处理
        var obj = this.props.form.getFieldsValue();
        obj.id = this.props.publicState.selectedRow.id; //公告id

        // 后台提交
        try{
          var res = await ajax.post(`${globalConfig.api.host}/api/Bulletin/transfer`, obj);
          if(res.success){
            notification.success({
              message: '转发成功',
              duration: 3,
            });

            this.props.setPublicState({activeComp:'DetailView',isRefreshDetailView:true});
          }else{
            this.error(res.failInfo.errorMessage);
          }
        }catch(ex){
          this.error(`网络请求出错: ${ex.message}`);
        }
      }
    });
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
    return(
      <div>
        <Button icon='left-circle-o' type='primary' onClick={this.handleReturn.bind(this)}>返回</Button>
        <Button icon='save' onClick={this.handleSave.bind(this)}>保存</Button>
        <br />
        <Form style={{marginTop:'20px'}}>
          <FormItem label='范围'  {...formItemLayout}>
            {getFieldDecorator('ous',{initialValue:[],rules: [{required: true,message:'范围必填'}]})
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
