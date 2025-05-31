// screens/WordScreen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

// 仮データ
const wordList = [
  {
    word: "apple",
    partOfSpeech: "noun",
    phonetics: { us: "/ˈæp.əl/", uk: "/ˈæp.l̩/" },
    meanings: [
      {
        ja: "リンゴ（果物）",
        usage: "I ate an apple for breakfast.",
        usage_ja: "私は朝食にリンゴを食べた。",
      },
    ],
  },
  {
    word: "banana",
    partOfSpeech: "noun",
    phonetics: { us: "/bəˈnæn.ə/", uk: "/bəˈnɑː.nə/" },
    meanings: [
      {
        ja: "バナナ",
        usage: "He peeled a banana.",
        usage_ja: "彼はバナナの皮をむいた。",
      },
    ],
  },
];

export default function WordScreen() {
  const [index, setIndex] = useState(0);
  const word = wordList[index];

  // ループ処理
  const goToNextWord = () => {
    const newIndex = (index + 1) % wordList.length;
    setIndex(newIndex);
  };

  // ループ処理
  const goToPreviousWord = () => {
    const newIndex = (index - 1 + wordList.length) % wordList.length;
    setIndex(newIndex);
  };

  const handleSwipe = Gesture.Pan().onUpdate((event) => {
    const spx = event.translationX;
    if (spx > 50) {
      goToPreviousWord();
    } else if (spx < -50) {
      goToNextWord();
    }
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={handleSwipe}>
        <View style={styles.container}>
          <Text style={styles.word}>{word.word}</Text>
          <Text style={styles.part}>{word.partOfSpeech}</Text>
          <Text style={styles.phonetic}>US: {word.phonetics.us}</Text>
          <Text style={styles.phonetic}>UK: {word.phonetics.uk}</Text>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  word: { fontSize: 40, fontWeight: "bold" },
  part: { fontSize: 20, marginVertical: 10, color: "#1E90FF" },
  phonetic: { fontSize: 18 },
});
