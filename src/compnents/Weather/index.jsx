import { useContext, useEffect, useRef, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import dayjs from 'dayjs'

import { cityContext } from '../Content'

import { getCityList, currentWeather, nextDaysWeather } from '../../api/weather'
import './index.scss'

export default function Weather() {
  const { city, setCity } = useContext(cityContext)
  const [detail, setDetail] = useState({})
  const [weatherGroup, setWeatherGroup] = useState([])
  const flag = useRef(true)
  const options = {
    title: {
      text: 'Temperature',
      fontWeight: 'bold',
      top: '100px',
      left: '40px'
    },
    grid: {
      top: '150px',
      left: '50px',
      width: '700px',
      height: '300px'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: weatherGroup.map((item, index) => {
        if (index === 0) return 'today'
        return dayjs(item.fxDate, 'YYYY-MM-DD').format('dddd')
      })
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'maxTemp',
        data: weatherGroup.map((item) => Number(item.tempMax)),
        type: 'line',
        showSymbol: false,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
          color: '#5596F6'
        },
        areaStyle: {
          color: '#5596F6',
          opacity: 0.5
        },
        emphasis: {
          disabled: true
        }
      },
      {
        name: 'minTemp',
        data: weatherGroup.map((item) => Number(item.tempMin)),
        type: 'line',
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 5,
        smooth: true,
        lineStyle: {
          color: '#81C996'
        },
        areaStyle: {
          color: '#81C996',
          opacity: 0.6
        },
        emphasis: {
          disabled: true
        }
      }
    ],
    tooltip: {
      show: true,
      trigger: 'axis',
      lineStyle: {
        type: 'line'
      },
      axisPointer: {
        type: 'none',
        axis: 'auto',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    }
  }
  const handleCity = (e) => {
    getCityList({
      location: e.target.value,
      key: '607e1e2275584d88b018b89410b3f0d0',
      lang: 'en'
    })
      .then(({ data: res }) => {
        if (res.code !== '200') return console.log('输入错误')
        setCity(res.location[0])
      })
      .catch(() => {
        console.error('获取城市失败')
      })
  }
  useEffect(() => {
    getCityList({
      location: 'London',
      key: '607e1e2275584d88b018b89410b3f0d0',
      lang: 'en'
    })
      .then(({ data: res }) => {
        if (res.code === '200') {
          setCity(res.location[0])
        }
      })
      .catch(() => {
        console.error('获取城市失败')
      })
  }, [])
  useEffect(() => {
    if (flag.current === true) {
      flag.current = !flag.current
      return
    }
    currentWeather({
      location: city.id,
      key: '607e1e2275584d88b018b89410b3f0d0',
      lang: 'en'
    })
      .then(({ data: res }) => {
        setDetail(res.now)
      })
      .catch(() => {
        console.error('获取详情失败')
      })
    nextDaysWeather(7, {
      location: city.id,
      key: '607e1e2275584d88b018b89410b3f0d0',
      lang: 'en'
    })
      .then(({ data: res }) => {
        setWeatherGroup(res.daily)
      })
      .catch(() => {
        console.error('获取后续天气失败')
      })
  }, [city])
  return (
    <>
      <div className="weather-warpper">
        <div style={{ float: 'left' }}>
          <div className="search">
            <div>city:{city.adm2 || ''}</div>
            <div>
              <input
                type="text"
                defaultValue="London"
                onBlur={(e) => {
                  handleCity(e)
                }}
              />
            </div>
          </div>
          <div className="detail">
            <div>now:{detail.obsTime}</div>
            <div>temp:{detail.temp}</div>
            <div>feelslike:{detail.feelsLike}</div>
            <div>humidity:{detail.humidity}</div>
            <div>windSpeed:{detail.windSpeed}</div>
          </div>
        </div>
        <div style={{ float: 'right' }}>
          <div className="chart">
            <ReactECharts option={options} style={{ height: '100%', width: '100%' }} notMerge={true} />
          </div>
          <div className="weathergroup">
            <ul>
              {weatherGroup.slice(0, 4).reduce((pre, cur, index) => {
                return [
                  ...pre,
                  <li key={index}>
                    <div>fxDate:{cur.fxDate}</div>
                    <div>tempMax:{cur.tempMax}</div>
                    <div>tempMin:{cur.tempMin}</div>
                    <div>humidity:{cur.humidity}</div>
                  </li>
                ]
              }, [])}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
