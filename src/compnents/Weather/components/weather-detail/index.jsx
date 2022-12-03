import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { DetailWrapper } from './style'
import dayjs from 'dayjs'

const WeatherDetail = memo((props) => {
  const { detail } = props
  return (
    <DetailWrapper>
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
    </DetailWrapper>
  )
})

WeatherDetail.propTypes = {
  detail: PropTypes.object
}

export default WeatherDetail
