import React, { useContext } from 'react';
import SearchAppBar from '../bits/miniSearch';
import EnhancedTable from '../bits/billTable';
import {D3DModel} from '../utils/api';
import {D3DModels, Package} from '../homePage/homePage';
import { MockModel } from '../utils/mock'
import GmailTreeView from '../bits/treeView';
import { Grid, createMuiTheme, IconButton } from '@material-ui/core';
import { lightBlue, orange } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { profile } from '../bits/store';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TailBar from '../bits/tailBar';

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
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
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
const BodyCommPage:React.FC=()=>{
    return(
        <div style={{
            paddingBottom:'40px',
        }}>
            <Grid container>
                <Grid item xs={12} md={2}>
                    <div style={{
                        padding:'25px'
                    }}>
                        <GmailTreeView/>
                    </div>
                </Grid>
                <Grid item xs={12} md={10}>
                    <div style={{
                        paddingRight:'20px',
                        paddingLeft:'40px',
                    }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <BillBoard/>
                            </Grid>
                            <Grid item xs={12}>
                                <FolderContent/>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    
    return (
        <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
        >
        <Box p={3}>{children}</Box>
        </Typography>
    );
}
    
function a11yProps(index: any) {
return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
};
}
const FolderContent:React.FC=()=>{
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };


    return(
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
                <Tab label="Item Four" {...a11yProps(3)} />
                </Tabs>
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
const Resource:React.FC<D3DModels>=(props)=>{
    const classes = useStyles();
    const pro = useContext(profile);
    return(
        <div style={{
            padding:'20px',
        }}>
            <Grid container spacing={2}>
                {
                    props.D3DModels.map((v,idx)=>{
                        return(
                            <Grid item key={idx} xs={2} md={4} lg={3} xl={2}>
                                <div style={{
                                    position:'relative',
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
export const CommPage:React.FC=()=>{
    return(
        <div style={{
            backgroundColor:'rgb(36,36,36)',
        }}>
            <SearchAppBar/>
            <ThemeProvider theme={theme}>
                <BodyCommPage/>
            </ThemeProvider>
            <TailBar/>
        </div>
    )
}