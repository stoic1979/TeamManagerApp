import { combineReducers } from "redux";
//import projects from "./projects";

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        //projects: projects
    });
}
