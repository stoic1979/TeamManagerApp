import { combineReducers } from "redux";
//import projects from "./projects";
import auth from './auth';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        auth
        //projects: projects
    });
}
