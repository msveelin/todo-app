import { StyleSheet,Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useTodoContext } from "./TodoContext";
function AddTask({ navigation }) {
  const { state, dispatch } = useTodoContext();
  const [todo, setTodo] = useState("");
  const handleAddTask = () => {
    // Dispatch the ADD_TODO action to add a new todo item
    dispatch({ type: "ADD_TODO", payload: todo });
    navigation.navigate("Home");
  };
  return (
    <View style={styles.addTask}>
      <TextInput
        editable
        multiline
        numberOfLines={2}
        style={styles.textInput}
        onChangeText={setTodo}
        placeholder="What do you want to do?"
      />
      <TouchableOpacity onPress={handleAddTask} style={styles.addBtn}>
        <Text style={styles.btnText}>ADD TASK</Text>
      </TouchableOpacity>
    </View>
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
      padding:20,
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
    }
  });

export default AddTask;
