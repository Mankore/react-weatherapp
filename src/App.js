import React, { useState} from "react";
import "./App.css";
import { Header } from "./Header/Header.js";
import { Header2 } from "./Header/Header2.js";
import { LocationList } from "./LocationList/LocationList.js";
import { Footer } from "./Footer/Footer.js";
import { PopUp } from "./PopUp/PopUp";
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpSeen: false,
      locationArray: [
        {
          name: "London",
          weather: null,
          temperature: null
        },
        {
          name: "New York",
          weather: null,
          temperature: null
        },
        {
          name: "Moscow",
          weather: null,
          temperature: null
        },
        {
          name: "Koeln",
          weather: null,
          temperature: null
        }
      ]
    };
    this.getWeather = this.getWeather.bind(this);
    this.refreshHandler = this.refreshHandler.bind(this);
    this.addNewCity = this.addNewCity.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
  }

  // Toggle the PopUp, which is used to add a new City
  togglePop = () => {
    this.setState({
      popUpSeen: !this.state.popUpSeen
    });
  };

  //A function to refresh the List of Cities, which are currently stored in STATE
  async refreshHandler() {
    const arr = await Promise.allSettled(
      this.state.locationArray.map(async city => {
        let response = await this.getWeather(city.name);
        if (response) {
          let obj = {
            name: city.name,
            weather: response.weather[0].description,
            temperature: Math.round(response.main.temp - 273)
          };
          return obj;
        } else {
          let obj = {
            name: city.name + "not found!",
            weather: "Not Available",
            temperature: "Not Available"
          };
          console.warn("app.js componentDidMount error");
          return obj;
        }
      })
    );
    // At this point we received an array of promises
    // Parsing the reults to create a new STATE

    const newState = arr.map(promise => {
      if (promise.status === "fulfilled") {
        let obj = {
          name: promise.value.name,
          weather: promise.value.weather,
          temperature: promise.value.temperature
        };
        return obj;
      } else {
        let obj = {
          name: "Not found",
          weather: "Not found",
          temperature: "Not found"
        };

        console.log(promise);
        console.warn("Error in app.js componentDidMount newState");
        return obj;
      }
    });

    // Setting the STATE and updating the localStorage
    this.setState({
      locationArray: newState
    });
    localStorage.setItem("locationArray", JSON.stringify(newState));
  }

  // Varibles to make an API fecth call
  API_KEY = "e271790c351b04729cfcb5440dcf8a3e";
  urlString = "http://api.openweathermap.org/data/2.5/weather?q=";
  additionalProp = "&appid=";
  // ----------------------------------------

  // Fetch call to retrieve the weather for specific 'cityName'
  async getWeather(cityName) {
    const urlToFetch =
      this.urlString + cityName + this.additionalProp + this.API_KEY;
    let response = await fetch(urlToFetch);
    if (response.ok) {
      let json = await response.json().catch(err => console.log(err));

      return json;
    } else {
      throw new Error("getWeather error");
    }
  }

  // A function to add a new city to the list
  addNewCity(cityName) {
    let arr = this.state.locationArray;
    arr.push({
      name: cityName,
      weather: null,
      temperature: null
    });
    this.setState({
      locationArray: arr,
      popUpSeen: !this.state.popUpSeen
    });
    localStorage.setItem("locationArray", JSON.stringify(arr));

    // Refreshing the state to immideately get the new weather
    this.refreshHandler();
  }

  // A function to delete the City
  deleteCity(cityName) {
    let arr = this.state.locationArray.filter(entry => entry.name !== cityName);
    this.setState({
      locationArray: arr
    });
    localStorage.setItem("locationArray", JSON.stringify(arr));
  }

  // Chechking if a custom City List is available in local storage
  // If not then load the default one
  async componentDidMount() {
    let storageLocationArray = JSON.parse(
      localStorage.getItem("locationArray")
    );
    if (storageLocationArray) {
      await this.setState({
        locationArray: storageLocationArray
      });
    }

    this.refreshHandler();
  }

  render() {
    return (
      <div className="App">
        
        <Header2 
          refreshHandler={this.refreshHandler}
          ></Header2>

        <LocationList
          locArray={this.state.locationArray}
          deleteCity={this.deleteCity}
          ></LocationList>

        {this.state.popUpSeen && (
          <PopUp
          addCity={this.addNewCity}
          toggle={this.togglePop}
          ></PopUp>
          )}

        <Counter></Counter>

        <Footer 
          isPopup={this.state.popUpSeen}
          toggle={this.togglePop}
          ></Footer>
          
      </div>
    );
  }
}

const StyledButton = styled.button`
  background-color: gray;
`


function Counter() {
  const [count, setCount] = useState(0);

  return( 
    <div>
      <p>This is a counter Component, defined by using hooks!</p>
      <StyledButton onClick={() => setCount(prevCount => ++prevCount)}>+</StyledButton>
      <StyledButton onClick={() => setCount(prevCount => --prevCount)}>-</StyledButton>
      <span>{count}</span>
    </div>
  )
}

export default App;
