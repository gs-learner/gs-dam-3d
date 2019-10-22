import React, {useContext} from 'react';
import CustomizedInputBase from '../bits/search';
import './homePage.css'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {LogBar} from '../bits/logBar';
import '../fonts/proxima-nova.css'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { profile } from '../bits/store';

import {CenterPanel} from '../bits/centerPanel'
import { D3DModel, DModelCatalogInfo } from '../utils/api';


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
            <div className="logo">3D Models</div>
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
            <CenterPanel cata={props.cata}/>
        </div>
    )
}
const BodyMainHomepage: React.FC=()=>{
    const pro = useContext(profile)
    const cata:iconInfo = {name:'cata', url:'/image/cin.jpg', disp:'disp catalog'};
    const pkgs:preViewPackages = {preViewPackages:[
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao', avatar:'/logo192.png'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao', avatar:'/image/feat-May2019.jpg'},
        {imgUrl:'/image/gun.jpeg',name:'Sniper rifle',format:'.gltf',author:'Xinzu Gao'},
    ]}

    return(
        <div className="BodyMainHomepage">
            <button onClick={()=>{
                pro.to.profile()
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
                {url:'/image/cin.png',name:'建筑'},
                {url:'/image/cin.png',name:'武器'},
                {url:'/image/cin.png',name:'车辆'},
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