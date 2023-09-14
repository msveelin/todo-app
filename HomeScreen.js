import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FAB } from "react-native-paper";
import { useFonts } from "expo-font";
import {  useTodoContext } from "./TodoContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const { state, dispatch } = useTodoContext(); // Access dispatch here

  const incompleteTodos = state.todos.filter((todo) => !todo.isComplete);

  const [fontsLoaded] = useFonts({
    louis: require("./assets/louis-regular.ttf"),
    "louis-bold": require("./assets/louis-bold.ttf"),
    "louis-light-italic": require("./assets/louis-light-italic.ttf"),
  });
  const handleDoubleTap = (text) => {
    const todoToComplete = state.todos.find((todo) => todo.text === text);
    if (todoToComplete) {
      // Dispatch the action with the text of the todo to complete
      dispatch({ type: "MARK_AS_COMPLETE", payload: { text } });
    }
  };
  const handleEdit = (index, text) => {
    // Navigate to the "EditTaskScreen" and pass the index and text as params
    navigation.navigate("EditTask", { index, text });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.heading}>Hey, Love</Text>
        <Text
          style={{
            fontFamily: "louis-light-italic",
            marginTop: 10,
            fontSize: 14,
          }}
        >
          Tap O to mark s complete and tap Todo text to edit
        </Text>
        <FAB
          style={styles.fab}
          icon="plus"
          color="white"
          onPress={() => navigation.navigate("AddTask")}
        />
      </View>
      <View style={styles.todos}>
        <Text style={styles.h2}>Todos</Text>
        {incompleteTodos.length > 0 ? (
          incompleteTodos.map((todoItem, index) => (
            <TouchableOpacity
              key={index}
              onLongPress={() => handleEdit(index, todoItem.text)}
              activeOpacity={0.6}
            >
              <View key={index} style={styles.card}>
                <FontAwesome
                  name="circle-o-notch"
                  size={32}
                  color="white"
                  onPress={() => handleDoubleTap(todoItem.text, dispatch)}
                  activeOpacity={0.6}
                />
                <TouchableOpacity>
                  <Text key={index} style={styles.text} onPress={handleEdit}>
                    {todoItem.text}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTodosText}>No todos for now, add more</Text>
        )}
      </View>
      <View>
        <Text style={styles.h2}>Completed</Text>
        {state.completed.length > 0 ? (
          state.completed.map((completedItem, index) => (
            <View key={index} style={styles.completed}>
              <Ionicons
                name="md-checkmark-done-circle"
                size={32}
                color="white"
              />

              <Text key={index} style={styles.text}>
                {completedItem.text}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noTodosText}>No completed todos for now.</Text>
        )}
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  appBar: {
    paddingTop: 70,
    paddingBottom: 30,
    flex: 1,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 40,
    fontFamily: "louis-bold",
    fontWeight: "bold",
  },
  h2: {
    fontSize: 36,
    fontFamily: "louis-bold",
    fontWeight: "bold",
  },
  todos: {
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f9e6e0",
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    justifyContent: "left",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    fontFamily: "louis",
    marginLeft: 10,
  },

  completed: {
    backgroundColor: "#e0b6a7",
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    justifyContent: "left",
    alignItems: "center",
    flexDirection: "row",
  },
  fab: {
    backgroundColor: "#e0b6a7",
    position: "absolute",
    right: 0,
    top: 60,
  },

  addTask: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  textInput: {
    fontSize: 36,
    fontFamily: "louis",
    textAlign: "center",
  },
  addBtn: {
    backgroundColor: "#e0b6a7",
    borderRadius: 20,
    marginTop: 20,
    padding: 20,
  },
  btnText: {
    color: "#fff",
    fontFamily: "louis-bold",
    fontWeight: "bold",
    fontSize: 20,
  },
  noTodosText: {
    fontSize: 20,
    fontFamily: "louis-light-italic",
    textAlign: "center",
    marginTop: 20, // Adjust the margin as needed
  },
  saveButton: {
    backgroundColor: "#e0b6a7",
    color: "white",
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    textAlign: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontFamily: "louis-bold",
    fontWeight: "bold",
    fontSize: 24,
  },
  editContainer: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
