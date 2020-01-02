import React from 'react'
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer,Polyline } from "react-google-maps"

const key = 'AIzaSyDQt6Y2ZyUDIjuZA6VVwnW2uHjIgL8Okck'
const GmapURL = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`

const Mapa = compose(
    withProps({
        googleMapURL: GmapURL,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new window.google.maps.DirectionsService();

            /*DirectionsService.route({
                origin: new window.google.maps.LatLng(41.8507300, -87.6512600),
                destination: new window.google.maps.LatLng(41.8525800, -87.6514100),
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });*/
        }
    })
)((props) => {

    console.log(window.google)
    console.log(window)

    const markers = _ => {
        return (
            props.markers.map((item,index) => {
                return <Marker key={index} position={item}/>
            })
        )
    }

    const lines = _ => {
        return (
            props.lines.map((item,index) => {
                return <Polyline key={index} path={[item[0],item[1]]}/>
            })
        )
    }

    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={props.center}
        >
            <DirectionsRenderer directions={props.directions} />
            {markers()}
            {lines()}
        </GoogleMap>
    )
})

const gmapdash = _ => {
    const mi_casa = { lat: 11.9847679, lng: -86.0973747 }
    const casa_jefe = { lat: 12.0320281, lng: -86.1929273 }
    const center = mi_casa
    return (<>
        <Mapa center={center} 
        markers={[mi_casa,casa_jefe]}
        directions={[mi_casa, casa_jefe]} 
        lines={[[mi_casa,casa_jefe]]}
        />
    </>)
}

export default gmapdash