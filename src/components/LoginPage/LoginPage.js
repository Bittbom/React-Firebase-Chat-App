import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "../../firebase";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);

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
        <h3>Login </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label> Email</label>
        <input
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>This field is required</span>}

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

        {errorFromSubmit && <span> {errorFromSubmit} </span>}

        <input type="submit" disabled={loading} />
      </form>
      <Link
        style={{ textAlign: "center", color: "gray", textDecoration: "none" }}
        to="register"
      >
        {" "}
        아직 아이디가 없다면 ....{" "}
      </Link>
    </div>
  );
}

export default LoginPage;
