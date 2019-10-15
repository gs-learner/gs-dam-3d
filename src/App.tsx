import React, {useState} from 'react';
import './App.css';
import Render from './render';
import CustomizedRatings from "./bits/rate";
import {HomePage} from './homePage/homePage';

import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Edit from './bits/edit'
import DetailPanel from './detail-panel'

const App: React.FC = () => {
  const [theme, setTheme] = useState(createMuiTheme({
    palette: {
      primary: blue,
    },
  }));
  const [dark, setDark] = useState(false);
  const [openDetail, setOpenDetail] = useState(false)


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        
    <div className="App">
      {/* <div id='canvas-frame'>
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
    >Click me</button> */}
    <button onClick={()=>setOpenDetail(true)}>Show Detail</button>
    <DetailPanel open={openDetail} onClose={()=>setOpenDetail(false)}/>
    <HomePage/>

    </div>
    
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
