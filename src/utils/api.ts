import { D3DModels } from "../homePage/homePage";

// Basics
// -----------------------------------------------------------
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


// Users
// -----------------------------------------------------------
interface DLogin  {
    token: string
}

interface DCollection {
    username: string
    models: string[]
}

interface DSkybox {
    path: string
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

// login response
export interface RLogin extends StandardResponse<DLogin> {}

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

interface DModelTodo {
    aspect: string
    comment: string
    claimed: DUser[]
    done: boolean
}

export interface DCommunity {
    name: string
    introduction: string
    members: DUser[]
    document: string
    todos: Record<string, DModelTodo>
    models: D3DModel[]
    notice: string
}

// Hardcoded Catalog & render configs
// -----------------------------------------------------------
// * the catalogs & corresponding images are managed by front end,
//   hence it is silly to ask server for data
//
// * the rendering, including the lights used in render is also 
//   under complete control of front end, and these data are stored
//   in render.json, allowing faster iteration of front end

export const AllModelCatalogs = [
    'Animals' , 'Architecture' , 'Sports' , 
    'Characters' , 'Items' , 'Metal' ,
    'Sci-fi' , 'Nature' , 'Science&Tech' ,
    'Food', 'Dinosaurs'
] as const;
export type ModelCatalog = typeof AllModelCatalogs[number]
export const CatalogBound : Record<ModelCatalog, string[]> = {
    //TODO each icon needs a jump
    Animals:['/image/animal.png','/image/cataIcon/animals.png',
    'This part contains many kinds of Animals models'],
    Architecture:['/image/building.png','/image/cataIcon/architecture.png',
    'This part contains many kinds of Architecture models'],
    Characters:['/image/character.png','/image/cataIcon/characters.png',
    'This part contains many kinds of Characters models'],
    Dinosaurs:['/image/common.png','/image/cataIcon/dinosaurs.png',
    'This part contains many kinds of Dinosaurs models'],
    Food:['/image/common.png','/image/cataIcon/food.png',
    'This part contains many kinds of Food models'],
    Items:['/image/car.png','/image/cataIcon/item.png',
    'This part contains many kinds of Items models'],
    Metal:['/image/weapon.png','/image/cataIcon/metal.png',
    'This part contains many kinds of Metal models'],
    Nature:['/image/weapon.png','/image/cataIcon/nature.png',
    'This part contains many kinds of Nature models'],
    "Science&Tech":['/image/weapon.png','/image/cataIcon/science.png',
    'This part contains many kinds of Science&Tech models'],
    Sports:['/image/people.png','/image/cataIcon/sports.png',
    'This part contains many kinds of Sports models'],
    "Sci-fi":['/image/scifi.png','/image/cataIcon/scifi.png',
    'This part contains many kinds of Sci-fi models'],
}

export type DRecommends = Record<ModelCatalog, D3DModel[]>

export interface DModelCatalogInfo {
    name: ModelCatalog
    img: string
}


export type LightTypes = 
    'ambient'|
    'point' |
    'spot' 

// if nothing is specified, all light types has the attribute
// if <point> is specified, only point light & spot light has the attribute
// if <spot>  is specified, only spot light has the attribute
export interface RenderLight {
    type: LightTypes
    position: number[]
    color: number // hex, e.g. 0x404040
    intensity: number
    distance: number // <point> Maximum range of the light. Default is 0 (no limit).
    decay: number // <point> The amount the light dims along the distance of the light. 
    angle: number // <spot> Maximum angle of light dispersion from its direction
    penumbra: number // <spot> Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. Default is zero.
}


export function MakeEmptyRenderLight(): RenderLight {
    return({
        type: 'ambient',
        position: [0, 0, 0],
        color: 0x404040,
        intensity: 0,
        distance: 0,
        decay: 1,
        angle: Math.PI/2,
        penumbra: 0
    })
}

export const BuiltinLightScheme : {[scheme:string]: RenderLight[]} = {
    'default': [
        {type: 'ambient', position:[0, 0, 0], color: 0x404040, intensity: 1, distance: 0, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[18, 18, 18], color: 0xffffff, intensity: 1, distance: 100, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[-30, 18, 18], color: 0xffffff, intensity: 1, distance: 200, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[10, 10, 20],  color: 0xe0e0e0, intensity: 6, distance: 200, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[-10, -10, 10],  color: 0xe0e0e0, intensity: 5, distance: 200, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[-10, 10, 10],  color: 0xe0e0e0, intensity: 4, distance: 200, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[-10, -10, -10],  color: 0xe0e0e0, intensity: 8, distance: 200, decay: 1, angle: Math.PI/2, penumbra: 0},
    ],
    'disco': [
        {type: 'ambient', position:[0, 0, 0], color: 0x404040, intensity: 1, distance: 0, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[8, 8, 8], color: 0x1caedf, intensity: 6, distance: 0, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[-18, -18, 18], color: 0xea1831, intensity: 8, distance: 0, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[-18, 18, -18], color: 0xea1831, intensity: 5, distance: 0, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[18, 18, -18], color: 0x1caedf, intensity: 5, distance: 0, decay: 1, angle: Math.PI/2, penumbra: 0},

    ],
    'bio hazard': [
        {type: 'ambient', position:[0, 0, 0], color: 0x404040, intensity: 1, distance: 0, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[8, 8, 8], color: 0xfbf000, intensity: 4, distance: 0, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[-8, -6, 8], color: 0x04c21a, intensity: 6, distance: 0, decay: 1, angle: Math.PI/2, penumbra: 0},
        {type: 'point', position:[-7, 8, -8], color: 0x004307, intensity: 3, distance: 0, decay: 1, angle: Math.PI/2, penumbra: 0},
    ]
}

type RenderSky = 
    'col' | // background color
    'sky'  // skybox


export interface RenderConfig {
    renderSky: RenderSky
    backgroundColor: string
    backgroundGradient: boolean
    skybox: string // skybox name
    envMap: string
    scale: number
    lights: string[]
    lights_schemes: {[scheme:string]: RenderLight[]}
}

export function MakeDefaultRenderConfig() : RenderConfig {
    return {
        renderSky: 'col',
        backgroundColor: 'radial-gradient(circle, rgba(35,162,244,1) 0%, rgba(26,26,186,1) 96%, rgba(25,18,144,1) 100%);',
        backgroundGradient: true,
        skybox: '',
        envMap: '/static/skybox/hills2/',
        scale: 0.05,
        lights: ['default'],
        lights_schemes: {}
    }
}

interface Comment {
    username: string
    content: string
    rating: number//Total 10
}

// Models
// -----------------------------------------------------------

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
    owner: DUser
}

