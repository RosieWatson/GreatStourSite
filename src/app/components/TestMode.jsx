import React from 'react'
import axios from 'axios'
import {Button, Popover, Icon, Switch} from 'antd'

const TestMode = (props) => {
  // @TODO Add flood alert test mode when we have sorted the flood alerting
  const triggerTestFlood = () => {
    axios.get('/api/email/send/tests')
    .then(res => {
      if(res.status === 200) {
        props.getFloodData()
      }
    })
  }
  
  const content = (
    <React.Fragment>
      <div className='d-flex justify-content-between'>
        <div>
          <label className='mb-1' htmlFor='flood-alert-label'>Flood alert:</label>
          <p className='small'>Mocking a flood being reported. <b>Ensure you have subscribed your email address</b> so you can recieve email notifications for this alert.</p>
        </div>
        <Button type='primary' onClick={triggerTestFlood}>
          Trigger
        </Button>
      </div>
      <div className='d-flex justify-items-between'>
        <div>
          <label className='mb-1' htmlFor='service-unavailable-label'>Service unavailable:</label>
          <p className='small'>e.g. connection to environmental agency API unavailable</p>
        </div>
        <Switch 
          checkedChildren={<Icon type='check' />} 
          id='service-unavailable-label'
          onChange={(checked) => props.toggleSystemAvailability('We are unable to connect to our data source.')}
          unCheckedChildren={<Icon type='close' />}  
          />
      </div>
    </React.Fragment>
  )
  
  return (
    <React.Fragment>
      <Popover 
        content={content} 
        getPopupContainer={() => document.getElementById('test-mode-dropdown')} 
        placement='bottomRight'
        trigger='click'>
        <Button 
          aria-haspopup='true' 
          block 
          type='primary' 
          icon='robot' 
          size='large'
          >
          Test Mode
        </Button>
      </Popover>
      <div id='test-mode-dropdown'></div>
    </React.Fragment>
  )
}

export default TestMode
