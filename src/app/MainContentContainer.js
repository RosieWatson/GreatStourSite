import React from 'react'
import { Layout } from 'antd';

class MainContentContainer extends React.Component {
  render () {
    return (
      <Layout.Content>
        <div id="content-container">
          <div id="map-container">
            <div id="map-overlay">
              
            </div>
            
            <div id="map">
              
            </div>
          </div>
          
        </div>
      </Layout.Content>
    )
  }
}

export default MainContentContainer