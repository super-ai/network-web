import React from 'react';
import {Button,Table} from 'antd';

const Component = React.Component;

class TableList extends Component{

  handleOnRowClick(event){
    this.props.changeActiveComp('Detail');
  }

  render(){
    return(
        <div>
          <Button>新建</Button>
          <Button>检索</Button>
          <br />
          <Table dataSource={data} columns={columns} onRowClick={this.handleOnRowClick.bind(this)}/>
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

const data = [{
  key: '1',
  title:'标题1',
  content: '长江流域发现白鱀豚',
  createStaffName: '张三',
  createDateTime: '2017-10-10 09:00:00',
}, {
  key: '2',
  title:'标题1',
  content: '共产党十九大胜利召开',
  createStaffName: '李四',
  createDateTime: '2016-10-10 09:00:00',
}, {
  key: '3',
  title:'标题1',
  content: '流氓斗殴此起彼伏',
  createStaffName: '王五',
  createDateTime: '2015-10-10 09:00:00',
},{
  key: '4',
  title:'标题1',
  content: '长江流域发现白鱀豚',
  createStaffName: '张三',
  createDateTime: '2017-10-10 09:00:00',
}, {
  key: '5',
  title:'标题1',
  content: '共产党十九大胜利召开',
  createStaffName: '李四',
  createDateTime: '2016-10-10 09:00:00',
}, {
  key: '6',
  title:'标题1',
  content: '流氓斗殴此起彼伏',
  createStaffName: '王五',
  createDateTime: '2015-10-10 09:00:00',
}];
