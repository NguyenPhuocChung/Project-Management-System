import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";

import { View } from "react-native";
import AddEvent from "./admin/AddEvent";
import CreateProject from "./admin/CreateProject";
import Dashboard from "./admin/DashBoard";
import HomeManger from "./admin/Home";
import MemberManagement from "./admin/ManageMember";
import ManageProject from "./admin/ManageProject";
import Manage_task_status_project from "./admin/Manage_task_status_member";
import Register from "./admin/Register";
import StatusAllTask from "./admin/StatusAllTask";
import EditProject from "./admin/editProject";
import Account from "./components/Account";
import Calendaring from "./components/Calendaring";
import Chat from "./components/Chat";
import CommentSystem from "./components/Comment";
import DetailDailyMeeting from "./components/DetaildailyMeeting";
import Footer from "./components/Footer";
import Invite from "./components/Invite";
import Login from "./components/login";
import Notifications from "./components/notification";
import CreateTask from "./leader/CreateTask";
import DashboardLeader from "./leader/DashBoardLeader";
import HomeLeader from "./leader/Home";
import ManageTask from "./leader/ManageTask";
import EditTask from "./leader/editTask";
import ListTask from "./leader/listTask";
import ListTaskMember from "./member/ListTaskMember";
import HomeMember from "./member/home";
import Leader from "./role/leader";
import Manager from "./role/manager";
import Member from "./role/member";
const Stack = createNativeStackNavigator();

const MainScreen = () => {
  // ////////
  const [showFooter, setShowFooter] = useState(true);
  // Hàm kiểm tra tên màn hình
  const checkFooterVisibility = (routeName) => {
    const hiddenRoutes = ["Login"];
    setShowFooter(!hiddenRoutes.includes(routeName));
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenListeners={({ route }) => ({
          state: () => checkFooterVisibility(route.name), // Kiểm tra footer cho mỗi màn hình
        })}
      >
        {/* Thread chung */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="HomeManager"
          component={HomeManger}
        />
        <Stack.Screen name="Comment" component={CommentSystem} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Chat"
          component={Chat}
        />
        {/* Manage */}
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashBoard"
          component={Dashboard}
        />
        <Stack.Screen name="Project" component={ManageProject} />
        <Stack.Screen name="CreateProject" component={CreateProject} />
        <Stack.Screen name="EditProject" component={EditProject} />
        <Stack.Screen
          name="StatusMember"
          component={Manage_task_status_project}
        />
        <Stack.Screen name="AddEvent" component={AddEvent} />
        <Stack.Screen name="Invite" component={Invite} />
        {/* <Stack.Screen name="TotalTime" component={TotalTime} /> */}
        <Stack.Screen name="DetailMeeting" component={DetailDailyMeeting} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Calendaring"
          component={Calendaring}
        />
        <Stack.Screen name="ManageMember" component={MemberManagement} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Account"
          component={Account}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Manager"
          component={Manager}
        />
        {/* Leader */}
        <Stack.Screen name="HomeLeader" component={HomeLeader} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Member"
          component={Member}
        />
        <Stack.Screen name="DashBoardLeader" component={DashboardLeader} />
        <Stack.Screen name="ManageTask" component={ManageTask} />
        <Stack.Screen name="StatusAllTask" component={StatusAllTask} />
        <Stack.Screen name="EditTask" component={EditTask} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Leader"
          component={Leader}
        />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="ListTask" component={ListTask} />
        <Stack.Screen name="HomeMember" component={HomeMember} />
        {/* Memeber */}
        <Stack.Screen name="TaskMember" component={ListTaskMember} />
        <Stack.Screen name="Notification" component={Notifications} />
      </Stack.Navigator>

      {showFooter && <Footer />}
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  );
};

export default App;
