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
    // debugger;
    // pagination = pagination|| this.state.pagination;
    var obj = this.props.form.getFieldsValue();
    obj.page = pagination.current;
    obj.pageSize = pagination.pageSize;

    console.info('查询请求参数为:%o',obj);
    console.info('state分页参数为:%o',this.state.pagination);

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

  // 查询数据
  handleSelect(){
    this.loadData(this.state.pagination);
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
                (<Input placeholder='关键搜索字...' className='search'/>)}
            </FormItem>
            <FormItem>
                <Button onClick={this.handleSelect.bind(this)}>查询</Button>
            </FormItem>
            <FormItem>
              {getFieldDecorator('isArchived',{initialValue:false})
              (<Radio.Group defaultValue={false}>
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
