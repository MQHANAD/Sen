import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  ContainerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${ContainerStyles}`}
      disabled={isLoading}
      style={isLoading ? styles.loading : styles.button}
    >
      <Text className={`${textStyles}`} style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4DA1A9", // Corresponds to buttonLight color
    borderRadius: 30, // Rounded corners (rounded-xl equivalent)
    minHeight: 62, // Minimum height
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    color: "#F6F4F0", // Corresponds to primary color
    fontFamily: "Poppins-SemiBold", // Custom font (if loaded)
    fontSize: 18, // Corresponds to text-lg
  },
  loading: {
    backgroundColor: "#4DA1A9", // Corresponds to buttonLight color
    borderRadius: 30, // Rounded corners (rounded-xl equivalent)
    minHeight: 62, // Minimum height
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    paddingLeft: 20,
    paddingRight: 20,
    opacity: 0.5,
  },
});

export default CustomButton;
