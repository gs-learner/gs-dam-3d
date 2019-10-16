import {DUser} from './api'

export function MockUser() : DUser {
    return {
        username: 'Mock User',
        nickname: 'mua',
        biography: `Education:\n- phD at ZZPU\n- master at Standford\n- ZJU graduate\n`,
        owned_models: [],
        location: 'Hangzhou, Zhejiang',
        introduction: 'All hail DAM',
        collections: [],
        email: 'zzptql@zzpdl.com',
        avatar: '/static/test/avatar.jpg'
    }
}