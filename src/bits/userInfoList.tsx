import React, { useContext } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import RedditIcon from '@material-ui/icons/Reddit';
import ContactsIcon from '@material-ui/icons/Contacts';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import SendIcon from '@material-ui/icons/Send';
import {profile} from './store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: '#f4fcff',
      color:'#2f4c56',//#2f4c56, 
    },
    divider:{
      margin: theme.spacing(2, 1),
    },
    primary:{
      color:'#2f4c56',
    },
    secondary:{
      color:'#4f666e'
    },
    avater:{
      backgroundColor:'#2f4c56'
    }
  }),
);



export default function FolderList() {
  const classes = useStyles();
  const pro = useContext(profile);
  const textStyle = {
    primaryTypographyProps: {className: classes.primary},
    secondaryTypographyProps: {className: classes.secondary}
  }
  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avater}>
            <FingerprintIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText {...textStyle}  primary="UserName" secondary={pro.user.username} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avater}>
            <RedditIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText {...textStyle} primary="NickName" secondary={pro.user.nickname} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avater}>
            <ContactsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText {...textStyle} primary="Biography" secondary={pro.user.biography} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avater}>
            <FileCopyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText {...textStyle} primary="Works" secondary={pro.user.owned_models} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avater}>
            <LocationOnIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText {...textStyle} primary="Location" secondary={pro.user.location} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avater}>
            <ImportContactsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText {...textStyle} primary="Introduction" secondary={pro.user.introduction} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avater}>
            <SendIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText {...textStyle} primary="E-Mail" secondary={pro.user.email} />
      </ListItem>
    </List>
  );
}