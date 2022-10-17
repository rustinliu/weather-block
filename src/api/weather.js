import request from '../utils/request'
export function getCityList(data) {
  return request({
    url: 'https://geoapi.qweather.com/v2/city/lookup',
    params: data
  })
}
export function currentWeather(data) {
  return request({
    url: 'https://devapi.qweather.com/v7/weather/now',
    params: data
  })
}
export function nextDaysWeather(day, data) {
  return request({
    url: `https://devapi.qweather.com/v7/weather/${day}d`,
    params: data
  })
}
