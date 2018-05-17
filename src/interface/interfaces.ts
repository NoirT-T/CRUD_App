export interface IAdList {
    id: number
    name: string,
    phone: string
    message: string,
    photo: any,
}

export interface ISetAdListAction {
    setAdListAction: (adList: any) => { void: any }
}


