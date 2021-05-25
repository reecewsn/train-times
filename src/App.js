import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import TrainContextProvider from "./TrainContext";
import Header from './components/Header';
import Timetable from './components/Timetable';

class App extends Component {
    handleSubmit(event, history, input) {
        try {
            event.preventDefault();
        } catch(e) {};

        history.push(`/stations/${input}`)
    }

    render() {
        return (
            <Container className="p-4">
                <TrainContextProvider>
                    <HashRouter>
                        <Route render={props => (
                            <Header handleSubmit={this.handleSubmit} history={props.history} />
                        )} />

                        <Switch>
                            <Route path="/stations/:input" render={props => (
                                <Timetable station={props.match.params.input} />
                            )} />
                        </Switch>
                    </HashRouter>
                </TrainContextProvider>
            </Container>
        )
    }
};

export default App;
