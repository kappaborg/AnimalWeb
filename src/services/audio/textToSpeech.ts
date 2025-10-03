/**
 * Text-to-Speech Service
 * Uses the Web Speech API for offline audio pronunciation
 * 100% free and works offline after initial page load
 */

class TextToSpeechService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.synth = window.speechSynthesis;
    this.initVoices();
  }

  /**
   * Initialize available voices
   */
  private initVoices(): void {
    // Load voices
    this.voices = this.synth.getVoices();
    
    // Chrome loads voices asynchronously
    if (this.voices.length === 0) {
      this.synth.addEventListener('voiceschanged', () => {
        this.voices = this.synth.getVoices();
      });
    }
  }

  /**
   * Get the best voice for a given language
   */
  private getVoice(lang: string): SpeechSynthesisVoice | null {
    // Try to find a voice matching the exact language
    let voice = this.voices.find(v => v.lang === lang);
    
    // Fallback to partial match (e.g., en-US for en)
    if (!voice) {
      voice = this.voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    }
    
    // Prefer native voices
    if (voice) {
      const nativeVoice = this.voices.find(
        v => v.lang.startsWith(lang.split('-')[0]) && v.localService
      );
      if (nativeVoice) return nativeVoice;
    }
    
    return voice || null;
  }

  /**
   * Speak text with specified language
   */
  speak(text: string, lang: string = 'en-US', rate: number = 0.9): void {
    // Cancel any ongoing speech
    this.stop();

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Set voice if available
    const voice = this.getVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    // Error handling
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
    };

    this.synth.speak(utterance);
  }

  /**
   * Speak English word
   */
  speakEnglish(text: string, rate: number = 0.9): void {
    this.speak(text, 'en-US', rate);
  }

  /**
   * Speak Chinese word
   */
  speakChinese(text: string, rate: number = 0.9): void {
    this.speak(text, 'zh-CN', rate);
  }

  /**
   * Stop current speech
   */
  stop(): void {
    this.synth.cancel();
  }

  /**
   * Pause current speech
   */
  pause(): void {
    this.synth.pause();
  }

  /**
   * Resume paused speech
   */
  resume(): void {
    this.synth.resume();
  }

  /**
   * Check if speech is currently playing
   */
  isSpeaking(): boolean {
    return this.synth.speaking;
  }

  /**
   * Get available voices
   */
  getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  /**
   * Check if Text-to-Speech is supported
   */
  static isSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}

// Export singleton instance
export const ttsService = new TextToSpeechService();

export default ttsService;

