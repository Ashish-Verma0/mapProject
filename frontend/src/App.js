import React, { useEffect, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import "./App.css"
import axios from "axios"
// import { format } from "timeago.js"

const App = () => {
  const [pins, setPins] = useState([])
  const [newPlace, setNewPlace] = useState(null)
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [viewState, setViewState] = React.useState({
    width: "100%",
    height: "100%",
    longitude: 46,
    latitude: 17,
    zoom: 3.5
  });

  useEffect(() => {
    getPins()
  }, [])

  const getPins = async () => {
    try {
      const res = await axios.get("http://localhost:8082/api/v1/all")
      setPins(res.data.user)
      console.log(res.data.user)
    } catch (error) {
      console.log(error.response)
    }
  }
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id)
    setViewState({ ...viewState, latitude: lat, longitude: long })
  }

  const handleAddDoubleClick = (e) => {
    const [long, lat] = e.lnglat;
    setNewPlace({
      lat, long
    })
  }
  return (
    <div>
      <Map
        {...viewState}
        mapboxAccessToken="pk.eyJ1Ijoic2NvdGhpcyIsImEiOiJjaWp1Y2ltYmUwMDBicmJrdDQ4ZDBkaGN4In0.sbihZCZJ56-fsFNKHXF8YQ"
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddDoubleClick}
        transitionDiration="100"
      >
        {pins.map((elem) => {
          const { userName, desc, lat, long, rating, title, createdAt, _id } = elem
          return (
            <>
              <Marker longitude={long} latitude={lat} offsetLeft={-20} offsetTop={-10} anchor="bottom" >

                <RoomIcon style={{ fontSize: viewState.zoom * 7, color: "slateblue", cursor: "pointer" }} onClick={() => handleMarkerClick(_id, lat, long)} />
              </Marker>

              {_id === currentPlaceId && (

                <Popup
                  longitude={long}
                  latitude={lat}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                  onClose={() => setCurrentPlaceId(null)}
                >
                  <div className='card'>
                    <label>Place</label>
                    <h4 className='place'>{title}</h4>
                    <label>Review</label>
                    <p className='desc'>{desc}</p>
                    <label>Rating</label>
                    <div className='stars'>
                      <StarIcon className='star' />
                      <StarIcon className='star' />
                      <StarIcon className='star' />
                      <StarIcon className='star' />
                      <StarIcon className='star' />
                    </div>
                    <label>Information</label>
                    <span className='username'>created by <b>{userName}</b></span>
                    <span className='date'>{createdAt}</span>
                  </div>
                </Popup>
              )}
            </>
          )
        })}
        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form>
                <label>Title</label>
                <label>Review</label>
                <label>Rating</label>
                <button>Add Pin</button>
              </form>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  )
}

export default App