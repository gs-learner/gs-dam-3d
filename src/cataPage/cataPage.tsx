import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import SearchAppBar from '../bits/miniSearch';
import {D3DModel, APIListModelsByUser} from '../utils/api';
import './cataPage.css'
import {Package, iconInfos, preViewPackages,D3DModels,} from '../homePage/homePage';
import {CenterPanel} from '../bits/centerPanel'
import { Divider } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import TailBar from '../bits/tailBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    cataTag:{
        display:'inline-block',
        fontWeight:'bolder',
        fontSize:70,
    },
    count:{
        display:'inline-block',
        fontWeight:'lighter',
        fontSize:30,
        marginLeft: '10px',
        marginTop:'45px',
    }
  }),
);

const HeaderBarCataPage:React.FC=()=>{
    return(
        <div className="HeaderBarCataPage">
            <div className="mini-search">
                <SearchAppBar/>
            </div>
        </div>
    )
}
const HeaderNavCataPage:React.FC<iconInfos> = (props)=>{
    return(
        <div className="HeaderNavCataPage">
            <CenterPanel cata={props.cata}/>
        </div>
    )
}
const BodyTopCataPage:React.FC =()=>{
    const classes = useStyles();
    return(
        <div className="BodyTopCataPage">
            <Breadcrumbs separator="/" aria-label="breadcrumb">
                <div className={classes.cataTag}>
                    Catalog
                </div>
                <div className={classes.count}>
                    total
                </div>
            </Breadcrumbs>
        </div>
    )
}
const BodyMainCataPage:React.FC<D3DModels>=(props)=>{
    return(
        <div className="BodyMainCataPage">
            <div className="bodyContCataPage">
            {
                props.D3DModels.map((v,idx)=>{
                    return(
                        <Package key={idx} {...v}/>
                    )
                })
            }
            </div>
        </div>
    )
}
const HeaderCataPage: React.FC=()=>{
    return(
        <div className="HeaderCataPage">
            <HeaderBarCataPage/>
            <HeaderNavCataPage cata={[
                {name:'Animals', url:'/image/cin.png', disp:'disp catalog'},
                {name:'Architecture', url:'/image/cin.png', disp:'disp catalog'},
                {name:'History', url:'/image/cin.png', disp:'disp catalog'},
                {name:'Place', url:'/image/cin.png', disp:'disp catalog'},
                {name:'Food', url:'/image/cin.png', disp:'disp catalog'},
                {name:'Furniture', url:'/image/cin.png', disp:'disp catalog'},
                {name:'People', url:'/image/cin.png', disp:'disp catalog'},
                {name:'Sci-fi', url:'/image/cin.png', disp:'disp catalog'},
                {name:'Weapon', url:'/image/cin.png', disp:'disp catalog'},
                {name:'Characters', url:'/image/cin.png', disp:'disp catalog'},
                {name:'Cars', url:'/image/cin.png', disp:'disp catalog'},
            ]}/>
        </div>
    )
}
const BodyCataPage:React.FC=()=>{
    const classes = useStyles();
    // const pkgs:preViewPackages = {preViewPackages:[
    //     {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao', avatar:'/logo192.png'},
    //     {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
    //     {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
    //     {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
    //     {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao', avatar:'/image/lol.jpg'},
    //     {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
    // ]}
    //TODO(data)API
    const [modelGroupData,setModelGroupData] = useState<D3DModel[]>();
    useEffect(() => {
        (async ()=>{
            //TODO(data) search result API
            const modelGroup = await APIListModelsByUser({username:'lzw'});
            if(modelGroup.ok) {
                setModelGroupData(modelGroup.data);
            }
        })()
        
    }, []);
    return(
        <div className="BodyCataPage">
            <BodyTopCataPage/>
            <Divider className={classes.divider}/>
            {
                modelGroupData?
                <BodyMainCataPage D3DModels={modelGroupData}/>
                :<div>something wrong with proxy</div>
            }
        </div>
    )
}

export const CataPage:React.FC=()=>{
    return(
        <div className="CataPage" style={{minHeight: '100vh'}}>
            <HeaderCataPage/>
            <BodyCataPage/>
            <TailBar/>
        </div>
    )
}