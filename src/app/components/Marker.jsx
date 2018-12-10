import React from 'react'
import SVGmarker from './SVGmarker'

const Marker = props => (
  <SVGmarker 
    sensorId={props.sensorId}
    selectSensor={props.selectSensor} 
    riverValue={props.riverValue} 
    sensorDescription={props.description} 
    />
)

export default Marker