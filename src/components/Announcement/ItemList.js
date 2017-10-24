import React from 'react';

const Component = React.Component;

class ItemList extends Component{
  state = {
    dispaly:'none',
    visibility:'hidden',
    data:[]
  }

  componentDidMount(){
    this.setState({data:this.props.data});
  }

  // ul 展开折叠
  handleExpand(e){
    if(e.target.innerHTML=='-'){
      e.target.innerHTML='+';
      this.setState({dispaly:'none',visibility:'hidden'});
    }else{
      e.target.innerHTML='-';
      this.setState({dispaly:'block',visibility:'visible'});
    }
  }

  render(){
    return(
      <div>
        <a onClick={this.handleExpand.bind(this)}>+</a>
        <a style={{fontWeight:'bold'}}>{this.props.title}</a>
        <div style={{dispaly:this.state.display,visibility:this.state.visibility}}>
          <ul>
            {this.state.data.map((item,index)=>(<li>{item}</li>))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ItemList;
