import { Audio } from "expo-av";

const soundFiles: Record<string, any> = {
  "apple_us.mp3": require("../assets/audio/apple_us.mp3"),
  "apple_uk.mp3": require("../assets/audio/apple_uk.mp3"),
  "banana_us.mp3": require("../assets/audio/banana_us.mp3"),
  "banana_uk.mp3": require("../assets/audio/banana_uk.mp3"),
};

export const playSound = async (fileName: string) => {
  const asset = soundFiles[fileName];

  if (!asset) {
    console.warn("対応していない音声ファイルです:", fileName);
    return;
  }

  // エラーキャッチ処理
  try {
    // 再生できるようにメモリに準備
    const { sound } = await Audio.Sound.createAsync(asset);

    // 実際に再生
    await sound.playAsync();
    
    // 再生完了を待ってからメモリを解放
    setTimeout(() => {
      sound.unloadAsync(); 
    }, 1000); 
  } catch (error) {
    console.error("音声再生に失敗しました:", error);
  }
};
