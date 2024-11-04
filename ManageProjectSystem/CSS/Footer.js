import { StyleSheet } from "react-native";

const FooterStyles = StyleSheet.create({
  footer: {
    position: "absolute", // Cố định footer
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#39434F",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 30,
    paddingBottom: 30,
  },
  width: {
    width: 50,
    textAlign: "center",
  },
});

export default FooterStyles;
