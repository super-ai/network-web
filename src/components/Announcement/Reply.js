import React from 'react';
import {Button,Form,Input} from 'antd';
import configData from './configData.js';
import FileUploader from 'components/FileUploader';

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

  handleSave(){
    var params = this.props.form.getFieldsValue();
    console.info('回复数据为:%o',params);
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
              {getFieldDecorator('replyContent',)
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
