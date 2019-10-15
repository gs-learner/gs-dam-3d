import React from 'react'
import {Package, BodyTopHomepage, iconInfos, LogBar} from '../homePage/homePage';
import SearchAppBar from '../bits/miniSearch';

const HeaderBarCataPage:React.FC=()=>{
    return(
        <div className="HeaderBarCataPage">
            <div className="mini-logo">3D Models</div>
            <div className="mini-search">
                <SearchAppBar/>
            </div>
            <LogBar/>
        </div>
    )
}
const HeaderNavCataPage:React.FC<iconInfos> = (props)=>{
    return(
        <div className="HeaderNavCataPage">
            <BodyTopHomepage cata={props.cata}/>
        </div>
    )
}
const BodyTopCataPage:React.FC =()=>{
    return(
        <div className="BodyTopCataPage">
        </div>
    )
}
const BodyMainCataPage:React.FC=()=>{
    return(
        <div className="BodyMainCataPage">
        </div>
    )
}
const HeaderCataPage: React.FC=()=>{
    return(
        <div className="HeaderCataPage">
            <HeaderBarCataPage/>
            <HeaderNavCataPage cata={[
                {url:'/image/cin.jpg',name:'建筑'},
                {url:'/image/cin.jpg',name:'武器'},
                {url:'/image/cin.jpg',name:'车辆'},
            ]}/>
        </div>
    )
}
const BodyCataPage:React.FC=()=>{
    return(
        <div className="BodyCataPage">
            <BodyTopCataPage/>
            <BodyMainCataPage/>
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