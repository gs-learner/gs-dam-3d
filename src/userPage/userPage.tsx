import React, { useState, useEffect, useContext } from 'react'
import { Divider, Grid, IconButton, createMuiTheme } from '@material-ui/core';
import { makeStyles, createStyles, Theme, ThemeProvider } from '@material-ui/core/styles';

import './userPage.css'
import SearchAppBar from '../bits/miniSearch';
import UploadButton from '../bits/buttonUpload';
import FolderList from '../bits/userInfoList';
import { Package, D3DModels} from '../homePage/homePage';
import {D3DModel, APIListModelsByUser } from '../utils/api';
import TailBar from '../bits/tailBar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {lightBlue, orange} from '@material-ui/core/colors';
import { profile } from '../bits/store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            margin: theme.spacing(2, 5),
        },
        centerTitle: {
            paddingTop: '90px',
            paddingLeft: '50px',
            fontSize: 60,
        },
        upload: {
            paddingTop: '120px',
            paddingLeft:'30px',
        },
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridGap: theme.spacing(3),
        },
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
    }),
);

const theme = createMuiTheme({
    palette: {
        type: 'dark',
      primary: lightBlue,
      secondary: orange,
      background: {
        default: '#2a2d35',
        paper: '#2a2d35',
      }
    },
    
  })

const BodyTopUserPage: React.FC = () => {
    const classes = useStyles();
    return (
        <div className="BodyTopUserPage">
            <Grid container direction='row'>
                <Grid item xs={9}>
                    <Grid container direction='row'>
                        <Grid item xs={9}>
                            <div className={classes.centerTitle}>
                                @Author Name
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.upload}>
                        <UploadButton />
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}
const BodyLeftUserPage: React.FC<D3DModels> = (props) => {
    const classes = useStyles();
    const pro = useContext(profile);
    return (
        <div className="BodyLeftUserPage">
            <ThemeProvider theme={theme}>
                <Grid container spacing={7}>
                    {
                        props.D3DModels.map((v, idx) => {
                            return (
                                <Grid key={idx} item xs={12} md={5} lg={3} xl={2}>
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
            </ThemeProvider>
        </div>
    )
}
const BodyRightUserPage: React.FC = () => {
    return (
        <div className="BodyRightUserPage">
            <FolderList />
        </div>
    )
}
const BodyMainUserPage: React.FC = () => {
    const [modelGroupData,setModelGroupData] = useState<D3DModel[]>();
    useEffect(() => {
        (async ()=>{
            //TODO(data) the name of the user must be given
            const modelGroup = await APIListModelsByUser({username:'lzw'});
            if(modelGroup.ok) {
                setModelGroupData(modelGroup.data);
            }
        })()
        
    }, []);
    return (
        <div className="BodyMainUserPage">
            <Grid container direction='row'>
                <Grid item xs={9}>
                    {
                        // !modelGroupData?
                        // <BodyLeftUserPage D3DModels={[MockModel()]} />
                        // :<div>Something wrong with proxy</div>
                        modelGroupData?
                        <BodyLeftUserPage D3DModels={modelGroupData} />
                        :<div>Something wrong with proxy</div>
                    }
                </Grid>
                <Grid item xs={3}>
                    <BodyRightUserPage />
                </Grid>
            </Grid>
        </div>
    )
}
const BodyUserPage: React.FC = () => {
    const classes = useStyles();
    return (
        <div className="BodyUserPage">
            <BodyTopUserPage />
            <Divider className={classes.divider}></Divider>
            <BodyMainUserPage />
        </div>
    )
}
const HeadUserPage: React.FC = () => {
    return (
        <SearchAppBar/>
    )
}

export const UserPage: React.FC = () => {
    return (
        <div className="UserPage">
            <HeadUserPage />
            <BodyUserPage />
            <TailBar/>
        </div>
    )
}
