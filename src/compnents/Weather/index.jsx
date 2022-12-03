import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { WeatherWrapper } from './style'
import WeatherChart from './components/weather-chart'
import WeatherCity from './components/weather-city'
import WeatherDetail from './components/weather-detail'
import WeatherGroup from './components/weather-group'
import { fetchWeatherData } from '@/store/modules/weather'
import 'qweather-icons/font/qweather-icons.css'

const Weather = memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchWeatherData())
  }, [])
  const { city, detail, weatherGroup } = useSelector(
    (state) => ({
      city: state.weather.city,
      detail: state.weather.detail,
      weatherGroup: state.weather.weatherGroup
    }),
    shallowEqual
  )
  return (
    <WeatherWrapper>
      <div className="leftside">
        {city && <WeatherCity city={city}></WeatherCity>}
        {detail && <WeatherDetail detail={detail}></WeatherDetail>}
      </div>
      <div className="rightside">
        {weatherGroup && <WeatherChart weatherGroup={weatherGroup}></WeatherChart>}
        {weatherGroup && <WeatherGroup weatherGroup={weatherGroup}></WeatherGroup>}
      </div>
    </WeatherWrapper>
  )
})

export default Weather
