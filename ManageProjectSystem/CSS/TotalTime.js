import { StyleSheet } from "react-native";
const TotalTime = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#DCDCDC" },
  text: { margin: 6 },
  rowBorder: {
    borderBottomWidth: 1, // Đường kẻ ngang
    borderColor: "#DCDCDC", // Màu của đường kẻ ngang
  },
  button: {
    alignItems: "center",
    backgroundColor: "#39434F",
    padding: 10,
  },
});
export default TotalTime;
