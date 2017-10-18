import React from 'react';
import {Button} from 'antd';

const Component = React.Component;

class Detail extends Component{

  handleOnClick(){
    this.props.changeActiveComp('TableList');
  }

  render(){
    return(
        <div>
          <span>详细信息</span>
          <br />
          <Button onClick={this.handleOnClick.bind(this)}>返回</Button>
        </div>
    )
  }
}

export default Detail;
