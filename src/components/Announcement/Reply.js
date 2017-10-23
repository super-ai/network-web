import React from 'react';
import {Button} from 'antd';

const Component = React.Component;

/**
* 查看回复
*/
class Reply extends Component{

  state={}

  componentDidMount(){
    this.setState(this.props.stateData);
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.stateData);
  }

  handleReturn(){
    this.props.changeActiveComp('Detail');
  }

  render(){
    return(
        <div style={{display:this.state.activeComp=='Reply' ? 'inline':'none' }}>
          <span>回复信息</span>
          <br />
          <Button onClick={this.handleReturn.bind(this)}>返回</Button>
        </div>
    )
  }
}

export default Reply;
