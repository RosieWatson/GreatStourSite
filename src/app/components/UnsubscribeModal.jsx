import React, {Component} from 'react'
import {Button, Modal, Form, Input, message} from 'antd'
import ReCAPTCHA from "react-google-recaptcha"
import axios from 'axios'

const FormItem = Form.Item
const recaptchaRef = React.createRef()

class UnsubscribeModal extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    formValues: {},
    formValid: false,
  }

  showModal = () => {
    this.setState({visible: true})
  }

  handleCancel = () => {
    const form = this.formRef.props.form
    form.resetFields()
    recaptchaRef.current.reset()
    this.setState({visible: false})
  }

  handleSubmit = () => {
    this.setState({
      confirmLoading: true,
    })
    
    const form = this.formRef.props.form

    form.validateFields((err, values) => {
      if (err) {
        this.setState({
          confirmLoading: false,
        })
      } else {
        this.setState({
          formValues: values,
          formValid: true
        })
        
        recaptchaRef.current.execute()
      }
    })
  }
  
  handleUnsubscribe = (value) => {
    if(this.state.formValid) {
      this.setState({
        visible: false,
        confirmLoading: false,
      })

      // Check if recaptcha is valid
      axios.post(`api/validate/recaptcha?token=${process.env.API_TOKEN}`, {
        response: value
      }).then((result) => {
        if(result.data.success) {
          this.unsubscribe()
        } else {
          // Change this to recaptcha error?
          console.log("recaptcha issue")
          message.error('Oops! Something went wrong - please try again!')
          return
        }
      })

      const form = this.formRef.props.form

      form.resetFields()
      recaptchaRef.current.reset()
      this.setState({visible: false})
    }
  }
  
  unsubscribe() {
    axios.post(`api/email/user/unsubscribe?token=${process.env.API_TOKEN}`, {
      email: this.state.formValues.email,
    }).then((result) => {
      if(result.status == 200) {
        message.success('Successfully unsubscribed')
      } else {
        console.log("unsubscribe issue")
        message.error('Oops! Something went wrong - please try again!')
      }
    }).catch(error => {
      console.log(error.response)
    })
    const form = this.formRef.props.form
    form.resetFields()
    this.setState({visible: false})
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

  render() {
    return (
      <div id="unsubscribe-utility">
        <Button
          type="danger"
          onClick={this.showModal}
        >
          Unsubscribe
        </Button>
        <UnsubscribeCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleSubmit}
          confirmLoading={this.state.confirmLoading}
          handleUnsubscribe={this.handleUnsubscribe}
        />
      </div>
    )
  }
}

const UnsubscribeCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const {visible, onCancel, onCreate, form} = this.props
      const {getFieldDecorator} = form

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
            <FormItem>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={"6LdEdn8UAAAAAKKOPpG642RjZ1B2TfNi7EzeP2UW"}
                size="invisible"
                onChange={this.props.handleUnsubscribe}
                onErrored={this.onError}
              />
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

export default UnsubscribeModal