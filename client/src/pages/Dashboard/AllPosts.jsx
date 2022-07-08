import { Filtering } from '../../components'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useState } from 'react'
import BriefPostForFind from '../../components/BriefPostForFind'
import axios from 'axios'
import { useAppContext } from '../../context/appContext'

function AllPosts(props) {
  const [result, setResult] = useState([])
  const { posts } = useAppContext()

  return (
    <Wrapper>
      <div className='filtering'>
        <Filtering setResult={setResult} />
      </div>
      <div className='content-container'>
        {result.length === 0
          ? posts.map((post) => <BriefPostForFind post={post} />)
          : result.map((post) => <BriefPostForFind post={post} />)}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  max-width: 1440px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .filtering {
    min-height: 10vh;
  }

  .content-container {
    min-height: 100vh;
    margin: 0 auto;
    width: 90%;
    padding: 2rem 4rem;
    background: var(--white);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`

export default AllPosts
