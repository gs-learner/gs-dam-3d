import React from 'react'
import { MakeEmptyUser, D3DModel } from '../utils/api'
import { Theme } from '@material-ui/core/styles';

type User = ReturnType<typeof MakeEmptyUser>

const default_profile = {
    user: MakeEmptyUser(),
    set: {
        user: (u: User)=>{},
        logState:(v:boolean)=>{},
        theme: (v:Theme)=>{}
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
    },
    State:{
        logState: false,
    },
    open: {
        uploadModel: false,
    },
    trigger: {
        uploadModel: (v:boolean)=>{},
    },
    triggerSigning: (v:'siginin' | 'signup')=>{}
}

export type Profile = typeof default_profile;

export const profile = React.createContext(default_profile)
