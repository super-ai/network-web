import React from 'react';

const Component = React.Component;

class ItemList extends Component{
  state = {dispaly:'block',visibility:'visible'}

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
        <a onClick={this.handleExpand.bind(this)}>-</a>
        <div style={{dispaly:this.state.display,visibility:this.state.visibility}}>
          <ul>
            <li>附件一</li>
            <li>附件二</li>
            <li>附件三</li>
            <li>附件四</li>
            <li>附件五</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ItemList;
