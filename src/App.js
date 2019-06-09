import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import WeatherDisplay from './components/WeatherDisplay';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/weatherdisplay" render={() => <WeatherDisplay />} />
        <Route path="/" render={() => <Redirect to="/weatherdisplay" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
