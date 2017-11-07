import React from 'react';
import {Button,Form,Input,Icon,Row,Col,TreeSelect,DatePicker,Radio} from 'antd';
import moment from 'moment';
import './index.less';
import configData from './configData.js';
import Ou from 'components/Custom/OuTreeSelect';
import utils from 'utils';
import FileUploader from 'components/FileUploader';
import globalConfig from 'config.js';

const Component = React.Component;
const FormItem = Form.Item;
const {TextArea} = Input;
const TreeNode = TreeSelect.TreeNode;
const formItemLayout = configData.formItemLayout;
const RadioGroup = Radio.Group;

/**
* 单条公告新增和编辑
*/
class DetailEdit extends Component{

  state = {
    formState:'select', //insert、edit、select
    value: [],
  }

  componentDidMount(){
    this.setState(this.props.stateData);
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.stateData);
  }

  handleReturn(){
    this.props.setStateData({activeComp:'DetailView'});
  }

  handleSave(){
    var oldObj = this.props.form.getFieldsValue();
    var host = globalConfig.api.host;
    var newObj = {};
    // 日期处理
    newObj = utils.procFieldsDateValue(oldObj,moment);
    // 上传文件url去掉server
    utils.removeServer(newObj,['attachments'],host);

    console.log('处理后的表单数据为: ',newObj);
  }

  onChange = (value) => {
    console.log('arguments');
    this.setState({ value });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
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
            <FormItem label='置顶'  {...formItemLayout}>
              {getFieldDecorator('isTop',{initialValue:this.state.selectedRow ? this.state.selectedRow.isTop:null})
                (<RadioGroup>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </RadioGroup>)}
            </FormItem>
            <FormItem label='归档'  {...formItemLayout}>
              {getFieldDecorator('recordDateTime',{initialValue:this.state.selectedRow ? moment(this.state.selectedRow.recordDateTime,'YYYY-MM-DD HH:mm:ss'):null})
                (<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>)}
            </FormItem>
            <FormItem label='附件'  {...formItemLayout}>
              {getFieldDecorator('attachments',{initialValue:this.state.selectedRow ? this.state.selectedRow.attachments:null})
                (<FileUploader max='5'  sizeLimit='500' placeholder='上传文件' />)
              }
            </FormItem>

          </Form>
        </div>
      </div>
    )
  }
}

const DetailEditForm = Form.create()(DetailEdit);

export default DetailEditForm;



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

  // <FormItem label='附件tmp'  {...formItemLayout}>
  //   {getFieldDecorator('attachmentsTmp',{})
  //     (attachments)}
  // </FormItem>

  // <FormItem label='范围'  {...formItemLayout}>
  //   {getFieldDecorator('ouIds',{initialValue:this.state.selectedRow && this.state.selectedRow.ouIds ? this.state.selectedRow.ouIds:[]})
  //     (<Ou multiple allowClear labelInValue/>)}
  // </FormItem>
