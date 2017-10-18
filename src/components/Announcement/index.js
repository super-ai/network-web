import React from 'react';
import TableList from './TableList'
import Detail from './Detail'

const Component = React.Component;

class Announcement extends Component{
  state = {
    activeComp:'TableList',
  }

  changeActiveComp(activeComp){
    this.setState({activeComp});
  }

  render(){
    return(
        <div>
          {this.state.activeComp=='TableList' && <TableList changeActiveComp={this.changeActiveComp.bind(this)}/>}
          {this.state.activeComp == 'Detail' && <Detail changeActiveComp={this.changeActiveComp.bind(this)}/>}
        </div>
    )
  }
}

export default Announcement;