// model list response
export interface RModels extends StandardResponse<D3DModel[]> {}

type ThreeDModelFormat = 'obj' | 'gltf'
interface U3DModel {
    model: string // base64 encoded
    filename: string
    name: string
    catalog: ModelCatalog
    tags: string[]
    render_config: RenderConfig // save to json
}

// Utils
// -----------------------------------------------------------
interface RefinedResponse<T> extends StandardResponse<T> {
    ok: boolean
}

function RefineResponse<T>(res : StandardResponse<T>):RefinedResponse<T> {
    return {
        ...res,
        ok: res.code === 0
    }
}

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
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status===200){
                    resolve(JSON.parse(xhr.responseText) as U)
                }
                else {
                    reject('xhr failed w/ status ' + xhr.status)
                }
            }
        }
        
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data))
    })
}


// APIs
// -----------------------------------------------------------
export async function APITotalModelNum(){
    let res = await SendJSON('',{}) as StandardResponse<number>
    return RefineResponse(res)
}

export async function APISignup(info: URegisterUser){
    let res = await SendJSON('/api/user/register', info) as StandardResponse<DUser>
    return RefineResponse(res)
}

export async function APISignin(info: {username:string, password:string}) {
    let res = await SendJSON('/api/user/login', info) as StandardResponse<DUser>
    return RefineResponse(res)
}

