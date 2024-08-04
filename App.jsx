import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  const startAddGoalHandler = () => {
    setIsModalOpen(true);
  };

  const endAddGoalHandler = () => {
    setIsModalOpen(false);
  };

  const addGoalHandler = (enteredGoal) => {
    setCourseGoals((prevState) => [
      ...prevState,
      { text: enteredGoal, key: Math.random().toString() },
    ]);

    endAddGoalHandler();
  };

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoals) =>
      currentCourseGoals.filter((goal) => goal.key !== id)
    );
  };

  return (
    <>
      <StatusBar style='inverted' />
      <View style={styles.appContainer}>
        <Button
          title='Add New Goal'
          color='#8b44e7'
          onPress={startAddGoalHandler}
        />
        {isModalOpen && (
          <GoalInput
            onAddGoal={addGoalHandler}
            isModalOpen={isModalOpen}
            endAddGoalHandler={endAddGoalHandler}
          />
        )}
        <View style={styles.goalsContainer}>
          <FlatList
            alwaysBounceVertical={false}
            data={courseGoals}
            renderItem={({ item }) => (
              <GoalItem
                text={item.text}
                id={item.key}
                onDeleteItem={deleteGoalHandler}
              />
            )}
            keyExtractor={(item) => item.key}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    // backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 5,
  },
});
