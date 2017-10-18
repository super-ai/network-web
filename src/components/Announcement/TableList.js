import React from 'react';
import {Button} from 'antd';

const Component = React.Component;

class TableList extends Component{

  handleOnClick(event){
    this.props.changeActiveComp('Detail');
  }

  componentDidMount(){

  }

  render(){
    return(
        <div>
          <span>列表信息</span>
          <br />
          <Button onClick={this.handleOnClick.bind(this)}>查看详细</Button>
        </div>
    )
  }
}

export default TableList;
