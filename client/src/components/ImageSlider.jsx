import { useState } from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/ImageSlider'

function ImageSlider({ slides }) {
  const [current, setCurrent] = useState(0)
  const length = slides.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  if (!Array.isArray(slides) || length <= 0) {
    return null
  }

  return (
    <Wrapper>
      <div className='slider'>
        {slides.map((slide, index) => {
          return (
            <div className={index === current ? 'slide active' : 'slide'}>
              {index === current && (
                <img src={slide.image} alt='stay image' className='image' />
              )}
              <span className='slide-num'>{`${index + 1} / ${length}`}</span>
            </div>
          )
        })}
      </div>
      <FaArrowCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowCircleRight className='right-arrow' onClick={nextSlide} />
    </Wrapper>
  )
}

export default ImageSlider
