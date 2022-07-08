import { NavLink } from 'react-router-dom'
import linksMenu from '../utils/linkMenu'
import Wrapper from '../assets/wrappers/Menu'

function Menu(props) {
  function toggle(id) {
    props.toggle(id)
  }

  return (
    <Wrapper>
      <div className='menu'>
        {linksMenu.map((link) => {
          const { text, path, id, icon } = link

          return (
            <NavLink
              to={path}
              key={id}
              className='menu-item'
              onClick={() => toggle(id)}
            >
              <span className='icon'>{icon}</span>
              {text}
            </NavLink>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default Menu
