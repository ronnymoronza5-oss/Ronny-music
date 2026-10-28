import { Song, SynthTrackType } from './types';

class AudioEngine {
  private audioCtx: AudioContext | null = null;
  private currentHtmlAudio: HTMLAudioElement | null = null;
  private isPlayingAudio: boolean = false;
  private currentSong: Song | null = null;
  private volume: number = 0.8;
  private currentTime: number = 0;
  private duration: number = 180; // default 3 min
  private timerInterval: any = null;
  private synthLoopTimeout: any = null;

  // Listeners
  private onTimeUpdateCb: ((time: number, dur: number) => void) | null = null;
  private onStateChangeCb: ((isPlaying: boolean) => void) | null = null;
  private onEndedCb: (() => void) | null = null;

  private initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setCallbacks(
    onTimeUpdate: (time: number, dur: number) => void,
    onStateChange: (isPlaying: boolean) => void,
    onEnded: () => void
  ) {
    this.onTimeUpdateCb = onTimeUpdate;
    this.onStateChangeCb = onStateChange;
    this.onEndedCb = onEnded;
  }

  public playSong(song: Song) {
    this.stop();
    this.currentSong = song;
    this.duration = song.duration || 180;
    this.currentTime = 0;
    this.isPlayingAudio = true;
    this.notifyState();

    if (song.audioUrl) {
      // Play real HTML5 Audio (e.g., user uploaded audio file or blob URL)
      try {
        this.currentHtmlAudio = new Audio(song.audioUrl);
        this.currentHtmlAudio.volume = this.volume;
        this.currentHtmlAudio.play().catch((err) => {
          console.warn('HTML Audio play error, falling back to synth:', err);
          this.playSynthLoop(song.synthTrackType || 'ambient');
        });

        this.currentHtmlAudio.ontimeupdate = () => {
          if (this.currentHtmlAudio) {
            this.currentTime = this.currentHtmlAudio.currentTime;
            this.duration = this.currentHtmlAudio.duration || this.duration;
            this.notifyTime();
          }
        };

        this.currentHtmlAudio.onended = () => {
          this.stop();
          if (this.onEndedCb) this.onEndedCb();
        };
      } catch (e) {
        console.error('Audio init error:', e);
        this.playSynthLoop(song.synthTrackType || 'ambient');
      }
    } else {
      // Play generated melodic Web Audio track (royalty-free, zero-cost, self-contained)
      this.initAudioContext();
      this.playSynthLoop(song.synthTrackType || 'synthwave');
      this.startTimer();
    }
  }

  private startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.isPlayingAudio) {
        this.currentTime += 0.5;
        this.notifyTime();

        if (this.currentTime >= this.duration) {
          this.stop();
          if (this.onEndedCb) this.onEndedCb();
        }
      }
    }, 500);
  }

  private playSynthLoop(type: SynthTrackType) {
    if (!this.audioCtx || !this.isPlayingAudio) return;

    try {
      const now = this.audioCtx.currentTime;
      const masterGain = this.audioCtx.createGain();
      masterGain.gain.setValueAtTime(this.volume * 0.25, now);
      masterGain.connect(this.audioCtx.destination);

      // Scale chords based on musical style
      let chordNotes: number[] = [220, 261.63, 329.63, 392.0]; // A minor
      if (type === 'synthwave') {
        chordNotes = [130.81, 196.0, 246.94, 293.66]; // C major / Dm synth
      } else if (type === 'jazz') {
        chordNotes = [174.61, 220.0, 261.63, 311.13]; // Fmaj7 / Dm7
      } else if (type === 'afrobeat') {
        chordNotes = [196.0, 246.94, 293.66, 369.99]; // Gmaj / Bm
      } else if (type === 'lofi') {
        chordNotes = [164.81, 196.0, 246.94, 293.66]; // E minor 7
      }

      // Generate 4-measure harmonic chords with soft envelope
      chordNotes.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        osc.type = type === 'synthwave' ? 'sawtooth' : type === 'lofi' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(type === 'lofi' ? 700 : 1600, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.05 / (idx + 1), now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 4);
      });

      // Subtle percussive tick/groove for Afrobeat & Synthwave
      if (type === 'afrobeat' || type === 'synthwave') {
        const beatTimes = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5];
        beatTimes.forEach((bTime, i) => {
          if (!this.audioCtx) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(i % 2 === 0 ? 90 : 180, now + bTime);
          gain.gain.setValueAtTime(0.04, now + bTime);
          gain.gain.exponentialRampToValueAtTime(0.001, now + bTime + 0.15);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(now + bTime);
          osc.stop(now + bTime + 0.2);
        });
      }

      // Schedule next bar
      if (this.isPlayingAudio) {
        this.synthLoopTimeout = setTimeout(() => {
          if (this.isPlayingAudio) {
            this.playSynthLoop(type);
          }
        }, 3900);
      }
    } catch (e) {
      console.warn('Synth generation exception:', e);
    }
  }

  public pause() {
    this.isPlayingAudio = false;
    if (this.currentHtmlAudio) {
      this.currentHtmlAudio.pause();
    }
    if (this.synthLoopTimeout) {
      clearTimeout(this.synthLoopTimeout);
      this.synthLoopTimeout = null;
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.notifyState();
  }

  public resume() {
    if (!this.currentSong) return;
    this.isPlayingAudio = true;
    this.notifyState();

    if (this.currentHtmlAudio) {
      this.currentHtmlAudio.play().catch(console.error);
    } else {
      this.initAudioContext();
      this.playSynthLoop(this.currentSong.synthTrackType || 'synthwave');
      this.startTimer();
    }
  }

  public seek(seconds: number) {
    this.currentTime = Math.max(0, Math.min(seconds, this.duration));
    if (this.currentHtmlAudio) {
      this.currentHtmlAudio.currentTime = this.currentTime;
    }
    this.notifyTime();
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentHtmlAudio) {
      this.currentHtmlAudio.volume = this.volume;
    }
  }

  public stop() {
    this.isPlayingAudio = false;
    if (this.currentHtmlAudio) {
      this.currentHtmlAudio.pause();
      this.currentHtmlAudio.src = '';
      this.currentHtmlAudio = null;
    }
    if (this.synthLoopTimeout) {
      clearTimeout(this.synthLoopTimeout);
      this.synthLoopTimeout = null;
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.notifyState();
  }

  private notifyTime() {
    if (this.onTimeUpdateCb) {
      this.onTimeUpdateCb(this.currentTime, this.duration);
    }
  }

  private notifyState() {
    if (this.onStateChangeCb) {
      this.onStateChangeCb(this.isPlayingAudio);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlayingAudio;
  }

  public getCurrentSong(): Song | null {
    return this.currentSong;
  }

  public getCurrentTime(): number {
    return this.currentTime;
  }

  public getDuration(): number {
    return this.duration;
  }
}

export const audioEngine = new AudioEngine();
