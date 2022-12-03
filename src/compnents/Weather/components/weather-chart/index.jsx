import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { ChartWrapper } from './style'
import ReactECharts from 'echarts-for-react'
import dayjs from 'dayjs'

const WeatherChart = memo((props) => {
  const { weatherGroup } = props
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
  return (
    <ChartWrapper>
      <div className="chart">
        <ReactECharts option={options} notMerge={true} lazyUpdate={false} style={{ height: '400px' }} />
      </div>
    </ChartWrapper>
  )
})

WeatherChart.propTypes = {
  weatherGroup: PropTypes.array
}

export default WeatherChart
