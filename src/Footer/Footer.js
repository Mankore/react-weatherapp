import React from "react";
import "./FooterStyles.css";

export class Footer extends React.Component {
  handleClick = () => {
    this.props.toggle();
  };

  componentDidMount() {}

  render() {
    return (
      <footer>
        {!this.props.isPopup ? (
          <button
            onClick={this.handleClick}
            id="button1"
            className="footerBtn AddBtn"
          >
            Add new City
          </button>
        ) : (
          <button
            onClick={this.handleClick}
            id="button1"
            className="footerBtn CancelBtn"
          >
            Cancel
          </button>
        )}
        <button id="button2" className="footerBtn">
          Test Button #2
        </button>
      </footer>
    );
  }
}
