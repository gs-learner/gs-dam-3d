import React from 'react';
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

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FingerprintIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="UserName" secondary="LZW" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <RedditIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="NickName" secondary="LZW" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ContactsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Biography" secondary="LZW" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FileCopyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Works" secondary="LZW" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LocationOnIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Location" secondary="LZW" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImportContactsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Introduction" secondary="我是超级强无敌的林昭玮" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SendIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="E-Mail" secondary="LZW" />
      </ListItem>
    </List>
  );
}