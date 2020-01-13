import React, { useState, useEffect } from 'react'
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer, Polyline } from "react-google-maps"
import PubNubService from '../../utils/PubNubService'
import PubNub from 'pubnub'

const key = 'AIzaSyDRc0P0ozp5BU98gDG06OXbFaGk3OiOYxw'
const GmapURL = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`

const PubNubPublishKey = "pub-c-79890746-813e-461c-8a18-c33bd2309b50"
const PubNubSubscribeKey = "sub-c-3a83e92a-35b2-11ea-81d4-f6d34a0dd71d"
//pub-c-79890746-813e-461c-8a18-c33bd2309b50
//sub-c-3a83e92a-35b2-11ea-81d4-f6d34a0dd71d
const ChannelSkiperSilver = { channel: "SkiperDrive_1", img: "https://storage.googleapis.com/app_user_bucket/skiper-silver.png" }
const ChannelSkiperGold = { channel: "SkiperDrive_2", img: "https://storage.googleapis.com/app_user_bucket/skiper-golden.png" }
const ChannelSkiperVip = { channel: "SkiperDrive_3", img: "https://storage.googleapis.com/app_user_bucket/skiper-vip.png" }
const ChannelSkiperPresident = { channel: "SkiperDrive_4", img: "https://storage.googleapis.com/app_user_bucket/skiper-president.png" }



const mapstyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
    }
]

const Mapa = compose(
    withProps({
        googleMapURL: GmapURL,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            /*const DirectionsService = new window.google.maps.DirectionsService();

            DirectionsService.route({
                origin: new window.google.maps.LatLng({ lat: 11.9847679, lng: -86.0973747 }),
                destination: new window.google.maps.LatLng({ lat: 12.0320281, lng: -86.1929273 }),
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            })*/
        }
    })
)((props) => {

    const [pubnubSilver, setPubNubSilver] = useState()
    const [pubnubGold, setPubNubGold] = useState()
    const [pubnubPresident, setPubNubPresident] = useState()
    const [pubnubVip, setPubNubVip] = useState()

    const [silverUsers, setSilverUsers] = useState([])
    const [goldUsers, setGoldUsers] = useState([])
    const [presidentUsers, setPresidentUsers] = useState([])
    const [vipUsers, setVipUsers] = useState([])

    const [markers, setMarkers] = useState()
    const categoryChannel = ChannelSkiperSilver

    useEffect(() => {
        let allusers = [].concat(silverUsers, goldUsers, presidentUsers, vipUsers)
        let markers = []

        console.log("Los users", allusers)

        markers = markers.concat(silverUsers.map(item => {
            if (item.coords)
                return createMarker(item.firstname + ' ' + item.lastname, item.coords.latitude, item.coords.longitude, ChannelSkiperSilver)
        }))

        markers = markers.concat(goldUsers.map(item => {
            if (item.coords)
                return createMarker(item.firstname + ' ' + item.lastname, item.coords.latitude, item.coords.longitude, ChannelSkiperGold)
        }))

        markers = markers.concat(presidentUsers.map(item => {
            if (item.coords)
                return createMarker(item.firstname + ' ' + item.lastname, item.coords.latitude, item.coords.longitude, ChannelSkiperPresident)
        }))

        markers = markers.concat(vipUsers.map(item => {
            if (item.coords)
                return createMarker(item.firstname + ' ' + item.lastname, item.coords.latitude, item.coords.longitude, ChannelSkiperVip)
        }))

        setMarkers(markers)
    }, [silverUsers, goldUsers, presidentUsers, vipUsers])

    const createMarker = (key, lat, lon, category) => {
        var icon = {
            url: category.img, // url
            scaledSize: new window.google.maps.Size(40, 40), // scaled size
            origin: new window.google.maps.Point(0, 0), // origin
            anchor: new window.google.maps.Point(0, 0), // anchor
            labelOrigin: new window.google.maps.Point(25, -10)
        }

        var label = {
            text: key,
            color: '#000',
            fontSize: '14px',
            fontWeight: 'bold'
        }

        return (
            <Marker label={label} position={{ lat: lat, lng: lon }} icon={icon} />
        )
    }

    const createPubnubService = (category, hooksetter, userSetter) => {
        const pub = new PubNub({
            publishKey: PubNubPublishKey,
            subscribeKey: PubNubSubscribeKey,
            presenceTimeout: 300
        })
        const service = new PubNubService({
            pubnub: pub,
            channel: category.channel,
            prescb: (pres) => {
                console.log("El pres", pres)
                //console.log("Los Users  ", service.getUsers())
                if (service)
                    userSetter(service.getUsers())
            }
        })
        hooksetter(service)
    }

    useEffect(() => {
        if (!pubnubSilver)
            createPubnubService(ChannelSkiperSilver, setPubNubSilver, setSilverUsers)
        if (!pubnubGold)
            createPubnubService(ChannelSkiperGold, setPubNubGold, setGoldUsers)
        if (!pubnubPresident)
            createPubnubService(ChannelSkiperPresident, setPubNubPresident, setPresidentUsers)
        if (!pubnubVip)
            createPubnubService(ChannelSkiperVip, setPubNubVip, setVipUsers)

        /*const service = new PubNubService({
            pubnub: pub,
            channel: categoryChannel.channel,
            prescb: (pres) => {
                console.log("El pres", pres)
                console.log("Los Users: ", service.getUsers())
                if (service)
                    setSilverUsers(service.getUsers())
            }
        })
 
        setPubNubSilver(service)*/

    }, [])

    const printHistory = _ => {
        console.log("el GOOGLE", window.google)
        console.log(pubnubSilver.getUsers())
        pubnubSilver.fetchHistory(10, message => console.log(message))
    }

    const mi_casa = { lat: 11.9847679, lng: -86.0973747 }
    const casa_jefe = { lat: 12.0320281, lng: -86.1929273 }
    
    return (<>
        
        <GoogleMap 
            defaultOptions={{styles: mapstyle}}
            defaultZoom={13}
            defaultCenter={casa_jefe}
        >
            {markers}
        </GoogleMap>
    </>)
})

export default Mapa