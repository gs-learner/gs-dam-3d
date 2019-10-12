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

interface D3DModel {
    url: string
}

// login response
export interface RLogin extends StandardResponse<DLogin> {}

// model list response
export interface RModels extends StandardResponse<D3DModel[]> {}