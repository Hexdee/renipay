// import Button from "@app/components/common/Button";
import Input from "@app/components/common/Input";
import { storage } from "@app/utils";
// import { useFormik } from "formik";
import * as Yup from "yup";
// import { Link } from "@app/components/Icon/icons";
import { Formik, useFormik } from "formik";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Layout from "../Layout";
// import { REGEX_EMAIL } from "@app/constants";
import AuthForm from "../components/AuthForm";
import { REGEX_EMAIL } from "@app/constants";
import { createUser } from "@app/api/auth";
import { toast } from "react-toastify";
import { ToastIconError } from "@app/components/Icon/icons";
import Toast from "@app/components/common/Toast";
// import { createUser } from "@app/api/authapi";
// import { toast } from "react-toastify";
// import Toast from "@app/components/common/Toast";
// import { storage } from "@app/utils";
// import { sendAnalyticsToFirebase } from "@app/config/firebase.config";

const INFO = [
  {
    type: "First Name",
    name: "first_name",
    placeholder: "Enter your first name",
  },
  {
    type: "Last Name",
    name: "last_name",
    placeholder: "Enter your  last name",
  },
  {
    type: "Username",
    name: "username",
    placeholder: "Enter a username you will like to use on Renipay",
  },
  {
    type: "Email",
    name: "email",
    placeholder: "Please enter a valid email address",
  },
  {
    type: "Password",
    name: "password",
    placeholder: "Passsword must be at least 8 characters long.",
    // helperText: "Passsword must contain an Upper case, Lower case, a Digit and a Special character and at least 8 characters long."
  },
];

const Signup = () => {
  const [successToastShown, setSuccessToastShown] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(1, "This field can't be empty!")
        .required("This field is required!"),
      last_name: Yup.string()
        .min(1, "This field can't be empty!")
        .required("This field is required!"),
      username: Yup.string()
        .min(1, "This field can't be empty!")
        .required("This field is required!"),

      email: Yup.string()
        .trim()
        .matches(REGEX_EMAIL, "Email address is invalid!")
        .required("This field is required!"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long!")
        .required("This field is required!"),
      // token: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        setIsCreatingUser(true);
        const response = await createUser(values);
        storage.setToken(response?.token);
        toast.success(
          <Toast toastType="success" message="User successfully created :)" />
        );
        // console.log({ values, response });
        setSuccessToastShown(true);
      } catch (error) {
        console.log("error in signing up:", error);
        // console.log({ erorrorrrorrr: error });
        // setErrorSigningup(error?.response?.data);
        // console.log("zoroe:" , error)
      }
      setIsCreatingUser(false);
    },
  });
  // const handleSubmit = () => {};
  // useEffect(() => {
  //   if (!isCreatingUser && errorSigningUp.length > 0) {
  //     toast.error(<Toast message={errorSigningUp} toastType="error" />);
  //   }
  // }, [errorSigningUp, isCreatingUser]);

  useEffect(() => {
    if (successToastShown) {
      navigate("/auth/signin");
    }
  }, [navigate, successToastShown]);
  return (
    <AuthForm
      handleSubmit={formik.handleSubmit}
      isLoading={isCreatingUser}
      title="Registration"
      description={
        <>
          Welcome to Renipay
          <span className="wave">👋</span>
          {/* <span className="text-primary-05">WAP TV </span> */}
        </>
      }
      text="Create your free account"
      belowButtonText={
        <>
          {" "}
          Already have an account ?{" "}
          <Link to="/auth/signin">
            <span className="text-primary-01 hover:underline hover:underline-offset-2">
              Sign in
            </span>
          </Link>
        </>
      }
    >
      <p className="text-h2 text-left text-gray-02 font-normal">
        Enter your details
      </p>
      {INFO.map((item, index) => (
        <>
          <Input
            onChange={formik.handleChange}
            value={formik.values[item.name]}
            name={item.name}
            onBlur={formik.handleBlur}
            labelTitle={item.type}
            loading={isCreatingUser}
            placeholder={item.placeholder || "p laceholder"}
            showEyeIcon={item.name === "password"}
            variant="transparent"
            key={index}
            message={
              formik.touched[item.name] &&
              formik.errors[item.name] && {
                type: "error",
                value: formik.errors[item.name],
              }
            }
            helperText={item.helperText}
          />
        </>
      ))}
    </AuthForm>
  );
};

export default Signup;
