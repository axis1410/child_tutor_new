import React from "react";
import { StyleSheet } from "react-native";

export const user = {
  email: "user@example.com",
  parentName: "Vinayak Shukla",
  childName: "Aditya Singh",
  childAge: 5,
};
const UserProfile = () => {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ff69b4",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});
