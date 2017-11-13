import React from 'react';

const Component = React.Component;

class ItemList extends Component{
  state = {
    display:'block',  // 初始状态 block / none
    data:[],          // 内容
  }

  componentDidMount(){
    this.setState(this.props.data);
  }

  // 主要使用nextProps.data 而不是this.props.data
  componentWillReceiveProps(nextProps){
    debugger;
    this.setState({data:nextProps.data});
  }

  handleExpand(e){
    if(e.target.innerHTML.indexOf('+') > -1){  //不能使用-进行判断 因为e.target.innerHTML 在开始时候一直有符号-
      this.setState({display:'block'});
    }else{
      this.setState({display:'none'});
    }
  }

  render(){
    return(
      <div>
        <a style={{fontWeight:'bold',cursor:'hand'}} onClick={this.handleExpand.bind(this)}>
          {this.state.display=='block' ? '-':'+'}{this.props.title}
        </a>
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
