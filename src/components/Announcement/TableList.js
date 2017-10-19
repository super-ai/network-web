import React from 'react';
import {Button,Table} from 'antd';

const Component = React.Component;

class TableList extends Component{

  state = {
    data:[]
  }

  componentDidMount(){
    console.info('###TableList完成加载：componentDidMount');
    this.setState(this.props.stateData);
  }

  handleOnRowClick(record,index,event){
    this.props.changeActiveComp('Detail');
    // 修改selectedRowIndex
    this.props.setStateData({selectedRow:record});
  }

  render(){
    return(
        <div>
          <Button>新建</Button>
          <Button>检索</Button>
          <br />
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
