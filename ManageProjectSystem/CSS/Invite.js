import { StyleSheet } from "react-native";

const Invite = StyleSheet.create({
  marginRL: {
    marginRight: 30,
    marginLeft: 20,
  },
  paddingTB: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  font_size_tittle: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "bold",
  },
  font_size_tittle_two: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
  },
  font_size_content: {
    fontSize: 14,
  },
  font_size_note: {
    fontSize: 10,
    fontWeight: "bold",
  },
  checkbox: {
    alignSelf: "center",
  },
  box: {
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#CDCDE6",
  },
  horizol: {
    borderBottomWidth: 1,
    borderColor: "#CDCDE6",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#CDCDE6",
  },
  img_edit: {
    width: 14,
    height: 14,
  },
  margin_right: {
    marginRight: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "#9E9E9E",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  centeredView: {
    backgroundColor: "#FFFFFF",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#2CAC31",
  },
  buttonClose: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFE4E4",
  },
});
export default Invite;
