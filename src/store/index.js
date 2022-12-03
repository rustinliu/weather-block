import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './modules/weather'
const store = configureStore({
  reducer: {
    weather: weatherReducer
  }
})

export default store
