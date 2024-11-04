import { StyleSheet } from "react-native";

const AddEventStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  inputTittle: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },

  inputDescription: {
    textAlignVertical: "top",
    padding: 10,
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },

  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: "center",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#aaa",
    paddingLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FFF4E4",

    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  closeButtonText: {
    fontWeight: "bold",
    color: "#F5AB3C",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#f44336",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",

    fontWeight: "bold",
  },
});

export default AddEventStyles;
