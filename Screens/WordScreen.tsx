// screens/WordScreen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// 今は仮データとして1単語
const wordList = [
  {
    word: "apple",
    partOfSpeech: "noun",
    phonetics: {
      us: "/ˈæp.əl/",
      uk: "/ˈæp.l̩/",
    },
    meanings: [
      {
        ja: "リンゴ（果物）",
        usage: "I ate an apple for breakfast.",
        usage_ja: "私は朝食にリンゴを食べた。",
      },
    ],
  },
];

export default function WordScreen() {
  const [index, setIndex] = useState(0);
  const word = wordList[index];

  return (
    <View style={styles.container}>
      <Text style={styles.word}>{word.word}</Text>
      <Text style={styles.part}>{word.partOfSpeech}</Text>
      <Text style={styles.phonetic}>US: {word.phonetics.us}</Text>
      <Text style={styles.phonetic}>UK: {word.phonetics.uk}</Text>

      <TouchableOpacity onPress={() => setIndex((index + 1) % wordList.length)}>
        <Text style={{ marginTop: 20 }}>➡️ 次の単語へ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  word: { fontSize: 40, fontWeight: "bold" },
  part: { fontSize: 20, marginVertical: 10, color: "#1E90FF" },
  phonetic: { fontSize: 18 },
});
