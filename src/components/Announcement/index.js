import React from 'react';
import TableList from './TableList'
import Detail from './Detail'
import Reply from './Reply'

const Component = React.Component;

class Announcement extends Component{
  state = {
    activeComp:'TableList',
    data:[],
    selectedRowIndex:-1,
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
    return(
        <div>
          {this.state.activeComp=='TableList' &&
          <TableList changeActiveComp={this.changeActiveComp.bind(this)}
          stateData={this.state} setStateData={this.setStateData.bind(this)}/>}

          {this.state.activeComp == 'Detail' &&
          <Detail changeActiveComp={this.changeActiveComp.bind(this)}
          />}

          {this.state.activeComp == 'Reply' &&
          <Reply changeActiveComp={this.changeActiveComp.bind(this)}
          stateData={this.state}  setStateData={this.setStateData.bind(this)}/>}
        </div>
    )
  }
}

export default Announcement;
