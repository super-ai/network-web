import React from 'react';
import {Button,Input,Icon,Tree,Modal,message} from 'antd';
import './index.less';
import configData from './configData.js';
import ItemList from './ItemList.js';

const Component = React.Component;
const {TextArea} = Input;
const TreeNode = Tree.TreeNode;

/**
* 单条公告查看
*/
class DetailView extends Component{

  state = {
  }

  componentDidMount(){
    this.setState(this.props.stateData);
  }

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
    this.props.setStateData({activeComp:'DetailEdit',forUpdate:true});
  }

  handleDelete(e){
    e.preventDefault();
    Modal.confirm({
      title: '确认删除',
      content: `当前被选中标题为: ${this.state.selectedRow.title}`,
      // 这里注意要用箭头函数, 否则this不生效
      onOk: () => {
        this.delete(`${this.state.selectedRow.id}`);
      },
    });
  }

  /**
  * 删除某条记录
  */
  delete(id){
    message.info('发起删除请求');
  }

  handleTransmit(){
    this.props.setStateData({activeComp:'Transfer'});
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
        <div>
          <Button type='primary' icon='left-circle-o' onClick={this.handleReturn.bind(this)}>返回</Button>
          <Button icon='plus' onClick={this.handleReply.bind(this)}>回复</Button>
          <Button icon='edit' onClick={this.handleEdit.bind(this)}>编辑</Button>
          <Button icon='delete' onClick={this.handleDelete.bind(this)}>删除</Button>
          <Button icon='share-alt' onClick={this.handleTransmit.bind(this)}>转发</Button>
        </div>
        <div className='announcementTitle'>
          <span>{this.state.selectedRow ? this.state.selectedRow.title:null}</span>
        </div>
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
        <ItemList data={ranges} title='范围'/>
        <br />
        <ItemList data={attachments} title='附件'/>
        <br />
        <ItemList data={reads} title='阅读'/>
        <br />
        <ItemList data={replies} title='回复'/>
      </div>
    )
  }
}

export default DetailView;

const ranges = ['北京','上海','广州'];
const attachments = ['附件一','附件二','附件三','附件四','附件五'];
const reads = ['张三阅','李四阅','Tom阅','Tyson阅','习大大阅'];
const replies = ['张三回复','李四回复','Tom回复','Tyson回复','习大大回复'];
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
