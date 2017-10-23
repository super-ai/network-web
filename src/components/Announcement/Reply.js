import React from 'react';
import {Button,Form,Input} from 'antd';

const Component = React.Component;
const TextArea = Input.TextArea;
const FormItem = Form.Item;

/**
* 查看回复
*/
class Reply extends Component{

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
        <div style={{display:this.state.activeComp=='Reply' ? 'inline':'none' }}>
          <Button icon='left-circle-o' type='primary' onClick={this.handleReturn.bind(this)}>返回</Button>
          <Button icon='save' onClick={this.handleSave.bind(this)}>保存</Button>
          <br />
          <Form>
            <FormItem label='内容' >
              {getFieldDecorator('replyContent',)
                (<TextArea autosize={{ minRows: 8, maxRows: 28 }} />)}
            </FormItem>
          </Form>
        </div>
    )
  }
}

const ReplyForm = Form.create()(Reply);

export default ReplyForm;
