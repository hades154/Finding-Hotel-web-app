import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Navbar, BigSidebar, SmallSidebar } from '../../components'
import links from '../../utils/link'

function SharedLayout() {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar links={links} />
        <BigSidebar links={links} />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout
