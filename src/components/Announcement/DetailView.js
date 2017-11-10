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

  handleReturn(){
    this.props.setPublicState({activeComp:'TableList'});
  }

  handleReply(){
    this.props.setPublicState({activeComp:'Reply'});
  }

  handleEdit(){
    this.props.setPublicState({activeComp:'DetailEdit',forUpdate:true});
  }

  handleDelete(e){
    e.preventDefault();
    Modal.confirm({
      title: '确认删除',
      content: `当前被选中标题为: ${this.props.publicState.selectedRow.title}`,
      // 这里注意要用箭头函数, 否则this不生效
      onOk: () => {
        this.delete(`${this.props.publicState.selectedRow.id}`);
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
    this.props.setPublicState({activeComp:'Transfer'});
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
    console.warn('DetailView重写Render');
    const replysTree =
      <Tree className='announcementTree'>
        {this.renderTreeNodes(configData.replysTreeData)}
      </Tree>;
    const readsTree =
      <Tree className='announcementTree'>
        {this.renderTreeNodes(configData.readsTreeData)}
      </Tree>;

    return(
      <div className='announcement'>
        <div>
          <Button type='primary' icon='left-circle-o' onClick={this.handleReturn.bind(this)}>返回</Button>
          <Button icon='plus' onClick={this.handleReply.bind(this)}>回复</Button>
          <Button icon='edit' onClick={this.handleEdit.bind(this)}>编辑</Button>
          <Button icon='delete' onClick={this.handleDelete.bind(this)}>删除</Button>
          <Button icon='share-alt' onClick={this.handleTransmit.bind(this)}>转发</Button>
        </div>
        <div className='announcementTitle'>
          <span>{this.props.publicState.selectedRow ? this.props.publicState.selectedRow.title:null}</span>
        </div>
        <div className='announcementCreate'>
          <span>{this.props.publicState.selectedRow ? this.props.publicState.selectedRow.createUserName:null}</span>
          &nbsp;&nbsp;
          <span>{this.props.publicState.selectedRow ? this.props.publicState.selectedRow.createTime:null}</span>
        </div>
        <hr className='hr'/>
        <br />
        <p className='announcementContent'>{this.props.publicState.selectedRow ? this.props.publicState.selectedRow.content:null}</p>
        <br />
        <hr />
        <br /><br />
        <ItemList data={ranges} title='范围'/>
        <br />
        <ItemList data={additions} title='附件'/>
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
const additions = ['附件一','附件二','附件三','附件四','附件五'];
const reads = ['张三阅','李四阅','Tom阅','Tyson阅','习大大阅'];
const replies = ['张三回复','李四回复','Tom回复','Tyson回复','习大大回复'];
