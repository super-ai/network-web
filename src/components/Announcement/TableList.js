import React from 'react';
import {Button,Icon,Table,Input,Radio,Form,notification,Tooltip} from 'antd';
import './index.less';
import ajax from 'utils/ajax';
import globalConfig from 'config.js';
import utils from 'utils';
import img from 'image/isTop.svg';

const Component = React.Component;
const {Search} = Input;
const ColLength = {title:10,content:25};
const FormItem = Form.Item;

class TableList extends Component{
  state = {
    // 私有状态
    pagination:{
      current:1,
      pageSize:20,
      total:0,
      showSizeChanger:true,
      showTotal:total=>`共${total}条`,
      }
  }

  componentDidMount(){
    this.setState(this.props.publicState);
    this.loadData(this.state.pagination); // 初始化加载数据
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.publicState);
    // 如果是编辑或者新增的返回 需要刷新表格
    if (nextProps.publicState.isRefreshTableList){
      console.error('TableList刷新数据');
      this.loadData(this.state.pagination); // 初始化加载数据
      this.props.setPublicState({isRefreshTableList:false});
    }
  }

  /**
  * 获取单条公告详细数据
  */
  async handleOnRowClick(record,index,event){
    this.props.setPublicState({activeComp:'DetailView',selectedRow:record});
  }

  handlePageChange(pagination){
    this.props.setPublicState({pagination});
    this.loadData(pagination);
  }

  error(errorMsg) {
    // 对于错误信息, 要很明显的提示用户, 这个通知框要用户手动关闭
    notification.error({
      message: '出错!',
      description: `请联系管理员, 错误信息: ${errorMsg}`,
      duration: 0,
    });
  }

  /**
  * 提交查询（固定函数名 提供给各种handler调用）
  */
  async loadData(pagination){
    var params = {};
    params.searchKey = this.refs.searchKey.input.input.value;
    params.isArchived = this.refs.isArchived.state.value;
    params.page = pagination.current;
    params.pageSize = pagination.pageSize;

    console.info('查询请求参数为:%o',params);
    console.info('state分页参数为:%o',this.state.pagination);

    try{
      const res = await ajax.get(`${globalConfig.api.host}/api/Bulletin/list`, params);

      if(res.success){
        if(!res.data) return;
        this.props.setPublicState({data:res.data,pagination:{...this.state.pagination,total:res.total}});
      }else{
        this.error(res.failInfo);
      }
    }catch(ex){
      this.error(`网络请求出错: ${ex.message}`);
    }
  }

  // 查询数据
  handleSelect(){
    this.loadData(this.state.pagination);
  }

  handleInsert(){
    this.props.setPublicState({activeComp:'DetailEdit',selectedRow:null,forUpdate:false});
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    return(
        <div style={{display:this.state.activeComp=='TableList' ? 'inline':'none' }}>
          <div className='toolbar'>
          <Form layout="inline">
            <FormItem>
              <Button icon='plus-circle-o' type='primary' onClick={this.handleInsert.bind(this)}>新增</Button>
            </FormItem>
            <FormItem>
                <Search placeholder='关键搜索字...' className='search' ref='searchKey' onSearch={this.handleSelect.bind(this)}/>
                <Button onClick={this.handleSelect.bind(this)}>查询</Button>
            </FormItem>
            <FormItem>
              <Radio.Group defaultValue={false} ref='isArchived'>
                <Radio.Button value={false}>当前</Radio.Button>
                <Radio.Button value={true}>归档</Radio.Button>
              </Radio.Group>
            </FormItem>
          </Form>
          </div>
          <Table dataSource={this.props.publicState.data}
          columns={columns} pagination={this.state.pagination}  className='announcement' size='small'
          onChange={this.handlePageChange.bind(this)} onRowClick={this.handleOnRowClick.bind(this)}/>
        </div>
    )
  }
}

const TableListForm = Form.create()(TableList);
export default TableListForm;


const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
},{
  title: '标题',
  dataIndex: 'title',
  key: 'title',
  render:(text,record,index)=>{
    // 长度截取
    var rlt;
    if (text.length <= ColLength.title) {
      rlt = text;
    }else {
      rlt = text.substring(0,ColLength.title-1)+'...';
    }

    // 增加置顶图片
    // 系统颜色'#1878FF'
    if(record && record.isTop){
      rlt =
        <div>
          <Tooltip title='置顶'><a style={{color:'#1878FF',fontWeight:'bold'}}>[顶]</a></Tooltip>
          <span>{rlt}</span>
        </div>;
    }else{
      rlt =
        <div>
          <span>{rlt}</span>
        </div>;
    }

    return rlt;
  }
},{
  title: '内容',
  dataIndex: 'content',
  key: 'content',
  render:(text,record,index)=>{
    if (text.length <= ColLength.content) {
      return text;
    }else {
      return text.substring(0,ColLength.content-1)+'...';
    }
  }
}, {
  title: '发布人',
  dataIndex: 'createUserName',
  key: 'createUserName',
},{
  title: '发布时间',
  dataIndex: 'createTime',
  key: 'createTime',
},{
  title: '附件',
  dataIndex: 'additions',
  key: 'additions',
  render:(text,record,index)=> record.additions ? record.additions.length:'',
},];

// <div style={{display:this.state.activeComp=='TableList' ? 'inline':'none' }}>
