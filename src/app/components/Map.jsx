import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import { DatePicker } from 'antd'
import moment from 'moment'
import axios from 'axios'

import Search from './Search'
import Marker from './Marker'
import SubscribeModal from './SubscribeModal'
import UnsubscribeModal from "./UnsubscribeModal";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
let geocoder

class Map extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mapInstance: null,
      mapApi: null,
      sensorData: props.sensorData
    };
  }

  componentDidMount() {
    this.setState({sensorData: this.props.sensorData});
  }
  
  static defaultProps = {
    center: {lat: 51.277260, lng: 1.080460},
    zoom: 11
  };
  
  apiHasLoaded = (map, maps) => {
    this.setState({
      mapInstance: map,
      mapApi: maps,
    }, this.props.setMapApiLoaded);
  };

  // Get all sensor data for a specific day
  getSensorData(date) {
    Promise.all([
      axios.post('api/govdata/fetch/specificDate', {
        date: date
      }),
      axios.post('api/mqttdata/fetch/specificDate', {
        date: date
      })
    ]).then(([govData, mqttData]) => {
      // Reverse Geocode the address for the MQTT sensors
      geocoder = !geocoder ? new google.maps.Geocoder : geocoder;
      const mqttSensorData = mqttData.data.data;
      Promise.all(mqttSensorData.map(async (sensor) => {
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

  dateChange = (d, dString) => {
    this.getSensorData(dString)
    this.setState(this.state)
  }

  disabledDate(current) {
    return current && current > moment().endOf('day')
  }

  render() {
    const { places, mapInstance, mapApi, sensorData } = this.state
    const { mapApiLoaded } = this.props
    
    return (
      <div id='map-container'>
        <div id='map-utility'>
          {mapApiLoaded && <Search map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />}
          <DatePicker
            value={moment()}
            disabledDate={this.disabledDate}
            onChange={this.dateChange}
          />
          <a className='skip-link' href='#sidebar'>Skip past map</a>
          <div id='button-utility'>
            <SubscribeModal/>
            <UnsubscribeModal/>
          </div>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ 
            key: 'AIzaSyBetLRAD6Cy4rbI9fDtzwIXdWB-C3FB6XA',
            libraries: ['places', 'geometry']
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          yesIWantToUseGoogleMapApiInternals={true} 
          >
          {sensorData.length && sensorData.map((sensor, id) => (
            <Marker
              description={sensor.description}
              key={`sensor-${id}`}
              lat={sensor.latitude}
              lng={sensor.longitude}
              riverValue={sensor.value}
              selectSensor={this.props.selectSensor}
              sensorId={sensor.id}
              />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;