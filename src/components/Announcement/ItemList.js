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
    debugger;
    if(e.target.innerHTML.indexOf('+') > -1){
      e.target.innerHTML = `-${this.props.title}`;
      this.setState({display:'block'});
    }else{
      e.target.innerHTML = `+${this.props.title}`;
      this.setState({display:'none'});
    }
  }

  render(){
    return(
      <div>
        <a style={{fontWeight:'bold',cursor:'hand'}} onClick={this.handleExpand.bind(this)}>+{this.props.title}</a>
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
