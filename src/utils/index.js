// 一些辅助用的工具方法
// 很多都是gross hack, 属于历史遗留问题
// antd从2.x开始引入了moment: http://momentjs.com/docs/
// 这是个好东西, 处理日期方便多了, 简直就是javascript界的joda-time
// 这些prototype的hack基本用不到了
// 不过它format时的pattern和常见的不太一样, 比如要大写的YYYY才代表年份

/** 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

/**
 * 在当前日期的基础上再增加几天
 *
 * @param num 要增加的天数
 */
Date.prototype.plusDays = function (num) {
  var tmp = new Date();
  tmp.setDate(this.getDate() + num);
  return tmp;
};

// 为了克服js的一些坑...
const Utils = {
  /**
  * 行结构转变成树形结构
  * parentId 指向 id
  * 给菜单(sidebar)使用
  */
  transformToTree(res){
    var rows = res.data;
  	var nodes = [];
  	var children = [];  //把自己的id和text都放到child中存储
  	var parent = [];
  	var node = {};
  	rows.map((row,i)=>{
      // 增加key属性
      node = Object.assign({},row,{key:row.menuKey});
  		if(!row.parentId){	//根节点 同时push到 nodes 和 parents
  			// node = {id:row.id,text:row.name};
  			if(row.iconCls)
  				node.iconCls = row.iconCls;
  			nodes.push(node);
  			parent.push(node);
  		}else{ 				//非根节点
  			node = {child:{...node},parentId:row.parentId}
  			if(row.iconCls)
  				node.child.iconCls = row.iconCls;
  			children.push(node);
  		}
  	});

  	var orphan = [];
  	while(parent.length && children.length){	//parent或者children中有一个为空则停止
  		node = parent.shift();	//删除第一个元素 并返回第一个元素
  		/* 每次循环 都能找到一个parent的所有子节点 */
  		children.map((row,i)=>{
  			if(row.parentId === node.id){ //如果child指向当前parent 则把此节点推入其children中
  				//这里对node的操作 竟然能直接影响nodes的值
  				if(node.child){
  					node.child.push(row.child);
  				}else{
  					node.child = [row.child];
  				}

  				parent.push(row.child);
  			}else{
  				orphan.push(row);
  			}
  		});

  		children = orphan;
  		orphan = [];
  	}

  	return nodes;
  },

  /**
  * 行结构转变成树形结构
  * parentId 指向 id
  * 给树形表格使用(非懒加载)
  */
  transformToTreeData(res){
    var rows = res;
    var nodes = [];
    var children = [];  //把自己的id和text都放到child中存储
    var parent = [];
    var node = {};
    if (!rows) return;
    rows.map((row,i)=>{
      // 增加key属性
      node = Object.assign({},row);
      if(!row.parentId){	//根节点 同时push到 nodes 和 parents
        nodes.push(node);
        parent.push(node);
      }else{ 				//非根节点
        node = {children:{...node},parentId:row.parentId}
        children.push(node);
      }
    });

    var orphan = [];
    while(parent.length && children.length){	//parent或者children中有一个为空则停止
      node = parent.shift();	//删除第一个元素 并返回第一个元素
      /* 每次循环 都能找到一个parent的所有子节点 */
      children.map((row,i)=>{
        if(row.parentId === node.id){ //如果child指向当前parent 则把此节点推入其children中
          //这里对node的操作 竟然能直接影响nodes的值
          if(node.children){
            node.children.push(row.children);
          }else{
            node.children = [row.children];
          }

          parent.push(row.children);
        }else{
          orphan.push(row);
        }
      });

      children = orphan;
      orphan = [];
    }

    return nodes;
  },


  isString(s) {
    return typeof(s) === 'string' || s instanceof String;
  },
  // 获取url中的所有参数
  getAllQueryParams() {
    let str = window.location.href;
    if (!str) {
      return {};
    }

    let num = str.indexOf('?');
    str = str.substr(num + 1); //取得所有参数

    const res = {};
    let name;
    let value;

    const arr = str.split('&'); //各个参数放到数组里
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=');
      if (num > 0) {
        name = arr[i].substring(0, num).trim();
        value = arr[i].substr(num + 1).trim();
        res[name] = value;
      }
    }

    return res;
  },
};

export default Utils;
