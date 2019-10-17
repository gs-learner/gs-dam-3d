import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { profile } from './bits/store';
import Button from '@material-ui/core/Button';
import { APIUpdateUserProfile, APIUpdateUserPassword } from './utils/api';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
  
function TabPanel(props: TabPanelProps) {
const { children, value, index, ...other } = props;

    return (
    <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`vertical-tabpanel-${index}`}
    aria-labelledby={`vertical-tab-${index}`}
    {...other}
    >
    <Box p={3}>{children}</Box>
    </Typography>
    );
}

function a11yProps(index: any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      // backgroundColor: theme.palette.background.paper,
      display: 'flex',
      // height: 224,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      button: {
        margin: theme.spacing(1),
      },
  }));

const EditProfile : React.FC = (props)=>{
    const [tab, setTab] = React.useState(0);
    const [p, setP] = useState({
        nickname: '',
        location: '',
        introduction: '',
        biography: '',
        email: '',
        avatar: ''
    });
    //TODO: 新密码需要输入两次一样的
    const [oldpassword, setOldpassword] = useState('');
    const [passwd1, setPasswd1] = useState('');

    const classes = useStyles();
    const pro = useContext(profile)
    useEffect(()=>{
        const eu = {...pro.user};
        delete eu.username;
        setP(eu)
    }, [pro.user]);

    const updateProfile = async ()=>{
        let response = await APIUpdateUserProfile(p);
        if(response.ok) {
            pro.set.user({
                ...pro.user,
                ...p
            });
        }
        else {
            //TODO: Tell user update failed
        }
    }

    const clearPassword = ()=>{
        setOldpassword('');
        setPasswd1('')
    }

    useEffect(()=>{
        clearPassword();
    }, [tab, props, pro.user])

    const updatePasswd = async ()=>{
        let response = await APIUpdateUserPassword({oldpassword: oldpassword, password:passwd1});
        clearPassword();
        if(response.ok) {
            //TODO: Tell user update passwd success
        }
        else {
            //TODO: 
        }
    }
        
    return(
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
        <Grid item xs={10}>
            <Typography variant='h5'>
                Edit Profile &amp; Settings
            </Typography>
        <div className={classes.root}>
        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        >
        <Grid item xs={3} md={2}>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tab}
            onChange={(e, v)=>setTab(v)}
            aria-label="Vertical tabs example"
            className={classes.tabs}
        >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Security" {...a11yProps(1)} />
        </Tabs>
        </Grid>
        <Grid item xs>
        <TabPanel value={tab} index={0}>
            <Typography variant='h6'>
                {pro.user.username}
            </Typography>
            <TextField
                id="outlined-name"
                label="Display Name"
                className={classes.textField}
                value={p.nickname}
                onChange={(n)=>setP({...p, nickname:n.target.value})}
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="outlined-intro"
                label="Brief introduction of You"
                className={classes.textField}
                value={p.introduction}
                onChange={(n)=>setP({...p, nickname:n.target.value})}
                margin="normal"
                variant="outlined"
                fullWidth
            />
            <TextField
                id="outlined-intro"
                label="Your location"
                className={classes.textField}
                value={p.location}
                onChange={(n)=>setP({...p, nickname:n.target.value})}
                margin="normal"
                variant="outlined"
                fullWidth
            />
            <TextField
                id="outlined-intro"
                label="Your Email"
                className={classes.textField}
                value={p.email}
                onChange={(n)=>setP({...p, nickname:n.target.value})}
                margin="normal"
                variant="outlined"
                fullWidth
            />
            <TextField
                id="outlined-intro"
                label="Biography"
                className={classes.textField}
                value={p.biography}
                onChange={(n)=>setP({...p, nickname:n.target.value})}
                margin="normal"
                variant="outlined"
                fullWidth
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={updateProfile}>
                Update
            </Button>
        </TabPanel>
        <TabPanel value={tab} index={1}>
            <Typography variant='h6'>
                Change Your Password
            </Typography>
            <TextField
                id="outlined-intro"
                label="Your Old Password"
                className={classes.textField}
                value={oldpassword}
                onChange={n=>setOldpassword(n.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
            />
            <TextField
                id="outlined-intro"
                label="New Password"
                className={classes.textField}
                value={passwd1}
                onChange={n=>setPasswd1(n.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={updatePasswd}>
                Update
            </Button>
        </TabPanel>
        </Grid>
        </Grid>
        </div>
        </Grid>
        </Grid>
    )
}

export default EditProfile