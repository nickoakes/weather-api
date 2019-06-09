import React, {Component} from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;

class WeatherDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conditions: ""
        };
    }

    componentDidMount() {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=seoul&mode=json&appid=${apiKey}`)
        .then(res => {
            this.setState({
                conditions: res.data
            });
        });
    }

    searchByCity = () => {
        let searchTerm = this.state.search
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&mode=json&appid=${apiKey}`)
        .then(res => {
            this.setState({
                conditions: res.data,
                error: ""
            })
        })
        .catch(err => {
            console.log(err)
                this.setState(prevState => {
                    return {
                        ...prevState,
                        error: "No weather data found for this location"
                    };
                });
        })
    }

    searchOnKeyDown = (e) => {
        if(e.keyCode === 13) {
            this.searchByCity();
        }
    };

    setBackgroundColor = () => {
        let color;
        let maxTemp = this.state.conditions.main.temp_max - 273
        let minTemp = this.state.conditions.main.temp_min - 273
        let avTemp = (maxTemp + minTemp) / 2
        switch (true) {
            case (avTemp < 0):
              color = "#287aff";
              break;
            case (avTemp > 0 && avTemp < 10):
              color = "#84d0ff";
              break;
            case (avTemp > 10 && avTemp < 20):
              color = "#bfff91";
              break;
            case(avTemp > 20 && avTemp < 30):
              color = "#ffda7c";
              break;
            case(avTemp > 30):
              color = "#ff0f0f"
              break;
            default:
              color = "#F6F6F6"
    }
    return color;
}

setIcon = () => {
    let weather = this.state.conditions.weather[0].description;
    let icon;
    switch (true) {
        case ((weather.includes("rain") && (weather.includes("light") || weather.includes("moderate"))) || weather.includes("drizzle")):
            icon = <i className="fas fa-cloud-rain"></i>
            break;
        case (weather.includes("rain") && (weather.includes("heavy") || weather.includes("shower"))):
            icon = <i className="fas fa-cloud-showers-heavy"></i>
            break;
        case(weather.includes("sun") || weather.includes("sunny") || weather.includes("clear sky")):
            icon = <i className="fas fa-sun"></i>
            break;
        case(weather.includes("clouds") && (weather.includes("broken") || weather.includes("few") || weather.includes("scattered"))):
            icon = <i className="fas fa-cloud-sun"></i>
            break;
        case(weather.includes("clouds") && weather.includes("overcast")):
            icon = <i className="fas fa-cloud"></i>
            break;
        case(weather.includes("haze") || weather.includes("mist")):
            icon = <i className="fas fa-smog"></i>
            break;
        case(weather.includes("thunderstorm")):
            icon = <i className="fas fa-bolt"></i>
            break;
        case(weather.includes("snow")):
            icon = <i class="fas fa-snowflake"></i>
            break;
        default:
          icon = "";
    }
    return icon;
}

handleChange = e => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState( prevState => {
       return { 
                ...prevState, [name]: value
                  }
    }
    );
}

    render() {
        return (
            <div className="container">
            <h1>Current weather conditions in {this.state.conditions.name}</h1>
            <hr/>
            <div className="card card-body" style={this.state.conditions ? {background: this.setBackgroundColor()} : {background: "#F6F6F6"}}>
                {this.state.conditions ? 
                <React.Fragment>
                <p>{this.setIcon()} {(this.state.conditions.weather[0].description).charAt(0).toUpperCase() + (this.state.conditions.weather[0].description).slice(1)}</p>
                <p>Max. temperature: {(this.state.conditions.main.temp_max - 273).toFixed(1) + "°C"}</p>
                <p>Min. temperature: {(this.state.conditions.main.temp_min - 273).toFixed(1) + "°C"}</p>
                <p>Humidity: {this.state.conditions.main.humidity + "%"}</p>
                </React.Fragment> : <h3>"Loading, please wait..."</h3>}
            </div>
            <form>
            <div className="input-group">
                <input type="text" className="form-control" name="search" onChange={this.handleChange} placeholder="Search" />
                <div className="input-group-btn">
                <button className="btn btn-dark" type="button" onClick={() => this.searchByCity()}>
                    Search
                </button>
            </div>
            </div>
            </form>
            <h3>{this.state.error ? this.state.error : ""}</h3>
            </div>
        )
    }
}

export default WeatherDisplay;