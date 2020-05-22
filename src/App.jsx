import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Chart from './components/page1/Chart';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/chart" render={() => <Chart title="Margin Sales"/>} />
    </BrowserRouter>
  );
}

export default App;
