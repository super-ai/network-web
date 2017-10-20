import React from 'react';
import {Button,Form,Input,Icon,Tree} from 'antd';
import './index.less';

const Component = React.Component;
const FormItem = Form.Item;
const {TextArea} = Input;
const TreeNode = Tree.TreeNode;

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

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }


  render(){
    const { getFieldDecorator } = this.props.form;
    const replyTree =
      <Tree>
        {this.renderTreeNodes(replyTreeData)}
      </Tree>;
    return(
      <div>
        <Button type='primary' icon='left-circle-o' onClick={this.handleReturn.bind(this)}>返回</Button>
        <Button icon='plus' onClick={this.handleReply.bind(this)}>回复</Button>
        <Button icon='edit' onClick={this.handleEdit.bind(this)}>编辑</Button>
        <Button icon='delete' onClick={this.handleDelete.bind(this)}>删除</Button>
        <Button icon='share-alt' onClick={this.handleTransmit.bind(this)}>转发</Button>
        <div>
          <Form>
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
            <FormItem label='附件' >
              {getFieldDecorator('attachments',{initialValue:this.state.selectedRow ? this.state.selectedRow.attachments:null})
                (attachments)}
            </FormItem>
            <FormItem label='' >
              {getFieldDecorator('replies',{initialValue:this.state.selectedRow ? this.state.selectedRow.replies:null})
                (replyTree)}
            </FormItem>
            <FormItem label='已阅' >
              {getFieldDecorator('reads',{initialValue:this.state.selectedRow ? this.state.selectedRow.reads:null})
                (reads)}
            </FormItem>
            <FormItem label='创建人' >
              {getFieldDecorator('createStaffName',{initialValue:this.state.selectedRow ? this.state.selectedRow.createStaffName:null})
                (<Input />)}
            </FormItem>
            <FormItem label='创建时间' >
              {getFieldDecorator('createDateTime',{initialValue:this.state.selectedRow ? this.state.selectedRow.createDateTime:null})
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

const attachments =
  <ul>
    <li>附件一</li>
    <li>附件二</li>
    <li>附件三</li>
    <li>附件四</li>
    <li>附件五</li>
  </ul>;

const reads =
  <ul>
    <li>张三阅</li>
    <li>李四阅</li>
    <li>Tom阅</li>
    <li>Tyson阅</li>
    <li>习大大阅</li>
  </ul>;
const replies =
  <ul>
    <li>张三回复</li>
    <li>李四回复</li>
    <li>Tom回复</li>
    <li>Tyson回复</li>
    <li>习大大回复</li>
  </ul>;

const replyTreeData = [{
  title: '回复列表',
  key: '0-0',
  children: [{
    title: '张三回复',
    key: '0-0-0',
  }, {
    title: '李四回复',
    key: '0-0-1',
  }, {
    title: 'Tom回复',
    key: '0-0-2',
  }, {
    title: 'Tyson回复',
    key: '0-1',
  }, {
    title: '习大大回复',
    key: '0-2',
  }],
}];

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
