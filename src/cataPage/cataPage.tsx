import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import SearchAppBar from '../bits/miniSearch';
import {D3DModel, APIListModelsByUser, APISearch} from '../utils/api';
import './cataPage.css'
import {Package, iconInfos, D3DModels,} from '../homePage/homePage';
import {CenterPanel} from '../bits/centerPanel'
import { Divider } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import TailBar from '../bits/tailBar';
import { profile } from '../bits/store';
import { MockModel } from '../utils/mock';

interface CataPageInfo{
    title:string,
    number:number,
}
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
const BodyTopCataPage:React.FC<CataPageInfo> =(props)=>{
    const classes = useStyles();
    return(
        <div className="BodyTopCataPage">
            <Breadcrumbs separator="/" aria-label="breadcrumb">
                <div className={classes.cataTag}>
                    {props.title}
                </div>
                <div className={classes.count}>
                    total: {props.number}
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
                {name:'Animals', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Architecture', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Sports', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Items', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Food', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Science&Tech', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Nature', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Sci-fi', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Metal', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Characters', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Dinosaurs', url:'/image/cin.jpg', disp:'disp catalog'},
            ]}/>
        </div>
    )
}
const BodyCataPage:React.FC=()=>{
    const pro = useContext(profile)
    const classes = useStyles();
    // const pkgs:preViewPackages = {preViewPackages:[
    //     {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao', avatar:'/logo192.png'},
    //     {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
    //     {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
    //     {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
    //     {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao', avatar:'/image/lol.jpg'},
    //     {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
    // ]}
    const [modelGroupData,setModelGroupData] = useState<D3DModel[]>([]);
    useEffect(() => {
        (async ()=>{
            const modelGroup = await APISearch(pro.State.searchKey)
            if(modelGroup.ok) {
                setModelGroupData(modelGroup.data);
            }
        })()
    }, [pro.State.searchKey]);
    return(
        <div className="BodyCataPage">
            <BodyTopCataPage title={pro.State.searchKey} number={modelGroupData.length}/>
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