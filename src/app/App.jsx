import React from 'react'
import 'antd/dist/antd.css'
import '../styles/css/styles.css'
import { Layout, Icon, DatePicker, Button, Input, Row, Col } from 'antd'
import axios from 'axios'

import MainContentContainer from './MainContentContainer'
import SidebarContainer from './SidebarContainer'
import Header from './components/Header'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sensorData: [],
      mapApiLoaded: false,
      selectedSensor: null,
      systemAvailability: {
        online: true,
        message: null
      }
    }
    this.selectSensor = this.selectSensor.bind(this)
    this.reverseGeocode = this.reverseGeocode.bind(this)
    this.setMapApiLoaded = this.setMapApiLoaded.bind(this)
    this.sensorData = this.sensorData.bind(this)
    this.toggleSystemAvailability = this.toggleSystemAvailability.bind(this)
  }
  
  // Set the sensor selected in the sidebar
  selectSensor(sensorId) {
    this.setState({
      selectedSensor: this.state.selectedSensor === sensorId ? null : sensorId
    })
  }
  
  // We need to track when the Google Maps API has been loaded
  // as we can't carry out operations until it has
  setMapApiLoaded() {
    this.sensorData()
    this.setState({
      mapApiLoaded: true
    })
  }
  
  // Handle changes in system availability, including setting the unavailability message
  toggleSystemAvailability(message) {
    if(this.state.systemAvailability.online) {
      this.setState({
        systemAvailability: {
          online: false,
          message: message || null
        }
      })
    } else {
      this.setState({
        systemAvailability: {
          online: true, 
          message: null
        }
      })
    }
  }
  
  // Get all sensor data
  sensorData() {
    Promise.all([ 
      axios.get('api/govdata/fetch/sensors'),
      axios.get('api/mqttdata/fetch/sensors')
    ]).then(([govData, mqttData]) => {
      // Reverse Geocode the address for the MQTT sensors
      // https://developers.google.com/maps/documentation/javascript/geocoding#ReverseGeocoding
      let geocoder = new google.maps.Geocoder;
      const mqttSensorData = mqttData.data.data;
      Promise.all(mqttSensorData.map(async (sensor) => { 
        const address = await this.reverseGeocode(geocoder, sensor.latitude, sensor.longitude)
        return Object.assign({description: address}, sensor)
      }))
      .then((mqttSensorDataWithAddress) => { 
        // Merge the MQTT sensor data with the Gov sensor data
        let sensorData = govData.data.data.concat(mqttSensorDataWithAddress)
        this.setState({
          sensorData: sensorData
        })
      })
    })
  }
  
  // Gets the address according to a set of coordinates
  reverseGeocode(geocoder, latitude, longitude) {
    return new Promise((resolve, reject) => {
      geocoder.geocode({'location': {lat: latitude, lng: longitude}}, (results, status) => {
        if(status === 'OK') {
          const address = results.find((result) => {
            return result.types.includes('route')
          })
          resolve(address ? address.address_components[0].long_name : '')
        } else {
          reject()
        }
      })
    }) 
  }
  
  render() {
    const { Content, Footer } = Layout
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker
    const { sensorData } = this.state
    
    return (
      <div>
        <Layout id="layout-root">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Header toggleSystemAvailability={this.toggleSystemAvailability}/>
          <Layout>
            <MainContentContainer 
              selectSensor={this.selectSensor} 
              sensorData={sensorData} 
              mapApiLoaded={this.state.mapApiLoaded} 
              setMapApiLoaded={this.setMapApiLoaded} 
              />
            <SidebarContainer 
              sensorData={sensorData} 
              selectSensor={this.selectSensor}
              selectedSensor={this.state.selectedSensor}
              systemAvailability={this.state.systemAvailability} 
              />
          </Layout>
          <Footer>
            Great Stour River - Flood Monitor
            <br/>
            This uses Environment Agency flood and river level data from the real-time data API (Beta)
          </Footer>
        </Layout>
      </div>
    )
  }       
}

export default App
