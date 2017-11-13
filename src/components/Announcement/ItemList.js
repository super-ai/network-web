import React from 'react';

const Component = React.Component;

class ItemList extends Component{
  state = {
    display:'block',  // 初始状态 block / none
    renderData:[],          // 内容
  }

  componentDidMount(){
    var renderData = {};
    var type = this.props.type;
    if (type=='replays')
      renderData = this.replysRender(this.props.data);

    if (type=='reads')
      renderData = this.readsRender(this.props.data);

    // debugger;
    this.setState({renderData});
  }

  componentWillReceiveProps(nextProps){

    var renderData = {};
    var type = this.props.type;
    if (type=='replays')
      renderData = this.replysRender(nextProps.data);

    if (type=='reads')
      renderData = this.readsRender(nextProps.data);

    // debugger;
    this.setState({renderData});

  }

  handleExpand(e){
    if(e.target.innerHTML.indexOf('+') > -1){  //不能使用-进行判断 因为e.target.innerHTML 在开始时候一直有符号-
      this.setState({display:'block'});
    }else{
      this.setState({display:'none'});
    }
  }

  /**
  * 对于阅读数据进行渲染
  */
  readsRender(bulletinReads){
    console.info('bulletinReads被调用%o',bulletinReads);
    var rlt = [];
    if (!bulletinReads) return rlt;
    rlt = bulletinReads.map((item)=>{
      return item.readTime + ' ' + item.readStaffName;
    });
    return rlt;
  }

  /**
  * 对于回复数据进行渲染
  * 内容、附件创建单独的ul
  */
  replysRender(bulletinReplys){
    var rlt = [];
    if (!bulletinReplys) return rlt;
    rlt = bulletinReplys.map((item)=>{
      return (
        <div>
          <span>{item.replyTime + ' ' + item.replyUserName }</span>
          <ul className='itemListUl2'>
            <li>{item.content}</li>
            <li>附件1</li>
            <li>附件2</li>
          </ul>
        </div>
      );
    });
    return rlt;
  }

  render(){
    return(
      <div>
        <a style={{fontWeight:'bold',cursor:'hand'}} onClick={this.handleExpand.bind(this)}>
          {this.state.display=='block' ? '-':'+'}{this.props.title}
        </a>
        <div style={{display:this.state.display}}>
          <ul className='itemListUl'>
            {this.state.renderData.map((item,index)=>(<li key={index} className='itemListLi'>{item}</li>))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ItemList;
