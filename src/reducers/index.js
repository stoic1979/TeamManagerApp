import { combineReducers } from "redux";
import {projects} from "./projects.reducer";
import auth from './auth';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        auth,
        projects
    });
}
