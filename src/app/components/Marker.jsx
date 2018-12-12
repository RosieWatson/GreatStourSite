import React from 'react'
import SVGmarker from './SVGmarker'

const Marker = props => (
  <SVGmarker 
    riverValue={props.riverValue} 
    selectSensor={props.selectSensor} 
    sensorDescription={props.description} 
    sensorId={props.sensorId}
    />
)

export default Marker