import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import { DatePicker } from 'antd'

import Search from './Search'
import Marker from './Marker'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mapInstance: null,
      mapApi: null,
    };
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
  
  render() {
    const { places, mapInstance, mapApi } = this.state
    const {mapApiLoaded} = this.props
    
    return (
      <div id='map-container'>
        <div id='map-utility'>
          {mapApiLoaded && <Search map={mapInstance} mapApi={mapApi}/>}
          <DatePicker size='large'/>
          <a className='skip-link' href='#sidebar'>Skip past map</a>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ 
            key: 'AIzaSyBetLRAD6Cy4rbI9fDtzwIXdWB-C3FB6XA',
            libraries: ['places', 'geometry']
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals={true} 
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          >
          {this.props.sensorData.length && this.props.sensorData.map((sensor, id) => (
            <Marker
              key={`sensor-${id}`}
              description={sensor.description}
              lat={sensor.latitude}
              lng={sensor.longitude}
              selectSensor={this.props.selectSensor}
              riverValue={sensor.value}
              sensorId={sensor.id}
              />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;