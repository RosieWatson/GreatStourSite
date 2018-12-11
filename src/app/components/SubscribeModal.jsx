import React, {Component} from 'react';
import {Button, Modal, Form, Input, message} from 'antd';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios'

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
        this.setState({
          formValues: values,
          formValid: true,
        });

        recaptchaRef.current.execute();
      }
    });
  }

  handleSubscribe = (value) => {
    if(this.state.formValid) {
      this.setState({
        visible: false,
        confirmLoading: false,
      })

      // Check if recaptcha is valid
      axios.get('api/validate/recaptcha', {
        params: {
          response: value
        }
      }).then((result) => {
        if(result.data.success) {
          this.subscribe()
        } else {
          // Change this to recaptcha error?
          message.error('Oops! Something went wrong - please try again!');
          return
        }
      });

      const form = this.formRef.props.form;

      console.log('Received values of form: ', this.state.formValues);
      form.resetFields();
      recaptchaRef.current.reset();
      this.setState({visible: false});
    }
  }

  subscribe() {
    axios.post('api/email/user/subscribe', {
      email: this.state.formValues.email,
      name: this.state.formValues.name,
      postcode: this.state.formValues.postcode
    }).then((result) => {
      if(result.status == 200) {
        console.log("success")
        message.success('Successfully subscribed');
      } else {
        console.log("failed")
        message.error('Oops! Something went wrong - please try again!');
      }
      //
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div id="subscribe-utility">
        <Button
          type="primary"
          onClick={this.showModal}
          size='large'
          >
          Subscribe</Button>
        <SubscribeCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleSubmit}
          confirmLoading={this.state.confirmLoading}
          handleSubscribe={this.handleSubscribe}
        />
      </div>
    );
  }
}

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
            <FormItem label="Postcode">
              {getFieldDecorator('postcode', {
                rules: [{
                  type: 'string',
                  message: 'The postcode is not valid!',
                }, {
                  required: true,
                  message: 'Please input your postcode!',
                }, {
                  pattern: '([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})',
                  message: 'The postcode does not match the expected format!'
                }],
              })(
                <Input/>
              )}
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