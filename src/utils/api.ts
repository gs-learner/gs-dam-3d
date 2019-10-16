import { func, string } from "prop-types"
import { async } from "q"

export const errorCode = {
    0: 'Success',
    1: 'User not authorized'
}

interface StandardResponse<T> {
    code: keyof (typeof errorCode)
    data: T
    msg?: string
}


// data of login response
interface DLogin  {
    token: string
}

interface DCollection {
    username: string
    models: string[]
}

// D 打头代表Download/Data, 从服务器获取的数据
interface DUser {
    username: string
    nickname: string
    biography: string
    owned_models: string[]
    location?: string // 住址
    introduction: string // 个人简介
    collections?: DCollection[]
    email: string
    avatar?:string
}
export function MakeEmptyUser() : DUser {
    return {
        username: '',
        owned_models: new Array<string>(),
        introduction: '',
        email:'',
        nickname: '',
        biography: '',
    }
}

// U 打头代表Upload, 发给服务器
interface URegisterUser {
    username: string
    nickname: string
    password: string
    location: string
    introduction: string // <= 128 bytes
    biography: string // <= 265 beyts
    email: string
    avatar: string // base64
}

type ModelCatalog = 
    'Animals' | 'Architecture' | 'Cars' | 
    'Characters' | 'History' | 'Furniture' |
    'Weapon' | 'Sci-fi' | 'People' | 'Place' |
    'Food'

interface D3DModel {
    url: string
    name: string
    publish: string // 发布时间
    comments: string[]
    catalog: ModelCatalog
    num_triangles: number
    num_vertices: number
    tags: string[]
    animated: boolean // 是否包含动画
}

type ThreeDModelFormat = 'obj' | 'gltf'
interface U3DModel {
    model: string // base64 encoded
    name: string
    catalog: ModelCatalog
    tags: string[]
}

interface RefinedResponse<T> extends StandardResponse<T> {
    ok: boolean
}

function RefineResponse<T>(res : StandardResponse<T>):RefinedResponse<T> {
    return {
        ...res,
        ok: res.code === 0
    }
}

// login response
export interface RLogin extends StandardResponse<DLogin> {}

// model list response
export interface RModels extends StandardResponse<D3DModel[]> {}

async function SendJSON<U, T>(input: RequestInfo, data:T) {
    let res = await fetch(input, {
        headers: { 
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    return await res.json() as StandardResponse<U>
}

export async function APISignup(info: URegisterUser){
    let res = await SendJSON('/api/user/register', info) as StandardResponse<DUser>
    return RefineResponse(res)
}

export async function APISignin(info: {username:string, password:string}) {
    let res = await SendJSON('/api/user/login', info) as StandardResponse<DUser>
    return RefineResponse(res)
}

export async function APIUpdateUserProfile(info: URegisterUser) {
    let res = await SendJSON('/api/user/update', info) as StandardResponse<undefined>
    return RefineResponse(res)
}


// export async function APICheckUserExists(info:{username:string}){
//     return await SendJSON('/api/check_user_exist', info) as StandardResponse<boolean>
// }