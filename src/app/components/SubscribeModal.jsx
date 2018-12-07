import React, {Component} from 'react';
import {Button, Modal, Form, Input} from 'antd';
import ReCAPTCHA from "react-google-recaptcha";

const FormItem = Form.Item;

const recaptchaRef = React.createRef()

const SubscribeCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const {visible, onCancel, onCreate, form, stationId, confirmLoading} = this.props;
      const {getFieldDecorator} = form;

      return (
        <Modal
          visible={visible}
          title="Subscribe to a sensor"
          okText="Subscribe"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form layout="vertical">
            <FormItem label="Station ID">
              <Input disabled
                     defaultValue={stationId}
              />
            </FormItem>
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
            <FormItem label="Name">
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  message: 'Please input your name!',
                  whitespace: true
                }],
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={"6LdEdn8UAAAAAKKOPpG642RjZ1B2TfNi7EzeP2UW"}
                size="invisible"
              />
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class SubscribeModal extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({visible: true});
  }

  handleCancel = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    recaptchaRef.current.reset();
    this.setState({visible: false});
  }

  handleCreate = () => {
    this.setState({
      confirmLoading: true,
    });
    recaptchaRef.current.execute();

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });

      const form = this.formRef.props.form;

      form.validateFields((err, values) => {
        if (err) {
          return;
        }

        if(recaptchaRef.current.getValue() == "") {
          console.log("recaptcha wrong")
          return;
        }

        console.log('Received values of form: ', values);
        form.resetFields();
        recaptchaRef.current.reset();
        this.setState({visible: false});
      });
    }, 2000);


  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Subscribe</Button>
        <SubscribeCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          stationId={this.props.stationId}
          confirmLoading={this.state.confirmLoading}
        />
      </div>
    );
  }
}

export default SubscribeModal;