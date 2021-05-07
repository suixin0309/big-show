import React, { createContext, useState, useEffect } from 'react'
import data from './data.js'

const RoomContext = new createContext({});

const getData = () => {
  const rooms = data.map(item => {
    const id = item.sys.id
    const images = item.fields.images.map(image => image.fields.file.url)
    const room = {...item.fields, id, images}
    return room
  })
  const featuredRooms = rooms.filter(room => room.featured);
  return {rooms, featuredRooms, loading: false, sortedRooms: []}
}

const RoomProvider = props => {
    // const [state, setState] = useState(getData)
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([])
    const [featuredRooms, setFeaturedRooms] = useState([])
    const [sortedRooms, setSortedRooms] = useState([])
    const [roomFilter, setRoomFilter] = useState({
      type: 'all',
      capacity: 1,
      minPrice: 0,
      maxPrice: 0,
      minSize: 0,
      maxSize: 0,
      breakfast: false,
      pets: false
    })
    useEffect(() => {
      const rooms = data.map(item => {
        const id = item.sys.id
        const images = item.fields.images.map(image => image.fields.file.url)
        const room = {...item.fields, id, images}
        return room
      })
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      setRoomFilter({...roomFilter, price: maxPrice, maxPrice, maxSize})
      setFeaturedRooms(rooms.filter(room => room.featured))
      setRooms(rooms)
      setSortedRooms(rooms)
      setLoading(false)
    }, [])

    const handleChange = event => {
      const target = event.target
      const name = target.name
      const value = target.type === 'checkbox' ? target.checked : target.value
      setRoomFilter({...roomFilter, [name]: value})

      let {
        type,
        capacity,
        price,
        minSize,
        maxSize,
        breakfast,
        pets
      } = roomFilter
      let tempRooms = [...rooms]
      if (type !== 'all') {
        tempRooms = tempRooms.filter(room => room.type === type)
      }
      if (capacity !== 1) {
        tempRooms = tempRooms.filter(room => room.capacity >= capacity)
      }
      tempRooms = tempRooms.filter(room => room.price <= price)
      tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
      if (breakfast) {
        tempRooms = tempRooms.filter(room => room.breakfast === true)
      }
      if (pets) {
        tempRooms = tempRooms.filter(room => room.pets === true)
      }
      setSortedRooms(tempRooms)
    }
    const getRoom = slug => rooms.find(room => room.slug === slug)
    return (
        <RoomContext.Provider
        value={{
          getRoom, loading, rooms, featuredRooms, sortedRooms, ...roomFilter, handleChange
        }}
      >
        {props.children}
      </RoomContext.Provider>
    )
}

// const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomContext}
