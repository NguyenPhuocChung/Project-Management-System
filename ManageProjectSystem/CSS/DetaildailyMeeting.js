import { StyleSheet } from "react-native";
const DetailDailyMeeting = StyleSheet.create({
  font_size_title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  font_size_description: {
    fontSize: 14,
    fontStyle: "italic",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  width: {
    width: "30%",
  },
  display_left: {
    position: "absolute",
    right: 5,
  },
  witdh_zero: {
    height: 50,
    display: "flex",
    alignItems: "center",
    padding: 0,
  },
});
export default DetailDailyMeeting;
