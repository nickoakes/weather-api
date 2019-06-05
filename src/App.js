import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import WeatherDisplay from './components/WeatherDisplay';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/weatherdisplay" render={() => <WeatherDisplay />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
