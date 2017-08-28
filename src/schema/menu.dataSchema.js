module.exports = [
  {
    key:'id',
    title:'ID',
    dataType:'int',
    primary:'true',
    width:100,
    showInTable:false,
    sorter:(a,b)=>a.id - b.id
  },
  {
    key:'name',
    title:'菜单名称',
    dataType:'varchar',
    render(text){
      return text;
    }
  },
  {
    key:'menuKey',
    title:'路由Key',
    dataType:'varchar',
  },
  {
    key:'type',
    title:'菜单类型',
    dataType:'varchar',
  },
  {
    key:'icon',
    title:'图标',
    dataType:'varchar',
  },
  {
    key:'parentId',
    title:'父节点',
    dataType:'int',
  },
  {
    key:'place',
    title:'位置',
    dataType:'int',
  },


  // ,
  // {
  //   key:'select',
  //   title:'测试单选',
  //   dataType:'int',
  //   showType:'select',
  //   options:[{key:'male',value:'男'},{key:'female',value:'女'}],
  // },
  // {
  //   key:'multi-select',
  //   title:'测试多选',
  //   dataType:'int',
  //   showType:'multiSelect',
  //   options:[{key:'male',value:'男'},{key:'female',value:'女'}],
  // },
]
