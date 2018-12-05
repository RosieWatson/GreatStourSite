import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import { DatePicker } from "antd";

import Search from './Search'
import Marker from './Marker'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            mapApiLoaded: false,
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
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });
    };
  
  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
    return (
      <div id="map-container">
        <div id='map-utility'>
          {mapApiLoaded && <Search map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />}
          <DatePicker size="large"/>
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
                riverValue={sensor.value}
              />
            ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;