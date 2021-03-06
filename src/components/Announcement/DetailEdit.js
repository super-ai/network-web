import React from 'react';
import {Button,Form,Input,Icon,Row,Col,TreeSelect,DatePicker,Radio,Tag,notification} from 'antd';
import moment from 'moment';
import './index.less';
import configData from './configData.js';
import Ou from 'components/Custom/OuTreeSelect';
import utils from 'utils';
import FileUploader from 'components/FileUploader';
import globalConfig from 'config.js';
import ajax from 'utils/ajax';

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
  }

  componentDidMount(){
    this.setState(this.props.publicState);
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.publicState);
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

  /**
  * 新增和删除公告
  */
  async handleSave(){
    this.state.forUpdate ? this.update():this.insert();
  }

  /**
  * 新增数据
  */
  async insert(){
    // 表单验证
    this.props.form.validateFieldsAndScroll(async (err,values)=>{
      if(!err){
        // 参数获取、处理
        var oldObj = this.props.form.getFieldsValue();
        var host = globalConfig.api.host;
        var newObj = {};
        newObj = utils.procFieldsDateValue(oldObj,moment); // 日期处理
        utils.removeServer(newObj,['additions'],host); // 上传文件url去掉server
        // 后台提交
        try{
          var res = await ajax.post(`${globalConfig.api.host}/api/Bulletin/insert`, newObj);
          if(res.success){
            notification.success({
              message: '新增成功',
              description: this.primaryKey ? `新增数据行 主键=${res.data[this.primaryKey]}` : '',
              duration: 3,
            });

            //forUpdate返回详情 否则返回List
            this.props.setPublicState({activeComp:'TableList',isRefreshTableList:true}); // 跳转同事刷新TableList
          }else{
            utils.error(res.failInfo.errorMessage);
          }
        }catch(ex){
          utils.error(`网络请求出错: ${ex.message}`);
        }
      }
    });
  }

  /**
  * 更新数据
  */
  async update(){
    // 表单验证
    this.props.form.validateFieldsAndScroll(async (err,values)=>{
      if(!err){
        // 参数获取、处理

        var oldObj = this.props.form.getFieldsValue();
        var host = globalConfig.api.host;
        var newObj = {};
        newObj = utils.procFieldsDateValue(oldObj,moment); // 日期处理
        utils.removeServer(newObj,['additions'],host); // 上传文件url去掉server
        console.log('处理后的表单数据为: ',JSON.stringify(newObj));

        // 后台提交
        try{

          var res = await ajax.post(`${globalConfig.api.host}/api/Bulletin/update`, newObj);
          debugger;
          if(res.success){
            notification.success({
              message: '更新成功',
              description: this.primaryKey ? `新增数据行 主键=${res.data[this.primaryKey]}` : '',
              duration: 3,
            });

            //forUpdate返回详情 否则返回List
            this.props.setPublicState({activeComp:'DetailView',selectedRow:res.data,isRefreshTableList:true});
          }else{
            utils.error(res.failInfo.errorMessage);
          }
        }catch(ex){
          utils.error(`网络请求出错: ${ex.message}`);
        }
      }
    });
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
              {getFieldDecorator('title',{rules: [{required: true,message:'标题必填'}],initialValue:this.state.selectedRow ? this.state.selectedRow.title:null})
                (<Input />)}
            </FormItem>
            <FormItem label='内容'  {...formItemLayout}>
              {getFieldDecorator('content',{rules: [{required: true,message:'内容必填'}],initialValue:this.state.selectedRow ? this.state.selectedRow.content:null})
                (<TextArea autosize={{ minRows: 8, maxRows: 28 }}  />)}
            </FormItem>
            {!this.state.forUpdate &&
              <FormItem label='范围'  {...formItemLayout}>
              {getFieldDecorator('ous',{rules: [{required: true,message:'范围必填'}],initialValue:[]})
                (<Ou multiple allowClear labelInValue/>)}
            </FormItem>}
            <FormItem label='置顶'  {...formItemLayout}>
              {getFieldDecorator('isTop',{rules: [{required: true,message:'是否置顶必填'}],initialValue:this.state.selectedRow ? this.state.selectedRow.isTop:null})
                (<RadioGroup>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </RadioGroup>)}
            </FormItem>
            <FormItem label='归档'  {...formItemLayout}>
              {getFieldDecorator('archivedTime',{rules: [{required: true,message:'归档时间必填'}],initialValue:this.state.selectedRow ? moment(this.state.selectedRow.archivedTime,'YYYY-MM-DD HH:mm:ss'):null})
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
