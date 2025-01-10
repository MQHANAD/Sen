import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.container} className={`${otherStyles}`}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={isFocused ? styles.inputContainer : styles.inputContainerNotF}
      >
        {title === "كلمة السر" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              style={styles.passEye}
            />
          </TouchableOpacity>
        )}
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "كلمة السر" && !showPassword}
          {...props}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    color: "#7b7b8b",
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "right",
    marginRight: 20,
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: "#4DA1A9",
    backgroundColor: "#FFFFFF", // Adjust for visibility
    height: 64,
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    marginRight: 15,
    flexDirection: "row",
  },
  textInput: {
    flexShrink: 1,
    fontSize: 16,
    color: "#000", // Adjust to ensure text is visible
    fontWeight: "600",
    width: "100%",
    textAlign: "right", // Align text to the right
  },
  inputContainerNotF: {
    borderWidth: 2,
    borderColor: "#D3D3D3",
    backgroundColor: "#F9F9F9", // Adjust for visibility
    height: 64,
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    marginRight: 15,
    flexDirection: "row",
  },
  passEye: {
    width: 30,
    height: 30,
    marginTop: 15,
  },
});

export default FormField;
