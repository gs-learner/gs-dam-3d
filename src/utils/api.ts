type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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
export interface DUser {
    username: string
    nickname: string
    biography: string
    owned_models: string[]
    location: string // 住址
    introduction: string // 个人简介
    collections?: DCollection[]
    email: string
    avatar:string
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

export function MakeEmptyUser() : DUser {
    return {
        username: '',
        owned_models: new Array<string>(),
        introduction: '',
        email:'',
        nickname: '',
        biography: '',
        location: '',
        avatar: ''
    }
}



export const AllModelCatalogs = [
    'Animals' , 'Architecture' , 'Cars' , 
    'Characters' , 'History' , 'Furniture' ,
    'Weapon' , 'Sci-fi' , 'People' , 'Place' ,
    'Food',
] as const;
export type ModelCatalog = typeof AllModelCatalogs[number]
export const CatalogBound : Record<ModelCatalog, string[]> = {
    //TODO each icon needs a jump
    Animals:['/image/common.png','/image/cin.png',
    'This part contains many kinds of Animals models'],
    Architecture:['/image/building.png','/image/cin.png',
    'This part contains many kinds of Architecture models'],
    Cars:['/image/common.png','/image/cin.png',
    'This part contains many kinds of Cars models'],
    Characters:['/image/people.png','/image/cin.png',
    'This part contains many kinds of Characters models'],
    History:['/image/history.png','/image/cin.png',
    'This part contains many kinds of History models'],
    Furniture:['/image/common.png','/image/cin.png',
    'This part contains many kinds of Furniture models'],
    Weapon:['/image/weapon.png','/image/cin.png',
    'This part contains many kinds of Weapon models'],
    "Sci-fi":['/image/scifi.png','/image/cin.png',
    'This part contains many kinds of Sci-fi models'],
    People:['/image/people.png','/image/cin.png',
    'This part contains many kinds of People models'],
    Place:['/image/common.png','/image/cin.png',
    'This part contains many kinds of Place models'],
    Food:['/image/common.png','/image/cin.png',
    'This part contains many kinds of Food models'],
}


export interface DModelCatalogInfo {
    name: ModelCatalog
    img: string
}


type LightTypes = 
    'ambient'|
    'point' |
    'spot' 

// if nothing is specified, all light types has the attribute
// if <point> is specified, only point light & spot light has the attribute
// if <spot>  is specified, only spot light has the attribute
interface RenderLight {
    type: LightTypes
    position: number[]
    color: number // hex, e.g. 0x404040
    intensity: number
    distance: number // <point> Maximum range of the light. Default is 0 (no limit).
    decay: number // <point> The amount the light dims along the distance of the light. 
    angle: number // <spot> Maximum angle of light dispersion from its direction
    penumbra: number // <spot> Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. Default is zero.
}

type RenderSky = 
    'col' | // background color
    'sky'  // skybox

export const BuiltinLightScheme : {[scheme:string]: RenderLight[]} = {
    'default': [
        {type: 'ambient', position:[0, 0, 0], color: 0x404040, intensity: 1, distance: 0, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[18, 18, 18], color: 0xffffff, intensity: 1, distance: 100, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[-30, 18, 18], color: 0xffffff, intensity: 1, distance: 200, decay: 1, angle: Math.PI/2, penumbra: 0},
    ]
}

export interface RenderConfig {
    renderSky: RenderSky
    backgroundColor: string
    backgroundGradient: boolean
    skybox: string // skybox name
    envMap: string
    scale: number
    lights: string[]
}

export function MakeDefaultRenderConfig() : RenderConfig {
    return {
        renderSky: 'col',
        backgroundColor: 'radial-gradient(circle, rgba(35,162,244,1) 0%, rgba(26,26,186,1) 96%, rgba(25,18,144,1) 100%);',
        backgroundGradient: true,
        skybox: '',
        envMap: '/static/skybox/hills2/',
        scale: 0.05,
        lights: ['default']
    }
}

interface Comment {
    username: string
    content: string
    rating: number
}

// 文件目录结构
// /home/models/ <-- root
// username/id/ <-- url
//   - scene.gltf
//   - render.json
//   - preview.png

export interface D3DModel {
    url: string
    name: string
    publish: string // 发布时间
    comments: Comment[]
    catalog: ModelCatalog
    num_triangles: number
    num_vertices: number
    tags: string[]
    animated: boolean // 是否包含动画
    // render_config: string // url to json
    owner: string
}

type ThreeDModelFormat = 'obj' | 'gltf'
interface U3DModel {
    model: string // base64 encoded
    filename: string
    name: string
    catalog: ModelCatalog
    tags: string[]
    render_config: RenderConfig // save to json
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
            "Content-Type": "application/json;charset=UTF-8"
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    return await res.json() as StandardResponse<U>
}

function SendJSONProgress<U, T>(url: string, data: T, onprogress: (progress_0_to_1: number)=>any) {
    return new Promise((resolve : (v:U)=>void, reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.onerror = (e)=>reject(e)
        xhr.upload.onprogress = (ev)=>{
            const done = ev.loaded
            const total = ev.total
            onprogress(done / total)
        }
        xhr.onreadystatechange = ()=>{
            xhr.upload.onprogress = null
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status===200){
                resolve(JSON.parse(xhr.responseText) as U)
            }
            else {
                reject('xhr failed w/ status ' + xhr.status)
            }
        }
        
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data))
    })
}

