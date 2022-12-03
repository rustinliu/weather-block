import { fetchWeatherData } from '@/store/modules/weather'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { CityWrapper } from './style'

const WeatherCity = memo((props) => {
  const { city } = props
  const dispatch = useDispatch()
  const handleCity = _.debounce((e) => {
    dispatch(fetchWeatherData(e.target.value))
  }, 500)
  return (
    <CityWrapper>
      <div className="search">
        <div className="cityselect">city:{city.name}</div>
        <div>
          <input defaultValue="Shenzhen" onChange={(e) => handleCity(e)} />
        </div>
      </div>
    </CityWrapper>
  )
})

WeatherCity.propTypes = {
  city: PropTypes.object
}

export default WeatherCity
