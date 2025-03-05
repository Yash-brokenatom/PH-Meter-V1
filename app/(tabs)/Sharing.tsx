import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

const manager = new BleManager();

export default function BLEScanner() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [deviceData, setDeviceData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestPermissions();
    return () => manager.destroy();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert("Permissions required", "Please allow Bluetooth and Location permissions.");
      }
    }
  };

  const scanDevices = async () => {
    setLoading(true);
    setDevices([]);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.warn(error);
        setLoading(false);
        return;
      }
      if (device && device.name) {
        setDevices((prevDevices) => {
          if (!prevDevices.some((d) => d.id === device.id)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });
    setTimeout(() => {
      manager.stopDeviceScan();
      setLoading(false);
    }, 10000);
  };

  const connectToDevice = async (device: Device) => {
    try {
      manager.stopDeviceScan();
      const connected = await manager.connectToDevice(device.id);
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);
      console.log("Connected to", connected.name);
      readData(connected);
    } catch (error) {
      console.warn("Connection failed", error);
    }
  };

  const readData = async (device: Device) => {
    try {
      const services = await device.services();
      for (const service of services) {
        const characteristics = await service.characteristics();
        for (const characteristic of characteristics) {
          if (characteristic.isReadable) {
            const data = await characteristic.read();
            setDeviceData(data.value);
          }
        }
      }
    } catch (error) {
      console.warn("Read failed", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={scanDevices} style={{ backgroundColor: "blue", padding: 15, borderRadius: 10, marginBottom: 10 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Scan for Devices</Text>
      </TouchableOpacity>
      <View style={{ width: '100%', backgroundColor: 'lightgray', borderRadius: 10, padding: 10, minHeight: 150 }}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : devices.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>No devices found</Text>
        ) : (
          <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => connectToDevice(item)} style={{ padding: 15, borderBottomWidth: 1, backgroundColor: 'white' }}>
                <Text>{item.name} ({item.id})</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        Status: {connectedDevice ? `Connected to ${connectedDevice.name}` : "Not Connected"}
      </Text>
      {deviceData && (
        <Text style={{ marginTop: 10, fontWeight: "bold" }}>Data: {deviceData}</Text>
      )}
    </View>
  );
}