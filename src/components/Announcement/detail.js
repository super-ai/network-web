import React from 'react';
import {Button} from 'antd';

const Component = React.Component;

/**
* 单条公告查看和编辑
*/
class Detail extends Component{

  handleReturn(){
    this.props.changeActiveComp('TableList');
  }

  handleReply(){
    this.props.changeActiveComp('Reply');
  }

  render(){
    return(
        <div>
          <span>详细信息</span>
          <br />
          <Button onClick={this.handleReturn.bind(this)}>返回</Button>
          <Button onClick={this.handleReply.bind(this)}>查看回复</Button>
        </div>
    )
  }
}

export default Detail;
