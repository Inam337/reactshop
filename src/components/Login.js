import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/userLoginActions";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Logo from "../assets/logos/logo.svg";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.users);
  const [credentials, setCredentials] = useState({
    username: "kminchelle",
    password: "0lelplR",
  });
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username cannot be more than 20 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  // const handleLogin = () => {
  //   // After a successful login, navigate to the home component
  // };
  const formik = useFormik({
    initialValues: credentials,
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));

      navigate("/home");
      // This function is called when the form is submitted
      console.log("Submitted values:", values);
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="col-md-12">
          <div class="col-md-12 col-lg-12">
            <div class="wrap d-md-flex">
              <div class="col-md-6 standies-bg"></div>
              <div class="col-md-6 login-wrap p-4 p-md-5">
                <div className="login-content-block">
                  <div class="login-box">
                    <img src={Logo} alt="Daily Cart" width="120" />
                  </div>
                  <div class="d-flex">
                    <div class="w-100">
                      <h3 class="mb-4">Login In</h3>
                    </div>
                  </div>
                  <div class="form-group mb-3">
                    <label class="label" for="name">
                      Username
                    </label>

                    <div>
                      <input
                        type="text"
                        id="username"
                        className="form-control"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                      />
                      {formik.touched.username && formik.errors.username && (
                        <div className="error">{formik.errors.username}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="label" for="password">
                      Password
                    </label>
                    <div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password && (
                        <div className="error">{formik.errors.password}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-primary w-100"
                      disabled={loading === "loading"}
                    >
                      {loading === "loading" ? "Logging in..." : "Login"}
                    </button>
                    {error && <p>Error: {error}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
