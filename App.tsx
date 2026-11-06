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
  Image,
} from "react-native";



export default function App() {
  const [page, setPage] = useState("home");

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  const [showCourses, setShowCourses] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  //Search and filter state
  const [searchText, setSearchText] =useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [showFilterCourses, setShowFilterCourses] = useState(false);

  // Selected menu item
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Edit menu item information
  const [editDishName, setEditDishName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCourse, setEditCourse] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // Edit course dropdown
  const [showEditCourses, setShowEditCourses] = useState(false);

  const [dishNameError, setDishNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [priceError, setPriceError] = useState("");

  const courses = [
    "Starter",
    "Main Course",
    "Dessert",
    
  ];

  const validateForm = () => {
  setDishNameError("");
  setDescriptionError("");
  setCourseError("");
  setPriceError("");

  let isValid = true;

  if (dishName.trim() === "") {
    setDishNameError("Please enter a dish name.");
    isValid = false;
  }

  if (description.trim() === "") {
    setDescriptionError("Please enter a description.");
    isValid = false;
  }

  if (course === "") {
    setCourseError("Please select a course.");
    isValid = false;
  }

  const priceNumber = Number(price);

  if (price.trim() === "") {
    setPriceError("Please enter a price.");
    isValid = false;
  } else if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
    setPriceError("Please enter a valid price greater than zero.");
    isValid = false;
  }

  return isValid;
};

  const addItem = () => {
    if (validateForm()) {
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

  const done = () => {
    setPage("menu");
  };
 // Open selected menu item
const openMenuItem = (index: number) => {
  if (index < 0 || index >= menuItems.length) {
    Alert.alert("Error", "Menu item could not be found.");
    return;
  }

  setSelectedIndex(index);
  setPage("details");
};

// Open edit page
const editItem = () => {
  if (
    selectedIndex === null ||
    selectedIndex < 0 ||
    selectedIndex >= menuItems.length
  ) {
    Alert.alert("Error", "Please select a valid menu item.");
    setPage("menu");
    return;
  }

  const item = menuItems[selectedIndex];

  setEditDishName(item.dishName);
  setEditDescription(item.description);
  setEditCourse(item.course);
  setEditPrice(String(item.price));

  setPage("edit");
};

// Save changes
const saveChanges = () => {
  if (
    editDishName.trim() === "" ||
    editDescription.trim() === "" ||
    editCourse === "" ||
    editPrice.trim() === ""
  ) {
    Alert.alert("Missing Information", "Please complete all fields.");
    return;
  }

  if (selectedIndex !== null) {
    const updatedItems = [...menuItems];

    updatedItems[selectedIndex] = {
      dishName: editDishName,
      description: editDescription,
      course: editCourse,
      price: editPrice,
    };

    setMenuItems(updatedItems);
    setPage("menu");
  }
};

// Delete menu item
const deleteItem = () => {
  Alert.alert(
    "Delete Menu Item",
    "Are you sure you want to delete this menu item?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          if (selectedIndex !== null) {
            const updatedItems = menuItems.filter(
              (_, index) => index !== selectedIndex
            );

            setMenuItems(updatedItems);
            setSelectedIndex(null);
            setPage("menu");
          }
        },
      },
    ]
  );
};
// Search and filter menu items
const filteredItems = menuItems.filter((item: any) => {

  const matchesSearch = item.dishName
    .toLowerCase()
    .includes(searchText.toLowerCase());

  const matchesCourse =
    selectedCourse === "All Courses" ||
    item.course === selectedCourse;

  return matchesSearch && matchesCourse;

});
// Menu statistics

const totalItems = menuItems.length;

const totalPrice = menuItems.reduce(
  (total, item) => total + (parseFloat(item.price) || 0),
  0
);

const averagePrice =
  totalItems > 0 ? totalPrice / totalItems : 0;

