import React from "react";
import { Form } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import { station_list } from '../stations';
import { Link } from 'react-router-dom';

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : station_list.filter(stn =>
      (stn.name.toLowerCase().slice(0, inputLength) === inputValue) || stn.crs.toLowerCase() === inputValue
    ).slice(0, 16);
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);



class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: []
        }

    }

    updateInput = (event, { newValue, method }) => {
        this.setState({value: newValue})
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: getSuggestions(value)
        });
      };

    onSuggestionsClearRequested = (event) => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestionValue }) => {
        this.setState({value: suggestionValue}, function(){this.onSubmit(event)})
    }

    onSubmit = event => {
        if (!this.state.value) {
            return;
        }

        let crs;
        try {
            crs = station_list.find(({name}) => name === this.state.value).crs;
        } catch(e) {
            crs = this.state.suggestions[0].crs;
        }

        this.setState({value: ''})
        this.props.handleSubmit(event, this.props.history, crs)
    } 

    render() {
        const {value, suggestions} = this.state;
        const inputProps = {
            placeholder: "Search stations...",
            autoFocus: true,
            onChange: this.updateInput,
            value,
            id: "search-input"
        }
        const theme = {
            container: 'autosuggest',
            input: 'form-control',
            suggestionsContainer: 'dropdown',
            suggestionsList: `dropdown-menu ${suggestions.length ? 'show' : ''}`,
            suggestion: 'dropdown-item',
            suggestionHighlighted: 'active'
         };

    return (
        <div>
            <Link to="/" style={{color: "initial", textDecoration: "none"}}><h1 className="header">Train Times</h1></Link>
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="searchForm.Input">
                    
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        theme={theme}
                    />
                </Form.Group>
            </Form>
        </div>
    )
    }
}

export default Header;
