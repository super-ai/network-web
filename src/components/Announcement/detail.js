import React from 'react';
import {Button,Form,Input,Icon} from 'antd';
import './index.less';

const Component = React.Component;
const FormItem = Form.Item;
const {TextArea} = Input;

/**
* 单条公告查看和编辑
*/
class Detail extends Component{

  state = {}

  componentDidMount(){
    // console.info('###Detail完成加载：%o',this.props.stateData);
    this.setState(this.props.stateData);
  }

  // 此函数为啥不会被执行:因为它会在activeComp不为detail时候注销
  componentWillReceiveProps(){
    console.info('这个永远不会被调用');
    this.setState(this.props.stateData);
  }

  handleReturn(){
    this.props.changeActiveComp('TableList');
  }

  handleReply(){
    this.props.changeActiveComp('Reply');
  }

  handleEdit(){

  }

  handleDelete(){

  }

  handleTransmit(){

  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Button type='primary' icon='left-circle-o' onClick={this.handleReturn.bind(this)}>返回</Button>
        <Button icon='plus' onClick={this.handleReply.bind(this)}>回复</Button>
        <Button icon='edit' onClick={this.handleEdit.bind(this)}>编辑</Button>
        <Button icon='delete' onClick={this.handleDelete.bind(this)}>删除</Button>
        <Button icon='share-alt' onClick={this.handleTransmit.bind(this)}>转发</Button>
        <div>
          <Form >
            <FormItem label='标题' >
              {getFieldDecorator('title',{initialValue:this.state.selectedRow ? this.state.selectedRow.title:null})
                (<Input />)}
            </FormItem>
            <FormItem label='内容' >
              {getFieldDecorator('content',{initialValue:this.state.selectedRow ? this.state.selectedRow.content:null})
                (<TextArea autosize={{ minRows: 8, maxRows: 28 }} />)}
            </FormItem>
            <FormItem label='范围' >
              {getFieldDecorator('range',{initialValue:this.state.selectedRow ? this.state.selectedRow.range:null})
                (<TextArea autosize={{ minRows: 6, maxRows: 6 }} />)}
            </FormItem>
            <FormItem label='创建人' >
              {getFieldDecorator('createStaffName',{initialValue:this.state.selectedRow ? this.state.selectedRow.createStaffName:null})
                (<Input />)}
            </FormItem>
            <FormItem label='创建时间' >
              {getFieldDecorator('createDateTime',{initialValue:this.state.selectedRow ? this.state.selectedRow.createDateTime:null})
                (<Input />)}
            </FormItem>
            <FormItem label='附件' >
              {getFieldDecorator('attachments',{initialValue:this.state.selectedRow ? this.state.selectedRow.attachments:null})
                (<TextArea autosize={{ minRows: 4, maxRows: 4 }} />)}
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const DetailForm = Form.create()(Detail);

export default DetailForm;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
