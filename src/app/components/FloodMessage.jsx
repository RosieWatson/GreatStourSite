// Besed on react-truncate 'Integrated example for toggling "read more" text'
// https://github.com/One-com/react-truncate

import React from 'react'
import Truncate from 'react-truncate'

class FloodMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      truncated: false
    }
    
    this.handleTruncate = this.handleTruncate.bind(this)
    this.toggleLines = this.toggleLines.bind(this)
  }
  
  handleTruncate(truncated) {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated
      })
    }
  }
  
  toggleLines(event) {
    event.preventDefault()
    
    this.setState({
      expanded: !this.state.expanded
    })
  }
  
  render () {
    const { expanded, truncated } = this.state
    
    return (
      <div className='mb-2'>
        <Truncate
          lines={!expanded && 1}
          ellipsis={(
            <span>... <a href='#' onClick={this.toggleLines}>Read more</a></span>
          )}
          onTruncate={this.handleTruncate}
          >
          <span>{this.props.message}</span>
        </Truncate>
        {!truncated && expanded && (
          <span> <a href='#' onClick={this.toggleLines}>Read less</a></span>
        )}
      </div>
    )
  }
}

export default FloodMessage
