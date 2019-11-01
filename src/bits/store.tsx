import React from 'react'
import { MakeEmptyUser, D3DModel } from '../utils/api'
import { Theme } from '@material-ui/core/styles';
import { MockModel } from '../utils/mock';

type User = ReturnType<typeof MakeEmptyUser>

const default_profile = {
    user: MakeEmptyUser(),
    set: {
        user: (u: User)=>{},
        logState:(v:boolean)=>{},
        theme: (v:Theme)=>{},
        currentViewModel:(v:D3DModel)=>{},
        searchKey:(v:string)=>{},
    },
    get:{
        currentViewModel:():D3DModel=>MockModel(),
    },
    save: {
        login: (username:string, password:string)=>{} 
    },
    del:{
        login:()=>{}
    },
    to: {
        index:()=>{},
        profile: ()=>{},
        edit_profile: ()=>{},
        edit_render: (model: D3DModel)=>{},
        catalog:()=>{},
        community:()=>{},
    },
    State:{
        logState: false,
        searchKey: String(''),
    },
    open: {
        uploadModel: false,
        openDetail:(v:boolean)=>{}
    },
    trigger: {
        uploadModel: (v:boolean)=>{},
    },
    triggerSigning: (v:'siginin' | 'signup')=>{}
}

export type Profile = typeof default_profile;

export const profile = React.createContext(default_profile)
