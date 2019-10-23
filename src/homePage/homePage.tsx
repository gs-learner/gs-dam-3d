import React, {useState, useContext} from 'react';
import CustomizedInputBase from '../bits/search';
import './homePage.css'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {LogBar} from '../bits/logBar';
import '../fonts/proxima-nova.css'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { profile } from '../bits/store';

import SignIn from '../bits/buttonSignIn'
import SignUp from '../bits/buttonSignUp'
import {CenterPanel} from '../bits/centerPanel'
import { ModelCatalog, D3DModel, DModelCatalogInfo,CatalogBound } from '../utils/api';
import { useTheme } from '@material-ui/styles';
import { orange, deepOrange, lightBlue, lightGreen } from '@material-ui/core/colors'


interface TotalNum{
    number: number;
}
interface owner{
    owner: string[];
}
export interface iconInfo{
    name: ModelCatalog;
    url: string;
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
    avatar?: string;
}
export interface preViewPackages{
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

const HeaderBarHomepage: React.FC = () =>{
    return(
        <div className="HeaderBarHomepage">
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TotalNum number={9999}/>
                </Grid>
                <Grid item xs={6}>
                    <LogBar/>
                </Grid>
            </Grid>
        </div>
    )
}
const HeaderMainHomepage:React.FC = () =>{
    return(
        <div className="HeaderMainHomepage">
            <div className="logo" style={{
                fontFamily:'Author',
                fontWeight:1000,
                fontSize:90,
            }}><span style={{fontSize:120}}>3</span>D Models</div>
            <CustomizedInputBase/>
        </div>
    )

}
const HeaderTailHomepage: React.FC<owner> = (props)=>{
    return(
        <div className="HeaderTailHomepage">
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <div className="web-disp">DAM-2019-3D Model</div>
                </Grid>
                <Grid item xs={6}>
                    <div className="web-owner">created by {props.owner}</div>
                </Grid>
            </Grid>
        </div>
    )
}
const HeaderHomepage: React.FC = () =>{
    return(
        <div className="HeaderHomepage">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <HeaderBarHomepage/>
                </Grid>
                <Grid item xs={12}>
                    <HeaderMainHomepage/>
                </Grid>
                <Grid item xs={12}>
                    <HeaderTailHomepage owner={['a','b','c']}/>
                </Grid>
            </Grid>
        </div>
    )
}
export const CataIcon: React.FC<iconInfo> = (props) =>{
    return(
        <div className ="CataIcon">
            <img src = {props.url} alt={props.name}></img>
            <div style={{
                // fontFamily:'Author',
                // fontWeight:200,
                // fontSize:20,
            }}>
                {props.name}
            </div>
        </div>
    )
}


const CataPreView: React.FC<iconInfo> = (props)=>{
    const theme = useTheme();
    return(
        <div className="CataPreView">
            <CataIcon name={props.name} url={props.url}/>
            <div className="Catadisp" style={{
                padding: '20px 30px 30px 30px',
                fontFamily: 'Proxima Nova',
                fontWeight:700,
                color: lightGreen[700],
            }}>
                {props.disp}
            </div>
        </div>
    )
}
const useStyles = makeStyles({
    avatar: {
      margin: 5,
      width: 20,
      height: 20,
      fontSize: 15,
      lineHeight: 20,
      verticalAlign: 'middle',
      // float: 'right'
    },
    name: {
        height: 30,
        verticalAlign: 'middle',
        float: 'right',
        lineHeight: '30px'
    }
  });

export const Package: React.FC<preViewPackage>=(props)=>{
    // const [action, setAction] = useState(false)
    const classes = useStyles();

    return(
        <div className="Package">
            <div className="Package-up">
                <div className="icon-mask"  >
                    <div className="zoom-icon"><ZoomInIcon htmlColor='white' fontSize='large'/></div>
                    <div className="bigger-img">
                        <img src={props.imgUrl} alt={props.name}></img>
                        <h2>{props.name}</h2>
                    </div>
                </div>
                <img className="small-img" src={props.imgUrl} alt={props.name}></img>
            </div>
            <div className="Package-down">
                <div>
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                >

                <Grid item xs={2}>
                {
                    props.avatar !== undefined && props.avatar.length ? 
                    <Avatar alt={props.author} src={props.avatar} className={classes.avatar}/> 
                    :
                    <Avatar className={classes.avatar}>
                        {props.author[0]}
                    </Avatar>
                }
                </Grid>
                <Grid item xs>
                    <Typography> {props.name} </Typography>
                </Grid>
                </Grid>
                </div>
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
                        <Package key={idx} {...v}/>
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
        //TODO change background
        <div className="PreViewBarPlus" style={{backgroundImage:`url(${CatalogBound[props.cata.name][0]})`}}>
            <div className="slidebkg">
                <img src="/image/viewbarMask.png" style={{
                    height:'100%',
                }}></img>
            </div>
            <div className="PreViewBar">
                <CataPreView name={cata.name} url={CatalogBound[props.cata.name][1]} disp={CatalogBound[props.cata.name][2]}/>
                <ModelPreview preViewPackages={pkgs.preViewPackages}/>
            </div>
        </div>
    )
}
export const BodyTopHomepage: React.FC<iconInfos> = (props) =>{
    const iconInfos: iconInfos = props;
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div className="BodyTopHomepage">
                    <CenterPanel cata={props.cata}/>
                </div>
            </Grid>
        </Grid>
    )
}
const BodyMainHomepage: React.FC=()=>{
    const pro = useContext(profile)
    const cata:iconInfo[] = [
        //TODO actually only name is useful
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
    ];
    const pkgs:preViewPackages = {preViewPackages:[
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao', avatar:'/logo192.png'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao', avatar:'/image/feat-May2019.jpg'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
    ]}

    return(
        <div className="BodyMainHomepage">
            <button onClick={()=>{
                pro.to.profile()
            }}>UUU</button>
            {
                cata.map((v,idx)=>{
                    return <PreViewBar cata={cata[idx]} preViewPackages={pkgs} key={idx}/>
                })
            }
            {/* <PreViewBar cata={cata} preViewPackages={pkgs}/>
            <PreViewBar cata={cata} preViewPackages={pkgs}/> */}
        </div>
    )
}

const BodyHomePage: React.FC = () =>{
    return(
        <div className="BodyHomePage">
            <BodyTopHomepage cata={[
                //TODO actually only name is useful
                {name:'Animals', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Architecture', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'History', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Place', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Food', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Furniture', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'People', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Sci-fi', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Weapon', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Characters', url:'/image/cin.jpg', disp:'disp catalog'},
                {name:'Cars', url:'/image/cin.jpg', disp:'disp catalog'},
                ]}/>
            <BodyMainHomepage/>
        </div>
    )
}
interface Props {
    selection: {cat: DModelCatalogInfo, models: D3DModel[]}[]
}

export const HomePage: React.FC = () => {

    return(
        <div>
            <HeaderHomepage/>
            <BodyHomePage/>
        </div>
    )
}