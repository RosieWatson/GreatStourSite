import React from 'react'
import 'antd/dist/antd.css'
import '../styles/css/styles.css'
import { Layout } from 'antd'
import axios from 'axios'

import MainContentContainer from './MainContentContainer'
import SidebarContainer from './SidebarContainer'
import Header from './components/Header'

let geocoder

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      floodAdviceModalOpen: false,
      floodData: [],
      mapApiLoaded: false,
      selectedSensor: null,
      sensorData: [],
      sidebarCollapsed: false,
      systemAvailability: {
        online: true,
        message: null
      }
    }
    this.getFloodData = this.getFloodData.bind(this)
    this.getSensorData = this.getSensorData.bind(this)
    this.reverseGeocode = this.reverseGeocode.bind(this)
    this.selectSensor = this.selectSensor.bind(this)
    this.setMapApiLoaded = this.setMapApiLoaded.bind(this)
    this.toggleFloodAdviceModal = this.toggleFloodAdviceModal.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.toggleSystemAvailability = this.toggleSystemAvailability.bind(this)
  }
  
  // Set the sensor selected in the sidebar
  selectSensor(sensorId) {
    this.setState({
      sidebarCollapsed: false,
      selectedSensor: this.state.selectedSensor === sensorId ? null : sensorId
    })
  }
  
  // We need to track when the Google Maps API has been loaded
  // as we can't carry out operations until it has
  setMapApiLoaded() {
    this.getSensorData()
    this.getFloodData()
    // Poll the API every 15 minitues for updated sensor and flood info
    setInterval(() => {this.getSensorData(); this.getFloodData()}, 900000);
    this.setState({
      mapApiLoaded: true
    })
  }
  
  // Handle changes in system availability, including setting the unavailability message
  toggleSystemAvailability(value, message) {
    this.setState({
      systemAvailability: {
        online: value,
        message: message || null
      }
    })
  }
  
  toggleFloodAdviceModal() {
    this.setState({
      floodAdviceModalOpen: !this.state.floodAdviceModalOpen
    })
  }
  
  toggleSidebar() {
    this.setState({
      sidebarCollapsed: !this.state.sidebarCollapsed
    })
  }
  
  // Get all flood data
  getFloodData() {
    Promise.all([ 
      axios.get('api/govdata/fetch/floods'),
      axios.get('api/mqttdata/fetch/floods')
    ]).then(([govData, mqttData]) => {
      this.toggleSystemAvailability(true)
      if ((govData.data.errors).includes('FAILED_REFRESH_QUOTA_CHECK')) this.toggleSystemAvailability(false, 'We have not recieved an update from the goverment API recently, so this data may be out of date.')
      // Reverse Geocode the address for the MQTT flood info
      // https://developers.google.com/maps/documentation/javascript/geocoding#ReverseGeocoding
      geocoder = !geocoder ? new google.maps.Geocoder : geocoder;
      const mqttFloodData = mqttData.data.data;
      Promise.all(mqttFloodData.length && mqttFloodData.map(async (flood) => { 
        const address = await this.reverseGeocode(geocoder, flood.latitude, flood.longitude)
        return Object.assign({description: address}, flood)
      }))
      .then((mqttFloodDataWithAddress) => { 
        // Merge the MQTT flood data with the Gov flood data
        let floodData = govData.data.data.concat(mqttFloodDataWithAddress)
        
        // Sort by newest alerts first
        floodData.sort((floodA, floodB) => {
          return floodB.timestamp - floodA.timestamp
        })
        this.setState({
          floodData: floodData
        })
      })
      .catch((err) => {
        this.setState({
          floodData: govData.data.data.concat(mqttFloodData)
        })
      })
    })
  }
  
  // Get all sensor data
  getSensorData() {
    Promise.all([ 
      axios.get('api/govdata/fetch/sensors'),
      axios.get('api/mqttdata/fetch/sensors')
    ]).then(([govData, mqttData]) => {
      this.toggleSystemAvailability(true)
      if ((govData.data.errors).includes('FAILED_REFRESH_QUOTA_CHECK')) this.toggleSystemAvailability(false, 'We have not recieved an update from the goverment API recently, so this data may be out of date.')
      // Reverse Geocode the address for the MQTT sensors
      geocoder = !geocoder ? new google.maps.Geocoder : geocoder;
      const mqttSensorData = mqttData.data.data;
      Promise.all(mqttSensorData.length && mqttSensorData.map(async (sensor) => { 
        const address = await this.reverseGeocode(geocoder, sensor.latitude, sensor.longitude)
        return Object.assign({description: address}, sensor)
      }))
      .then((mqttSensorDataWithAddress) => { 
        // Merge the MQTT sensor data with the Gov sensor data
        const sensorData = govData.data.data.concat(mqttSensorDataWithAddress)
        this.setState({
          sensorData: sensorData
        })
      })
      .catch((err) => {
        this.setState({
          sensorData: govData.data.data.concat(mqttSensorData)
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
    const { sensorData } = this.state
    
    return (
      <div>
        <Layout id='layout-root'>
          <a className='skip-link' href='#main-content'>Skip to content</a>
          <Header 
            getFloodData={this.getFloodData}
            toggleSystemAvailability={this.toggleSystemAvailability}
          />
          <Layout id="content-root">
            <SidebarContainer
              sensorData={sensorData}
              selectSensor={this.selectSensor}
              selectedSensor={this.state.selectedSensor}
              collapsed={this.state.sidebarCollapsed}
              systemAvailability={this.state.systemAvailability}
              toggleFloodAdviceModal={this.toggleFloodAdviceModal}
              toggleSidebar={this.toggleSidebar}
            />
            <MainContentContainer 
              floodAdviceModalOpen={this.state.floodAdviceModalOpen}
              floodData={this.state.floodData}
              mapApiLoaded={this.state.mapApiLoaded} 
              selectSensor={this.selectSensor} 
              sensorData={sensorData} 
              setMapApiLoaded={this.setMapApiLoaded}
              toggleFloodAdviceModal={this.toggleFloodAdviceModal}
            />
          </Layout>
        </Layout>
      </div>
    )
  }       
}

export default App
