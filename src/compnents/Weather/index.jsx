import { useContext, useEffect, useRef, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import dayjs from 'dayjs'
import 'qweather-icons/font/qweather-icons.css'
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
      left: '5%'
    },
    grid: {
      top: '10%',
      bottom: '7%',
      left: '7%',
      right: '7%'
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
      type: 'value',
      scale: true
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
        <div className="leftside">
          <div className="search">
            <div className="cityselect">city:{city.adm2 || ''}</div>
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
            <div>{dayjs(detail.obsTime).format('h:mm A,ddd,MMM D,YYYY')}</div>
            <div>
              <i className={`qi-${detail.icon}`}></i>
            </div>
            <div>
              {detail.temp}
              <span>℃</span>
            </div>
            <div>{detail.text}</div>
            <div>humidity:{detail.humidity}</div>
            <div>windSpeed:{detail.windSpeed}</div>
          </div>
        </div>
        <div className="rightside">
          <div className="chart">
            <ReactECharts option={options} notMerge={true} lazyUpdate={false} style={{ height: '400px' }} />
          </div>
          <div className="weathergroup">
            <ul>
              {weatherGroup.slice(0, 4).reduce((pre, cur, index) => {
                return [
                  ...pre,
                  <li key={index}>
                    <div>
                      <i className={`qi-${cur.iconDay}`}></i>
                    </div>
                    <div>Date:{cur.fxDate}</div>
                    <div>maxTemp:{cur.tempMax}</div>
                    <div>minTemp:{cur.tempMin}</div>
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
