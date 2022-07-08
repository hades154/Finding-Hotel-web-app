import Wrapper from "../assets/wrappers/NewPost";
import { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import FormRowControl from "../components/FormRowControl";
import { useAppContext } from "../context/appContext";
import { Alert } from "../components";
import axios from "axios";

const initialState = {
  title: "",
  category: "Rental Room",
  renter: "All",
  city: { id: 0, name: "" },
  district: { id: 0, name: "" },
  ward: { id: 0, name: "" },
  address: "",
  price: 0,
  deposit: 0,
  area: 0,
  description: "",
  image: "",
  video: "",
  phone_number: "",
  list_image: "",
};

const AddPost = () => {
  let citis = document.getElementById("city");
  let districts = document.getElementById("district");
  let wards = document.getElementById("ward");

  const {
    showAlert,
    createPost,
    isEditing,
    getPosts,
    posts,
    editPostId,
    editPost,
    updateMultiImage,
  } = useAppContext();

  const [values, setValues] = useState(initialState);
  const [fileName, setFileName] = useState("");
  const [fileObj, setFileObj] = useState([]);

  function renderCity(data) {
    for (const x of data) {
      citis.options[citis.options.length] = new Option(x.Name, x.Id);
    }
    // xứ lý khi thay đổi tỉnh thành thì sẽ hiển thị ra quận huyện thuộc tỉnh thành đó
    citis.onchange = function () {
      districts.length = 1;
      wards.length = 1;
      if (this.value !== "") {
        const result = data.filter((n) => n.Id === this.value);

        for (const k of result[0].Districts) {
          districts.options[districts.options.length] = new Option(
            k.Name,
            k.Id
          );
        }
      }
    };

    // xứ lý khi thay đổi quận huyện thì sẽ hiển thị ra phường xã thuộc quận huyện đó
    districts.onchange = function () {
      wards.length = 1;
      const dataCity = data.filter((n) => n.Id === citis.value);
      if (this.value !== "") {
        const dataWards = dataCity[0].Districts.filter(
          (n) => n.Id === this.value
        )[0].Wards;

        for (const w of dataWards) {
          wards.options[wards.options.length] = new Option(w.Name, w.Id);
        }
      }
    };
  }

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
        citis = document.getElementById("city");
        districts = document.getElementById("district");
        wards = document.getElementById("ward");
        renderCity(myJson);
      });
  };

  useEffect(() => {
    getData();
    getPosts();

    if (isEditing) {
      getData();

      const post = posts.find((post) => post._id === editPostId);
      setValues({
        ...values,
        title: post.title,
        area: post.area,
        category: post.category,
        renter: post.renter,
        address: post.address,
        price: post.price,
        phone_number: post.phone_number,
        description: post.description,
        city: post.city,
        district: post.district,
        ward: post.ward,
        deposit: post.deposit,
        image: post.image,
        video: post.video,
        list_image: post.list_image,
      });
      districts = document.getElementById("district");
      wards = document.getElementById("ward");
      districts.options[values.district.id].text = post.district.name;
      wards.options[values.ward.id].text = post.ward.name;
    }
  }, [isEditing]);

  const handlePostInput = (e) => {
    if (
      e.target.name === "city" ||
      e.target.name === "ward" ||
      e.target.name === "district"
    ) {
      setValues({
        ...values,
        [e.target.name]: {
          id: e.target.value,
          name: e.target.options[e.target.selectedIndex].text,
        },
      });
      return;
    }
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]);
  };

  const handleMultipleFiles = (e) => {
    setFileObj((oldData) => [...oldData, e.target.files[0]]);
  };

  const updateMultipleImage = () => {
    fileObj.map((file) => {
      const formData = new FormData();
      formData.append("image", file);
      updateMultiImage(formData);
    });
  };

  const deletePreviousImages = async () => {
    try {
      const res = await axios("/api/post/MultiImage/" + editPostId);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", fileName);

    if (isEditing) {
      deletePreviousImages();
      updateMultipleImage();
      editPost(values, formData);
      setValues(initialState);
      return;
    }
    createPost(values, formData);
    updateMultipleImage();
    setValues(initialState);
  };
  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        {isEditing ? <h1>Edit Your Post</h1> : <h1>Add New Post</h1>}

        {showAlert && <Alert />}

        <FormRowControl
          labelText="Title:"
          type="text"
          name="title"
          value={values.title}
          handleChange={handlePostInput}
        />

        <Form.Group className="form-control">
          <Form.Label>Category:</Form.Label>
          <Form.Select
            name="category"
            id="category"
            value={values.category}
            onChange={handlePostInput}
          >
            <option value="rentalRoom">Rental Room</option>
            <option value="findRoomate">Find Roomate</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-control">
          <Form.Label>Renter:</Form.Label>
          <Form.Select
            name="renter"
            id="renter"
            value={values.renter}
            onChange={handlePostInput}
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-control">
          <Form.Label>City:</Form.Label>
          <Form.Select
            name="city"
            id="city"
            value={values.city.id}
            onChange={handlePostInput}
          >
            <option value=" " selected />
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-control">
          <Form.Label>District:</Form.Label>
          <Form.Select
            name="district"
            id="district"
            value={values.district.id}
            onChange={handlePostInput}
          >
            <option value=" " selected />
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-control">
          <Form.Label>Ward:</Form.Label>
          <Form.Select
            name="ward"
            id="ward"
            value={values.ward.id}
            onChange={handlePostInput}
          >
            <option value=" " selected />
          </Form.Select>
        </Form.Group>

        <FormRowControl
          labelText="Address:"
          type="text"
          name="address"
          value={values.address}
          placeholder="Specific Address"
          handleChange={handlePostInput}
        />

        <FormRowControl
          labelText="Price:"
          type="number"
          name="price"
          value={values.price}
          placeholder="VND"
          handleChange={handlePostInput}
        />

        <FormRowControl
          labelText="Deposit:"
          type="number"
          name="deposit"
          value={values.deposit}
          placeholder="VND"
          handleChange={handlePostInput}
        />

        <FormRowControl
          labelText="Area:"
          type="number"
          name="area"
          value={values.area}
          placeholder="m2"
          handleChange={handlePostInput}
        />

        <FormRowControl
          labelText="Phone number:"
          type="text"
          name="phone_number"
          value={values.phone_number}
          placeholder="Enter your number"
          handleChange={handlePostInput}
        />

        <Form.Group className="form-control" controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Write description here"
            style={{ height: "100px" }}
            value={values.description}
            onChange={handlePostInput}
          />
        </Form.Group>

        <Form.Group className="form-control">
          {isEditing ? (
            <>
              <img width="100" src={values.image} alt="" />
              <Form.Label>Choose new image</Form.Label>
            </>
          ) : (
            <>
              {fileName && (
                <img width="100" src={URL.createObjectURL(fileName)} alt="" />
              )}

              <Form.Label>Image:</Form.Label>
            </>
          )}
          <FormControl
            aria-describedby="basic-addon1"
            type="file"
            accept="image/*"
            multiple
            name="image"
            onChange={handleFileChange}
          />
        </Form.Group>

        <Form.Group className="form-control multi-input-image">
          <div className="input-group">
            <Form.Label>Image:</Form.Label>
            <FormControl
              aria-describedby="basic-addon1"
              type="file"
              accept="image/*"
              multiple
              name="image"
              onChange={handleMultipleFiles}
            />
          </div>
          <div className="multi-preview">
            {fileObj &&
              fileObj.map((url) => (
                <img
                  src={URL.createObjectURL(url)}
                  alt="..."
                  width="100"
                  height="100"
                />
              ))}
          </div>
        </Form.Group>

        <Form.Group className="form-control">
          <Button variant="primary">Preview</Button>
          <Button variant="success" type="submit">
            Post
          </Button>
          <Button variant="danger" href="/">
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Wrapper>
  );
};

export default AddPost;
