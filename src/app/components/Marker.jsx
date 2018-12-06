import React from 'react';
import SVGmarker from './SVGmarker.jsx'

const Marker = props => (
  <div><SVGmarker riverValue={props.riverValue} /></div>
);

export default Marker;