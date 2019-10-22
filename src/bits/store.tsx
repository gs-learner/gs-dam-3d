import React from 'react'
import { MakeEmptyUser, D3DModel } from '../utils/api'

type User = ReturnType<typeof MakeEmptyUser>

const default_profile = {
    user: MakeEmptyUser(),
    set: {
        user: (u: User)=>{},
        logState:(v:boolean)=>{},
    },
    to: {
        profile: ()=>{},
        edit_profile: ()=>{},
        edit_render: (model: D3DModel)=>{}
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
