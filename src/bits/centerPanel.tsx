import React from 'react';
import {CataIcon} from '../homePage/homePage';
import './centerPanel.css'

interface iconInfo{
    name?: string;
    url?: string;
    disp?: string;
}
interface iconInfos{
    cata:iconInfo[];
}
export const CenterPanel: React.FC<iconInfos> = (props)=>{
    return(
        <div className="CenterPanel">
        {
            props.cata.map((v, idx)=>{
                return(
                    <CataIcon name={v.name} url={v.url} key={idx}/>
                )
            })
        }
        </div>
    )
}