import React, { useState, useContext, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Render from './render'
import Grid from '@material-ui/core/Grid'
import './detail-panel.css'
import {profile} from './bits/store'
import { D3DModel } from './utils/api'
import { MockModel } from './utils/mock'
import {makeStyles, Theme, ThemeProvider} from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import TimelapseOutlinedIcon from '@material-ui/icons/TimelapseOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import ChangeHistoryOutlinedIcon from '@material-ui/icons/ChangeHistoryOutlined';
import SettingsEthernetOutlinedIcon from '@material-ui/icons/SettingsEthernetOutlined';
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import {lightBlue, orange} from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';

const useStyles = makeStyles((theme:Theme)=>({
    root: {
        width: '100%',
        maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
        backgroundColor: 'rgba(67,71,83,0.685)',
        borderRadius:'10px',
        color: 'white'
    },
    commentList:{
        width: '100%',
        // maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
        backgroundColor: 'rgba(67,71,83,0.685)',
        borderRadius:'10px',
        color: 'white'
    },
    inline:{
        dislay:'inline',
    },
    ctrl: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    button: {
        margin: theme.spacing(1),
    },
    divider:{
        margin: theme.spacing(2, 0),
        height: '3px',
    },
    container:{
        backgroundColor:'#1e2127',
        backgroundImage:'url(floating-cogs.svg)',
        backgroundRepeat:'repeat',
    },
    avatarIcon: {
        color: '#c8d0e6',
        backgroundColor: '#2a2d35'
    }
}));

const myGrey = {
    500: '#2a2d35'
}
const theme = createMuiTheme({
    palette: {
        type: 'dark',
      primary: lightBlue,
      secondary: orange,
      grey: myGrey,
      background: {
        default: '#2a2d35',
        paper: '#2a2d35',
      }
    },
    
  })

interface Props {
    open: boolean
    onClose: ()=>any
}

const DetailPanel : React.FC<Props> = (props)=>{
    const classes = useStyles();
    const pro = useContext(profile)
    const [canvasBg, setCanvasBg] = useState('');
    const [currentModel, setCurrentModel] = useState<D3DModel>(MockModel())
    const [openCtrl, setOpenCtrl] = useState(false)
    useEffect(()=>{
        if(props.open) {
            setOpenCtrl(false)
            console.log('triggering rerender')
            setCurrentModel(pro.get.currentViewModel());
        }

    }, [props.open])
    const seBgW = (bg:string) => {
        console.log(bg);
        setCanvasBg(bg)
    }
    return(
        <Dialog open={props.open} onClose={props.onClose} 
        aria-labelledby="form-dialog-title" maxWidth='xl' fullWidth={true}
        style={{
            backgroundColor:'rgb(36,36,36)',
        }}>
            <ThemeProvider theme={theme}>
            <Grid container className={classes.container}>
                <Grid item xs={12} md={9}>
                    <div className='canvas-frame-wrapper'>
                        <div id='canvas-frame'  className='canvas-frame' style={{
                            background:canvasBg,
                            borderRadius: '10px',
                            overflow: 'hidden'
                            }}></div>
                        <Render 
                            onBgColor={seBgW} 
                            model={currentModel}
                            frameid='canvas-frame'
                            openCtrl={openCtrl}
                        />
                        <div className={classes.ctrl}>
                            <IconButton onClick={()=>setOpenCtrl(!openCtrl)} size='small' color='inherit'>
                                <SettingsIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div style={{
                        paddingTop:'20px',
                    }}>
                        <List className={classes.commentList}>
                            {
                                currentModel.comments.map((v,idx)=>{
                                    return(
                                        <ListItem alignItems="flex-start" key={idx}>
                                            <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src="image/avater.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary={v.username}
                                            secondary={
                                                <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {"Rating:"+v.rating}
                                                </Typography>
                                                {" — "+v.content}
                                                </React.Fragment>
                                            }
                                            />
                                    </ListItem>
                                    )
                                })
                            }
                        </List>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Grid container>
                        <Grid item xs={12}>
                            <div style={{
                                textAlign:"center",
                                padding:'20px',
                            }}>
                                <div style={{
                                    textAlign:"center",
                                    borderStyle:'dashed',
                                    borderWidth:'1px',
                                    borderRadius:'10px',
                                    borderColor:'rgba(0,0,0,0.3)',
                                    backgroundColor:'rgba(67,71,83,0.685)',
                                    paddingTop:'10px',
                                    paddingBottom:'10px',
                                }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        className={classes.button}
                                        startIcon={<CenterFocusWeakIcon />}
                                        onClick={()=>setOpenCtrl(!openCtrl)}>
                                        Inspect View
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<AttachMoneyOutlinedIcon />}>
                                        Perchase Its
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<CommentIcon />}>
                                        Add Comment
                                    </Button>
                                </div>
                                <div style={{
                                    height:'4px',
                                    borderRadius:'2px',
                                    width:'100%',
                                    backgroundColor:'rgba(219,232,255,0.12)',
                                    marginTop:'20px',
                                    marginBottom:'15px',
                                }}></div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{
                                paddingLeft:'20px',
                                paddingRight:'20px',
                                marginTop:'-15px',
                            }}>
                                <div style={{
                                    textAlign:"center",
                                    borderStyle:'dashed',
                                    borderWidth:'1px',
                                    borderRadius:'10px',
                                    borderColor:'rgba(0,0,0,0.3)',
                                }}>
                                    <List className={classes.root}>
                                        <ListItem>
                                            <ListItemAvatar >
                                            <Avatar className={classes.avatarIcon}>
                                                <FingerprintIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Name" secondary={currentModel.name} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                            <Avatar className={classes.avatarIcon}>
                                                <TimelapseOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Publish" secondary={currentModel.publish} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                            <Avatar className={classes.avatarIcon}>
                                                <FormatListBulletedOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Catagory" secondary={currentModel.catalog} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                            <Avatar className={classes.avatarIcon}>
                                                <ChangeHistoryOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Triangles Number" secondary={currentModel.num_triangles} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                            <Avatar className={classes.avatarIcon}>
                                                <SettingsEthernetOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Vertices Number" secondary={currentModel.num_vertices} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                            <Avatar className={classes.avatarIcon}>
                                                <LoyaltyOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Tags" secondary={currentModel.tags} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                            <Avatar className={classes.avatarIcon}>
                                                <PlayCircleFilledOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Animated" secondary={currentModel.animated?'True':'False'} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                            <Avatar className={classes.avatarIcon}>
                                                <PeopleAltOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Author" secondary={currentModel.owner.username} />
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            
            </ThemeProvider>
        </Dialog>
    )
    
}

export default DetailPanel