export async function APISignout() {
    let res = await SendJSON('/api/user/logout', {}) as StandardResponse<undefined>
    return res
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

export async function APIListModelsByUser(info: {username: string}) {
    let res = await SendJSON('/api/list/user/models', info) as StandardResponse<D3DModel[]>
    return RefineResponse(res)
}



export async function APIListRecommendedModels(){
    let res = await SendJSON('/api/list/categories/recommend', {catalogs: AllModelCatalogs}) as StandardResponse<DRecommends>
    return RefineResponse(res)
}
//TODO search by cata on server
export async function APIListModelsByCategory(category: string){
    let res = await SendJSON('/api/list/categories/all', {catalog: category}) as StandardResponse<D3DModels[]>
    return RefineResponse(res)
}

export async function APIUploadModel(info: U3DModel, onprogress: (progress_0_to_1: number)=>any) {
    let res = await SendJSONProgress('/api/upload/model', info, onprogress) as StandardResponse<{preview:string}>
    return RefineResponse(res)
}

export async function APIModelUpdateRenderConfig(info: {url: string /* url used in d3dmodel */, config: RenderConfig}) {
    let res = await SendJSON('/api/model/update/render_config', info) as StandardResponse<undefined>
    return RefineResponse(res)
}

export async function APIModelUpdatePreview(info: {url: string /* url used in d3dmodel */, preview:string /* base64 */ }) {
    let res = await SendJSON('/api/model/update/preview', info) as StandardResponse<undefined>
    return RefineResponse(res)
}
// TODO add on button 
export async function APISearch(info:string) {
    let res = await SendJSON('/api/search', {key:info}) as StandardResponse<D3DModel[]>
    return RefineResponse(res)
}

export async function APICommunityCreate(info:{name:string}) {
    let res = await SendJSON('/api/community/create', info) as StandardResponse<undefined>
    return RefineResponse(res)
}

// export async function APICommunityJoin(info:{name:string}) {
//     let res = await SendJSON('/api/community/join', {key:info}) as StandardResponse<undefined>
//     return RefineResponse(res)
// }

export async function APIListModelsByCommunity(info:{name:string}) {
    let res = await SendJSON('/api/list/community/models', info) as StandardResponse<{results:D3DModel[]}>
    return RefineResponse(res)
}

export async function APIListAllCommunities() {
    let res = await SendJSON('/api/list/community', {}) as StandardResponse<DCommunity[]>
    return RefineResponse(res)
}

export async function APIAttachModelToCommunity(info: {url: string /* url in d3dmodels */, name: string}) {
    let res = await SendJSON('/api/community/attach', info) as StandardResponse<undefined>
    return RefineResponse(res)
}

export async function APICommunityUpdateTodo(info: DCommunity) {
    let res = await SendJSON('/api/community/update/misc', info) as StandardResponse<undefined>
    return RefineResponse(res)
}

export async function APICommunityUpdateMisc(info: DCommunity) {
    let res = await SendJSON('/api/community/update/misc', info) as StandardResponse<undefined>
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
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status===200){
                    resolve(JSON.parse(xhr.responseText) as U)
                }
                else {
                    reject('xhr failed w/ status ' + xhr.status)
                }
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    })
}

interface DSkyboxItem {
    path: string
}
interface DSkyboxList {
    data: Record<string, DSkyboxItem>
}

export function MakeEmptySkyboxList():DSkyboxList {return{
    data: {}
}}

export async function APIListSkybox() {
    const res = await StaticGetJsonFile<DSkyboxList>('/static/skybox.json', ()=>{})
    console.log('list skybox', res)
    return res
}

// export async function APICheckUserExists(info:{username:string}){
//     return await SendJSON('/api/check_user_exist', info) as StandardResponse<boolean>
// }