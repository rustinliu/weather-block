import styled from 'styled-components'

export const DetailWrapper = styled.div`
  .detail {
    display: flex;
    position: relative;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 500px;
    div:nth-child(1) {
      color: #696969;
      padding-bottom: 200px;
    }
    div:nth-child(2) {
      position: absolute;
      top: 157px;
      left: 90px;
      font-size: 100px;
    }
    div:nth-child(3) {
      position: absolute;
      font-size: 70px;
      top: 176px;
      right: 100px;
      span {
        position: absolute;
        top: 0;
        font-size: 30px;
      }
    }
    div:nth-child(4) {
      position: absolute;
      top: 280px;
      font-size: 40px;
    }
  }
`
