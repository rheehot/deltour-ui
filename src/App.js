import React from 'react';

import { HashRouter Route } from 'react-router-dom';

import Index from './components/Login/Index.js';
import Chat from './components/Chat/Chat.js';

const App = () => (
  <HashRouter>
    <Route path="/" exact={true} component={Index} />
    <Route path="/chat" exact={true} component={Chat} />
  </HashRouter>
);

export default App;

