import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

class CityForm extends Component {
  inputRef = React.createRef();

  handleSubmit = event => {
    event.preventDefault();
    this.props.addToList(this.inputRef.current.value);
    event.currentTarget.reset();
  };

  handleChange = event => {
    const isCityValid = !this.props.getZone(event.target.value);
    this.props.setCityValid(isCityValid);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
        <Input
          placeholder="Enter city"
          onChange={this.handleChange}
          inputRef={this.inputRef}
          style={{ width: "90%" }}
          error={this.props.error}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "10%" }}
        >
          Add
        </Button>

      </form>
    );
  }
}

export default CityForm;
