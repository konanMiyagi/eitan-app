import React from "react";
import { SafeAreaView } from "react-native";
import WordScreen from "./Screens/WordScreen";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WordScreen />
    </SafeAreaView>
  );
}