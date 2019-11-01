import React, {useContext}from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import EditIcon from '@material-ui/icons/Edit';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

import SignIn from './buttonSignIn'
import SignUp from './buttonSignUp'
import { profile } from './store';
import { Avatar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MakeEmptyUser, APISignout } from '../utils/api';

const useStyles = makeStyles({
    avater:{
        width:40,
        height:40,
        cursor:'pointer',
    },
    listItemIcon:{
        paddingLeft:10,
    }
});
const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props: MenuProps) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);
function HomeIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const classes = useStyles();
    const pro = useContext(profile);
    return (
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          WELCOME!
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={()=>{
              pro.to.profile();
          }}>
            <ListItemIcon className={classes.listItemIcon}>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My Home" />
          </StyledMenuItem>
          <StyledMenuItem onClick={()=>{
              pro.to.edit_profile();
          }}>
            <ListItemIcon className={classes.listItemIcon}>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit Info" />
          </StyledMenuItem>
          <StyledMenuItem onClick={()=>{
            //   TODO logout(gs)
              pro.set.user(MakeEmptyUser());
              pro.del.login();
              APISignout()
          }}>
            <ListItemIcon className={classes.listItemIcon}>
              <MeetingRoomIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </StyledMenuItem>
        </StyledMenu>
      </div>
    );
}


export const LogBar: React.FC = (props) =>{
    const pro = useContext(profile)
    const classes = useStyles();
    // useEffect(() => {
    //     console.log(pro)
    // }, [pro]);
    return(
        <div className="LogBar" style={{float:'right'}}>
        {
            pro.user.username ?
            <Grid container spacing={3}>
                <Grid item xs>
                    <div style={{lineHeight:'40px', color:'white',marginRight:'-10px'}}>
                        <CustomizedMenus/>
                    </div>
                </Grid>
                <Grid item xs>
                    {/* TODO (gs)*/}
                    <div onClick={()=>{
                        pro.to.profile();
                    }}>
                      {
                        pro.user.avatar?
                        <Avatar className={classes.avater} src={pro.user.avatar}>
                        </Avatar>:
                        <Avatar className={classes.avater}>
                        {pro.user.username[0]}
                        </Avatar>
                      }
                    </div>
                </Grid>
            </Grid>
            :
            <div>
                <SignIn/>
                <SignUp/>
            </div>
        }
        </div>
    )
}