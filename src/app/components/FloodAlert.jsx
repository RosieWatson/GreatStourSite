import React from 'react'
import { Alert } from 'antd'

import FloodAdvice from './FloodAdvice'

const FloodAlert = (props) => {
  const alertMessage = (
    <div>
      <div><b>Latest:</b> Most recent flood alert here. More below (when clicking show more)</div>
      <div className='float-right'>
        <a href='#'>Show more</a>
        <span aria-hidden='true' role='presentation'> | </span>
        <a onClick={props.toggleFloodAdviceModal} href='#'>Flood advice</a>
      </div>
    </div>
  )
  
  return (
    <React.Fragment>
      <Alert message={alertMessage} banner></Alert>
      <FloodAdvice 
        modalOpen={props.floodAdviceModalOpen} 
        toggleModal={props.toggleFloodAdviceModal}
        />
    </React.Fragment>
  )
}

export default FloodAlert
