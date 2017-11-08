import React from 'react';
import {Button,Icon,Table,Input,Radio,Form} from 'antd';
import './index.less';

const Component = React.Component;
const {Search} = Input;
const ColLength = {title:10,content:20};
const FormItem = Form.Item;

class TableList extends Component{

  state = {
    data:[]
  }

  componentDidMount(){
    this.setState(this.props.stateData);
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.stateData);
  }

  handleOnRowClick(record,index,event){
    this.props.setStateData({activeComp:'DetailView',selectedRow:record});
  }

  /**
  * 提交查询
  */
  loadData(){
    var obj = this.props.form.getFieldsValue();
    console.info(obj);
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
          <Table dataSource={this.state.data} columns={columns} onRowClick={this.handleOnRowClick.bind(this)} className='announcement'/>
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
  dataIndex: 'createStaffName',
  key: 'createStaffName',
}, {
  title: '发布时间',
  dataIndex: 'createDateTime',
  key: 'createDateTime',
}];
