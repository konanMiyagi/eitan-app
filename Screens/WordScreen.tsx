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
  const [isExpanded, setIsExpanded] = useState(false);
  const word = wordList[index];

  // アコーディオンアクション処理
  const toggleAccordion = () => setIsExpanded(!isExpanded);

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

  // スワイパー処理
  const handleSwipe = Gesture.Pan().onEnd((event) => {
    const spx = event.translationX;
    if (spx > 100) {
      goToPreviousWord();
    } else if (spx < -100) {
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
          {/* 意味・例文表示アコーディオン */}
          <TouchableOpacity onPress={toggleAccordion}>
            <Text style={styles.toggleText}>
              {isExpanded ? "▲ 詳細を隠す" : "▼ 詳細を見る"}
            </Text>
          </TouchableOpacity>
          {isExpanded && (
            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>
                意味：{word.meanings[0].ja}
              </Text>
              <Text>英文：{word.meanings[0].usage}</Text>
              <Text style={{ color: "gray" }}>
                和訳：{word.meanings[0].usage_ja}
              </Text>
            </View>
          )}
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
  toggleText: {
    marginTop: 30,
    fontSize: 18,
    color: "#007AFF",
  },
  detailBox: {
    marginTop: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  detailTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
