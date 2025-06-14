// App.js

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import ClimateScreen from "./screens/ClimateScreen";
import ModesScreen from "./screens/ModesScreen";
import HDSyncScreen from "./screens/HDSyncScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
        <Tab.Screen name="Modes" component={ModesScreen} />
        <Tab.Screen name="HD Sync" component={HDSyncScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
