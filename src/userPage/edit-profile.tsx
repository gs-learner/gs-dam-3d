import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { profile } from '../bits/store';
import Button from '@material-ui/core/Button';
import { APIUpdateUserProfile, APIUpdateUserPassword } from '../utils/api';
import AvatarEditor from 'react-avatar-editor'
import SearchAppBar from '../bits/miniSearch';
import Dropzone from 'react-dropzone';

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

    //TODO: handle it
    const handleImageDrop = ()=> {}
        
    return(
        <div>
            <SearchAppBar/>
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
                <Tab label="Avatar" {...a11yProps(1)} />
                <Tab label="Security" {...a11yProps(2)} />
                
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
                    onChange={(n)=>setP({...p, introduction:n.target.value})}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="outlined-intro"
                    label="Your location"
                    className={classes.textField}
                    value={p.location}
                    onChange={(n)=>setP({...p, location:n.target.value})}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="outlined-intro"
                    label="Your Email"
                    className={classes.textField}
                    value={p.email}
                    onChange={(n)=>setP({...p, email:n.target.value})}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="outlined-intro"
                    label="Biography"
                    className={classes.textField}
                    value={p.biography}
                    onChange={(n)=>setP({...p, biography:n.target.value})}
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
                    Update Your Avatar
                </Typography>
                <Dropzone
                    onDrop={handleImageDrop}
                    noClick
                    
                >
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()} style={{ width: '250px', height: '250px' }}>
                        <input {...getInputProps()} />
                            <AvatarEditor
                                image={pro.user.avatar}
                                width={250} height={250}
                                border={50}
                                color={[255, 255, 255, 0.6]} // RGBA
                                scale={1.2}
                                rotate={0}
                            />
                        </div>
                    )}
                </Dropzone>
                <div style={{
                    width: '100px',
                    height: '150px'
                }}>

                </div>
                <Button variant="contained" color="primary" className={classes.button}>
                    Update
                </Button>
            </TabPanel>
            <TabPanel value={tab} index={2}>
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
        </div>
    )
}

export default EditProfile