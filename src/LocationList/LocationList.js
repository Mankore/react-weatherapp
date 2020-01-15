import React from "react";
import "../LocationList/LocationListStyles.css";
import { CityItem } from "../CityItem/CityItem.js";

export class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.constructList = this.constructList.bind(this);
  }

  // Returns an array of CityItems to render
  constructList() {
    const arr = this.props.locArray.map(city => {
      return (
        <CityItem
          name={city.name}
          key={city.name}
          weather={city.weather}
          temperature={city.temperature}
          deleteCity={this.props.deleteCity}
        ></CityItem>
      );
    });
    return arr;
  }

  render() {
    return (
      <div>
        <ul>{this.constructList()}</ul>
      </div>
    );
  }
}
