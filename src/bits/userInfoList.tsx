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
      backgroundColor: theme.palette.background.paper,
    },
    divider:{
      margin: theme.spacing(2, 1),
    },
  }),
);

export default function FolderList() {
  const classes = useStyles();
  const pro = useContext(profile);
  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FingerprintIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="UserName" secondary={pro.user.username} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <RedditIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="NickName" secondary={pro.user.nickname} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ContactsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Biography" secondary={pro.user.biography} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FileCopyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Works" secondary={pro.user.owned_models} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LocationOnIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Location" secondary={pro.user.location} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImportContactsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Introduction" secondary={pro.user.introduction} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SendIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="E-Mail" secondary={pro.user.email} />
      </ListItem>
    </List>
  );
}