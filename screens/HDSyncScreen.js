import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import colors from "../constants/colors";
import SetupWizard from "../components/SetupWizard";
import { Picker } from "@react-native-picker/picker";

export default function HDSyncScreen() {
  const [activeTab, setActiveTab] = useState("main");

  // Connection & selected profile
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  // Wizard & profile data
  const [step, setStep] = useState(1);
  const [chairsList] = useState([
    { id: "1", name: "Joud’s Chair" },
    { id: "2", name: "Hamza’s Chair" },
    { id: "3", name: "Jwan’s Chair" },
    { id: "4", name: "Ahmad’s Chair" },
  ]);
  const [ceilingLightsList] = useState([
    { id: "1", name: "Ceiling Light 1" },
    { id: "2", name: "Ceiling Light 2" },
    { id: "3", name: "Ceiling Light 3" },
    { id: "4", name: "Ceiling Light 4" },
  ]);
  const [chairConnectedMap, setChairConnectedMap] = useState({});
  const [chairLayoutMap, setChairLayoutMap] = useState({});
  const [lightConnectedMap, setLightConnectedMap] = useState({});
  const [lightLayoutMap, setLightLayoutMap] = useState({});
  const [ceilingLayout, setCeilingLayout] = useState("square");
  const [profileName, setProfileName] = useState("");
  const [savedProfiles, setSavedProfiles] = useState([]);

  // Connect / Disconnect simulation
  const connectToDevice = (deviceName) => {
    setConnectedDevice(deviceName);
    setConnectionStatus("connected");
  };
  const disconnectDevice = () => {
    setConnectedDevice(null);
    setConnectionStatus("disconnected");
    setSelectedProfileId(null);
  };

  // Load a profile to activate on Main tab
  const loadProfile = (profile) => {
    setSelectedProfileId(profile.id);
    setChairConnectedMap(profile.chairConnectedMap || {});
    setChairLayoutMap(profile.chairLayoutMap || {});
    setLightConnectedMap(profile.lightConnectedMap || {});
    setLightLayoutMap(profile.lightLayoutMap || {});
    setCeilingLayout(profile.ceilingLayout || "square");
    setProfileName(profile.name || "");
  };

  // Save new or edited profile
  const saveProfileHandler = (profileData) => {
    let updatedProfiles;
    let profileToLoad = profileData;

    if (profileData.id) {
      // Update existing profile
      updatedProfiles = savedProfiles.map((p) =>
        p.id === profileData.id ? profileData : p
      );
    } else {
      // Add new profile
      const newProfile = { ...profileData, id: Date.now().toString() };
      updatedProfiles = [...savedProfiles, newProfile];
      profileToLoad = newProfile; // load with new id
    }

    setSavedProfiles(updatedProfiles);
    Alert.alert("Profile saved successfully");
    setActiveTab("main");
    loadProfile(profileToLoad);
  };

  // Delete profile confirmation
  const deleteProfile = (id) => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete this profile?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setSavedProfiles((prev) => prev.filter((p) => p.id !== id)),
        },
      ]
    );
  };

  // Render profile item for Profiles tab
  const renderProfileItem = ({ item }) => (
    <View style={styles.profileItem}>
      <Text style={styles.profileName}>{item.name}</Text>
      <View style={styles.profileButtons}>
        <TouchableOpacity
          style={[styles.profileButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            loadProfile(item);
            setStep(1);
            setActiveTab("wizard");
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.profileButton, { backgroundColor: "#d9534f" }]}
          onPress={() => deleteProfile(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Main Page Content
  const MainPage = () => (
    <View style={styles.mainContainer}>
      {connectionStatus === "disconnected" ? (
        <TouchableOpacity
          style={styles.connectBtn}
          onPress={() => connectToDevice("MV HD Sync")}
        >
          <Text style={styles.connectBtnText}>Connect to HD Sync</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.connectedContainer}>
            <Text style={styles.connectedText}>
              Connected to {connectedDevice}
            </Text>
            <TouchableOpacity
              style={styles.disconnectBtn}
              onPress={disconnectDevice}
            >
              <Text style={styles.disconnectBtnText}>Disconnect</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.selectProfileLabel}>Select Profile:</Text>
          {savedProfiles.length === 0 ? (
            <Text style={styles.noProfilesText}>No saved profiles.</Text>
          ) : (
            <Picker
              selectedValue={selectedProfileId}
              onValueChange={(val) => {
                const profile = savedProfiles.find((p) => p.id === val);
                if (profile) loadProfile(profile);
              }}
              style={styles.picker}
              dropdownIconColor={colors.primary}
              itemStyle={{ color: colors.primary, height: 40 }}
            >
              <Picker.Item label="-- Select a profile --" value={null} />
              {savedProfiles.map((profile) => (
                <Picker.Item
                  key={profile.id}
                  label={profile.name}
                  value={profile.id}
                  color={colors.primary}
                />
              ))}
            </Picker>
          )}
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "main" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("main")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "main" && styles.activeTabButtonText,
            ]}
          >
            Main
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "wizard" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("wizard")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "wizard" && styles.activeTabButtonText,
            ]}
          >
            Setup Wizard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "profiles" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("profiles")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "profiles" && styles.activeTabButtonText,
            ]}
          >
            Profiles
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Contents */}
      {activeTab === "main" && <MainPage />}

      {activeTab === "wizard" && (
        <SetupWizard
          step={step}
          setStep={setStep}
          chairs={chairsList}
          ceilingLights={ceilingLightsList}
          ceilingLayout={ceilingLayout}
          setCeilingLayout={setCeilingLayout}
          profileName={profileName}
          setProfileName={setProfileName}
          saveProfileHandler={saveProfileHandler}
          navigateHome={() => setActiveTab("main")}
          savedProfiles={savedProfiles}
          chairConnectedMap={chairConnectedMap}
          setChairConnectedMap={setChairConnectedMap}
          chairLayoutMap={chairLayoutMap}
          setChairLayoutMap={setChairLayoutMap}
          lightConnectedMap={lightConnectedMap}
          setLightConnectedMap={setLightConnectedMap}
          lightLayoutMap={lightLayoutMap}
          setLightLayoutMap={setLightLayoutMap}
        />
      )}

      {activeTab === "profiles" && (
        <View style={styles.profilesContainer}>
          {savedProfiles.length === 0 ? (
            <Text style={styles.noProfilesText}>No profiles saved yet.</Text>
          ) : (
            <FlatList
              data={savedProfiles}
              keyExtractor={(item) => item.id}
              renderItem={renderProfileItem}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: "center" },
  activeTabButton: { borderBottomWidth: 3, borderBottomColor: colors.primary },
  tabButtonText: { fontSize: 16, color: colors.secondary },
  activeTabButtonText: { color: colors.primary, fontWeight: "bold" },

  mainContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  connectBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  connectBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  connectedContainer: { flexDirection: "row", alignItems: "center" },
  connectedText: { fontSize: 16, marginRight: 16, color: colors.primary },
  disconnectBtn: {
    backgroundColor: "#d9534f",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  disconnectBtnText: { color: "#fff", fontWeight: "bold" },

  selectProfileLabel: { marginTop: 24, fontSize: 16, color: colors.primary },
  picker: { width: 250, marginTop: 10, color: colors.primary },

  profilesContainer: { flex: 1, padding: 20 },
  noProfilesText: {
    color: colors.secondary,
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
  },
  profileName: { fontSize: 16, color: colors.primary, flex: 1 },
  profileButtons: { flexDirection: "row" },
  profileButton: {
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
