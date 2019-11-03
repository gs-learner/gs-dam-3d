import React, { useContext, useState } from 'react';
import SearchAppBar from '../bits/miniSearch';
import EnhancedTable from '../bits/billTable';
import {D3DModel, DCommunity} from '../utils/api';
import {D3DModels, Package} from '../homePage/homePage';
import { MockModel, MockCommnunity } from '../utils/mock'
import { Grid, createMuiTheme, IconButton, Paper, createStyles, Button, Link } from '@material-ui/core';
import { lightBlue, orange } from '@material-ui/core/colors';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs, { TabsProps } from '@material-ui/core/Tabs';
import Tab, { TabProps } from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { profile } from '../bits/store';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }

const theme = createMuiTheme({
    palette: {
        type: 'dark',
      primary: lightBlue,
      secondary: orange,
    },
    
})
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight:'calc(100vh - 94px)',
        maxHeight:'calc(100vh - 94px)',
      flexGrow: 1,
      width: '100%',
      // backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing(1),
    },

}));

const BillBoard:React.FC=()=>{
    return(
        <EnhancedTable/>
    )
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    
    return (
        <Paper
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
        style={{
            maxHeight: 'calc(100% - 48px)',
            overflowY: 'auto',
            boxShadow: 'none',
            overflowX: 'hidden',
            background: 'none'
        }}
        >
        <Box p={3} style={{
            backgroundColor: '#303237',
            borderRadius: '5px'
        }}>{children}</Box>
        </Paper>
    );
}
    
function a11yProps(index: any) {
return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
};
}
  
  const StyledTabs = withStyles({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > div': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
      },
    },
  })((props: TabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);
  
  
  const StyledTab = withStyles((theme: Theme) =>
    createStyles({
      root: {
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
          opacity: 1,
        },
      },
    }),
  )((props: TabProps) => <Tab disableRipple {...props} />);
  
const FolderContent:React.FC=()=>{
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return(
        <div className={classes.root}>
            <AppBar position="static" color="default" style={{
                backgroundColor: '#11001100',
                boxShadow: 'none'
            }}>
                <StyledTabs
                value={value}
                onChange={handleChange as any}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="tabs"
                >
                <StyledTab label="Models" {...a11yProps(0)} />
                <StyledTab label="Todos" {...a11yProps(1)} />
                <StyledTab label="TS" {...a11yProps(2)} />
                <StyledTab label="Billboard" {...a11yProps(3)} />
                </StyledTabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Resource D3DModels={[MockModel(),MockModel(),MockModel()]}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Resource D3DModels={[MockModel(),MockModel(),MockModel(),MockModel()]}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Resource D3DModels={[MockModel(),MockModel(),MockModel(),MockModel(),MockModel()]}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Resource D3DModels={[MockModel(),MockModel(),MockModel(),MockModel(),MockModel(),MockModel()]}/>
            </TabPanel>
        </div>
    )
}

const useBriefingStyle = makeStyles((theme: Theme)=>({
    paper: {
        padding: theme.spacing(2),
        backgroundColor: '#303237',
        fontFamily: 'Proxima Nova',
        transition: 'height 1s'
    },
    avatarWrapper: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    avatar: {
        marginLeft: -14,
        border: '3px solid #42454c',
        boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.2)'
    },
    typo: {
        fontFamily: 'Proxima Nova'
    },
    subtitle: {
        fontFamily: 'Proxima Nova',
        color: 'rgba(200, 221, 255, 0.15)'
    },
    body: {
        fontFamily: 'Proxima Nova',
        color: 'rgba(210, 221, 255, 0.55)'
    },
    seperator1: {
        height: theme.spacing(1)
    },
    seperator2: {
        height: theme.spacing(2)
    },
    notice: {
        backgroundColor: '#323542',
        padding: theme.spacing(2),
        boxShadow: '0px 2px 6px 0px rgba(16, 32, 40,0.15)'
    },
    em: {
        fontWeight: 'bold'
    },
    title: {
        color: 'rgba(210, 221, 255, 0.7)'
    },
    smallIcon: {
        color: 'rgba(200, 221, 255, 0.15)',
        marginBottom: '-5px'
    }
}));

interface BriefingProps {
    community: DCommunity
}

const ColorButton = withStyles((theme: Theme) => ({
    root: {
      color: 'rgba(210, 221, 255, 0.55)',
      '&:hover': {
        backgroundColor: 'rgba(210, 221, 255, 0.12)',
      },
      borderColor: 'rgba(210, 221, 255, 0.15)'
    },
  }))(Button);

