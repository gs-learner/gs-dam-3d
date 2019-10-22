import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import {HomePage} from './homePage/homePage';
import {CataPage} from './cataPage/cataPage';
import {UserPage} from './userPage/userPage';

import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import DetailPanel from './detail-panel'
import { profile, Profile } from './bits/store'
import {BrowserRouter, Route} from 'react-router-dom'
import SignupOrIn from './signup-or-in';
import UploadModel from './upload-model';
import EditProfile from './edit-profile'

import { MockUser } from './utils/mock'
import { green, red } from '@material-ui/core/colors';

const App: React.FC = () => {
  const [theme, setTheme] = useState(createMuiTheme({
    palette: {
      primary: blue,
      secondary: red,
    },
  }));
  const toPorfile = useRef<HTMLAnchorElement>(null)
  const toEditPorfile = useRef<HTMLAnchorElement>(null)
  const [openDetail, setOpenDetail] = useState(false)
  const [signupOrSignin, setSignupOrSigin] = useState(true)
  const [openSignupOrSigin, setOpenSignipOrSignin] = useState(false)
  const [user, setUser] = useState(MockUser())
  const [openUploadModel, setOpenUploadModel] = useState(false)
  const [logState, setLogState] = useState(false)
  
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
      },
      edit_profile: ()=>{
        if(toEditPorfile.current) toEditPorfile.current.click()
      }

    },
    open: {
      uploadModel: openUploadModel
    },
    State:{
      logState: logState
    },
    trigger: {
      uploadModel: setOpenUploadModel,
      logState: setLogState,
    },
    triggerSigning: (v)=>{
      setSignupOrSigin(v === 'signup');
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
    <a ref={toEditPorfile} href='/profile/edit'></a>
    <button onClick={()=>setOpenDetail(true)}>Show Detail</button>
    <button onClick={()=>{
      if(toPorfile.current) {
        toPorfile.current.click()
      }
    }}>To Profile</button>
    {/* <button onClick={()=>{
      setOpenUploadModel(true)
    }}>Open Upload Model</button> */}
    <DetailPanel open={openDetail} onClose={()=>setOpenDetail(false)}/>
    <HomePage/>
    
    </div>
    </Route>
    <Route exact path='/profile'>
      <CataPage/>
    </Route>
    <Route exact path='/user'>
      <UserPage />
    </Route>
    <Route exact path='/profile/edit'>
      <EditProfile />
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
