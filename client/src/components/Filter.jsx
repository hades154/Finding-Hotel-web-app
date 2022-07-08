import Wrapper from '../assets/wrappers/Filter'

function Filter() {
  return (
    <Wrapper>
      <form className='form'>
        <div className='input-group flex-row'>
          <label htmlFor='city'>City</label>
          <select name='city' id='city'>
            <option value='1'>Da Nang</option>
            <option value='2'>Vung Tau</option>
          </select>
        </div>
        <div className='input-group flex-row'>
          <label htmlFor='district'>District</label>
          <select name='district' id='district'>
            <option value='1'>Hai Chau</option>
            <option value='2'>Son Tra</option>
          </select>
        </div>
        <div className='input-group flex-row'>
          <label htmlFor='ward'>Ward</label>
          <select name='ward' id='ward'>
            <option value='1'>Hai Chau II</option>
            <option value='2'>Hai Chau I</option>
          </select>
        </div>
        <div className='input-group flex-col'>
          <label htmlFor='price-range'>
            Price Range (between 10$ and 10000$):
          </label>
          <input
            type='range'
            id='price-range'
            name='price-range'
            min='10'
            max='10000'
          />
        </div>
        <div className='input-group flex-col'>
          <label htmlFor='area-range'>
            Area Range (between 0m<sup>2</sup> and 1000m<sup>2</sup>):
          </label>
          <input
            type='range'
            id='area-range'
            name='area-range'
            min='0'
            max='1000'
          />
        </div>
        <div className='input-group flex-row'>
          <p>Sorting</p>
          <div className='input-radio'>
            <label htmlFor='newest'>Newest</label>
            <input type='radio' id='newest' name='sorting' />
          </div>
          <div className='input-radio'>
            <label htmlFor='pricing'>Pricing</label>
            <input type='radio' id='pricing' name='sorting' />
          </div>
        </div>
        <div className='input-group flex-row'>
          <label htmlFor='max-people'>Maximum people</label>
          <input type='text' id='max-people' />
        </div>
        <div className='input-group flex-row'>
          <p>Status</p>
          <div className='input-radio'>
            <label htmlFor='newest'>Empty</label>
            <input type='radio' id='empty' name='status' />
          </div>
          <div className='input-radio'>
            <label htmlFor='find-more'>Finding more</label>
            <input type='radio' id='find-more' name='status' />
          </div>
        </div>
        <button>Submit</button>
      </form>
    </Wrapper>
  )
}

export default Filter
