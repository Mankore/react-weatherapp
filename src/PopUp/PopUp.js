import React from "react";
import "./PopUpStyles.css";

export class PopUp extends React.Component {
  handleClick = () => {
    this.props.toggle();
  };

  handleAddClick = () => {
    console.log(this.props);
    let input = document.getElementById("cityInput");
    if (input.value === "") {
      return;
    } else {
      this.props.addCity(input.value);
    }
  };

  render() {
    return (
      <div className="full-height">
        <div className="popUpWindow shadow">
          <span> Enter the City:</span>
          <br></br>
          <label htmlFor="city"></label>
          <input
            id="cityInput"
            name="city"
            placeholder="City name"
            type="text"
            required
          ></input>
          <br></br>
          <br></br>
          <button onClick={this.handleAddClick} id="submitBtn">
            Add it!
          </button>
        </div>
      </div>
    );
  }
}
