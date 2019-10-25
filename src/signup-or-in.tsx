import React, { useState, useEffect, useContext } from 'react'
import { createStyles, Theme, withStyles,makeStyles,useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { APISignup, APISignin } from './utils/api';
import { profile } from './bits/store';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { MockUser } from './utils/mock';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },

  }),
);

interface Props {
    open: boolean
    onClose: ()=>any
    isSignUp: boolean
}
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}
const ColorButton = withStyles((theme: Theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: '#56ab2f',
      '&:hover': {
        backgroundColor: '#177817',
      },
      marginTop:'20px',
    },
  }))(Button);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const SignupOrIn : React.FC<Props> = (props)=>{
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isSignup, setIsSignup] = useState(false);
    const [errorMessage, seterrorMessage] = useState('');
    const [logError, setError] = useState(false);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };
    const handleChangeIndex = (index: number) => {
      setValue(index);
    };

    const pro = useContext(profile)
    useEffect(()=>{
      setError(false);
      seterrorMessage('');
      handleChangeIndex(isSignup?0:1);
    },[isSignup])
    const Signup = async ()=>{
      try{
        let result = await APISignup({
          username: username,
          password: password,
          location: '',
          introduction: '',
          email: email,
          avatar: '',
          nickname: username,
          biography: ''
        })
  
  
        if(result.ok) {
          console.log(result.data)
          pro.set.user(result.data);
          props.onClose();
          setError(false);
        }
        else {
          console.log("format wrong");
          setError(true)
          seterrorMessage("name has been registered");
        }
      }catch(e){
        console.log('error connect server');
        setError(true);
        seterrorMessage("error connect server")
      }
      
    }

    const Singin = async ()=>{
      try{
        let result = await APISignin({
          username: username,
          password: password
        })
        if(result.ok) {
          pro.set.user(result.data)
          pro.set.logState(true);
          props.onClose();
          setError(false);
          pro.save.login(username, password)
        }
        else {
          setError(true)
          seterrorMessage("Info wrong with")
        }
      }catch(e){
        setError(true)
        seterrorMessage("error connect server")
        pro.set.logState(true);
        pro.set.user(MockUser()) //TODO: delete
        pro.save.login('aaa', 'bbb') //TODO: delete
      }
      
    }

    useEffect(()=>{
      setIsSignup(props.isSignUp)
    }, [props.isSignUp])

    return(
        <Dialog onClose={props.onClose} open={props.open}>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="SIGN UP" {...a11yProps(0)} onClick={() => setIsSignup(!isSignup)}/>
                <Tab label="SIGN IN" {...a11yProps(1)} onClick={() => setIsSignup(!isSignup)}/>
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item xs>
                      <TextField
                        required
                        fullWidth
                        error={logError}
                        label={logError ? errorMessage : "Username"}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={(v) => setUsername(v.target.value)}
                        value={username}
                      />
                    </Grid>
                    <Grid item xs>
                      <TextField
                        required
                        label="Email"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={email}
                        onChange={(v) => setEmail(v.target.value)}
                      />
                    </Grid>
                    <Grid item xs>
                      <TextField
                        required
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs>
                      <ColorButton onClick={() => Signup()}> Sign Up</ColorButton>
                    </Grid>
                  </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item xs>
                      <TextField
                        required
                        error={logError}
                        label={logError ? errorMessage : "Username"}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={(v) => setUsername(v.target.value)}
                        value={username}
                      />
                    </Grid>
                    <Grid item xs>
                      <TextField
                        required
                        label="Password"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={password}
                        onChange={(v) => setPassword(v.target.value)}
                      />
                    </Grid>
                    <Grid item xs>
                      <ColorButton onClick={() => Singin()}> Sign In </ColorButton>
                    </Grid>
                  </Grid>
              </TabPanel>
            </SwipeableViews>
          </div>
        </Dialog>
    )
}

export default SignupOrIn