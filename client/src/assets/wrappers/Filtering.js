import styled from 'styled-components'

const Wrapper = styled.div`

  .form {
    width: 100%;
    margin: 0 auto;
    background: var(--primary-400);
    display: flex;
    flex-direction: row;
    padding: 1rem;
    gap: 0.5rem;
    border-radius: 5px;

    &__element {
      flex: 1;
      padding: 1rem auto;
      background: var(--white);
      border-radius: 5px;

      .input__btn {
        width: 100%;
        height: 100%;
        background: var(--white);
        color: var(--black);
        border: none;
        outline: none;
        font-weight: 600;
      }

      .submit__btn {
        width: 100%;
        height: 100%;
        background: #FCA311;
        color: var(--white);
        border: none;
        outline: none;
        border-radius: 5px;
        font-weight: 600;
      }
    }
  }
    
`

export default Wrapper