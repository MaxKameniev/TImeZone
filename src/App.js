import React, { Component, Fragment } from "react";
import CityForm from "../src/components/CityForm";
import CityList from "../src/components/CityList";
import { Paper, Grid } from "@material-ui/core";
import moment from "moment-timezone";
import TimeForm from "./components/TimeForm";

const styles = {
  Paper: {
    padding: 20,
    margin: "auto",
    textAlign: "center",
    width: 500
  }
};

class App extends Component { 
  state = {
    list: {},
    time: "",
    currentTimeZone: moment.tz.guess(),
    cityError: false,
    timeEdited: false,
    isTimeValid: true
  };

  componentDidMount = () => {
    setInterval(() => {
      if (!this.state.timeEdited) {
        this.setState({time: moment().format('HH:mm')})
      }
    }, 1000);
  }

  handleTimeEdit = isEdit => {
    this.setState({ timeEdited: isEdit});
  }

  getZone = city => {
    console.log(city);
    const allZones = moment.tz.names();
    return allZones.filter(zone => zone.includes(city)).toString();
  }

  setTime = time => {
    this.setState({time: time}, () => {
      if (this.state.isTimeValid) {
        this.recalculateTime();
      }
    });
  }

  setTimeValid = isValid => {
    this.setState({ isTimeValid: isValid});
  }

  setCityValid = isValid => {
    this.setState({ cityError: isValid })
  }

  addToList = city => {
    const list = { ...this.state.list };

    if (this.getZone(city)) {
      console.log(city)
      list[city] = {
        city: city,
        localTime: this.timeConverter(this.state.time, city),
        timeZone: moment.tz(this.getZone(city)).format('z')
      };
      
      this.setState({ list, cityError: false });
    } else {
      this.setState({ cityError: true});
    }
  };

  timeConverter = (time, city) => {
    const getFullTime = moment().format(`YYYY-MM-DD ${time}`);
    return moment.tz(getFullTime, this.state.currentTimeZone).clone().tz(this.getZone(city)).format('HH:mm');
  }

  recalculateTime = () => {
    console.log(this.state.time);
    const list = { ...this.state.list };
    Object.keys(list).forEach(cityItem => {
      list[cityItem].localTime = this.timeConverter(this.state.time, list[cityItem].city)
      console.log(this.timeConverter(this.state.time, list[cityItem].city));
    });


    this.setState({ list });
  }

  deleteCity = key => {
    const list = { ...this.state.list };
    list[key] = null;

    this.setState({ list });
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={0}>
        <Grid item xs={12} style={styles.Paper}>
            <TimeForm
              setTime={this.setTime}
              time={this.state.time}
              recalculateTime={this.recalculateTime}
              handleTimeEdit={this.handleTimeEdit}
              isTimeValid={this.state.isTimeValid}
              setTimeValid={this.setTimeValid}
            />
          </Grid>
          <Grid item xs={12} style={styles.Paper}>
            <CityList
              deleteCity={this.deleteCity}
              list={this.state.list}
            />
          </Grid>
          <Grid item xs={12}>
            <Paper style={styles.Paper}>
              <CityForm 
                addToList={this.addToList}
                error={this.state.cityError}
                getZone={this.getZone}
                setCityValid={this.setCityValid}
              />
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
    
  }
}

export default App;
