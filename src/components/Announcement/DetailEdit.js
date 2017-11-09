import React from 'react';
import {Button,Form,Input,Icon,Row,Col,TreeSelect,DatePicker,Radio,Tag,notification} from 'antd';
import moment from 'moment';
import './index.less';
import configData from './configData.js';
import Ou from 'components/Custom/OuTreeSelect';
import utils from 'utils';
import FileUploader from 'components/FileUploader';
import globalConfig from 'config.js';
import ajax from '../../utils/ajax';

const Component = React.Component;
const FormItem = Form.Item;
const {TextArea} = Input;
const TreeNode = TreeSelect.TreeNode;
const formItemLayout = configData.formItemLayout;
const RadioGroup = Radio.Group;

/**
* 单条公告新增和编辑
* 新增时候无id
* 编辑时候 无范围
*/
class DetailEdit extends Component{

  state = {
    forUpdate:true, // 默认为编辑
    value: [],
  }

  componentDidMount(){
    this.setState(this.props.publicState);
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.publicState);
  }

  error(errorMsg) {
    // 对于错误信息, 要很明显的提示用户, 这个通知框要用户手动关闭
    notification.error({
      message: '出错!',
      description: `请联系管理员, 错误信息: ${errorMsg}`,
      duration: 0,
    });
  }

  /**
  * 编辑时候返回详细信息
  * 新增时候返回List
  */
  handleReturn(){
    if(this.state.forUpdate){
      this.props.setPublicState({activeComp:'DetailView'});
    }
    else {
      this.props.setPublicState({activeComp:'TableList'});
    }
  }

  async handleSave(){
    var oldObj = this.props.form.getFieldsValue();
    var host = globalConfig.api.host;
    var newObj = {};
    // 日期处理
    newObj = utils.procFieldsDateValue(oldObj,moment);
    // 上传文件url去掉server
    utils.removeServer(newObj,['additions'],host);
    console.log('处理后的表单数据为: ',newObj);
    return;

    // 后台提交
    try{
      var res = await(this.ajax.post(`${globalConfig.api.host}${globalConfig.api.path}`, newObj));
      if(res.success){
        notification.success({
          message: '新增成功',
          description: this.primaryKey ? `新增数据行 主键=${res.data[this.primaryKey]}` : '',
          duration: 3,
        });

        //forUpdate返回详情
        //否则返回List
        if(this.state.forUpdate){
          this.props.setPublicState({activeComp:'DetailView',selectedRow:res.data});
        }
        else {
          this.props.setPublicState({activeComp:'TableList'});
          // ?如何刷新表格

        }

      }else{
        this.error(res.failInfo.errorMessage);
      }
    }catch(ex){
      this.error(`网络请求出错: ${ex.message}`);
    }




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
            <Icon type={this.state.forUpdate ? 'edit':'plus-circle-o'} style={{fontSize: 20,display:'none'}}/>
            <Tag color="blue">{this.state.forUpdate ? '编辑状态':'新增状态'}</Tag>
          </Col>
        </Row>
        <div>
          <Form style={{marginTop:'20px'}}>
            {this.state.forUpdate &&
            <FormItem label='ID'  {...formItemLayout} style={{display:'none'}}>
              {getFieldDecorator('id',{initialValue:this.state.selectedRow ? this.state.selectedRow.id:null})
                (<Input />)}
            </FormItem>}
            <FormItem label='标题'  {...formItemLayout}>
              {getFieldDecorator('title',{initialValue:this.state.selectedRow ? this.state.selectedRow.title:null})
                (<Input />)}
            </FormItem>
            <FormItem label='内容'  {...formItemLayout}>
              {getFieldDecorator('content',{initialValue:this.state.selectedRow ? this.state.selectedRow.content:null})
                (<TextArea autosize={{ minRows: 8, maxRows: 28 }}  />)}
            </FormItem>
            {!this.state.forUpdate &&
              <FormItem label='范围'  {...formItemLayout}>
              {getFieldDecorator('ouIds',{initialValue:[]})
                (<Ou multiple allowClear labelInValue/>)}
            </FormItem>}
            <FormItem label='置顶'  {...formItemLayout}>
              {getFieldDecorator('isTop',{initialValue:this.state.selectedRow ? this.state.selectedRow.isTop:null})
                (<RadioGroup>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </RadioGroup>)}
            </FormItem>
            <FormItem label='归档'  {...formItemLayout}>
              {getFieldDecorator('archivedTime',{initialValue:this.state.selectedRow ? moment(this.state.selectedRow.archivedTime,'YYYY-MM-DD HH:mm:ss'):null})
                (<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>)}
            </FormItem>
            <FormItem label='附件'  {...formItemLayout}>
              {getFieldDecorator('additions',{initialValue:this.state.selectedRow ? this.state.selectedRow.additions:null})
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
