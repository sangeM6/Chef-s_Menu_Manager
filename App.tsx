import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Chef's Menu Manager
      </Text>

      <Text style={styles.subtitle}>
        Manage your restaurant menu
      </Text>

      <Button
        title="Add Menu Item"
        onPress={() => {}}
      />

      <View style={styles.space} />

      <Button
        title="View Menu"
        onPress={() => {}}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 100,
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 35,
  },

  space: {
    height: 15,
  },
});