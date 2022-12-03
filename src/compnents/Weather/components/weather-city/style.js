import styled from 'styled-components'

export const CityWrapper = styled.div`
  .search {
    width: 400px;
    height: 300px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    .cityselect {
      font-size: 50px;
    }
    input {
      width: 250px;
      height: 40px;
      font-size: 30px;
      text-align: center;
      outline: none;
      background-color: #f3f6fa;
      border: none;
      border-radius: 1em;
      box-shadow: 0 1rem 3rem rgb(31 45 61 / 13%);
    }
  }
`
