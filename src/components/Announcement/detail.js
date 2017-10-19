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

  state={
    xxx:''
  }

  componentDidMount(){
    // 获取属性 设置到state
    console.info('###Detail完成加载：%o',this.props.stateData);
    this.setState(this.props.stateData);
  }

  // 此函数为啥不会被执行？
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
    // selectedRow
    // debugger;
    return(
      <div>
        <Button onClick={this.handleReturn.bind(this)}>返回</Button>
        <Button onClick={this.handleReply.bind(this)}>回复</Button>
        <Button onClick={this.handleEdit.bind(this)}>编辑</Button>
        <Button onClick={this.handleDelete.bind(this)}>删除</Button>
        <Button onClick={this.handleTransmit.bind(this)}>转发</Button>
        <div>
          <Form >
            <FormItem label='标题' >
              {getFieldDecorator('title',{initialValue:this.state.selectedRow ? this.state.selectedRow.title:null})
                (<Input />)}
            </FormItem>
            <FormItem label='内容' >
              {getFieldDecorator('content',{})
                (<TextArea autosize='true'/>)}
            </FormItem>
            <FormItem label='创建人' >
              {getFieldDecorator('createStaffName',{})
                (<Input />)}
            </FormItem>
            <FormItem label='创建时间' >
              {getFieldDecorator('createDateTime',{})
                (<Input />)}
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
