import { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };
  validate = () => {
    const option = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, option);
    //console.log(result.error.details[0]);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  handelSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return null;
    this.doSubmit();
  };
  validateProperty = ({ name, value }) => {
    const Obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(Obj, schema);
    return error ? error.details[0].message : null;
  };
  handelChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessege = this.validateProperty(input);
    if (errorMessege) errors[input.name] = errorMessege;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary m-2">
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        type={type}
        onChange={this.handelChange}
        error={errors[name]}
      />
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        options={options}
        onChange={this.handelChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
