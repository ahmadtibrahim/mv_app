import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import ClimateScreen from "./screens/ClimateScreen";
import ModesScreen from "./screens/ModesScreen";
import HDSyncScreen from "./screens/HDSyncScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StandardModeScreen from "./screens/modes/StandardModeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ModesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ModesHome" component={ModesScreen} />
      <Stack.Screen name="StandardMode" component={StandardModeScreen} />
      {/* ...other mode screens */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case "Home":
                  iconName = focused ? "home" : "home-outline";
                  break;
                case "Climate":
                  iconName = focused ? "thermometer" : "thermometer-outline";
                  break;
                case "Modes":
                  iconName = focused ? "apps" : "apps-outline";
                  break;
                case "HD Sync":
                  iconName = focused ? "sync" : "sync-outline";
                  break;
                case "Settings":
                  iconName = focused ? "settings" : "settings-outline";
                  break;
                default:
                  iconName = "ellipse";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#4b7bec",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Climate" component={ClimateScreen} />
          <Tab.Screen name="Modes" component={ModesStack} />
          <Tab.Screen name="HD Sync" component={HDSyncScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f6fa", // or your main background color
  },
});
