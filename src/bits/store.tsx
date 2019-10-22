import React from 'react'
import { MakeEmptyUser } from '../utils/api'

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
