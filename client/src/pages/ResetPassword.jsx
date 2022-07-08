import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";

const data = {
  newPassword: "",
};
function ResetPassword() {
  const { token } = useParams();
  const [values, setValues] = useState(data);
  const { displayAlert } = useAppContext();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { newPassword } = values;
    if (!newPassword) {
      displayAlert();
      return;
    }

    const passwordChange = { token, newPassword };
    ResetPassword(passwordChange);
  };
  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} className="form">
        <h1>RESET PASSWORD</h1>
        <FormRow
          type="password"
          labelText="New Password"
          name="newPassword"
          value={values.newPassword}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </Wrapper>
  );
}

export default ResetPassword;
