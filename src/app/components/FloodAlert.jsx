import React from 'react'
import { Alert, Tag } from 'antd'

import FloodAdvice from './FloodAdvice'
import FloodMessage from './FloodMessage'

class FloodAlert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true
    }
    this.floodInfo = this.floodInfo.bind(this)
    this.toggleCollpase = this.toggleCollpase.bind(this)
  }
  
  floodInfo(flood, index) {
    const date = new Date(flood.timestamp * 1000) // x1000 to convert timestamp from UNIX to JS format
    const formattedDateTime = [date.getMonth()+1, date.getDate(), date.getFullYear()].join('/') + ' ' + 
    [date.getHours(), date.getMinutes()].join(':')
    return (
      <div key={`flood-alert-${index}`}>
        <span><Tag className='mr-2' color="#dc291c">{flood.severity}</Tag><b>{flood.description}</b> {formattedDateTime}</span>
        <FloodMessage message={flood.message} />
      </div>
    )
  }
  
  toggleCollpase() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  
  render() {
    const alertOptions = (
      <div className='float-right'>
        {this.props.floodData.length > 1 && (
          <React.Fragment>
            <a href='#' onClick={this.toggleCollpase}>{this.state.collapsed ? 'Show more flood alerts' : 'Show less flood alerts'}</a>
            <span aria-hidden='true' role='presentation'> | </span>
          </React.Fragment>
        )}
        <a onClick={this.props.toggleFloodAdviceModal} href='#'>Flood advice</a>
      </div>
    )
    
    const alertMessage = this.state.collapsed ? (
      <div>
        <div>
          {this.props.floodData.length ? this.floodInfo(this.props.floodData[0], 0) : 'No recent flood alerts'}
        </div>
        {alertOptions}
      </div>
    ) : (
      <div>
        <div id='alert-banner-open'>
          {this.props.floodData.length && this.props.floodData.map((flood, index) => (
            this.floodInfo(flood, index)
          ))}
        </div>
        {alertOptions}
      </div>
    )
    
    return (
      <React.Fragment>
        <Alert 
          message={alertMessage} 
          showIcon={false}
          banner
          >
        </Alert>
        <FloodAdvice 
          modalOpen={this.props.floodAdviceModalOpen} 
          toggleModal={this.props.toggleFloodAdviceModal}
          />
      </React.Fragment>
    )
  }
}

export default FloodAlert
