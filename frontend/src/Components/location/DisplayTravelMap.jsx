import React, { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Box, Paper } from '@mui/material'

export function DisplayTravelMap({ locations }) {
  const coords = locations.map((lc) => lc.coordinations)
  if (!coords || coords.length === 0) {
    return null
  }

  function FitBoundsMap() {
    const map = useMap()
    useEffect(() => {
      const bounds = L.latLngBounds(coords)
      map.fitBounds(bounds)
    }, [map, coords])

    return null
  }

  return (
    <Box p={3} width="100%">
      <Paper elevation={3}>
        <MapContainer
          center={coords[0]}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
          scrollWheelZoom={true}
          dragging={true}
          touchZoom={true}
          doubleClickZoom={true}
          zoomControl={true}
          attributionControl={false}
          keyboard={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {coords.map((coord, index) => (
            <Marker key={index} position={coord}>
              <Popup>{locations[index].name}</Popup>
            </Marker>
          ))}
          <Polyline positions={coords} color="red" />
          <FitBoundsMap />
        </MapContainer>
      </Paper>
    </Box>
  )
}
