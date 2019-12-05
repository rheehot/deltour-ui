import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Index from './components/Login/Index.js';
import Chat from './components/Chat/Chat.js';


const App = () => (
  <Router>
    <Route path="/" exact component={Index} />
    <Route path="/chat" exact component={Chat} />

  </Router>
);

export default App;