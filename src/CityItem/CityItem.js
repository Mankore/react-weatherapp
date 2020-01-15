import React from "react";
import "./CityItemStyles.css";
import Delete from "../Assets/Delete2.png";

export class CityItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props.name);
    this.props.deleteCity(this.props.name);
  }

  render() {
    return (
      <li className="cityItem">
        <span className="name"> {this.props.name} </span>
        <span className="weather"> {this.props.weather} </span>
        <span className="temperature"> {this.props.temperature} </span>
        <button id="deleteBtn">
          <img
            onClick={this.handleClick}
            src={Delete}
            alt="delete"
            id="deleteImg"
          ></img>
        </button>
      </li>
    );
  }
}
