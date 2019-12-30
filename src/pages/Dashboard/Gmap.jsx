import { GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = (props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>

const gmapdash = _ => {                                                                                                                                                                                
    return (
        <>
            <MyMapComponent isMarkerShown />
            <MyMapComponent isMarkerShown={false} />
        </>
    )
}

export default gmapdash