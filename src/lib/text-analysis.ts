export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  avgWordLength: number;
  avgSentenceLength: number;
}

export function analyzeText(text: string): TextStats {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      avgWordLength: 0,
      avgSentenceLength: 0,
    };
  }

  const lines = trimmedText.split('\n');
  const lineCount = lines.length;

  const paragraphs = trimmedText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphCount = paragraphs.length;

  const words = trimmedText.match(/\b\w+\b/g) || [];
  const wordCount = words.length;

  const characters = trimmedText.length;
  const charactersNoSpaces = trimmedText.replace(/\s/g, '').length;

  const sentences = trimmedText.match(/[.!?]+(?:\s+|$)/g) || [];
  const sentenceCount = sentences.length || (wordCount > 0 ? 1 : 0);

  const avgWordLength = wordCount > 0
    ? words.reduce((sum, w) => sum + w.length, 0) / wordCount
    : 0;

  const avgSentenceLength = sentenceCount > 0
    ? wordCount / sentenceCount
    : 0;

  return {
    words: wordCount,
    characters,
    charactersNoSpaces,
    sentences: sentenceCount,
    paragraphs: paragraphCount,
    lines: lineCount,
    avgWordLength: Math.round(avgWordLength * 100) / 100,
    avgSentenceLength: Math.round(avgSentenceLength * 100) / 100,
  };
}

export interface ReadingTimeResult {
  readingTimeMinutes: number;
  readingTimeSeconds: number;
  speakingTimeMinutes: number;
  speakingTimeSeconds: number;
  totalWords: number;
  totalCharacters: number;
  estimatedFinishTime: Date;
}

export const READING_SPEED_PRESETS = [
  { id: 'very-slow', label: 'Very Slow (100 wpm)', wpm: 100, description: 'Complex technical content, learning new concepts' },
  { id: 'academic', label: 'Academic Paper (150 wpm)', wpm: 150, description: 'Dense academic papers, research articles' },
  { id: 'scientific', label: 'Scientific Journal (180 wpm)', wpm: 180, description: 'Scientific journals, highly technical material' },
  { id: 'general', label: 'General Reading (200 wpm)', wpm: 200, description: 'Average adult reading speed for general content' },
  { id: 'novel', label: 'Novel / Fiction (250 wpm)', wpm: 250, description: 'Fiction, novels, enjoyable reading' },
  { id: 'fast', label: 'Fast Reader (300 wpm)', wpm: 300, description: 'Experienced speed readers' },
  { id: 'custom', label: 'Custom WPM', wpm: 0, description: 'Set your own words per minute' },
] as const;

export const SPEAKING_SPEED_WPM = 130;

export function calculateReadingTime(
  wordCount: number,
  wpm: number
): ReadingTimeResult {
  const readingTimeMinutes = wordCount / wpm;
  const totalReadingSeconds = Math.round(readingTimeMinutes * 60);
  const readingMinutes = Math.floor(totalReadingSeconds / 60);
  const readingSeconds = totalReadingSeconds % 60;

  const speakingTimeMinutes = wordCount / SPEAKING_SPEED_WPM;
  const totalSpeakingSeconds = Math.round(speakingTimeMinutes * 60);
  const speakingMinutes = Math.floor(totalSpeakingSeconds / 60);
  const speakingSeconds = totalSpeakingSeconds % 60;

  const estimatedFinishTime = new Date(Date.now() + totalReadingSeconds * 1000);

  return {
    readingTimeMinutes: readingMinutes,
    readingTimeSeconds: readingSeconds,
    speakingTimeMinutes: speakingMinutes,
    speakingTimeSeconds: speakingSeconds,
    totalWords: wordCount,
    totalCharacters: 0,
    estimatedFinishTime,
  };
}

export function formatTime(minutes: number, seconds: number): string {
  if (minutes === 0) {
    return `${seconds}s`;
  }
  if (seconds === 0) {
    return `${minutes}m`;
  }
  return `${minutes}m ${seconds}s`;
}

export function formatFinishTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}