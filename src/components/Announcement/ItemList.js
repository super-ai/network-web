import React from 'react';

const Component = React.Component;

class ItemList extends Component{
  state = {
    display:'none',
    data:[],
    // visibility:'hidden',
  }

  componentDidMount(){
    this.setState({data:this.props.data});
  }

  // ul 展开折叠
  handleExpand(e){
    if(e.target.innerHTML=='-'){
      e.target.innerHTML='+';
      this.setState({display:'none'});
    }else{
      e.target.innerHTML='-';
      this.setState({display:'block'});
    }
  }

  render(){
    return(
      <div>
        <a onClick={this.handleExpand.bind(this)}>+</a>
        <a style={{fontWeight:'bold'}}>{this.props.title}</a>
        <div style={{display:this.state.display}}>
          <ul className='itemListUl'>
            {this.state.data.map((item,index)=>(<li key={index} className='itemListLi'>{item}</li>))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ItemList;
