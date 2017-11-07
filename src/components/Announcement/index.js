import React from 'react';
import TableList from './TableList';
import DetailView from './DetailView';
import DetailEdit from './DetailEdit'
import Reply from './Reply';
import Transfer from './Transfer';

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
          {this.state.activeComp=='DetailEdit' && <DetailEdit stateData={this.state} setStateData={this.setStateData.bind(this)}/>}
          <Reply stateData={this.state}  setStateData={this.setStateData.bind(this)}/>
          <Transfer stateData={this.state}  setStateData={this.setStateData.bind(this)}/>
        </div>
    )
  }
}

export default Announcement;

const data = [{
  key: '1',
  title:'长江流域发现白鱀豚',
  recordDateTime:'2017-10-10 09:00:00',
  content: '长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚',
  ouIds:[{value:1,label:'铁通公司'},{value:14954,label:'重庆'}],
  isTop:true,
  createStaffName: '张三',
  createDateTime: '2017-10-10 09:00:00',
  attachments:['http://localhost:8080/upload/f8/d5a749e6-628a-49fb-89bd-c95ba3d099ec.jpg','http://localhost:8080/upload/7c/ebd3a403-da86-4f3a-a6fb-1a54692df7f9.svg'],
}, {
  key: '2',
  title:'共产党十九大胜利召开',
  recordDateTime:'2017-11-10 09:00:00',
  content: '共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开',
  ouIds:[{value:1,label:'铁通公司'},{value:14954,label:'重庆'}],
  isTop:true,
  createStaffName: '李四',
  createDateTime: '2016-10-10 09:00:00',
}, {
  key: '3',
  title:'流氓斗殴此起彼伏',
  recordDateTime:'2017-12-10 09:00:00',
  content: '流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏',
  ouIds:[{value:1,label:'铁通公司'},{value:14954,label:'重庆'}],
  isTop:false,
  createStaffName: '王五',
  createDateTime: '2015-10-10 09:00:00',
},{
  key: '4',
  title:'长江流域发现白鱀豚长江流域发现白鱀豚',
  recordDateTime:'2017-10-10 09:00:00',
  content: '长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚',
  ouIds:[{value:1,label:'铁通公司'},{value:14954,label:'重庆'}],
  isTop:false,
  createStaffName: '张三',
  createDateTime: '2017-10-10 09:00:00',
}, {
  key: '5',
  title:'共产党十九大胜利召开',
  recordDateTime:'2017-10-10 09:00:00',
  content: '共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开',
  ouIds:[{value:1,label:'铁通公司'},{value:14954,label:'重庆'}],
  isTop:false,
  createStaffName: '李四',
  createDateTime: '2016-10-10 09:00:00',
}, {
  key: '6',
  title:'流氓斗殴此起彼伏',
  recordDateTime:'2017-10-10 09:00:00',
  content: '流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏',
  ouIds:[{value:1,label:'铁通公司'},{value:14954,label:'重庆'}],
  isTop:false,
  createStaffName: '王五',
  createDateTime: '2015-10-10 09:00:00',
}];
