import {combineReducers} from 'redux'
import adList from "./adList.reducer";

const allReducers = combineReducers({
    adList: adList
});

export default allReducers;

