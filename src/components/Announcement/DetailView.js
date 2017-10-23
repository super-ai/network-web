import React from 'react';
import {Button,Input,Icon,Tree} from 'antd';
import './index.less';
import configData from './configData.js';

const Component = React.Component;
const {TextArea} = Input;
const TreeNode = Tree.TreeNode;

/**
* 单条公告查看
*/
class DetailView extends Component{

  state = {
    formState:'select', //insert、edit、select
  }

  componentDidMount(){
    this.setState(this.props.stateData);
  }

  // 此函数为啥不会被执行:因为它会在activeComp不为detail时候注销
  componentWillReceiveProps(nextProps){
    this.setState(nextProps.stateData);
  }

  handleReturn(){
    this.props.setStateData({activeComp:'TableList'});
  }

  handleReply(){
    this.props.setStateData({activeComp:'Reply'});
  }

  handleEdit(){
    this.props.setStateData({activeComp:'DetailEdit'});
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
    const replysTree =
      <Tree className='announcementTree'>
        {this.renderTreeNodes(configData.replysTreeData)}
      </Tree>;
    const readsTree =
      <Tree className='announcementTree'>
        {this.renderTreeNodes(configData.readsTreeData)}
      </Tree>;
    return(
      <div style={{display:this.state.activeComp=='DetailView' ? 'inline':'none' }} className='announcement'>
        <Button type='primary' icon='left-circle-o' onClick={this.handleReturn.bind(this)}>返回</Button>
        <Button icon='plus' onClick={this.handleReply.bind(this)}>回复</Button>
        <Button icon='edit' onClick={this.handleEdit.bind(this)}>编辑</Button>
        <Button icon='delete' onClick={this.handleDelete.bind(this)}>删除</Button>
        <Button icon='share-alt' onClick={this.handleTransmit.bind(this)}>转发</Button>
        <div>
          <br />
          <span className='announcementTitle'>{this.state.selectedRow ? this.state.selectedRow.title:null}</span>
          <div className='announcementCreate'>
            <span>{this.state.selectedRow ? this.state.selectedRow.createStaffName:null}</span>
            &nbsp;&nbsp;
            <span>{this.state.selectedRow ? this.state.selectedRow.createDateTime:null}</span>
          </div>
          <hr className='hr'/>
          <br />
          <p className='announcementContent'>{this.state.selectedRow ? this.state.selectedRow.content:null}</p>
          <br />
          <hr />
          <br /><br />
          {attachments}
        </div>
        {replysTree}
        {readsTree}
      </div>
    )
  }
}

export default DetailView;

// ul 展开折叠
function handleExpand(e){
  var ul = document.getElementById('ul');
  if(e.target.innerHTML=='-'){
    e.target.innerHTML='+';
    ul.style.visibility = 'hidden';
  }else{
    e.target.innerHTML='-';
    ul.style.visibility = 'visible';
  }
}

const attachments =
  <div>
    <a onClick={handleExpand}>-</a>
    <ul id="ul">
      <li>附件一</li>
      <li>附件二</li>
      <li>附件三</li>
      <li>附件四</li>
      <li>附件五</li>
    </ul>
  </div>;

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
