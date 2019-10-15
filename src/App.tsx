import React, {useState, useEffect, useRef} from 'react';
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
import { profile, Profile } from './bits/store'
import {BrowserRouter, Route} from 'react-router-dom'

const App: React.FC = () => {
  const [theme, setTheme] = useState(createMuiTheme({
    palette: {
      primary: blue,
    },
  }));
  const toPorfile = useRef<HTMLAnchorElement>(null)
  const [dark, setDark] = useState(false);
  const [openDetail, setOpenDetail] = useState(false)
  const [username, setUsername] = useState('')
  const pro:Profile  = {
    username: username,
    toProfile: ()=>{
      if(toPorfile.current) {
        toPorfile.current.click()
      }
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
      <profile.Provider value={pro}>
        <BrowserRouter>
       <Route exact path='/'>
    <div className="App">
    <a ref={toPorfile} href='/profile'></a>
    <button onClick={()=>setOpenDetail(true)}>Show Detail</button>
    <button onClick={()=>{
      if(toPorfile.current) {
        toPorfile.current.click()
      }
    }}>To Profile</button>
    <DetailPanel open={openDetail} onClose={()=>setOpenDetail(false)}/>
    <HomePage/>
    
    </div>
    </Route>
    <Route exact path='/profile'>
      This is a profile
    </Route>
    </BrowserRouter>
    </profile.Provider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
