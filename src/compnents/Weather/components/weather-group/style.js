import styled from 'styled-components'

export const GroupWrapper = styled.div`
  .weathergroup {
    width: 800px;
    height: 200px;
    ul {
      display: flex;
      flex-flow: nowrap row;
      li {
        display: flex;
        margin-top: -5%;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        i {
          font-size: 75px;
        }
      }
    }
  }
`
