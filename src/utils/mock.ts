import {DUser, D3DModel, DCommunity} from './api'

export function MockUser(n?:number) : DUser {
    const str = n?`${n % 7}`:'';

    return {
        username: 'Mock User',
        nickname: 'mua',
        biography: `Education:\n- phD at ZZPU\n- master at Standford\n- ZJU graduate\n`,
        owned_models: 1,
        location: 'Hangzhou, Zhejiang',
        introduction: 'All hail DAM',
        collections: [],
        email: 'zzptql@zzpdl.com',
        avatar: `/static/test/avatar${str}.jpg`
    }
}

export function MockCommnunity():DCommunity {
    const members = new Array<DUser>();
    for(let i =0; i < 10; ++i) {
        members.push(MockUser(i))
    }
    const models = new Array<D3DModel>()
    for(let i = 0; i < 12; ++i) {
        models.push(MockModel())
    }
    return {
        name: 'Mock Commnuity',
        introduction: 'This is an community enthusiastically designing poops. We really want to recruit someone who appreciates poops to join us',
        members: members,
        document: 'Please check out the git repo for details',
        todos: {
            'a elephant\'s poop': {
                aspect: '16:8:2',
                comment: 'Make it great',
                claimed: [],
                done: false
            },
            'a dog\'s poop': {
                aspect: '17:8:2',
                comment: 'Make it great',
                claimed: [],
                done: false
            }
        },
        models: models,
        notice: 'Keep calm and carry on! 😀'
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