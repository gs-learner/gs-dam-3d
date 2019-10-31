import {DUser, D3DModel} from './api'

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


export function MockModel(): D3DModel {
    return {
        url: '/static/test/fortnite-animated',
        name: 'Beetle Car',
        publish: '2017-9-20',
        comments: [
            {
                username:'LZW',
                content:'OHHHHHHHHHHHHHHHHHH---WSHTZ tql---OHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
                rating:10,
            },
            {
                username:'ZZP',
                content:'OHHHHHHHHHHHHHHHHHH---LZWDL tql---OHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
                rating:10,
            },
            {
                username:'WSH',
                content:'OHHHHHHHHHHHHHHHHHH---ZZPSAMA tql---OHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
                rating:10,
            },
        ],
        catalog: 'Characters',
        num_triangles: 999,
        num_vertices: 123,
        tags: ['I am mud iron man'],
        animated: true,
        owner: MockUser()
    }
}