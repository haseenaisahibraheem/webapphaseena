import React from "react";
import Joi from "joi-browser";
import Form from "../commone/form";

class Registration extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name")
  };

  doSubmit = () => {
    //Call Server
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Registration</h1>
        <form onSubmit={this.handelSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}
export default Registration;
