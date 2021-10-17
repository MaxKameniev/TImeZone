import React from "react";
import CityItem from "../components/CityItem";
import { Grid } from "@material-ui/core";

class CityList extends React.Component {
  renderCity = key => {
    if (this.props.list[key] !== null) {
      return (
        <CityItem
          key={key}
          index={key}
          city={this.props.list[key]["city"]}
          localTime={this.props.list[key]["localTime"]}
          timeZone={this.props.list[key]["timeZone"]}
          deleteCity={this.props.deleteCity}
        />
      );
    }
  };

  render() {
    console.log(this.props);
    return (
      <Grid container>
        {Object.keys(this.props.list).map(key => this.renderCity(key))}
      </Grid>
    );
  }
}

export default CityList;
