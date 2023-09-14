import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TodoProvider} from "./TodoContext";
import AddTask from "./AddTask";
import HomeScreen from "./HomeScreen";
import EditTaskScreen from "./EditTask";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TodoProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTask}
            options={{
              title: "Create New Task", // Optional: Set a custom title
              headerTintColor: "#e0b6a7", // Change the arrow color
            }}
          />
          <Stack.Screen
            name="EditTask"
            component={EditTaskScreen}
            options={{
              title: "Edit Task",
              headerTintColor: "#e0b6a7",
            }}
          />
        </Stack.Navigator>
      </TodoProvider>
    </NavigationContainer>
  );
}
