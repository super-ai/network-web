import React from 'react';
import TableList from './TableList';
import DetailView from './DetailView';
import DetailEdit from './DetailEdit'
import Reply from './Reply';

const Component = React.Component;

class Announcement extends Component{
  state = {
    activeComp:'TableList',
    data:data,
    selectedRow:{},
  }

  /**
  * 回写状态数据
  */
  setStateData(state){
    this.setState(state);
  }

  render(){
    return(
        <div>
          <TableList stateData={this.state} setStateData={this.setStateData.bind(this)}/>
          <DetailView stateData={this.state} setStateData={this.setStateData.bind(this)}/>
          <DetailEdit stateData={this.state} setStateData={this.setStateData.bind(this)}/>
          <Reply stateData={this.state}  setStateData={this.setStateData.bind(this)}/>
        </div>
    )
  }
}

export default Announcement;


const data = [{
  key: '1',
  title:'长江流域发现白鱀豚',
  content: '长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚',
  range:['leaf1','leaf2','leaf3'],
  createStaffName: '张三',
  createDateTime: '2017-10-10 09:00:00',
}, {
  key: '2',
  title:'共产党十九大胜利召开',
  content: '共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开',
  range:['leaf1','leaf2','leaf3','leaf4'],
  createStaffName: '李四',
  createDateTime: '2016-10-10 09:00:00',
}, {
  key: '3',
  title:'流氓斗殴此起彼伏',
  content: '流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏',
  range:['leaf11','leaf22','leaf33'],
  createStaffName: '王五',
  createDateTime: '2015-10-10 09:00:00',
},{
  key: '4',
  title:'长江流域发现白鱀豚长江流域发现白鱀豚',
  content: '长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚',
  range:['leaf1','leaf2','leaf5'],
  createStaffName: '张三',
  createDateTime: '2017-10-10 09:00:00',
}, {
  key: '5',
  title:'共产党十九大胜利召开',
  content: '共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开',
  range:['leaf1','leaf2','leaf3'],
  createStaffName: '李四',
  createDateTime: '2016-10-10 09:00:00',
}, {
  key: '6',
  title:'流氓斗殴此起彼伏',
  content: '流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏',
  range:['leaf1','leaf2','leaf3'],
  createStaffName: '王五',
  createDateTime: '2015-10-10 09:00:00',
}];
