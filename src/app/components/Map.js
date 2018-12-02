import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// HOC explanation https://tomchentw.github.io/react-google-maps/#usage--configuration
const Map = withScriptjs(withGoogleMap((props) => {
  const canterbury = {lat: 51.277260, lng: 1.080460};
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={canterbury}
    >
      <Marker position={canterbury} />
    </GoogleMap>
  )
}))

export default Map