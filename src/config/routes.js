
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import AddIssueScreen from '../screens/AddIssueScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProjectListScreen from '../screens/ProjectListScreen';
import ProjectScreen from '../screens/ProjectScreen';
import TeamScreen from '../screens/TeamScreen';
import ReportsScreen from '../screens/ReportsScreen';
import AddProjectScreen from '../screens/AddProjectScreen';

const Routes = {
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    Main: { screen: MainScreen },
    ProjectList: { screen: ProjectListScreen },
    Project: { screen: ProjectScreen },
    Team: { screen: TeamScreen },
    Reports: { screen: ReportsScreen },
    AddProject: { screen: AddProjectScreen},
    AddIssue: {screen: AddIssueScreen}

};

export default Routes;
