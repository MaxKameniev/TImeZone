import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import moment from "moment-timezone";

class TimeForm extends Component {
  inputRef = React.createRef();
  
  handleChange = event => {
    this.isTimeValid(event.target.value);
    this.props.handleTimeEdit(true);
    this.props.setTime(event.target.value);
  };

  handleClick = () => {
    this.props.handleTimeEdit(false);
    this.props.setTime(moment().format('HH:mm'));
  }

  isTimeValid = value => {
    this.props.setTimeValid(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value));
  }

  render() {
    return (
      <div>
        <form>
          <Input
            value={this.props.time}
            onChange={this.handleChange}
            inputRef={this.inputRef}
            error={!this.props.isTimeValid}
          />
        </form>
        <div onClick={this.handleClick} style={{cursor:'pointer'}}>time now</div>
      </div>

    );
  }
}

export default TimeForm;
