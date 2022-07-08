import { TwoThumbInputRange } from 'react-two-thumb-input-range'
import { useState, useEffect } from 'react'
import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Card,
  CardText,
} from 'reactstrap'
import axios from 'axios'

function Test() {
  const [dataCity, setDataCity] = useState([])
  const [dataDistrict, setDataDistrict] = useState([])
  const [dataWard, setDataWard] = useState([])
  const getData = () => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        console.log(response)
        return response.json()
      })
      .then(function (myJson) {
        console.log(myJson)
        setDataCity(myJson)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  const [isOpenCity, setIsOpenCity] = useState(false)
  const [isOpenDistrict, setIsOpenDistrict] = useState(false)
  const [isOpenWard, setIsOpenWard] = useState(false)

  const [cityId, setCityId] = useState('')
  const toggleCity = () => {
    setIsOpenCity(!isOpenCity)
  }
  const toggleDistrict = () => {
    setIsOpenDistrict(!isOpenDistrict)
  }
  const toggleWard = () => {
    setIsOpenWard(!isOpenWard)
  }

  const getDistrict = (cityId) => {
    const res = dataCity.filter((item) => item.Id === cityId)[0]
    return res.Districts
  }

  const getWard = (districtId) => {
    const res = dataDistrict.filter((item) => item.Id === districtId)[0]
    return res.Wards
  }

  const clickCity = (e) => {
    toggleCity()
    setDataDistrict(getDistrict(e.target.id))
    toggleDistrict()
  }
  const clickDistrict = (e) => {
    toggleDistrict()
    setDataWard(getWard(e.target.id))
    toggleWard()
  }
  const clickWard = (e) => {
    toggleWard()
  }

  return (
    <div>
      <Button color='danger' onClick={toggleCity}>
        Click Me
      </Button>
      <Modal isOpen={isOpenCity}>
        <ModalHeader toggle={toggleCity}>Modal title</ModalHeader>
        <ModalBody>
          {dataCity &&
            dataCity.length > 0 &&
            dataCity.map((item) => (
              <Card onClick={clickCity}>
                <CardText id={item.Id}>{item.Name}</CardText>
              </Card>
            ))}
        </ModalBody>
      </Modal>
      <Modal isOpen={isOpenDistrict}>
        <ModalHeader toggle={toggleDistrict}>Modal title</ModalHeader>
        <ModalBody>
          {dataDistrict &&
            dataDistrict.length > 0 &&
            dataDistrict.map((item) => (
              <Card onClick={clickDistrict}>
                <CardText id={item.Id}>{item.Name}</CardText>
              </Card>
            ))}
        </ModalBody>
      </Modal>
      <Modal isOpen={isOpenWard}>
        <ModalHeader toggle={toggleWard}>Modal title</ModalHeader>
        <ModalBody>
          {dataWard &&
            dataWard.length > 0 &&
            dataWard.map((item) => (
              <Card onClick={clickWard}>
                <CardText id={item.Id}>{item.Name}</CardText>
              </Card>
            ))}
        </ModalBody>
      </Modal>
    </div>
  )
  // const [value, setValue] = useState([1000, 4333]);

  // const onValueChange = (values) => {
  //   setValue(values);
  // };

  // return (
  //   <TwoThumbInputRange
  //     onChange={onValueChange}
  //     values={value}
  //     min={1000}
  //     max={10000}
  //   />
  // );

  // const [value, setValue] = useState([0, 1000000]);

  // const onValueChange = (values) => {
  //   setValue(values);
  // };

  // const handleClick = async () => {
  //   console.log(value);
  //   const res = await axios("/api/post/find?price=" + value);
  //   console.log(res);
  // };

  // return (
  //   <>
  //     <TwoThumbInputRange
  //       onChange={onValueChange}
  //       values={value}
  //       min={0}
  //       max={10000000}
  //     />
  //     <button onClick={handleClick}>Submit</button>
  //   </>
  // );
}

export default Test
