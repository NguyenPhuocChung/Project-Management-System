import { StyleSheet } from "react-native";

const Calendering = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#48AE6D",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  buttonMeeting: {
    backgroundColor: "#EEF1F6",
    borderRadius: 5,
    padding: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  colorButton: {
    color: "#39434F",
  },
  img_googleMeet: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  colorTime: {
    color: "#949CB0",
  },
  box_calendering: {
    borderWidth: 1,
    borderColor: "#CDCDE6",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "#F9F9F9",
    borderBottomColor: "#ccc",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  dateText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "black",
  },
  dayText: {
    fontSize: 12,
    color: "grey",
  },
  monthText: {
    fontSize: 16,
    color: "grey",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#8C9EFF",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  todayButton: {
    backgroundColor: "#D2F6DF",
    padding: 10,
    borderRadius: 5,
  },
  buttonTextToday: {
    color: "#48AE6D",
    fontWeight: "bold",
  },
  buttonTextAddEvent: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  selectDateButton: {
    backgroundColor: "#EEF1F6",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  centeredView: {
    marginTop: 167,
    backgroundColor: "white",
  },
});

export default Calendering;