const Briefing: React.FC<BriefingProps> = (props) => {
    const theuser = props.community.members.slice(0, 6)
    const classes = useBriefingStyle()
    const [showEasternEgg, setShowEasternEgg] = useState(false)
    
    return (
        <Paper className={classes.paper}>
            <Typography variant='h5' className={classes.typo}>
                {props.community.name}
            </Typography>
            <Grid container direction="column">

                <Grid item className={classes.seperator1}/>

                <Grid item xs={12}>
                <Grid container className={classes.avatarWrapper}>
                {
                theuser.map((v, idx)=>{return(
                    <Grid key={idx} item>
                    <Avatar key={idx} alt={v.username} src={v.avatar} className={classes.avatar}/>
                    </Grid>
                )})
                }
                </Grid>
                </Grid>
                <Grid item xs={12}>
                <Typography variant='subtitle2' className={classes.subtitle}>
                    {props.community.members.length} contributors <span> &bull; </span> {props.community.public ? 'public' : 'restricted'}
                </Typography>
                </Grid>

                <Grid item className={classes.seperator1}/>

                <Grid item xs={12}>
                {
                    <Typography variant='subtitle1' className={classes.body}>
                    {props.community.introduction}
                    </Typography>
                }
                </Grid>

                <Grid item className={classes.seperator2}/>

                <Grid item xs={12}>
                    <Paper className={classes.notice} onDoubleClick={()=>setShowEasternEgg(!showEasternEgg)}>
                    <Typography variant='h6' className={classes.body}>
                    {props.community.notice}
                    </Typography>
                    </Paper>
                </Grid>

                <Grid item className={classes.seperator2}/>
                <Grid item className={classes.seperator1}/>

                <Grid item xs={12}>
                    <ColorButton fullWidth variant='outlined'>
                        {props.community.public ? 'Join' : 'Apply'}
                    </ColorButton>
                </Grid>

                <Grid item xs={12}>
                    <ColorButton fullWidth variant='outlined'>
                        Contribute
                    </ColorButton>
                </Grid>

                {
                    showEasternEgg ?
                    <Grid item className={classes.seperator1}/>
                    :null
                }
                
                {
                    showEasternEgg ?
                    <Grid item xs={12}>
                        <Typography variant='h6' className={classes.title}>
                            Authors
                        </Typography>
                        <Typography variant='subtitle1' className={classes.body}>
                            - All mighty great incredible cleverest human being, light of Dept. CS, Goddness <span className={classes.em}>ZZP</span>
                        </Typography>
                        <Typography variant='subtitle1' className={classes.body}>
                            - CSS Guru  <span className={classes.em}>GXY</span>
                        </Typography>
                        <Typography variant='subtitle1' className={classes.body}>
                            - Red sun, Celestial  <span className={classes.em}>WSH</span>
                        </Typography>
                        <Typography variant='subtitle1' className={classes.body}>
                            - Lowest common denominator  <span className={classes.em}>LZW</span>
                        </Typography>
                    </Grid>
                    :null
                }
                

            </Grid>
        </Paper>
    )
}


const Resource:React.FC<D3DModels>=(props)=>{
    const classes = useStyles();
    const pro = useContext(profile);

    return(
        <div style={{
            padding:'20px'
        }}>
            <Grid container spacing={2}>
                {
                    props.D3DModels.map((v,idx)=>{
                        return(
                            <Grid item key={idx} xs={2} md={6} lg={4} xl={2}>
                                <div style={{
                                    position:'relative',
                                    color:'black',
                                }}>
                                    <div className="editButtons">
                                    <IconButton className={classes.button} aria-label="edit" size='small' color="primary"
                                    onClick={()=>{pro.to.edit_render(v)}}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton className={classes.button} aria-label="delete" size='small' color="secondary">
                                        <DeleteIcon/>
                                    </IconButton>
                                    </div>
                                    <Package {...v} />
                                </div>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

const BodyCommPage:React.FC=()=>{
    const community = MockCommnunity();
    const classes = useBriefingStyle();
    return(
        <div
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >

        
        <div style={{
            paddingBottom:'20px',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
        }}>
        <Grid container>
            <Grid item xs={12} md={4} xl={3}>
                <div style={{
                    padding:'20px',
                    marginTop: '6px'
                }}>
                    <Briefing community={community}/>
                    <Grid className={classes.seperator1} />
                    <Grid container spacing={1} alignItems="center">
                        <Grid item> 
                            <HelpOutlineIcon fontSize='small' className={classes.smallIcon} /> 
                        </Grid>
                        <Grid item> 
                            <Link href='https://github.com/gs-learner/gs-dam-3d/blob/master/README-CN.md' className={classes.subtitle}>What is a community?</Link> 
                        </Grid>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={12} md={8} xl={9}>
                <div style={{
                    paddingRight:'20px',
                    paddingLeft:'40px',
                    paddingTop: '10px',
                }}>
                    <Grid container>
                        <FolderContent/>
                    </Grid>
                </div>
            </Grid>
        </Grid>
        </div>
        </div>
    )
}

export const CommPage:React.FC=()=>{
    return(
        <div style={{
            backgroundColor:'rgb(36,36,36)',
            boxSizing: 'border-box',
        }}>
            <SearchAppBar/>
            <ThemeProvider theme={theme}>
                <BodyCommPage/>
            </ThemeProvider>
            
        </div>
    )
}