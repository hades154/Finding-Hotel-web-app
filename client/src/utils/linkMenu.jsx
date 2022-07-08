import { GoSettings } from 'react-icons/go'
import { GiPositionMarker } from 'react-icons/gi'
import { MdOutlinePriceChange } from 'react-icons/md'
import { BiArea } from 'react-icons/bi'

const linksMenu = [
  {
    id: 1,
    text: 'filter',
    path: '/',
    icon: <GoSettings />,
  },
  {
    id: 2,
    text: 'position',
    path: '/',
    icon: <GiPositionMarker />,
  },
  {
    id: 3,
    text: 'price',
    path: '/',
    icon: <MdOutlinePriceChange />,
  },
  {
    id: 4,
    text: 'area',
    path: '/',
    icon: <BiArea />,
  },
]

export default linksMenu
