import React from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>Register </h3>
      </div>
      <form
      // onSubmit={handleSubmit(onSubmit)}
      >
        <label> Email</label>

        <input
          type="email"
          name="email"
          //   {...register("exampleRequired", { required: true })}
        />
        {
          //   errors.exampleRequired && <span>This field is required</span>
        }

        <label> Name</label>

        <input
          name="name"
          //   {...register("exampleRequired", { required: true })}
        />
        {
          //   errors.exampleRequired && <span>This field is required</span>
        }

        <label> Password</label>

        <input
          name="password"
          type="password"
          //   {...register("exampleRequired", { required: true })}
        />
        {
          //   errors.exampleRequired && <span>This field is required</span>
        }

        <label> Password Confirm</label>

        <input
          name="password_confirm"
          type="password"
          //   {...register("exampleRequired", { required: true })}
        />
        {
          //   errors.exampleRequired && <span>This field is required</span>
        }

        <input type="submit" />
      </form>
      <Link style={{ textAlign:'center', color: "gray", textDecoration: "none" }} to="login">
        {" "}
        이미 아이디가 있다면 ....{" "}
      </Link>
    </div>
  );
}

export default RegisterPage;
