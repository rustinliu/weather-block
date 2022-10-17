import { createContext, useState, useEffect } from 'react'

import { getCityList } from '../api/weather'
export const cityContext = createContext()
export const { Provider, Consumer } = cityContext

export default function Content(props) {
  const [city, setCity] = useState({})

  return <Provider value={{ city, setCity }}>{props.children}</Provider>
}
