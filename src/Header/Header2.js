import React, { useEffect } from "react";
import "./HeaderStyles.css";
import imgWeather from "../Assets/Weather.png";
import imgRefresh from "../Assets/Refresh.png";
import styled from "styled-components";

export function Header2(props) {
  let location = "Default Location";
  let temperature = 24;

  function clickHandler() {
    props.refreshHandler();
  }

  useEffect(() => {
    let refreshImg = document.getElementById("refreshImg");
    refreshImg.addEventListener("click", function() {
      refreshImg.style.transform = "rotate(" + 360 + "deg)";
      setTimeout(() => {
        refreshImg.style.transition = "all 0s";
        refreshImg.style.transform = null;
      }, 1000);
      refreshImg.style.transition = "all 1s";
    });
  });

    return (
      <div>
        <header>
          <img src={imgWeather} alt="meaningful text" id="weatherImg" />
          <span className="location">{location} </span>
          <span className="headTemperature">
            Current Temperature: {temperature}
          </span>
          <button onClick={clickHandler} id="refreshBtn">
            <img src={imgRefresh} alt="refresh" id="refreshImg"></img>
          </button>
        </header>
        <Title>List of Your Cities</Title>
      </div>
    );
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
 