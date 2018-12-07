import React from 'react'
import {Button, Popover, Icon, Switch} from 'antd'

const TestMode = (props) => {
  const content = (
    <React.Fragment>
      <div className='d-flex justify-content-between'>
        <div>
          <p className="mb-1">Flood alert:</p>
          <p className="small">A flood has been reported</p>
        </div>
        <Switch 
          checkedChildren={<Icon type="check" />} 
          unCheckedChildren={<Icon type="close" />} 
          defaultChecked 
          />
      </div>
      <div className='d-flex justify-items-between'>
        <div>
          <p className="mb-1">Service unavailable:</p>
          <p className="small">e.g. connection to environmental agency API unavailable</p>
        </div>
        <Switch 
          checkedChildren={<Icon type="check" />} 
          unCheckedChildren={<Icon type="close" />} 
          defaultChecked 
          />
      </div>
    </React.Fragment>
  )
  
  return (
    <Popover 
      content={content} 
      getPopupContainer={() => document.getElementById('test-mode-dropdown')} 
      placement='bottomRight'
      trigger="click">
      <Button 
        aria-haspopup="true" 
        block 
        type='primary' 
        icon='robot' 
        onClick={this.toggleDropdown} 
        size='large'
        >
        Test Mode
      </Button>
    </Popover>
    <div id='test-mode-dropdown'></div>
  )
}

export default TestMode
