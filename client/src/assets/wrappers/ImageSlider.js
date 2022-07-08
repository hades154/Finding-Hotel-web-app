import styled from "styled-components"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .slider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
  }

  .slide-num {
    position: absolute;
    top: 0;
    left: 100%;
    transform: translate(-100%, 0);
    background: rgba(255, 255, 255, 0.5);
    padding: 0.1rem 0.5rem;
    border-radius: 0 0 0 3px;
    color: var(--black);
    font-size: 0.8rem;
  }

  .slide {
    opacity: 0;
    transition-duration: 1s ease;
  }


  .slide.active {
    opacity: 1;
    transition-duration: 1s;
    transfor: scale(1.08);
  }

  .image {
    width: 100%;
    border-radius: 10px;
  }
  
  .left-arrow {
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
    font-size: 2.5rem;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    user-select: none;
  }

  .right-arrow {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    font-size: 2.5rem;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;  
    user-select: none;
  }
`

export default Wrapper