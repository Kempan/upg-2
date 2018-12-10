import React, { Component } from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';
import './App.css';

const API_KEY = '392f3eb34f4528ee132c7731d3631563';

class App extends Component {

  state = {
    city: undefined,
    country: undefined,
    temp: undefined,
    humidity: undefined,
    desc: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    //Hindrar React från att uppdatera sidan efter vi får tillbaks data från fetch
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const data = await api_call.json()
    console.log(data);

    if (city && country) {
      this.setState({
        temp: data.main.temp,
        city: city,
        country: country,
        humidity: data.main.humidity,
        desc: data.weather[0].description,
        error: undefined
      })
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        desc: undefined,
        error: 'Please enter city and country'
      })
    }

    console.log(this.state);
  };

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">

              <div calssName="col-xs-7 title-container">
                <Title />
              </div>
              <div className="col-xs-5 form-container">
                <Form getWeather={this.getWeather} />
                <Weather
                  city={this.state.city}
                  country={this.state.country}
                  temp={this.state.temp}
                  desc={this.state.desc}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default App;
