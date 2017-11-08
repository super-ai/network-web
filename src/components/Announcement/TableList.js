import React from 'react';
import {Button,Icon,Table,Input,Radio,Form,notification} from 'antd';
import './index.less';
import ajax from 'utils/ajax';
import globalConfig from 'config.js';

const Component = React.Component;
const {Search} = Input;
const ColLength = {title:10,content:20};
const FormItem = Form.Item;

class TableList extends Component{
  state = {
    data:[],
    pagination:{
      current:1,
      pageSize:10,
      total:0,
      showSizeChanger:true,
      }
  }

  componentDidMount(){
    this.setState(this.props.stateData);
    this.loadData(this.state.pagination);
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.stateData);
  }

  handleOnRowClick(record,index,event){
    this.props.setStateData({activeComp:'DetailView',selectedRow:record});
  }

  handlePageChange(pagination){
    this.setState({pagination});
    this.loadData(pagination);
    console.info('触发分页:%o',pagination);
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
  * 提交查询
  */
  async loadData(pagination){
    var obj = this.props.form.getFieldsValue();
    // obj.page = this.state.pagination.current;
    // obj.pageSize = this.state.pagination.pageSize;
    obj.page = pagination.current;
    obj.pageSize = pagination.pageSize;
    // debugger;

    try{
      const res = await ajax.get(`${globalConfig.api.host}/api/Bulletin/list`, obj);

      if(res.success){
        if(!res.data) return;
        this.setState({data:res.data,pagination:{...this.state.pagination,total:res.total}});
      }else{
        this.error(res.failInfo);
      }
    }catch(ex){
      this.error(`网络请求出错: ${ex.message}`);
    }
  }

  // 范围筛选
  handleRangeChange(){

  }

  handleInsert(){
    this.props.setStateData({activeComp:'DetailEdit',selectedRow:null,forUpdate:false});
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
              {getFieldDecorator('searchKey',{initialValue:null})
                (<Search placeholder='关键搜索字...' className='search' onSearch={this.loadData.bind(this)}/>)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('isArchived',{initialValue:false})
              (<Radio.Group defaultValue={false} onChange={this.handleRangeChange.bind(this)}>
                <Radio.Button value={false}>当前</Radio.Button>
                <Radio.Button value={true}>归档</Radio.Button>
              </Radio.Group>)}
            </FormItem>
          </Form>
          </div>
          <Table dataSource={this.state.data}
          columns={columns} pagination={this.state.pagination}  className='announcement'
          onChange={this.handlePageChange.bind(this)} onRowClick={this.handleOnRowClick.bind(this)}/>
        </div>
    )
  }
}


const TableListForm = Form.create()(TableList);
export default TableListForm;


const columns = [{
  title: '标题',
  dataIndex: 'title',
  key: 'title',
  render:(text,record,index)=>{
    if (text.length <= ColLength.title) {
      return text;
    }else {
      return text.substring(0,ColLength.title-1)+'...';
    }
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
}, {
  title: '发布时间',
  dataIndex: 'createTime',
  key: 'createTime',
}];
