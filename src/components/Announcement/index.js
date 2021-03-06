import React from 'react';
import TableList from './TableList';
import DetailView from './DetailView';
import DetailEdit from './DetailEdit'
import Reply from './Reply';
import Transfer from './Transfer';

const Component = React.Component;

class Announcement extends Component{
  state = {
    // 以下存放的为公共状态publicState
    activeComp:'TableList',
    data:[],                    // TableList 表格数据
    selectedRow:{},             // 当前选择行 
    isRefreshTableList:false,   // 是否刷新TableList
    isRefreshDetailView:false,  // 是否刷新DetailView
  }

  /**
  * 回写状态数据
  */
  setPublicState(state){
    this.setState(state);
  }

  render(){
    return(
      <div>
        <TableList publicState={this.state} setPublicState={this.setPublicState.bind(this)}/>
        {this.state.activeComp=='DetailView' && <DetailView publicState={this.state} setPublicState={this.setPublicState.bind(this)}/>}
        {this.state.activeComp=='DetailEdit' && <DetailEdit publicState={this.state} setPublicState={this.setPublicState.bind(this)}/>}
        {this.state.activeComp=='Reply' && <Reply publicState={this.state} setPublicState={this.setPublicState.bind(this)}/>}
        {this.state.activeComp=='Transfer' && <Transfer publicState={this.state} setPublicState={this.setPublicState.bind(this)}/>}
      </div>
    )
  }
}

export default Announcement;

// <div style={{display:this.state.activeComp=='Transfer' ? 'inline':'none' }}>

const data = [{
  key: '1',
  title:'长江流域发现白鱀豚',
  archivedTime:'2017-10-10 09:00:00',
  content: '长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚',
  ouIds:[{value:1,label:'铁通公司'},{value:14954,label:'重庆'}],
  isTop:true,
  createUserName: '张三',
  createDateTime: '2017-10-10 09:00:00',
  additions:['http://localhost:8080/upload/f8/d5a749e6-628a-49fb-89bd-c95ba3d099ec.jpg','http://localhost:8080/upload/7c/ebd3a403-da86-4f3a-a6fb-1a54692df7f9.svg'],
}, {
  key: '2',
  title:'共产党十九大胜利召开',
  archivedTime:'2017-11-10 09:00:00',
  content: '共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开',
  ouIds:[{value:1,label:'铁通公司'},{value:14954,label:'重庆'}],
  isTop:true,
  createStaffName: '李四',
  createDateTime: '2016-10-10 09:00:00',
}, {
  key: '3',
  title:'流氓斗殴此起彼伏',
  archivedTime:'2017-12-10 09:00:00',
  content: '流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏',
  ouIds:[{value:1,label:'铁通公司'},{value:14954,label:'重庆'}],
  isTop:false,
  createUserName: '王五',
  createTime: '2015-10-10 09:00:00',
},{
  key: '4',
  title:'长江流域发现白鱀豚长江流域发现白鱀豚',
  archivedTime:'2017-10-10 09:00:00',
  content: '长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚长江流域发现白鱀豚',
  ouIds:[{value:1,label:'铁通公司'},{value:14954,label:'重庆'}],
  isTop:false,
  createUserName: '张三',
  createTime: '2017-10-10 09:00:00',
}, {
  key: '5',
  title:'共产党十九大胜利召开',
  archivedTime:'2017-10-10 09:00:00',
  content: '共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开共产党十九大胜利召开',
  ouIds:[{value:1,label:'铁通公司'},{value:14954,label:'重庆'}],
  isTop:false,
  createUserName: '李四',
  createTime: '2016-10-10 09:00:00',
}, {
  key: '6',
  title:'流氓斗殴此起彼伏',
  archivedTime:'2017-10-10 09:00:00',
  content: '流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏流氓斗殴此起彼伏',
  ouIds:[{value:1,label:'铁通公司'},{value:14954,label:'重庆'}],
  isTop:false,
  createUserName: '王五',
  createTime: '2015-10-10 09:00:00',
}];
