import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import {HomePage} from './homePage/homePage';

import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Edit from './bits/edit'
import DetailPanel from './detail-panel'
import { profile, Profile } from './bits/store'
import {BrowserRouter, Route} from 'react-router-dom'
import SignupOrIn from './signup-or-in';
import { MakeEmptyUser } from './utils/api';
import UploadModel from './upload-model';


const App: React.FC = () => {
  const [theme, setTheme] = useState(createMuiTheme({
    palette: {
      primary: blue,
    },
  }));
  const toPorfile = useRef<HTMLAnchorElement>(null)
  const [openDetail, setOpenDetail] = useState(false)
  const [signupOrSignin, setSignupOrSigin] = useState(true)
  const [openSignupOrSigin, setOpenSignipOrSignin] = useState(false)
  const [user, setUser] = useState(MakeEmptyUser())
  const [openUploadModel, setOpenUploadModel] = useState(false)

  const pro:Profile  = {
    user: user,
    set: {
      user: setUser
    },
    to: {
      profile: ()=>{
        if(toPorfile.current) {
          toPorfile.current.click()
        }
      }
    },
    open: {
      uploadModel: openUploadModel
    },
    trigger: {
      uploadModel: setOpenUploadModel
    },
    triggerSigning: (v)=>{
      setSignupOrSigin(v == 'signup');
      setOpenSignipOrSignin(true);
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
    <button onClick={()=>{
      setOpenUploadModel(true)
    }}>Open Upload Model</button>
    <DetailPanel open={openDetail} onClose={()=>setOpenDetail(false)}/>
    <HomePage/>
    
    </div>
    </Route>
    <Route exact path='/profile'>
      This is a profile
    </Route>
    </BrowserRouter>
    <SignupOrIn open={openSignupOrSigin} onClose={()=>{setOpenSignipOrSignin(false)}} isSignUp={signupOrSignin}/>
    <UploadModel></UploadModel>
    </profile.Provider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
