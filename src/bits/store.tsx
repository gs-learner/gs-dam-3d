import React from 'react'


const default_profile = {
    username: '',
    toProfile: ()=>{}
}

export type Profile = typeof default_profile;

export const profile = React.createContext(default_profile)
