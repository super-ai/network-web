import React from 'react';
import {Button,Icon,Table,Input,Radio} from 'antd';
import './index.less';

const Component = React.Component;
const {Search} = Input;

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
    // this.props.changeActiveComp('Detail');
    // 修改selectedRowIndex
    this.props.setStateData({activeComp:'Detail',selectedRow:record});
  }

  // 范围筛选
  handleRangeChange(){

  }

  render(){
    console.error('TableList触发render');
    return(
        <div style={{display:this.state.activeComp=='TableList' ? 'inline':'none' }}>
          <div className='toolbar'>
            <Button icon='plus-circle-o' type='primary'>新增</Button>
            <Search size='large' placeholder='关键搜索子...' className='search' onSearch={(value)=>{console.info(value)}}/>
            <Radio.Group value='now' onChange={this.handleRangeChange.bind(this)} className='filter'>
              <Radio.Button value="now">当前</Radio.Button>
              <Radio.Button value="history">归档</Radio.Button>
              <Radio.Button value="all">全部</Radio.Button>
            </Radio.Group>
          </div>
          <Table dataSource={this.state.data} columns={columns} onRowClick={this.handleOnRowClick.bind(this)}/>
        </div>
    )
  }
}

export default TableList;

const columns = [{
  title: '标题',
  dataIndex: 'title',
  key: 'title',
},{
  title: '内容',
  dataIndex: 'content',
  key: 'content',
}, {
  title: '发布人',
  dataIndex: 'createStaffName',
  key: 'createStaffName',
}, {
  title: '发布时间',
  dataIndex: 'createDateTime',
  key: 'createDateTime',
}];
