import React, { useState, useEffect } from 'react'
import { Divider, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import './userPage.css'
import SearchAppBar from '../bits/miniSearch';
import UploadButton from '../bits/buttonUpload';
import FolderList from '../bits/userInfoList';
import { Package, preViewPackages, D3DModels} from '../homePage/homePage';
import {D3DModel, DRecommends, APIListModelsByUser } from '../utils/api';
import TailBar from '../bits/tailBar';

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
    }),
);

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
    return (
        <div className="BodyLeftUserPage">
            <Grid container spacing={7}>
                {
                    props.D3DModels.map((v, idx) => {
                        return (
                            <Grid key={idx} item xs={12} md={5} lg={3} xl={2}>
                                <Package {...v} />
                            </Grid>
                        )
                    })
                }
            </Grid>
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
    const pkgs: preViewPackages = {
        preViewPackages: [
            { imgUrl: '/image/gun.jpeg', name: 'Sniper rifle', format: '.gltf', author: 'Xinzu Gao', avatar: '/logo192.png' },
            { imgUrl: '/image/gun.jpeg', name: 'Sniper rifle', format: '.gltf', author: 'Xinzu Gao' },
            { imgUrl: '/image/gun.jpeg', name: 'Sniper rifle', format: '.gltf', author: 'Xinzu Gao' },
            { imgUrl: '/image/gun.jpeg', name: 'Sniper rifle', format: '.gltf', author: 'Xinzu Gao' },
            { imgUrl: '/image/gun.jpeg', name: 'Sniper rifle', format: '.gltf', author: 'Xinzu Gao', avatar: '/image/lol.jpg' },
            { imgUrl: '/image/gun.jpeg', name: 'Sniper rifle', format: '.gltf', author: 'Xinzu Gao' },
        ]
    }
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
