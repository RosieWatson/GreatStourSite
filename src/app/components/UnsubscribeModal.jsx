import React, {Component} from 'react';
import {Button, Modal, Form, Input, message} from 'antd';
import axios from 'axios'

const FormItem = Form.Item;

class UnsubscribeModal extends Component {
  state = {
    visible: false,
    formValues: {},
  };

  showModal = () => {
    this.setState({visible: true});
  }

  handleCancel = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({visible: false});
  }

  handleSubmit = () => {
    const form = this.formRef.props.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      } else {
        this.setState({
          formValues: values
        })

        axios.post('api/email/user/unsubscribe', {
          email: this.state.formValues.email,
        }).then((result) => {
          if(result.status == 200) {
            message.success('Successfully unsubscribed');
          } else {
            console.log("unsubscribe issue")
            message.error('Oops! Something went wrong - please try again!');
          }
        });
      }

      form.resetFields();
      this.setState({visible: false});
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div id="unsubscribe-utility">
        <Button
          type="danger"
          onClick={this.showModal}
        >
          Unsubscribe</Button>
        <UnsubscribeCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleSubmit}
          confirmLoading={this.state.confirmLoading}
        />
      </div>
    );
  }
}

const UnsubscribeCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const {visible, onCancel, onCreate, form} = this.props;
      const {getFieldDecorator} = form;

      return (
        <Modal
          visible={visible}
          title="Unsubscribe from flood alerts"
          okText="Unsubscribe"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Email">
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email',
                  message: 'The input is not a valid email!',
                }, {
                  required: true,
                  message: 'Please input your Email!',
                }],
              })(
                <Input/>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default UnsubscribeModal;