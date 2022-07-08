import React from 'react'
import { NavbarAdmin } from '../../components/Admin'
import { BigSidebar, SmallSidebar } from '../../components'
import { Outlet } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import links from '../../utils/link_admin_page'

function SharedLayoutAdmin() {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar links={links} />
        <BigSidebar links={links} />
        <div>
          <NavbarAdmin />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayoutAdmin
