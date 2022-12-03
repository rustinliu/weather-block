import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCityList, currentWeather, nextDaysWeather } from '@/api/weather'

export const fetchWeatherData = createAsyncThunk('fetchData', (payload = 'shenzhen', { dispatch, getState }) => {
  ;(async function () {
    const {
      data: { location }
    } = await getCityList({ location: payload })
    if (location) {
      dispatch(changeCityAction(location[0]))
      const {
        data: { now }
      } = await currentWeather({ location: getState().weather.city.id })
      dispatch(changeDetailAction(now))
      const {
        data: { daily }
      } = await nextDaysWeather(7, { location: getState().weather.city.id })
      dispatch(changeWeatherGroupAction(daily))
    }
  })()
})
const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: { name: 'ShenZhen' },
    detail: {},
    weatherGroup: []
  },
  reducers: {
    changeCityAction(state, { payload }) {
      state.city = payload
    },
    changeDetailAction(state, { payload }) {
      state.detail = payload
    },
    changeWeatherGroupAction(state, { payload }) {
      state.weatherGroup = payload
    }
  }
})

export const { changeCityAction, changeDetailAction, changeWeatherGroupAction } = weatherSlice.actions
export default weatherSlice.reducer
