export default function removeItemAdListAction(id:number) {
    return {
        type: 'REMOVE_AD',
        payload: id,
    }
}