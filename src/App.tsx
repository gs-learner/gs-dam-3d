import React from 'react';
import './App.css';
import Render from './render';

const App: React.FC = () => {
  return (
    <div className="App">
      <div id='canvas-frame'>
        <Render />
      </div>
    </div>
  );
}

export default App;
