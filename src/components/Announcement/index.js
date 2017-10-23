import React from 'react';
import TableList from './TableList'
import Detail from './Detail'
import Reply from './Reply'

const Component = React.Component;

class Announcement extends Component{
  state = {
    activeComp:'TableList',
    data:data,
    selectedRow:{},
  }

  changeActiveComp(activeComp){
    this.setState({activeComp});
  }

  /**
  * 回写状态数据
  */
  setStateData(state){
    this.setState(state);
  }

  render(){
    console.warn('全局state为：%o',this.state);
    return(
        <div>
          <TableList changeActiveComp={this.changeActiveComp.bind(this)}
          stateData={this.state} setStateData={this.setStateData.bind(this)}
          />

          <Detail changeActiveComp={this.changeActiveComp.bind(this)}
          stateData={this.state} setStateData={this.setStateData.bind(this)}
          />

          <Reply changeActiveComp={this.changeActiveComp.bind(this)}
          stateData={this.state}  setStateData={this.setStateData.bind(this)}
          />
        </div>
    )
  }
}

export default Announcement;


const data = [{
  key: '1',
  title:'标题1',
  content: '长江流域发现白鱀豚',
  createStaffName: '张三',
  createDateTime: '2017-10-10 09:00:00',
}, {
  key: '2',
  title:'标题2',
  content: '共产党十九大胜利召开',
  createStaffName: '李四',
  createDateTime: '2016-10-10 09:00:00',
}, {
  key: '3',
  title:'标题3',
  content: '流氓斗殴此起彼伏',
  createStaffName: '王五',
  createDateTime: '2015-10-10 09:00:00',
},{
  key: '4',
  title:'标题4',
  content: '长江流域发现白鱀豚',
  createStaffName: '张三',
  createDateTime: '2017-10-10 09:00:00',
}, {
  key: '5',
  title:'标题5',
  content: '共产党十九大胜利召开',
  createStaffName: '李四',
  createDateTime: '2016-10-10 09:00:00',
}, {
  key: '6',
  title:'标题6',
  content: '流氓斗殴此起彼伏',
  createStaffName: '王五',
  createDateTime: '2015-10-10 09:00:00',
}];
