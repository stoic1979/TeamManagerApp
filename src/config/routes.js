
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProjectListScreen from '../screens/ProjectListScreen';
import ProjectScreen from '../screens/ProjectScreen';
import TeamScreen from '../screens/TeamScreen';
import ReportsScreen from '../screens/ReportsScreen';

const Routes = {
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    Main: { screen: MainScreen },
    ProjectList: { screen: ProjectListScreen },
    Project: { screen: ProjectScreen },
    Team: { screen: TeamScreen },
    Reports: { screen: ReportsScreen }

};

export default Routes;
