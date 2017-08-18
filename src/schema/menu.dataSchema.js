module.exports = [
  {
    key:'id',
    title:'ID',
    dataType:'int',
    primary:'true',
    render(text){
      return text;
    },
    sort:(a,b)=>a.id - b.id
  },
  {
    key:'text',
    title:'菜单名称',
    dataType:'varchar',
    render(text){
      return '前缀_' + text;
    }
  },
  {
    key:'icon-cls',
    title:'图标',
    dataType:'varchar',
  },
  {
    key:'url',
    title:'Url',
    dataType:'varchar',
  },
  {
    key:'select',
    title:'测试单选',
    dataType:'int',
    showType:'select',
    options:[{key:'male',value:'男'},{key:'female',value:'女'}],
  },
  {
    key:'multi-select',
    title:'测试多选',
    dataType:'int',
    showType:'multiSelect',
    options:[{key:'male',value:'男'},{key:'female',value:'女'}],
  },
]
