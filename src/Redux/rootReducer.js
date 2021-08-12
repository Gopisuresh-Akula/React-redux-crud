import { combineReducers } from 'redux';
import ProjectReducer from './Project/AddProjectReducer';



const rootReducer = combineReducers({
    AddProjectReducer:ProjectReducer,
    features:ProjectReducer.features
});

export default rootReducer;