const courseCounts = courses.map((courseName) => ({
  course: courseName,
  count: menuItems.filter(
    (item) => item.course === courseName
  ).length,
}));

  return (
    <View style={styles.container}>

      {page === "home" && (
        <View>
          <Text style={styles.title}>
            Chef's Menu Manager
          </Text>

         

          <Image
            source={require("./assets/restaurant.png")}
            style={styles.homeImage}
          />

          <Text style={styles.subtitle}>
            Manage your restaurant menu
          </Text>

          <View style={styles.bigButton}>
            <Button
              title="Add Menu Item"
              color="#f97316"
              onPress={() => setPage("add")}
            />
          </View>

          <View style={styles.space} />

          <View style={styles.bigButton}>
            <Button
              title="View Menu"
              color="#f97316"
              onPress={() => setPage("menu")}
            />
          </View>
        </View>
      )}
      {/* MENU ITEM DETAILS PAGE */}

      {page === "details" && selectedIndex !== null && selectedIndex >=0 && selectedIndex < menuItems.length && (
        <View>

          <Text style={styles.title}>
            Menu Item Details
          </Text>

          <View style={styles.menuItem}>

            <Text style={styles.label}>
              Dish Name
            </Text>

            <Text style={styles.detailText}>
              {menuItems[selectedIndex]?.dishName || "No dish selected"}
            </Text>

            <Text style={styles.label}>
              Course
            </Text>

            <Text style={styles.detailText}>
              {menuItems[selectedIndex]?.course || "No course selected"}
            </Text>

            <Text style={styles.label}>
              Description
            </Text>

            <Text style={styles.detailText}>
              {menuItems[selectedIndex]?.description || "No description available"}
            </Text>

            <Text style={styles.label}>
              Price
            </Text>

            <Text style={styles.detailText}>
              {menuItems[selectedIndex]?.price != null ? `R${menuItems[selectedIndex].price}`: "No price available"}
            </Text>

        </View>

        <View style={styles.row}>

          <View style={styles.bigSmallButton}>
            <Button
              title="Edit"
              color="#f97316"
              onPress={editItem}
            />
          </View>

          <View style={styles.bigSmallButton}>
            <Button
              title="Delete"
              color="#ec9557"
              onPress={deleteItem}
            />
          </View>

        </View>

        <Button
          title="Back to Menu"
          color="#f97316"
          onPress={() => setPage("menu")}
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
            onChangeText={(text) => {
              setDishName(text);
              setDishNameError("");
            }}
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
            placeholderTextColor="#bdbdbd"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setDescriptionError("");
            }}
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
                      setCourseError("");
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
            placeholderTextColor="#bdbdbd"
            keyboardType="numeric"
            value={price}
            onChangeText={(text) => {
              setPrice(text);
              setPriceError("");
            }}
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
                color="#f97316"
                onPress={addItem}
              />
            </View>

            <View style={styles.bigSmallButton}>
              <Button
                title="Done"
                color="#f97316"
                onPress={done}
              />
            </View>
          </View>

          <Button
            title="Cancel"
            color="#f97316"
            onPress={() => setPage("home")}
          />
        </View>
      )}

      {/* EDIT MENU ITEM PAGE */}

      {page === "edit" && (
        <View>

          <Text style={styles.title}>
            Edit Menu Item
          </Text>

          <Text style={styles.label}>
            Dish Name
          </Text>

          <TextInput
            style={styles.input}
            placeholderTextColor="#bdbdbd"
            placeholder="Enter dish name"
            value={editDishName}
            onChangeText={setEditDishName}
          />

          <Text style={styles.label}>
            Description
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter description"
            placeholderTextColor="#bdbdbd"
            value={editDescription}
            onChangeText={setEditDescription}
          />

          <Text style={styles.label}>
            Course
          </Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowEditCourses(!showEditCourses)}
          >
            <Text>
              {editCourse || "Select course"}
            </Text>

            <Text style={styles.arrow}>
              ▼
            </Text>
          </TouchableOpacity>

          {showEditCourses && (
            <View style={styles.courseList}>
              <FlatList
                data={courses}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.courseOption}
                  onPress={() => {
                  setEditCourse(item);
                  setShowEditCourses(false);
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
            placeholderTextColor="#bdbdbd"
            keyboardType="numeric"
            value={editPrice}
            onChangeText={setEditPrice}
          />

          <View style={styles.row}>

            <View style={styles.bigSmallButton}>
              <Button
                title="Cancel"
                color="#f97316"
                onPress={() => {
                setShowEditCourses(false);
                setPage("menu");
               }}
              />
            </View>

            <View style={styles.bigSmallButton}>
              <Button
                title="Save Changes"
                color="f97316"
                onPress={saveChanges}
              />
            </View>

          </View>

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
                  color="#f97316"
                  onPress={() => setPage("add")}
                />
              </View>
            </View>
          )}

          {menuItems.length > 0 && (
            <View style={styles.menuContent}>
              <TextInput style={styles.input} placeholder="Search menu items..." placeholderTextColor="#bdbdbd" value={searchText} onChangeText={setSearchText}/>
              {/*Filter by course*/ }
              <TouchableOpacity style={styles.dropdown} onPress={() => setShowFilterCourses(!showFilterCourses)}>
                <Text>{selectedCourse}</Text>
                <Text style={styles.arrow}>˯</Text>
              </TouchableOpacity>
              {showFilterCourses && (
                <View style={styles.courseList}>
                  <FlatList data={["All Courses", ...courses]} keyExtractor={(item) => item} renderItem={({item}) => (
                    <TouchableOpacity style={styles.courseOption} onPress={() => {
                      setSelectedCourse(item);
                      setShowFilterCourses(false);
                    }}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                  />
                </View>
              )}
              {/*Clear search and filter*/ }
              <Button title="Clear Search & Filter" color="#f97316" onPress={() => {
                setSearchText("");
                setSelectedCourse("All Courses");
                setShowFilterCourses(false);
              }}
              />
              <Text style={styles.title}>
                Menu
              </Text>
              {/* MENU STATISTICS */}

              <View style={styles.statisticsContainer}>
                <Text style={styles.statisticsTitle}>
                  Menu Statistics
                </Text>

                <View style={styles.statisticsRow}>
                  <Text style={styles.statisticsLabel}>
                    Total Menu Items
                  </Text>

                  <Text style={styles.statisticsValue}>
                    {totalItems}
                  </Text>
               </View>

                <View style={styles.statisticsRow}>
                  <Text style={styles.statisticsLabel}>
                    Average Price
                  </Text>

                  <Text style={styles.statisticsValue}>
                    R{averagePrice.toFixed(2)}
                  </Text>
                </View>

                <Text style={styles.courseStatisticsTitle}>
                  Items Per Course
                </Text>

                {courseCounts.map((item) => (
                  <View
                    key={item.course}
                    style={styles.statisticsRow}
                  >
                    <Text style={styles.statisticsLabel}>
                      {item.course}
                    </Text>

                    <Text style={styles.statisticsValue}>
                      {item.count}
                    </Text>
               </View>
              ))}
          </View>
              <FlatList
                data={filteredItems}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 10 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => openMenuItem(menuItems.indexOf(item))}
                  >
                    <Text style={styles.dishName}>
                      {item.dishName}
                    </Text>
                    <Text style={styles.cardText}>
                      <Text>{item.description}</Text>
                    </Text>
                    <Text style={styles.cardText}>
                      <Text>Course: {item.course}</Text>
                    </Text>
                    <Text style={styles.cardPrice}>
                      <Text>Price: R{item.price}</Text>
                    </Text>

                  </TouchableOpacity>
               )}
             />
             {filteredItems.length === 0 && (
              <Text style={styles.emptyMessage}>
                No matching items found.
              </Text>
             )}

              <View style={styles.addAnotherButton}>
                <Button
                  title="Add Another Item"
                  color="#f97316"
                  onPress={() => setPage("add")}
                />
              </View>
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
    backgroundColor: "#171717",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color:"#ffffff"
  },

  subtitle: {
    fontSize: 22,
    marginBottom: 20,
    alignItems: "center",
    color:"#d1d5db"
  },

  homeImage: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    marginBottom: 25,
  },

  space: {
    height: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color:"#f97316"
  },

  input: {
    backgroundColor: "#262626",
    color:"#ffffff",
    borderWidth: 1,
    borderColor: "#f97315",
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
    color:"#ffffff"
  },

  emptyMessage: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 25,
    color:"#ffffff"
  },

  menuContent: {
    flex: 1,
  },

  menuItem: {
    backgroundColor: "#262626",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderColor:"#404040",
    borderWidth:1
  },

  dishName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color:"#d1d5db"
  },
  detailText: {
  fontSize: 16,
  marginBottom: 15,
  color:"#d1d5db",
  lineHeight:24
},

  addAnotherButton: {
    marginTop: 10,
    marginBottom: 5,
  },
  statisticsContainer: {
  backgroundColor: "#FFFFFF",
  padding: 15,
  marginBottom: 15,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#CCCCCC",
},

statisticsTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 15,
},

statisticsRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: "#EEEEEE",
},

statisticsLabel: {
  fontSize: 15,
},

statisticsValue: {
  fontSize: 15,
  fontWeight: "bold",
},

courseStatisticsTitle: {
  fontSize: 16,
  fontWeight: "bold",
  marginTop: 15,
  marginBottom: 5,
},
cardText:{
  fontSize:14,
  color:"#d1d5db",
  marginBottom:6,
},
cardPrice:{
  fontSize:14,
  color:"#ffffff",
  fontWeight: "bold",
  marginBottom:6,
}
});

