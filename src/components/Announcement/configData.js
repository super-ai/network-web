module.exports ={
  formItemLayout : {
    labelCol: {
      xs: { span: 2 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 20 },
      sm: { span: 20 },
    },
  },

  replysTreeData : [{
    title: '回复',
    key: '0-0',
    children: [{
      title: '张三回复',
      key: '0-0-0',
    }, {
      title: '李四回复',
      key: '0-0-1',
    }, {
      title: 'Tom回复',
      key: '0-0-2',
    }, {
      title: 'Tyson回复',
      key: '0-1',
    }, {
      title: '习大大2回复',
      key: '0-2',
    }],
  }],

  readsTreeData : [{
    title: '已阅',
    key: '0-0',
    children: [{
      title: '张三已阅',
      key: '0-0-0',
    }, {
      title: '李四已阅',
      key: '0-0-1',
    }, {
      title: 'Tom已阅',
      key: '0-0-2',
    }, {
      title: 'Tyson已阅',
      key: '0-1',
    }, {
      title: '习大大2已阅',
      key: '0-2',
    }],
  }],

}
