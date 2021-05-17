import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "../../firebase";
import md5 from "md5";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const password = useRef();
  password.current = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let createUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      console.log("createUser", createUser);

      await createUser.user.updateProfile({
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(
          createUser.user.email
        )}?d=identicon`,
      });

      await firebase.database().ref("users").child(createUser.user.uid).set({
        name: createUser.user.displayName,
        image: createUser.user.photoURL,
      });

      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>Register </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label> Email</label>
        <input
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>This field is required</span>}

        <label> Name</label>
        <input
          name="name"
          type="text"
          {...register("name", { required: true, maxLength: 20 })}
        />
        {errors.name && errors.name.type === "required" && (
          <span>This name field is required</span>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <span>Your input exceed maximum length</span>
        )}

        <label> Password</label>
        <input
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <span>This field is required</span>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <span>Password must have at least 6 characters</span>
        )}

        <label> Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          {...register("password_confirm", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && (
            <span>This field is required</span>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === "validate" && (
            <span>The password do not match</span>
          )}

        {errorFromSubmit && <span> {errorFromSubmit} </span>}

        <input type="submit" disabled={loading} />
      </form>
      <Link
        style={{ textAlign: "center", color: "gray", textDecoration: "none" }}
        to="login"
      >
        {" "}
        이미 아이디가 있다면 ....{" "}
      </Link>
    </div>
  );
}

export default RegisterPage;
