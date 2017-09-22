/**
* 自定义OuTreeSelect(机构树)
* 扩展的属性 level、setLastMonth、setToday
* 每次异步加载 都会更新其children
*/
import React from 'react';
import { TreeSelect } from 'antd';
import { Promise } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import globalConfig from 'config.js';

class OuTreeSelect extends React.Component{
  constructor(props){
    super(props);
    this.state={
      treeData:[],              //tree加载的数据
      value: undefined
    }
    this.onLoadData = this.onLoadData.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount(){
    //此时竟然没有this.props.value值
    this.onLoadData(undefined);
  }

  componentWillReceiveProps(nextProps){
    //清空
    var {value} = nextProps;
    this.state.value = value;
  }

  /**
  * 关键方法!!!
  * 在treeData指定key位置 生成新的treeData(数组)
  */
  genTreeData(treeData, curKey, children){
      var loop = (data) => {
        if (data.length == 0)
          /* 初始节点 */
          children.forEach((item) => {data.push(item);});
        else{
          /* 展开节点 */
          data.forEach((item) => {
              if(curKey==item.key){
                item.children = children;   // 使用 item.children = children.slice(); 竟然会异常！
              }else{ //当前节点不是curKey
                if(item.children)
                  loop(item.children);
              }
          })
        }
      };  // loop

    loop(treeData);
  }
  /**
  * 页面展开和初始事件
  */
  onLoadData(treeNode){
    debugger;
    return new Promise((resolve) => {
      var fetchOpts = {credentials:'include'};
      var url = this.props.url==null ? '/api/ou/tree/admin' : this.props.url;
      url = `${globalConfig.api.host}${url}` ;
      console.info('ou数据请求地址为%o',url);
      var curKey = undefined;
      if(treeNode!=undefined){
        url += '?id=' + treeNode.props.eventKey;  // key相当于easyUI中的 id
        curKey = treeNode.props.eventKey;
      }
      /* 发起数据请求 */
      fetch(url,fetchOpts)
      .then((res) => res.text())
      .then((data) => {
        var obj = eval('(' + data + ')');   //不能使用JSON.parse
        // 获取到数据
        var children = [];
        obj.forEach((item) => {children.push({label:item.text,value:item.id,key:item.id,isLeaf:item.state=='closed'?false:true})} ); //并转化为tree格式
        var treeData = this.state.treeData.slice();
        this.genTreeData(treeData,curKey,children);
        this.setState({
          treeData:treeData //不能直接操作state 否则不会render()
        });
        resolve();
      })
      .catch((e) => {message.error('获取部门树失败');});
    })
  }

  onChangeHandler(value){
    const onChange = this.props.onChange;
    if (onChange) {
     console.info("当前属性为:",this.props)
     onChange(value);
    }
  }


  render(){
    return (
      <TreeSelect
      placeholder="部门"
      style={{ width: 150 }}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={this.state.treeData}
      loadData={this.onLoadData}
      onChange={this.onChangeHandler}
      value={this.state.value}
      />
    )
  }

}

export default OuTreeSelect;
