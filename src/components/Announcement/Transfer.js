import React from 'react';
import {Button,Form,Input} from 'antd';
import Ou from 'components/Custom/OuTreeSelect';

const Component = React.Component;
const TextArea = Input.TextArea;
const FormItem = Form.Item;

/**
* 转发
*/
class Transfer extends Component{

  state={}

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

  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
        <div style={{display:this.state.activeComp=='Transfer' ? 'inline':'none' }}>
          <Button icon='left-circle-o' type='primary' onClick={this.handleReturn.bind(this)}>返回</Button>
          <Button icon='save' onClick={this.handleSave.bind(this)}>保存</Button>
          <br />
          <Form>
            <FormItem label='范围'>
              {getFieldDecorator('ouIds',{initialValue:[]})
                (<Ou multiple allowClear labelInValue/>)}
            </FormItem>
          </Form>
        </div>
    )
  }
}

const TransferForm = Form.create()(Transfer);

export default TransferForm;
