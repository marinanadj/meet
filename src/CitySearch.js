import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: 'Everywhere',
    suggestions: [],
    showSuggestions: false
  }

  handleInputChanged = (event) => {
    this.setState( { showSuggestions: true } );
      const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: event.target.value,
        infoText: 'We can not find the city you are looking for. Please try another city',
      });
    } else {
      return this.setState({
        query: event.target.value,
        suggestions,
        infoText:''
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      infoText:''
    });
    this.props.updateEvents(suggestion, undefined);
  }
  
  render() {
    return (
      <>
      <div className="CitySearch text-muted">In which city would you like to join?</div>
      <input
          type="text"
          className="city mt-3"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
        <ul className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }}>
            {
            this.state.suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>
            ))}
            <li onClick={() => this.handleItemClicked("Everywhere")}>
              <b>See all cities</b>
            </li>
        </ul>
      <InfoAlert text={this.state.infoText} />
      </>
    );
  }
}

export default CitySearch;