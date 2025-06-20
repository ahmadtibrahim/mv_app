// /App.js

import * as React from "react";
import { SafeAreaView, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { PartyProvider } from "./contexts/PartyContext";

import TopBar from "./components/TopBar";
import HomeScreen from "./screens/HomeScreen";
import ClimateScreen from "./screens/ClimateScreen";
import HDSyncScreen from "./screens/HDSyncScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ModesScreen from "./screens/ModesScreen";
import StandardModeScreen from "./screens/modes/StandardModeScreen";
import PartyModeScreen from "./screens/modes/PartyModeScreen";
import BabyModeScreen from "./screens/modes/BabyModeScreen";
import GameModeScreen from "./screens/modes/GameModeScreen";
import MovieModeScreen from "./screens/modes/MovieModeScreen";
import RelaxModeScreen from "./screens/modes/RelaxModeScreen";
import KaraokeModeScreen from "./screens/modes/KaraokeModeScreen";
import SecurityModeScreen from "./screens/modes/SecurityModeScreen";
import PartySetupWizard from "./screens/modes/PartySetupWizard";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ModesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ModesHome" component={ModesScreen} />
      <Stack.Screen name="StandardMode" component={StandardModeScreen} />
      <Stack.Screen name="PartyMode" component={PartyModeScreen} />
      <Stack.Screen name="PartySetupWizard" component={PartySetupWizard} />
      <Stack.Screen name="BabyMode" component={BabyModeScreen} />
      <Stack.Screen name="GameMode" component={GameModeScreen} />
      <Stack.Screen name="MovieMode" component={MovieModeScreen} />
      <Stack.Screen name="RelaxMode" component={RelaxModeScreen} />
      <Stack.Screen name="KaraokeMode" component={KaraokeModeScreen} />
      <Stack.Screen name="SecurityMode" component={SecurityModeScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PartyProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
          <TopBar />
          <View style={{ flex: 1 }}>
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
                      iconName = focused
                        ? "thermometer"
                        : "thermometer-outline";
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
          </View>
        </SafeAreaView>
      </NavigationContainer>
    </PartyProvider>
  );
}
