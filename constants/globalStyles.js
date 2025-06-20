// /constants/globalStyles.js

import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    marginVertical: 10,
    // --- Standardize width/center for all cards/widgets ---
    width: "90%",
    maxWidth: 500,
    alignSelf: "center",
    elevation: 3,
    shadowColor: colors.primary,
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  header: {
    // For ModeHeader/TopBar-like widgets
    width: "90%",
    maxWidth: 500,
    alignSelf: "center",
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 10,
    elevation: 3,
    shadowColor: colors.primary,
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "700",
    fontSize: 17,
    color: colors.primary,
    marginBottom: 10,
  },
  // Utility for inner widget layouts
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
