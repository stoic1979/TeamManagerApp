import { combineReducers } from "redux";
import {projects} from "./projects.reducer";
import {issues} from "./issues.reducer";
import {teamMember} from "./member.reducer";

import auth from './auth';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        auth,
        projects,
        issues,
        teamMember
    });
}
