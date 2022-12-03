import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { GroupWrapper } from './style'

const WeatherGroup = memo((props) => {
  const { weatherGroup } = props
  return (
    <GroupWrapper>
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
    </GroupWrapper>
  )
})

WeatherGroup.propTypes = {
  weatherGroup: PropTypes.array
}

export default WeatherGroup
