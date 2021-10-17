import React, { Component } from "react";
import { Delete } from "@material-ui/icons";
import { Grid, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  Icon: {
    marginLeft: "auto"
  },
  Paper: {
    margin: "auto",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    width: 500
  }
};

class CityItem extends Component {
  gridRef = React.createRef();

  deleteCity = () => {
    this.props.deleteCity(this.props.index);
  };

  render() {

    return (
      <Grid
        xs={12}
        item
        key={this.props.index}
        ref={this.gridRef}
      >
        <Paper elevation={2} style={styles.Paper}>
          <span>{this.props.city} {this.props.localTime} {this.props.timeZone}</span>
          <IconButton
            color="secondary"
            aria-label="Delete"
            onClick={this.deleteCity}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Paper>
      </Grid>
    );
  }
}

export default CityItem;
