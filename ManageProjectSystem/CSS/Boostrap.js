import { StyleSheet } from "react-native";

const bootstrapStyles = StyleSheet.create({
  // Layout utilities
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  col: {
    flex: 1,
    paddingHorizontal: 8,
  },

  // Text utilities
  textCenter: {
    textAlign: "center",
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },

  // Margin and padding utilities
  mt1: { marginTop: 8 },
  mt2: { marginTop: 16 },
  mt3: { marginTop: 24 },
  mt4: { marginTop: 32 },

  mb1: { marginBottom: 8 },
  mb2: { marginBottom: 16 },
  mb3: { marginBottom: 24 },
  mb4: { marginBottom: 32 },

  p1: { padding: 8 },
  p2: { padding: 16 },
  p3: { padding: 24 },
  p4: { padding: 32 },

  // Background colors
  bgPrimary: { backgroundColor: "#007bff" },
  bgSecondary: { backgroundColor: "#6c757d" },
  bgSuccess: { backgroundColor: "#28a745" },
  bgDanger: { backgroundColor: "#dc3545" },
  bgWarning: { backgroundColor: "#ffc107" },
  bgInfo: { backgroundColor: "#17a2b8" },
  bgLight: { backgroundColor: "#f8f9fa" },
  bgDark: { backgroundColor: "#343a40" },

  // Text colors
  textPrimary: { color: "#007bff" },
  textSecondary: { color: "#6c757d" },
  textSuccess: { color: "#28a745" },
  textDanger: { color: "#dc3545" },
  textWarning: { color: "#ffc107" },
  textInfo: { color: "#17a2b8" },
  textLight: { color: "#f8f9fa" },
  textDark: { color: "#343a40" },

  // Border utilities
  border: { borderWidth: 1, borderColor: "#dee2e6" },
  rounded: { borderRadius: 4 },
  roundedCircle: { borderRadius: 50 },
});

export default bootstrapStyles;
