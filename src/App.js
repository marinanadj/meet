import './nprogress.css';
import './App.css';
import React, { Component } from 'react';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';
import { Col, Container, Row, Navbar } from "react-bootstrap";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }

    if (!navigator.onLine) {
      this.setState({
        offlineText:
        'Your are currently offline. The displayed events might not be up to date.'
      });
    } else {
      this.setState({
        offlineText: ''
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState(
      {
        numberOfEvents,
      },
      this.updateEvents(this.state.locations, numberOfEvents)
    );
  };

  /* updateEvents = (location)  => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
      events : 
      events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }; */

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location,
        });
      }
    });
  };

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift();
      return { city, number };
    })
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />
    const { events, locations, numberOfEvents, offlineText } = this.state;
    return (
      <div className='App'>

      <Navbar fixed='top' bg="light" expand="lg">
        <Container className='navbar-brand-wrapper'>
          <ul class='navbar-nav mx-auto'>
            <li>
              <a className='navbar-brand' href="#top">meet</a>
            </li>
          </ul>
        </Container>
    </Navbar>

        <div className='search-wrapper'>
        
        <CitySearch locations={locations} updateEvents={this.updateEvents}/>

        
        <NumberOfEvents numberOfEvents={numberOfEvents} 
            updateNumberOfEvents={this.updateNumberOfEvents}/>
        </div>

        <div className='data-vis'>
        <h4 className='data-vis-head'>Events in each city</h4>
        <div className='data-vis-wrapper'>
        <EventGenre events={events} />
        <ResponsiveContainer height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="City" />
            <YAxis 
              allowDecimals={false}
              type="number" 
              dataKey="number" 
              name="Number of events" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#76c893" />
        </ScatterChart>
        </ResponsiveContainer>
        </div>
        </div>

        <Container fluid>
        <Row className='justify-content-md-center'>
        <Col xs={12} md={6} xl={6}>
        <EventList events={events}/>
        </Col>
        </Row>
        </Container>

        <OfflineAlert text={offlineText} />

        <WelcomeScreen 
          showWelcomeScreen={this.state.showWelcomeScreen} 
          getAccessToken={()=> { getAccessToken() }} 
        />

      </div>
    );
  }
}


export default App;