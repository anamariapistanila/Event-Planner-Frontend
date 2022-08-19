import React, { useRef, useState} from 'react';
import { Marker } from 'google-maps-react';


import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
} from '@chakra-ui/react'
import {Autocomplete, DirectionsRenderer, GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import {FaLocationArrow,  FaTimes} from "react-icons/all";


const center = { lat: 46.770562, lng: 23.627147 }

function MapContainer() {



    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCudkOw-_MGmSrd0_8lyu1Dzzdp-xCAUd8",
        libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef()

    if (!isLoaded) {
        return <SkeletonText />
    }
    const Marker = props => {
        return <div className="SuperAwesomePin"/>
    }
    async function calculateRoute() {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destinationRef.current.value = ''
    }

    return (
        <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            h='100vh'
            w='100vw'
        >
            <Box position='absolute' left={0} top={0} h='100%' w='100%'>


                <GoogleMap
                    center={center}
                    zoom={17}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: true,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                >
                    {/*<Marker position={center} />*/}
                    <Marker position={center} icon={"https://maps.google.com/mapfiles/ms/icons/blue.png"}/>
                    {/*{directionsResponse && (*/}
                    {/*    <DirectionsRenderer directions={directionsResponse} />*/}
                    {/*)}*/}

                </GoogleMap>
            </Box>
            <Box
                p={4}
                borderRadius='lg'
                m={4}
                bgColor='white'
                shadow='base'
                minW='container.md'
                zIndex='1'
            >
                <HStack spacing={2} justifyContent='space-between'>
                    <Box flexGrow={1}>
                        <Autocomplete>
                            <Input type='text' placeholder='Origin:' ref={originRef} />
                        </Autocomplete>
                    </Box>
                    <Box flexGrow={1}>
                        <Autocomplete>
                            <Input
                                type='text'
                                placeholder='Destination:'
                                ref={destinationRef}
                            />
                        </Autocomplete>
                    </Box>

                    <ButtonGroup>
                        <Button color='black' type='submit' onClick={calculateRoute}>
                            Calculate Route
                        </Button>
                        <IconButton
                            color='black'
                            aria-label='center back'
                            icon={<FaTimes />}
                            onClick={clearRoute}
                        />
                    </ButtonGroup>
                </HStack>
                <HStack spacing={4} mt={4} justifyContent='space-between'>
                    <Text>Distance: {distance} </Text>
                    <Text>Duration: {duration} </Text>
                    <IconButton
                        aria-label='center back'
                        color='black'
                        icon={<FaLocationArrow />}
                        isRound
                        onClick={() => {
                            map.panTo(center)
                            map.setZoom(17)
                        }}
                    />
                </HStack>
            </Box>
        </Flex>


    )

}

export default MapContainer