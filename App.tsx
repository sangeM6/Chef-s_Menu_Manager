import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function App() {
  const [page, setPage] = useState("home");

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  const [showCourses, setShowCourses] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const [dishNameError, setDishNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [priceError, setPriceError] = useState("");

  const courses = [
    "Starter",
    "Main Course",
    "Dessert",
    "Side Dish",
    "Drink",
  ];

  const addItem = () => {
    setDishNameError("");
    setDescriptionError("");
    setCourseError("");
    setPriceError("");

    if (dishName.trim() === "") {
      setDishNameError("Dish name is required");
    }

    if (description.trim() === "") {
      setDescriptionError("Description is required");
    }

    if (course === "") {
      setCourseError("Please select a course");
    }

    if (price.trim() === "") {
      setPriceError("Price is required");
    }

    if (
      dishName.trim() !== "" &&
      description.trim() !== "" &&
      course !== "" &&
      price.trim() !== ""
    ) {
      const newItem = {
        dishName: dishName,
        description: description,
        course: course,
        price: price,
      };

      setMenuItems([...menuItems, newItem]);

      setDishName("");
      setDescription("");
      setCourse("");
      setPrice("");
      setShowCourses(false);

      Alert.alert(
        "Menu Updated",
        "Menu item has been successfully added."
      );
    }
  };

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

          <View style={styles.bigButton}>
            <Button
              title="Add Menu Item"
              onPress={() => setPage("add")}
            />
          </View>

          <View style={styles.space} />

          <View style={styles.bigButton}>
            <Button
              title="View Menu"
              onPress={() => setPage("menu")}
            />
          </View>
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

          {dishNameError !== "" && (
            <Text style={styles.error}>
              {dishNameError}
            </Text>
          )}

          <Text style={styles.label}>
            Description
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />

          {descriptionError !== "" && (
            <Text style={styles.error}>
              {descriptionError}
            </Text>
          )}

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

          {courseError !== "" && (
            <Text style={styles.error}>
              {courseError}
            </Text>
          )}

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

          {priceError !== "" && (
            <Text style={styles.error}>
              {priceError}
            </Text>
          )}

          <View style={styles.row}>

            <View style={styles.bigSmallButton}>
              <Button
                title="Add Item"
                onPress={addItem}
              />
            </View>

            <View style={styles.bigSmallButton}>
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

      {page === "menu" && (
        <View style={styles.menuPage}>

          {menuItems.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                No menu items
              </Text>

              <Text style={styles.emptyMessage}>
                There are currently no menu items to display.
                Please add menu items to start managing your
                restaurant menu.
              </Text>

              <View style={styles.bigButton}>
                <Button
                  title="Add Menu Item"
                  onPress={() => setPage("add")}
                />
              </View>
            </View>
          )}

          {menuItems.length > 0 && (
            <View style={styles.menuContent}>
              <Text style={styles.title}>
                Menu
              </Text>

              <FlatList
                data={menuItems}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.menuItem}>
                    <Text style={styles.dishName}>
                      {item.dishName}
                    </Text>

                    <Text>
                      {item.description}
                    </Text>

                    <Text>
                      Course: {item.course}
                    </Text>

                    <Text>
                      Price: R{item.price}
                    </Text>
                  </View>
                )}
              />
            </View>
          )}

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
    marginBottom: 5,
    borderRadius: 5,
  },

  error: {
    color: "red",
    marginBottom: 10,
  },

  dropdown: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 12,
    marginBottom: 5,
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
    marginBottom: 15,
  },

  courseOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  bigButton: {
    minHeight: 50,
    justifyContent: "center",
  },

  bigSmallButton: {
    flex: 1,
    minHeight: 50,
    justifyContent: "center",
    marginHorizontal: 5,
  },

  row: {
    flexDirection: "row",
    marginBottom: 15,
  },

  menuPage: {
    flex: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },

  emptyMessage: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 25,
  },

  menuContent: {
    flex: 1,
  },

  menuItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },

  dishName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});