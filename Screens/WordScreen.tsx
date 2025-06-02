// 単語画面
import { playSound } from "../utils/soundPlayer";
import { mapPosToKanji } from "../utils/posToKanji";
import wordList from "../assets/jsonData/begginer_words.json";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

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
    const swipePixcel = event.translationX;
    if (swipePixcel > 100) {
      goToPreviousWord();
    } else if (swipePixcel < -100) {
      goToNextWord();
    }
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={handleSwipe}>
        <View style={styles.container}>
          <Text style={styles.word}>{word.word}</Text>
          {/* 品詞 */}
          <View style={styles.posCircle}>
            <Text style={styles.pos}>{mapPosToKanji(word.partOfSpeech)}</Text>
          </View>

          {/* 音声再生ボタン */}
          <View style={styles.audioButtons}>
            <TouchableOpacity
              onPress={() => playSound(word.audio?.us)}
              style={styles.audioButton}
            >
              <Text>🔊 US</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => playSound(word.audio?.uk)}
              style={styles.audioButton}
            >
              <Text>🔊 UK</Text>
            </TouchableOpacity>
          </View>

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
              <Text style={{ color: "gray" }}>{word.meanings[0].usage_ja}</Text>
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
  audioButtons: {
    flexDirection: "row",
    marginTop: 20,
    gap: 20,
  },
  audioButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  posCircle: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 999,
    padding: 4,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
  },
  pos: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});