export async function APISignup(info: URegisterUser){
    let res = await SendJSON('/api/user/register', info) as StandardResponse<DUser>
    return RefineResponse(res)
}

export async function APISignin(info: {username:string, password:string}) {
    let res = await SendJSON('/api/user/login', info) as StandardResponse<DUser>
    return RefineResponse(res)
}

// 这里 Omit 是指 URegisterUser 里去掉 username & password 属性
// username 的记录应该用服务器的 session 来记录, 否则知道用户名就能改别人的 profile
export async function APIUpdateUserProfile(info: Omit<URegisterUser, 'username'|'password'>) {
    let res = await SendJSON('/api/user/update/basic', info) as StandardResponse<undefined>
    return RefineResponse(res)
}

export async function APIUpdateUserPassword(info: {oldpassword:string,password:string}) {
    let res = await SendJSON('/api/user/update/passwd', info) as StandardResponse<undefined>
    return RefineResponse(res)
}

export async function APIUpdateUserAvatar(info:{avatar:string /* base64 */}){
    let res = await SendJSON('/api/user/update/avatar', info) as StandardResponse<undefined>
    return RefineResponse(res)
}

export async function APIUploadModel(info: U3DModel, onprogress: (progress_0_to_1: number)=>any) {
    let res = await SendJSONProgress('/api/upload/model', info, onprogress) as StandardResponse<{avatarUrl:string}>
    return RefineResponse(res)
}

export async function APISearch(info:string) {
    let res = await SendJSON('/api/search', {key:info}) as StandardResponse<{results:D3DModel[]}>
    return RefineResponse(res)
}

export function StaticGetJsonFile<U>(url: string, onprogress: (progress_0_to_1: number)=>any) {
    return new Promise((resolve : (v:U)=>void, reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.onerror = (e)=>reject(e)
        xhr.upload.onprogress = (ev)=>{
            const done = ev.loaded
            const total = ev.total
            onprogress(done / total)
        }
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status===200){
                resolve(JSON.parse(xhr.responseText) as U)
            }
            else {
                reject('xhr failed w/ status ' + xhr.status)
            }
        }
        
        xhr.open('GET', url, true);
        xhr.send();
    })
}

// export async function APICheckUserExists(info:{username:string}){
//     return await SendJSON('/api/check_user_exist', info) as StandardResponse<boolean>
// }