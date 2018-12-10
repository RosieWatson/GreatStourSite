import React from 'react'
import { Alert } from 'antd'

import FloodAdvice from './FloodAdvice'

class FloodAlert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      floodAdviceModalOpen: false
    }
    this.toggleFloodAdviceModal = this.toggleFloodAdviceModal.bind(this)
  }
  
  toggleFloodAdviceModal() {
    this.setState({
      floodAdviceModalOpen: !this.state.floodAdviceModalOpen
    })
  }
  
  render () {
    const alertMessage = (
      <div>
        <div><b>Latest:</b> Most recent flood alert here. More below (when clicking show more)</div>
        <div className='float-right'>
          <a href='#'>Show more</a>
          <span aria-hidden='true' role='presentation'> | </span>
          <a onClick={this.toggleFloodAdviceModal} href='#'>Flood advice</a>
        </div>
      </div>
    )
    
    return (
      <React.Fragment>
        <Alert message={alertMessage} banner></Alert>
        <FloodAdvice 
          modalOpen={this.state.floodAdviceModalOpen} 
          toggleModal={this.toggleFloodAdviceModal}
          />
      </React.Fragment>
    )
  }
}

export default FloodAlert
