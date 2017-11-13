import React from 'react';
import {Button,Form,Input,notification} from 'antd';
import configData from './configData.js';
import FileUploader from 'components/FileUploader';
import utils from 'utils';
import ajax from 'utils/ajax';
import globalConfig from 'config.js';

const Component = React.Component;
const TextArea = Input.TextArea;
const FormItem = Form.Item;
const formItemLayout = configData.formItemLayout;

/**
* 查看回复
*/
class Reply extends Component{

  handleReturn(){
    this.props.setPublicState({activeComp:'DetailView'});
  }

  error(errorMsg) {
    // 对于错误信息, 要很明显的提示用户, 这个通知框要用户手动关闭
    notification.error({
      message: '出错!',
      description: `请联系管理员, 错误信息: ${errorMsg}`,
      duration: 0,
    });
  }

  async handleSave(){
    // 表单验证
    this.props.form.validateFieldsAndScroll(async (err,values)=>{
      if(!err){
        // 参数获取、处理
        var obj = this.props.form.getFieldsValue();
        obj.bulletinId = this.props.publicState.selectedRow.id; //公告id
        utils.removeServer(obj,['additions'],globalConfig.api.host); // 上传文件url去掉server
        console.log('处理后的回复表单数据为: ',JSON.stringify(obj));

        // 后台提交
        try{
          var res = await ajax.post(`${globalConfig.api.host}/api/Bulletin/reply`, obj);
          if(res.success){
            notification.success({
              message: '回复成功',
              description: this.primaryKey ? `新增数据行 主键=${res.data[this.primaryKey]}` : '',
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

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
        <div>
          <Button icon='left-circle-o' type='primary' onClick={this.handleReturn.bind(this)}>返回</Button>
          <Button icon='save' onClick={this.handleSave.bind(this)}>保存</Button>
          <br />
          <Form style={{marginTop:'20px'}}>
            <FormItem label='内容'  {...formItemLayout}>
              {getFieldDecorator('content',{rules: [{required: true,message:'内容必填'}]})
                (<TextArea autosize={{ minRows: 8, maxRows: 28 }} />)}
            </FormItem>
            <FormItem label='附件'  {...formItemLayout}>
              {getFieldDecorator('additions')
                (<FileUploader max='5'  sizeLimit='500' placeholder='上传文件' />)
              }
            </FormItem>
          </Form>
        </div>
    )
  }
}

const ReplyForm = Form.create()(Reply);

export default ReplyForm;
