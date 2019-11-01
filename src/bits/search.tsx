import React, { useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {APISearch} from '../utils/api';
import { async } from 'q';
import {profile} from './store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      height: 50,
      margin: "0 auto 0 auto",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

export default function CustomizedInputBase() {
  const classes = useStyles();
  const [key, setKey] = useState('');
  const pro = useContext(profile);
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search 3D Models..."
        // inputProps={{ 'aria-label': 'Search 3D Models...' }}
        onChange={(e)=>{setKey(e.target.value)}}
        onKeyPress={(e)=>{
          // if(e.keyCode===13){
          //   console.log('enter down')
          //   pro.to.catalog()
          // }
          console.log(e.keyCode)
        }}
      />
      <IconButton className={classes.iconButton} aria-label="search" onClick={()=>{
        pro.to.catalog()
        pro.set.searchKey(key)
      }}>
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
    </Paper>
  );
}