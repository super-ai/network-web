import React from 'react';
import {Button,Form,Input,Icon,Tree,Row,Col} from 'antd';
import './index.less';
import configData from './configData.js';

const Component = React.Component;
const FormItem = Form.Item;
const {TextArea} = Input;
const TreeNode = Tree.TreeNode;

/**
* 单条公告新增和编辑
*/
class DetailEdit extends Component{

  state = {
    formState:'select', //insert、edit、select
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

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const replysTree =
      <Tree>
        {this.renderTreeNodes(configData.replysTreeData)}
      </Tree>;
    const readsTree =
      <Tree>
        {this.renderTreeNodes(configData.readsTreeData)}
      </Tree>;
    return(
      <div style={{display:this.state.activeComp=='DetailEdit' ? 'inline':'none'}}>
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
