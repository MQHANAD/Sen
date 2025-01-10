import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const CustomCheckbox = ({ title, isChecked, setIsChecked }) => {
  const toggleCheckbox = async () => {
    if (!isChecked) {
      try {
        // Open the document picker
        const result = await DocumentPicker.getDocumentAsync({
          type: "*/*", // Allow all file types
        });

        if (result.canceled) {
          // If the user cancels or something else happens
          Alert.alert("No file selected", "Please attach a file to proceed.");
          setIsChecked(false); // Uncheck the box
        } else {
          setIsChecked(true); // Check the box
          Alert.alert(
            "سيتم اشعارك عند التحقق من شهادتك",
            `You selected: ${result.assets[0].name}`
          );
        }
      } catch (error) {
        console.error("Error selecting file:", error);
        Alert.alert("Error", "Something went wrong. Please try again.");
        setIsChecked(false);
      }
    } else {
      // Uncheck the box
      setIsChecked(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity
        style={[styles.checkbox, isChecked && styles.checked]}
        onPress={toggleCheckbox}
      >
        {isChecked && <Text style={styles.checkmark}>✔</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 30,
  },
  checkbox: {
    borderRadius: 15,
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#B0B0B0",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  checked: {
    borderColor: "#4DA1A9",
    backgroundColor: "#4DA1A9",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: "#7b7b8b",
  },
});

export default CustomCheckbox;
