import { TwoThumbInputRange } from "react-two-thumb-input-range";
import { useState, useEffect } from "react";
import { GiDivergence } from "react-icons/gi";
import { MdOutlineAddAlert } from "react-icons/md";
import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  Table,
  ModalFooter,
} from "reactstrap";
import Wrapper from "../assets/wrappers/Filtering";
import axios from "axios";

function Filtering(props) {
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [valuePrice, setValuePrice] = useState([0, 10000000]);
  const [valueArea, setValueArea] = useState([0, 100]);
  const [city, setCity] = useState([0, "All"]);
  const [district, setDistrict] = useState([0, "All"]);
  const [category, setCategory] = useState();
  const [ward, setWard] = useState([0, "All"]);

  const [isSetArea, SetIsSetArea] = useState(false);
  const [isSetPrice, SetIsSetPrice] = useState(false);

  const onValueChangePrice = (values) => {
    setValuePrice(values);
  };
  const onValueChangeArea = (values) => {
    setValueArea(values);
  };
  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setDataCity(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const [isOpenCity, setIsOpenCity] = useState(false);
  const [isOpenDistrict, setIsOpenDistrict] = useState(false);
  const [isOpenWard, setIsOpenWard] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenArea, setIsOpenArea] = useState(false);

  // const [cityId, setCityId] = useState('')
  const toggleCity = () => {
    setIsOpenCity(!isOpenCity);
  };
  const toggleDistrict = () => {
    setIsOpenDistrict(!isOpenDistrict);
  };
  const toggleWard = () => {
    setIsOpenWard(!isOpenWard);
  };
  const toggleCategory = () => {
    setIsOpenCategory(!isOpenCategory);
  };
  const togglePrice = () => {
    setIsOpenPrice(!isOpenPrice);
    SetIsSetPrice(true);
  };
  const toggleArea = () => {
    setIsOpenArea(!isOpenArea);
    SetIsSetArea(true);
  };

  const getDistrict = (cityId) => {
    const res = dataCity.filter((item) => item.Id === cityId)[0];
    return res.Districts;
  };

  const getWard = (districtId) => {
    const res = dataDistrict.filter((item) => item.Id === districtId)[0];
    return res.Wards;
  };

  const clickCity = (e) => {
    toggleCity();
    setDataDistrict(getDistrict(e.target.id));
    setCity([e.target.id, e.target.textContent]);
    toggleDistrict();
  };
  const clickDistrict = (e) => {
    toggleDistrict();
    setDataWard(getWard(e.target.id));
    setDistrict([e.target.id, e.target.textContent]);

    toggleWard();
  };
  const clickWard = (e) => {
    setWard([e.target.id, e.target.textContent]);
    toggleWard();
  };

  const listStyle = {};

  const listItemStyle = {
    borderBottom: "1px solid var(--grey-200)",
    padding: "1rem 0px",
    margin: "0",
  };

  const handleFind = async (e) => {
    e.preventDefault();
    let url =
      "/api/post/find/1?city=" +
      city +
      "&ward=" +
      ward +
      "&district=" +
      district;
    if (category) {
      url = url + "&category=" + category;
    }
    if (valueArea) {
      url = url + "&area=" + valueArea;
    }

    if (valuePrice) {
      url = url + "&price=" + valuePrice;
    }
    const res = await axios.get(url);
    props.setResult(res.data);
  };

  return (
    <Wrapper>
      <div>
        <form className="form">
          <div className="form__element">
            <Button className="input__btn" onClick={toggleCategory}>
              Loai Hinh
            </Button>
            <Modal isOpen={isOpenCategory}>
              <ModalHeader toggle={toggleCategory}>Modal title</ModalHeader>
              <ModalBody>
                <Table>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <td>Nha Tro</td>
                      </th>
                    </tr>
                    <tr>
                      <th scope="row">
                        <td>Tim Ban o ghep</td>
                      </th>
                    </tr>
                  </tbody>
                </Table>
              </ModalBody>
            </Modal>
          </div>
          <div className="form__element">
            <Button className="input__btn" onClick={toggleCity}>
              Tinh, thanh pho
            </Button>
            <Modal isOpen={isOpenCity}>
              <ModalHeader toggle={toggleCity}>Choose City</ModalHeader>
              <ModalBody>
                <div style={listStyle}>
                  {dataCity &&
                    dataCity.length > 0 &&
                    dataCity.map((item) => (
                      <div onClick={clickCity} style={listItemStyle}>
                        <span id={item.Id}>{item.Name}</span>
                      </div>
                    ))}
                </div>
              </ModalBody>
            </Modal>
            <Modal isOpen={isOpenDistrict}>
              <ModalHeader toggle={toggleDistrict}>Choose District</ModalHeader>
              <ModalBody>
                {dataDistrict &&
                  dataDistrict.length > 0 &&
                  dataDistrict.map((item) => (
                    <div onClick={clickDistrict} style={listItemStyle}>
                      <span id={item.Id}>{item.Name}</span>
                    </div>
                  ))}
              </ModalBody>
            </Modal>
            <Modal isOpen={isOpenWard}>
              <ModalHeader toggle={toggleWard}>Choose Ward</ModalHeader>
              <ModalBody>
                {dataWard &&
                  dataWard.length > 0 &&
                  dataWard.map((item) => (
                    <div onClick={clickWard} style={listItemStyle}>
                      <span id={item.Id}>{item.Name}</span>
                    </div>
                  ))}
              </ModalBody>
            </Modal>
          </div>
          <div className="form__element">
            <Button className="input__btn" onClick={togglePrice}>
              {isSetPrice ? (
                <>
                  {valuePrice[0]} - {valuePrice[1]}
                </>
              ) : (
                <>Chon gia</>
              )}
            </Button>
            <Modal isOpen={isOpenPrice}>
              <ModalHeader toggle={togglePrice}>Choose Price</ModalHeader>
              <ModalBody>
                <TwoThumbInputRange
                  onChange={onValueChangePrice}
                  values={valuePrice}
                  min={0}
                  max={10000000}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={togglePrice}>Submit</Button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="form__element">
            <Button className="input__btn" onClick={toggleArea}>
              {isSetArea ? (
                <>
                  {valueArea[0]} - {valueArea[1]}
                </>
              ) : (
                <>Dien tich</>
              )}
            </Button>
            <Modal isOpen={isOpenArea}>
              <ModalHeader toggle={toggleArea}>Choose area</ModalHeader>
              <ModalBody>
                <TwoThumbInputRange
                  onChange={onValueChangeArea}
                  values={valueArea}
                  min={0}
                  max={100}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={toggleArea}>Submit</Button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="form__element">
            <button className="submit__btn" type="submit" onClick={handleFind}>
              Tim kiem
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}

export default Filtering;
