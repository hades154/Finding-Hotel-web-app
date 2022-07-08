import Wrapper from '../../assets/wrappers/Admin/Chart'
import {
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  {
    name: 'Apr',
    user: 278,
    post: 390,
    comment: 290,
  },
  {
    name: 'May',
    user: 189,
    post: 480,
    comment: 210,
  },
  {
    name: 'June',
    user: 239,
    post: 380,
    comment: 80,
  },
]

const Chart = ({ aspect, title }) => {
  return (
    <Wrapper>
      <div className='chart'>
        <div className='title'>{title}</div>
        <ResponsiveContainer width='100%' aspect={aspect}>
          <BarChart width={730} height={250} data={data}>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Legend />
            <Bar dataKey='user' fill='#E15554' />
            <Bar dataKey='post' fill='#E1BC29' />
            <Bar dataKey='comment' fill='#053C5E' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  )
}

export default Chart
