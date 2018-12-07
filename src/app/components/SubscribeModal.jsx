import React, {Component} from 'react';
import {Button, Modal, Form, Input} from 'antd';
import ReCAPTCHA from "react-google-recaptcha";

const FormItem = Form.Item;

const recaptchaRef = React.createRef()

class SubscribeModal extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    formValues: {},
    formValid: false,
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

  handleSubmit = () => {
    this.setState({
      confirmLoading: true,
    });

    const form = this.formRef.props.form;

    form.validateFields((err, values) => {
      if (err) {
        this.setState({
          confirmLoading: false,
        });

        return;
      } else {
        console.log("form validated");
        this.setState({
          formValues: values,
          formValid: true,
        });

        recaptchaRef.current.execute();
      }
    });
  }

  handleSubscribe = (value) => {
    console.log("callback");
    // Value is recaptcha key for verification
    if(this.state.formValid) {
      console.log("form is valid");
      this.setState({
        visible: false,
        confirmLoading: false,
      })

      const form = this.formRef.props.form;

      console.log('Received values of form: ', this.state.formValues);
      form.resetFields();
      recaptchaRef.current.reset();
      this.setState({visible: false});
    }
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
          onCreate={this.handleSubmit}
          stationId={this.props.stationId}
          confirmLoading={this.state.confirmLoading}
          handleSubscribe={this.handleSubscribe}
        />
      </div>
    );
  }
}

const SubscribeCreateForm = Form.create()(
  class extends React.Component {

    onError(err) {
      console.log(err);
    }

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
                onChange={this.props.handleSubscribe}
                onErrored={this.onError}
              />
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default SubscribeModal;