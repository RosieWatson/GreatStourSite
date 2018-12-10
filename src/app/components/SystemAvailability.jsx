import React from 'react'
import { Alert } from 'antd'

const SystemAvailability = (props) => {
  return (
    <React.Fragment>
      {/* @TODO Change this to an actual flood detection alert */}
      {props.systemAvailability.online ? (
        <Alert
          message='System Online'
          description='Recieving latest flood detection information.'
          type='success'
          showIcon
          />
      ) : (
        <Alert
          message='Connectivity Issue'
          description={
            <div>
              {props.systemAvailability.message}
              <a className='d-block' onClick={props.toggleFloodAdviceModal} href='#'>Flood advice and contact information.</a>
            </div>
          }
          type='warning'
          showIcon
          />
      )}
    </React.Fragment>
  )
}

export default SystemAvailability
