import React from 'react'
import { Layout } from 'antd';

import Map from './components/Map'

class MainContentContainer extends React.Component {
  render () {
    return (
      <Layout.Content>
        <Map 
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBetLRAD6Cy4rbI9fDtzwIXdWB-C3FB6XA&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          />
      </Layout.Content>
    )
  }
}

export default MainContentContainer