import React, { Component } from 'react';
import RocketLaunchDetails from './components/RocketLaunchDetails';
import querystring from 'querystring';
import './App.css';
import loader from './loadRocket.gif';

const API_BASE_URL = "https://api.spacexdata.com/v3/launches?limit=100";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      filters: {
        limit: 150,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined,
      },
    }

  }

  getUpdatedApiUrl(filters = {}) {
    return API_BASE_URL + querystring.stringify({ ...filters });
  }

  fetchAPI(filters) {
    const URL = this.getUpdatedApiUrl(filters);
    this.setState({ isLoaded: false, filters });
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          data
        });
      });
  }

  componentDidMount() {
    this.fetchAPI(this.state.filters);
  }

  updateApiFilters(type, value) {
    // if same value is clicked, we remove that filter
    if (this.state.filters[type] === value) {
      value = undefined;
    }

    const filters = {
      ...this.state.filters,
      [type]: value,
    };

    this.fetchAPI(filters);
  }


  render() {

    const { isLoaded, data } = this.state;
    const uniqueLaunchYears = new Array(16).fill(0).map((_, index) => 2006 + index);

    if (!isLoaded) {
      return <div className="App-Loader-container">
        <div className="App-Loader-box">
          <img src={loader} alt="loading..." />
        </div>
      </div>
    }

    else {

      return (
        <div className="App">
          <h1 className="App-Header">SpaceX Launch Programs</h1>
          <div className="App-Container-fluid">
            <div className="App-Row">
              <div className="App-Column-left">
                <div className="App-Filter-card">
                  <div className="App-Card-container">
                    <h3>
                      Filters
                    </h3>
                    <p className="Text-center">
                      Launch Year                      
                    </p>
                    <hr className="App-Hr" />
                    <div className="App-Row">
                      <div className="App-Filter-button-container">
                        {uniqueLaunchYears.map((year) => {
                          return (
                            <button
                              className="App-filter-button"
                              variant={
                                this.state.filters.launch_year ===
                                year.toString()
                                  ? "success"
                                  : "outline-success"
                              }
                              value={year}
                              onClick={(e) =>
                                this.updateApiFilters(
                                  "launch_year",
                                  e.target.value
                                )
                              }
                            >
                              {year}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <p className="Text-center">
                      Successful Launch
                    </p>
                    <hr className="App-hr" />
                    <div className="App-Filter-button-container">
                      <button
                        className="App-filter-button"
                        variant={
                          this.state.filters.launch_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="true"
                      >
                        True
                      </button>

                      <button
                        className="App-filter-button"
                        variant={
                          this.state.filters.launch_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="false"
                      >
                        False
                      </button>
                    </div>

                    <p className="Text-center">
                      Successful Landing
                    </p>
                    <hr className="App-hr" />
                    <div className="App-Filter-button-container">
                      <button
                        className="App-filter-button"
                        variant={
                          this.state.filters.land_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="true"
                      >
                        True
                      </button>

                      <button
                        className="App-filter-button"
                        variant={
                          this.state.filters.land_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="false"
                      >
                        False
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="App-Column-right">
                <div className="App-Row">
                  {data.map((details) => {
                    return (
                      <div className="App-Column">
                        <RocketLaunchDetails details={details} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <h5>
                Developed by : Akanksha Sharma
              </h5>
            </div>
          </div>
        </div>
      );
    }

  }
}

export default App;
