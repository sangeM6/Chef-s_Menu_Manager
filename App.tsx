import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [page, setPage] = useState("home");

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");
  const [showCourses, setShowCourses] = useState(false);

  const courses = [
    "Starter",
    "Main Course",
    "Dessert",
    "Side Dish",
    "Drink",
  ];

  return (
    <View style={styles.container}>

      {page === "home" && (
        <View>
          <Text style={styles.title}>
            Chef's Menu Manager
          </Text>

          <Text style={styles.subtitle}>
            Manage your restaurant menu
          </Text>

          <Button
            title="Add Menu Item"
            onPress={() => setPage("add")}
          />

          <View style={styles.space} />

          <Button
            title="View Menu"
            onPress={() => {}}
          />
        </View>
      )}

      {page === "add" && (
        <View>
          <Text style={styles.title}>
            Add Menu Item
          </Text>

          <Text style={styles.label}>
            Dish Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter dish name"
            value={dishName}
            onChangeText={setDishName}
          />

          <Text style={styles.label}>
            Description
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>
            Course
          </Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowCourses(!showCourses)}
          >
            <Text>
              {course || "Select course"}
            </Text>

            <Text style={styles.arrow}>
              ▼
            </Text>
          </TouchableOpacity>

          {showCourses && (
            <View style={styles.courseList}>
              <FlatList
                data={courses}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.courseOption}
                    onPress={() => {
                      setCourse(item);
                      setShowCourses(false);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <Text style={styles.label}>
            Price
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <View style={styles.row}>
            <View style={styles.button}>
              <Button
                title="Add Item"
                onPress={() => {}}
              />
            </View>

            <View style={styles.button}>
              <Button
                title="Done"
                onPress={() => setPage("home")}
              />
            </View>
          </View>

          <Button
            title="Cancel"
            onPress={() => setPage("home")}
          />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 70,
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },

  space: {
    height: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
  },

  dropdown: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  arrow: {
    fontSize: 14,
  },

  courseList: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginTop: -15,
    marginBottom: 15,
  },

  courseOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  row: {
    flexDirection: "row",
    marginBottom: 15,
  },

  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});