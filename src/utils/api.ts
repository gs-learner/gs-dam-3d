export const errorCode = {
    0: 'Success',
    1: 'User not authorized'
}

interface StandardResponse<T> {
    code: keyof (typeof errorCode)
    data: T
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
    owned_models: string[]
    location?: string // 住址
    introduction: string // 个人简介
    collections?: DCollection[]
}

// U 打头代表Upload, 发给服务器
interface URegisterUser {
    username: string
    password: string
    location: string
    introduction: string
}



type ModelCatalog = 
    'Animals' | 'Architecture' | 'Cars' | 
    'Characters' | 'History' | 'Furniture' |
    'Weapon' | 'Sci-fi' | 'People' | 'Place' |
    'Food'

interface D3DModel {
    url: string
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
}



// login response
export interface RLogin extends StandardResponse<DLogin> {}

// model list response
export interface RModels extends StandardResponse<D3DModel[]> {}