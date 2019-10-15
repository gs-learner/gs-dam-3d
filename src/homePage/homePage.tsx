import React, {useState, useContext} from 'react';
import CustomizedInputBase from '../bits/search';
import './homePage.css'
import { Icon, Grid } from '@material-ui/core';
import SignIn from '../bits/buttonSignIn'
import SignUp from '../bits/buttonSignUp'
import '../fonts/proxima-nova.css'

import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { profile } from '../bits/store';

interface TotalNum{
    number: number;
}
interface owner{
    owner: string[];
}
interface iconInfo{
    name?: string;
    url?: string;
    disp?: string;
}
export interface iconInfos{
    cata:iconInfo[];
}
interface preViewPackage{
    name:string;
    format:string;
    author:string;
    imgUrl:string;
}
interface preViewPackages{
    preViewPackages:preViewPackage[];
}
interface preViewBar{
    cata:iconInfo;
    preViewPackages:preViewPackages;
}
const TotalNum: React.FC<TotalNum> = (props) =>{
    return(
        <div className="TotalNum">
            Total:{props.number}
        </div>
    )
}
export const LogBar: React.FC = () =>{
    return(
        <div className="LogBar">
            <SignIn/>
            <SignUp/>
        </div>
    )
}
const HeaderBarHomepage: React.FC = () =>{
    return(
        <div className="HeaderBarHomepage">
            <TotalNum number={9999}/>
            <LogBar />
        </div>
    )
}
const HeaderMainHomepage:React.FC = () =>{
    return(
        <div className="HeaderMainHomepage">
            <div className="logo">3D Models</div>
            <CustomizedInputBase/>
        </div>
    )

}
const HeaderTailHomepage: React.FC<owner> = (props)=>{
    return(
        <div className="HeaderTailHomepage">
            <div className="web-disp">DAM-2019-3D Model</div>
            <div className="web-owner">created by {props.owner}</div>
        </div>
    )
}
const HeaderHomepage: React.FC = () =>{
    return(
        <div className="HeaderHomepage">
            <HeaderBarHomepage/>
            <HeaderMainHomepage/>
            <HeaderTailHomepage owner={['a','b','c']}/>
        </div>
    )
}
const CataIcon: React.FC<iconInfo> = (props) =>{
    return(
        <div className ="CataIcon">
            <img src = {props.url}></img>
            <div>{props.name}</div>
        </div>
    )
}


const CataPreView: React.FC<iconInfo> = (props)=>{
    return(
        <div className="CataPreView">
            <CataIcon name={props.name} url={props.url}/>
            <div>
                {props.disp}
            </div>
        </div>
    )
}
export const Package: React.FC<preViewPackage>=(props)=>{
    // const [action, setAction] = useState(false)

    return(
        <div className="Package">
            <div className="Package-up">
                <div className="icon-mask"  >
                    <div className="zoom-icon"><ZoomInIcon htmlColor='white' fontSize='large'/></div>
                    <div className="bigger-img">
                        <img src={props.imgUrl}></img>
                        <h2>{props.name}</h2>
                    </div>
                </div>
                <img className="small-img" src={props.imgUrl}></img>
            </div>
            <div className="Package-down">
                <div>
                <div className="modelName" style={{display: 'inline-block', width:'50%'}}>    {props.name}</div>
                <div className="modelFormat" style={{display: 'inline-block', textAlign:'right', width:'50%'}}>{props.format}</div>
                </div>
                
                <div className="modelAuthor">  {props.author}</div>
            </div>
        </div>
    )
}
const ModelPreview: React.FC<preViewPackages>=(props)=>{
    const pkgs=props.preViewPackages;
    return(
        <div className="ModelPreview">
            {
                pkgs.map((v,idx)=>{
                    return(
                        <Package imgUrl={v.imgUrl} name={v.name} format={v.format} author={v.author}/>
                    )
                })
            }
        </div>
    )
}
const PreViewBar: React.FC<preViewBar>=(props)=>{
    const cata = props.cata;
    const pkgs = props.preViewPackages;
    return(
        <div className="PreViewBar">
            <CataPreView name={cata.name} url={cata.url} disp={cata.disp}/>
            <ModelPreview preViewPackages={pkgs.preViewPackages}/>
        </div>
    )
}
export const BodyTopHomepage: React.FC<iconInfos> = (props) =>{
    const iconInfos: iconInfos = props;
    return(
        <div className="BodyTopHomepage">
            <div className="centerPanel">
            {
                props.cata.map((v, idx)=>{
                    return(
                        <CataIcon name={v.name} url={v.url} key={idx}/>
                    )
                })
            }
            </div>
        </div>
    )
}
const BodyMainHomepage: React.FC=()=>{
    const pro = useContext(profile)
    const cata:iconInfo = {name:'cata', url:'/image/cin.jpg', disp:'disp catalog'};
    const pkgs:preViewPackages = {preViewPackages:[
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
    ]}

    return(
        <div className="BodyMainHomepage">
            <button onClick={()=>{
                pro.toProfile()
            }}>UUU</button>
            <PreViewBar cata={cata} preViewPackages={pkgs}/>
            <PreViewBar cata={cata} preViewPackages={pkgs}/>
            <PreViewBar cata={cata} preViewPackages={pkgs}/>
        </div>
    )
}
const BodyHomePage: React.FC = () =>{
    return(
        <div className="BodyHomePage">
            <BodyTopHomepage cata={[
                {url:'/image/cin.jpg',name:'建筑'},
                {url:'/image/cin.jpg',name:'武器'},
                {url:'/image/cin.jpg',name:'车辆'},
                ]}/>
            <BodyMainHomepage/>
        </div>
    )
}
export const HomePage: React.FC = () => {

    return(
        <div>
            <HeaderHomepage/>
            <BodyHomePage/>
        </div>
    )
}