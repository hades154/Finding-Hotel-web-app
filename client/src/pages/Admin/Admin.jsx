import styled from 'styled-components'
import { Widget, Chart } from '../../components/Admin'

function Admin() {
  return (
    <Wrapper>
      <div className='widget-container'>
        <Widget type='user' />
        <Widget type='post' />
        <Widget type='comment' />
      </div>
      <div className='chart-container'>
        <Chart title='Last 3 Months' aspect={2 / 1} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  margin: 2rem auto;
  width: 95%;

  .widget-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 5%;
  }
`

export default Admin
