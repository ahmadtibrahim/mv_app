import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  LogBox,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Pressable,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";


import TopBar from "./components/TopBar";
import HomeScreen from "./screens/HomeScreen";
import ClimateScreen from "./screens/ClimateScreen";
import ModesScreen from "./screens/ModesScreen";
import HDSyncScreen from "./screens/HDSyncScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StandardModeScreen from "./screens/modes/StandardModeScreen";
import BabyModeScreen from "./screens/modes/BabyModeScreen";
import PartyModeScreen from "./screens/modes/PartyModeScreen";

LogBox.ignoreLogs(["Text strings must be rendered within a <Text> component"]);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Wrap default tab button in a Pressable with a smaller ripple
function TabBarButton(props) {
  return (
    <Pressable
      {...props}
      android_ripple={{ color: "#ddd", borderless: true, radius: 20 }}
      style={({ pressed }) => [
        { flex: 1, alignItems: "center", justifyContent: "center" },
        pressed && { opacity: 0.6 },
      ]}
    />
  );
}

function ModesStack({ connectedChair }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ModesHome">
        {(props) => <ModesScreen {...props} disabled={!connectedChair} />}
      </Stack.Screen>
      <Stack.Screen name="StandardMode">
        {(props) => (
          <StandardModeScreen {...props} disabled={!connectedChair} />
        )}
      </Stack.Screen>
      <Stack.Screen name="PartyMode">
        {(props) => <PartyModeScreen {...props} disabled={!connectedChair} />}
      </Stack.Screen>
      <Stack.Screen name="BabyMode">
        {(props) => (
          <BabyModeScreen
            {...props}
            connectedChair={connectedChair}
            disabled={!connectedChair}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [connectedChair, setConnectedChair] = useState(null);

  const handleConnect = (chairId) => setConnectedChair(chairId);
  const handleDisconnect = () => setConnectedChair(null);

  const STATUS_BAR_HEIGHT =
    Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

  return (
    <SafeAreaView
      style={[styles.safeArea, { paddingTop: STATUS_BAR_HEIGHT + 15 }]}
    >
      <TopBar
        connectedChair={connectedChair}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <View style={styles.content}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "#4b7bec",
              tabBarInactiveTintColor: "gray",
            }}
          >
            <Tab.Screen
              name="Home"
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons
                    name={focused ? "home" : "home-outline"}
                    size={size - 6}
                    color={color}
                  />
                ),
                tabBarButton: TabBarButton,
              }}
            >
              {(props) => <HomeScreen {...props} disabled={!connectedChair} />}
            </Tab.Screen>

            <Tab.Screen
              name="Climate"
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons
                    name={focused ? "thermometer" : "thermometer-outline"}
                    size={size - 6}
                    color={color}
                  />
                ),
                tabBarButton: TabBarButton,
              }}
            >
              {(props) => (
                <ClimateScreen {...props} disabled={!connectedChair} />
              )}
            </Tab.Screen>

            <Tab.Screen
              name="Modes"
              options={{
                tabBarIcon: () => null, // we render custom inside button
                tabBarButton: (props) => (
                  <Pressable
                    {...props}
                    android_ripple={{
                      color: "#ddd",
                      borderless: true,
                      radius: 20,
                    }}
                    style={({ pressed }) => [
                      styles.modeButton,
                      pressed && { opacity: 0.6 },
                    ]}
                  >
                    <Image
                      source={require("./assets/logo.png")}
                      style={styles.modeIcon}
                    />
                  </Pressable>
                ),
              }}
            >
              {(props) => (
                <ModesStack {...props} connectedChair={connectedChair} />
              )}
            </Tab.Screen>

            <Tab.Screen
              name="HD Sync"
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons
                    name={focused ? "sync" : "sync-outline"}
                    size={size - 6}
                    color={color}
                  />
                ),
                tabBarButton: TabBarButton,
              }}
            >
              {(props) => (
                <HDSyncScreen {...props} disabled={!connectedChair} />
              )}
            </Tab.Screen>

            <Tab.Screen
              name="Settings"
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons
                    name={focused ? "settings" : "settings-outline"}
                    size={size - 6}
                    color={color}
                  />
                ),
                tabBarButton: TabBarButton,
              }}
            >
              {(props) => (
                <SettingsScreen {...props} disabled={!connectedChair} />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>

        {!connectedChair && (
          <View style={styles.overlay} pointerEvents="auto" />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  content: {
    flex: 1,
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  modeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modeIcon: {
    width: 24,
    height: 24,
  },
});
