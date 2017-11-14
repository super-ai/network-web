import React from 'react';
import {Button,Input,Icon,Tree,Modal,message,notification} from 'antd';
import './index.less';
import configData from './configData.js';
import ItemList from './ItemList.js';
import FileUploader from 'components/FileUploader';
import Ou from 'components/Custom/OuTreeSelect';
import ajax from 'utils/ajax';
import globalConfig from 'config.js';
import utils from 'utils';
import moment from 'moment';

const Component = React.Component;
const {TextArea} = Input;
const TreeNode = Tree.TreeNode;

/**
* 单条公告查看
*/
class DetailView extends Component{
  state={
    // 当前行详情和公共变量有雷同处（因为把获取详情放到此组件 所以要单独创建一个状态）
    selectedRowDetail:{}
  }

  componentDidMount(){
    this.loadData();
    this.addKeyBoardListener.bind(this);  // 键盘监控
  }

  componentWillReceiveProps(nextProps){
    // 如果是回复或者转发的返回 需要刷新表格
    if (nextProps.publicState.isRefreshDetailView){
      this.loadData(); // 初始化加载数据
      this.props.setPublicState({isRefreshDetailView:false});
    }
  }

  // ESC 返回
  addKeyBoardListener(){
    document.addEventListener('keyup',function(e){
      switch(e.keyCode){
        case 27:
        this.handleReturn();
        break

        default:
        break
      }
    })
  }

  handleReturn(){
    this.props.setPublicState({activeComp:'TableList'});
  }

  handleReply(){
    this.props.setPublicState({activeComp:'Reply'});
  }

  handleEdit(){
    this.props.setPublicState({activeComp:'DetailEdit',forUpdate:true});
  }

  handleTransmit(){
    this.props.setPublicState({activeComp:'Transfer'});
  }

  /**
  * 刷新当前页面数据
  */
  handleRefresh(){
    this.loadData();
  }

  handleDelete(e){
    e.preventDefault();
    Modal.confirm({
      title: '确认删除',
      content: `当前标题为: ${this.props.publicState.selectedRow.title}`,
      // 这里注意要用箭头函数, 否则this不生效
      onOk: () => {
        this.delete(`${this.props.publicState.selectedRow.id}`);
      },
    });
  }

  /**
  * 获取当前行的详情
  */
  async loadData(){
    try{
      var res = await ajax.get(`${globalConfig.api.host}/api/Bulletin/select/${this.props.publicState.selectedRow.id}`, null);
      if(res.success){
        utils.addServer(res.data,['additions'],globalConfig.api.host); // 附件列表中增加server
        this.setState({selectedRowDetail:res.data});
      }else{
        utils.error(res.failInfo.errorMessage);
      }
    }catch(ex){
      utils.error(`网络请求出错: ${ex.message}`);
    }
  }

  /**
  * 对于阅读数据进行渲染
  */
  readsRender(bulletinReads){
    var rlt = [];
    if (!bulletinReads) return rlt;
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
    if (!bulletinReplys) return rlt;
    rlt = bulletinReplys.map((item)=>{
      return (
        <div>
          <span style={{fontWeight:'bold',marginTop:'20px'}}>{item.replyTime + ' ' + item.replyUserName }</span>
          <ul className='itemListUl2'>
            <li><span>{item.content}</span></li>
            {this.renderReplyAdditions(item.additions)}
          </ul>
        </div>
      );
    });
    return rlt;
  }

  renderReplyAdditions(additions){
    if(!additions||additions.length==0) return null;

    return (
      additions.map((item)=>(
        <li><a href={`${globalConfig.api.host}${item}`} download={`${item}`} style={{color:'#000000'}}>{item}</a></li>
      ))
    );
  }

  /**
  * 对附件数据进行渲染
  */
  additionsRender(bulletinAdditions){
    var rlt = [];
    if (!bulletinAdditions) return rlt;
    rlt = bulletinAdditions.map((item)=>{
      return <a href={`${item}`} download={`${item}`} style={{color:'#000000'}}>{item}</a>;
    });
    return rlt;
  }

  /**
  * 删除某条记录
  */
  async delete(id){
    // 后台提交
    try{
      var res = await ajax.post(`${globalConfig.api.host}/api/Bulletin/delete/${this.props.publicState.selectedRow.id}`, null);
      if(res.success){
        notification.success({
          message: '删除成功',
          description: `被删除数据行 主键=${this.props.publicState.selectedRow.id}`,
          duration: 3,
        });

        // 删除成功后 返回TableList界面
        this.props.setPublicState({activeComp:'TableList',isRefreshTableList:true}); // 跳转同事刷新TableList
      }else{
        this.error(res.failInfo.errorMessage);
      }
    }catch(ex){
      this.error(`网络请求出错: ${ex.message}`);
    }
  }

  /**
  * 是否禁用操作 true 禁用
  */
  isAchieve(){
    return moment(this.state.selectedRowDetail.archivedTime).diff(moment(), 'seconds') < 0 ;
  }

  render(){
    return(
      <div className='announcement'>
        <div>
          <Button type='primary' icon='left-circle-o' onClick={this.handleReturn.bind(this)}>返回</Button>
          <Button icon='plus' onClick={this.handleReply.bind(this)} disabled={this.isAchieve.bind(this)()}>回复</Button>
          <Button icon='edit' onClick={this.handleEdit.bind(this)} disabled={this.isAchieve.bind(this)()}>编辑</Button>
          <Button icon='delete' onClick={this.handleDelete.bind(this)} disabled={this.isAchieve.bind(this)()}>删除</Button>
          <Button icon='share-alt' onClick={this.handleTransmit.bind(this)} disabled={this.isAchieve.bind(this)()}>转发</Button>
          <Button icon='reload' onClick={this.handleRefresh.bind(this)}>刷新</Button>
        </div>
        <div className='announcementTitle'>
          <span>{this.state.selectedRowDetail ? this.state.selectedRowDetail.title:null}</span>
        </div>
        <div className='announcementCreate'>
          <span>{this.state.selectedRowDetail ? this.state.selectedRowDetail.createUserName:null}</span>
          &nbsp;&nbsp;
          <span>{this.state.selectedRowDetail ? this.state.selectedRowDetail.createTime:null}</span>
        </div>
        <hr className='hr'/>
        <TextArea value={this.state.selectedRowDetail ? this.state.selectedRowDetail.content:null} className='announcementContent' disabled autosize/>
        <hr />
        <Ou multiple allowClear labelInValue value={this.state.selectedRowDetail.ous} style={{width:'100%',marginTop:'10px',marginBottom:'10px'}} disabled={true}/>
        <hr />
        <ItemList data={this.additionsRender(this.state.selectedRowDetail.additions)} title='附件'/>
        <hr />
        <ItemList data={this.replysRender(this.state.selectedRowDetail.bulletinReplys)} title='回复'/>
        <hr />
        <ItemList data={this.readsRender(this.state.selectedRowDetail.bulletinReads)} title='阅读'/>
      </div>
    )
  }
}

export default DetailView;

const ranges = ['北京','上海','广州'];
const additions = ['附件一','附件二','附件三','附件四','附件五'];
const replies = ['张三回复','李四回复','Tom回复','Tyson回复','习大大回复'];

// <FileUploader max='5' sizeLimit='500' placeholder='上传文件'
//   value={this.state.selectedRowDetail.additions} disabled={true}/>
