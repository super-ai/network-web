import React from 'react';
import {Button,Input,Icon,Tree,Modal,message} from 'antd';
import './index.less';
import configData from './configData.js';
import ItemList from './ItemList.js';
import FileUploader from 'components/FileUploader';
import Ou from 'components/Custom/OuTreeSelect';

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

  /**
  * 对于阅读数据进行渲染
  */
  readsRender(bulletinReads){
    var rlt = [];
    rlt = bulletinReads.map((item)=>{
      return item.readTime + ' ' + item.readStaffName;
    });
    return rlt;
  }

  /**
  * 对于回复数据进行渲染
  * 内容、附件创建单独的ul
  */
  replysRender(bulletinReplys){
    var rlt = [];
    rlt = bulletinReplys.map((item)=>{
      return (
        <div>
          <span>{item.replyTime + ' ' + item.replyUserName }</span>
          <ul className='itemListUl2'>
            <li>{item.content}</li>
            <li>附件1</li>
            <li>附件2</li>
          </ul>
        </div>
      );
    });
    return rlt;
  }

  render(){
    console.warn('DetailView重写Render');

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
        <p className='announcementContent'>{this.props.publicState.selectedRow ? this.props.publicState.selectedRow.content:null}</p>
        <hr />
        <a className='viewLabel'>范围</a><br />
        <Ou multiple allowClear labelInValue value={this.props.publicState.selectedRow.ous} style={{width:'100%',marginTop:'10px'}} disabled={true}/>
        <hr />
        <a className='viewLabel'>附件</a><br />
        <FileUploader max='5' sizeLimit='500' placeholder='上传文件' defaultValue={this.props.publicState.selectedRow.additions} disabled={true}/>
        <hr />
        <ItemList data={this.replysRender(this.props.publicState.selectedRow.bulletinReplys)} title='回复'/>
        <hr />
        <ItemList data={this.readsRender(this.props.publicState.selectedRow.bulletinReads)} title='阅读'/>
      </div>
    )
  }
}

export default DetailView;

const ranges = ['北京','上海','广州'];
const additions = ['附件一','附件二','附件三','附件四','附件五'];
const replies = ['张三回复','李四回复','Tom回复','Tyson回复','习大大回复'];
