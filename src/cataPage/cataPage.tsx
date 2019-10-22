import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import SearchAppBar from '../bits/miniSearch';
import './cataPage.css'
import {Package, iconInfos, preViewPackages} from '../homePage/homePage';
import {CenterPanel} from '../bits/centerPanel'
import { Divider } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

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
const BodyMainCataPage:React.FC<preViewPackages>=(props)=>{
    const pkgs=props.preViewPackages;
    return(
        <div className="BodyMainCataPage">
            <div className="bodyContCataPage">
            {
                pkgs.map((v,idx)=>{
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
                {url:'/image/cin.png',name:'建筑'},
                {url:'/image/cin.png',name:'武器'},
                {url:'/image/cin.png',name:'车辆'},
            ]}/>
        </div>
    )
}
const BodyCataPage:React.FC=()=>{
    const classes = useStyles();
    const pkgs:preViewPackages = {preViewPackages:[
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao', avatar:'/logo192.png'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao', avatar:'/image/feat-May2019.jpg'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
    ]}
    return(
        <div className="BodyCataPage">
            <BodyTopCataPage/>
            <Divider className={classes.divider}/>
            <BodyMainCataPage preViewPackages={pkgs.preViewPackages}/>
        </div>
    )
}

export const CataPage:React.FC=()=>{
    return(
        <div className="CataPage">
            <HeaderCataPage/>
            <BodyCataPage/>
        </div>
    )
}