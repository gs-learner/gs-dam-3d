import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {LogBar} from './logBar'
import Container from '@material-ui/core/Container'
import { profile } from './store';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      // flexGrow: 1,
      display: 'none',
      cursor: 'pointer',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
    Container:{
      background:'transparent',
      // flexGrow: 1,
      float:'right',
    },
    Toolbar:{
      backgroundColor:'rgb(36,36,36)',
    }
  }),
);

export default function SearchAppBar() {
  const classes = useStyles();
  const pro = useContext(profile);
  const [key, setKey] = useState('');
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.Toolbar}>
          <Typography className={classes.title} variant="h5" noWrap onClick={()=>{
            pro.to.index();
          }}>
            3D Models
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              // inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>{setKey(e.target.value)}}
              onKeyPress={(e)=>{
                if(e.key==='Enter'){
                  pro.set.searchKey(key)
                  pro.to.catalog()
                }
              }}
            />
          </div>
          <Container className = {classes.Container}><LogBar/></Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}