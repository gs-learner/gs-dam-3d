import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import '../fonts/proxima-nova.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
        boxShadow: '0px -2px 5px rgb(36,36,36)',
    },
    center:{
        flexGrow:1,
        fontFamily:'Proxima Nova',
        fontWeight:400,
        textAlign:'center',
    },
    content:{
        lineHeight:'100%',
    }
  }),
);

export default function TailBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" style={{
            height:'70px',
            background: 'linear-gradient(180deg, rgba(53,53,53,1) 0%, rgba(52,52,52,1) 0%, rgba(30,30,30,1) 100%)',
            }}>
          <Typography variant="h6" color="inherit" className={classes.center}>
              <div className={classes.content}>
                <span style={{
                    // fontFamily:'Author',
                    // fontSize:40,
                }}>@</span>Copy-right 2019-2020
              </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}