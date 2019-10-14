import React, {useState} from 'react';
import './App.css';
import Render from './render';
import CustomizedRatings from "./bits/rate"
import { createMuiTheme, makeStyles, Theme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Edit from './bits/edit'

const App: React.FC = () => {
  const [theme, setTheme] = useState(createMuiTheme({
    palette: {
      primary: blue,
    },
  }));
  const [dark, setDark] = useState(false);



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        
    <div className="App">
      <div id='canvas-frame'>
        <Render />
      </div>
      <CustomizedRatings />
      <button
      style={{
        position:'absolute',
        right: 5
      }}
      onClick={()=>{
        setTheme(createMuiTheme({
          palette: {
            type: dark ? 'dark' : 'light',
            primary: blue,
          },
        }))
        setDark(!dark)
      }}
    >Click me</button>
    
      <Edit />

    </div>
    
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
