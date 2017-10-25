import React from 'react';
import {Button,Form,Input,Icon,Row,Col,TreeSelect} from 'antd';
import './index.less';
import configData from './configData.js';
import Ou from '/components/Custom/OuTreeSelect';

const Component = React.Component;
const FormItem = Form.Item;
const {TextArea} = Input;
const TreeNode = TreeSelect.TreeNode;



/**
* 单条公告新增和编辑
*/
class DetailEdit extends Component{

  state = {
    formState:'select', //insert、edit、select
    value: ['leaf1','leaf2','leaf3'],
  }

  componentDidMount(){
    this.setState(this.props.stateData);
  }

  // 此函数为啥不会被执行:因为它会在activeComp不为detail时候注销
  componentWillReceiveProps(nextProps){
    this.setState(nextProps.stateData);
  }

  handleReturn(){
    this.props.setStateData({activeComp:'DetailView'});
  }

  handleSave(){

  }

  onChange = (value) => {
    console.log(arguments);
    this.setState({ value });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div style={{display:this.state.activeComp=='DetailEdit' ? 'inline':'none'}}>
        <Ou />
      
        <TreeSelect
        showSearch
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf" key="random" />
            <TreeNode value="leaf2" title="your leaf" key="random1" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
          </TreeNode>
        </TreeNode>
      </TreeSelect>

        <Row>
          <Col span={12} offset={0} style={{ textAlign: 'left' }}>
            <Button type='primary' icon='left-circle-o' onClick={this.handleReturn.bind(this)}>返回</Button>
            <Button icon='save' onClick={this.handleSave.bind(this)}>保存</Button>
          </Col>
        </Row>
        <div>
          <Form style={{marginTop:'20px'}}>
            <FormItem label='标题'  {...formItemLayout}>
              {getFieldDecorator('title',{initialValue:this.state.selectedRow ? this.state.selectedRow.title:null})
                (<Input />)}
            </FormItem>
            <FormItem label='内容'  {...formItemLayout}>
              {getFieldDecorator('content',{initialValue:this.state.selectedRow ? this.state.selectedRow.content:null})
                (<TextArea autosize={{ minRows: 8, maxRows: 28 }}  />)}
            </FormItem>
            <FormItem label='范围'  {...formItemLayout}>
              {getFieldDecorator('range',{initialValue:this.state.selectedRow ? this.state.selectedRow.range:null})
                (<TextArea autosize={{ minRows: 6, maxRows: 6 }} />)}
            </FormItem>
            <FormItem label='附件'  {...formItemLayout}>
              {getFieldDecorator('attachments',{initialValue:this.state.selectedRow ? this.state.selectedRow.attachments:null})
                (attachments)}
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const DetailEditForm = Form.create()(DetailEdit);

export default DetailEditForm;

const formItemLayout = {
  labelCol: {
    xs: { span: 3 },
    sm: { span: 1 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 20 },
  },
};

const attachments =
  <ul>
    <li>附件一</li>
    <li>附件二</li>
    <li>附件三</li>
    <li>附件四</li>
    <li>附件五</li>
  </ul>;

const reads =
  <ul>
    <li>张三阅</li>
    <li>李四阅</li>
    <li>Tom阅</li>
    <li>Tyson阅</li>
    <li>习大大阅</li>
  </ul>;
const replies =
  <ul>
    <li>张三回复</li>
    <li>李四回复</li>
    <li>Tom回复</li>
    <li>Tyson回复</li>
    <li>习大大回复</li>
  </ul>;
