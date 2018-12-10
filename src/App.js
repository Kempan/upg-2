import React from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "392f3eb34f4528ee132c7731d3631563";

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    desc: undefined,
    error: undefined
  }

  getWeather = async (e) => {

    //Hindrar react from att köra render när vi får tillbask data från fetch
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(data)
    if (data.message) {
      this.setState({
        error: data.message
      })
    } else {
      if (city && country) {
        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          desc: data.weather[0].description,
          error: ""
        });
      } else {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          desc: undefined,
          error: "Please enter city and country.."
        });
      }
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="title-container">
                  <Title />
                </div>
                <div className="form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temp={this.state.temp}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    desc={this.state.desc}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;