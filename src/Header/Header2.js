import React, { useEffect, useState } from "react";
import "./HeaderStyles.css";
import imgWeather from "../Assets/Weather.png";
import imgRefresh from "../Assets/Refresh.png";
import styled from "styled-components";

export function Header2(props) {
  const [location, setLocation] = useState("Default Location");
  const [temperature, setTemperature] = useState(0);

  function clickHandler() {
    props.refreshHandler();
    onLocationChange();
  }

  async function onLocationChange() {
    let spanLocation = document.getElementsByClassName("location")[0];
    let result;
    try {
      result = await props.getWeather(spanLocation.textContent);
      setLocation(result.name);
      setTemperature(Math.round(result.main.temp - 273));
    } catch (err) {
      setLocation("Error");
      setTemperature(0);
    }
  }

  useEffect(() => {
    // EventListener to animate the refresh button
    let refreshImg = document.getElementById("refreshImg");
    refreshImg.addEventListener("click", function() {
      refreshImg.style.transform = "rotate(" + 360 + "deg)";
      setTimeout(() => {
        refreshImg.style.transition = "all 0s";
        refreshImg.style.transform = null;
      }, 1000);
      refreshImg.style.transition = "all 1s";
    });

    // EventListener to let user change the Default Location
    let spanLocation = document.getElementsByClassName("location")[0];
    spanLocation.addEventListener("click", () => {
      let myInput = document.createElement("input");
      myInput.value = spanLocation.textContent;

      // If pressed ENTER / ESCAPE, blur the element
      // It triggers the next event listener, which is switching back to span
      myInput.addEventListener("keydown", e => {
        //console.log(e);
        if (e.key === "Enter" || e.key === "Escape") {
          myInput.blur();
        }
      });

      // If went OUT OF FOCUS
      myInput.addEventListener("blur", e => {
        setLocation(myInput.value);
        myInput.replaceWith(spanLocation);
        onLocationChange();
      });

      spanLocation.replaceWith(myInput);
      myInput.focus();
    });
  }, []);

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
