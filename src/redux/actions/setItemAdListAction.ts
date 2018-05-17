import {IAdList} from '../../interface/interfaces';

export default function setItemAdListAction(adList:IAdList) {
    return {
        type: 'SET_AD',
        payload: adList,
    }
}
