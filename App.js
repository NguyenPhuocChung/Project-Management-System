import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./component/Profile";
import EditProfile from "./component/EditProfile";
import NotificationScreen from "./component/notification";
import MessageScreen from "./component/Message";
import ProjectComments from "./component/ProfileComment";
import StoreRecordsScreen from "./component/StoreRecordsScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Notifications">
    //     <Stack.Screen name="Notifications" component={NotificationScreen} />
    //     <Stack.Screen name="Message" component={MessageScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="ProjectComments">
    //     <Stack.Screen
    //       name="ProjectComments"
    //       component={ProjectComments}
    //       options={{ headerShown: false }} // Hide the header
    //     />
    //     <Stack.Screen
    //       name="StoreRecords"
    //       component={StoreRecordsScreen}
    //       options={{ headerShown: false }} // Hide the header if needed on this screen too
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
