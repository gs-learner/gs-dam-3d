import React from 'react';
import {CataIcon, iconInfos} from '../homePage/homePage';
import './centerPanel.css'
import {CatalogBound} from '../utils/api';


export const CenterPanel: React.FC<iconInfos> = (props)=>{
    return(
        <div className="CenterPanel">
        {
            props.cata.map((v, idx)=>{
                return(
                    <CataIcon name={v.name} url={CatalogBound[v.name][1]} key={idx}/>
                )
            })
        }
        </div>
    )
}