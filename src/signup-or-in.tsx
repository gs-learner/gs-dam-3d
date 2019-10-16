import React, { useState, useEffect, useContext } from 'react'
import { createStyles, Theme, withStyles, WithStyles,makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import { APISignup, APISignin } from './utils/api'
import { profile } from './bits/store';
import Grid from '@material-ui/core/Grid'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const ColorButton = withStyles((theme: Theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
  }))(Button);

const SignupOrIn : React.FC<Props> = (props)=>{
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isSignup, setIsSignup] = useState(false);

    const pro = useContext(profile)
    
    const Signup = async ()=>{
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
        pro.set.user(result.data);
        props.onClose()
      }
      else {
        //TODO: Log error
      }
    }

    const Singin = async ()=>{
      let result = await APISignin({
        username: username,
        password: password
      })
      if(result.ok) {
        pro.set.user(result.data)
        props.onClose()
      }
      else {
        //TODO: Log error
      }
    }

    useEffect(()=>{
      setIsSignup(props.isSignUp)
    }, [props.isSignUp])

    return(
        <Dialog onClose={props.onClose} open={props.open} >
          {
            isSignup ? 
            <Paper>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
            <Grid item xs>
            <Typography gutterBottom variant='h4'>
                Signup
            </Typography>
            </Grid>
            <Grid item xs>
            <TextField
                required
                id="outlined-required"
                label="Username"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={(v)=>setUsername(v.target.value)}
                value={username}
            />
            </Grid>
            <Grid item xs>
            <TextField
                required
                id="outlined-required"
                label="Email"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(v)=>setEmail(v.target.value)}
            />
            </Grid>
            <Grid item xs>
            <TextField
                required
                id="outlined-required"
                label="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className={classes.textField}
                margin="normal"
                variant="outlined"
            />
            </Grid>
            <Grid item xs>
            <ColorButton> Sign Up</ColorButton>
            </Grid>
            <Typography gutterBottom variant='subtitle1' onClick={()=>Signup()}>
                or
            </Typography>
            <Grid item xs>
            <ColorButton onClick={()=>setIsSignup(!isSignup)}> Sign In</ColorButton>
            </Grid>
            </Grid>
            </Paper>
            :
            <Paper>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
              >
              <Grid item xs>
              <Typography gutterBottom variant='h4'>
                Signup
              </Typography>
              </Grid>
              <Grid item xs>
              <TextField
                  required
                  id="outlined-required"
                  label="Username"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  onChange={(v)=>setUsername(v.target.value)}
                  value={username}
              />
              </Grid>
              <Grid item xs>
              <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(v)=>setEmail(v.target.value)}
              />
              </Grid>
              <Grid item xs>
              <ColorButton onClick={()=>Singin()}> Sign In </ColorButton>
              </Grid>
              <Typography gutterBottom variant='subtitle1'>
                or
              </Typography>
              <Grid item xs>
              <ColorButton onClick={()=>setIsSignup(!isSignup)}>Sign Up</ColorButton>
              </Grid>
              </Grid>
            </Paper>
          }
        </Dialog>
    )
}

export default SignupOrIn