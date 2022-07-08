import React, { useState } from "react";
import { Alert } from "../../components";
import styled from "styled-components";
import { Button, Label, Input, FormGroup, Form } from "reactstrap";
import { useAppContext } from "../../context/appContext";

const initialData = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};
function ChangePassword() {
  const [values, setValues] = useState(initialData);
  const { changePassword, showAlert, isLoading } = useAppContext();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setValues(initialData);
    changePassword(values);
  };
  return (
    <Wrapper>
      {showAlert && <Alert />}
      <header>
        <h1>Change your password</h1>
      </header>
      <div className="changePassContent">
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label for="oldPassword">Old password</Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              placeholder="type here old password"
              type="password"
              value={values.oldPassword}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">New password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              placeholder="type here new password"
              type="password"
              value={values.newPassword}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmNewPassword">Confirm new password</Label>
            <Input
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="type here confirm new password"
              type="password"
              value={values.confirmNewPassword}
              onChange={handleChange}
            />
          </FormGroup>
          <div className="changeButton">
            <Button type="submit" color="info" outline disabled={isLoading}>
              Change password
            </Button>
          </div>
        </Form>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.main`
  h1 {
    color: #14919b;
    font-size: 2em;
    text-align: center;
  }
  .changePassContent {
    border: 2px solid #14919b;
    padding: 20px;
    border-radius: 10px;
  }
  .changeButton {
    text-align: center;
  }
`;

export default ChangePassword;
