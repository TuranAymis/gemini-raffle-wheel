
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Participant, WheelSegment, SegmentType } from './types';
import Wheel from './components/Wheel';
import confetti from 'canvas-confetti';

const FIXED_SEGMENTS: WheelSegment[] = [
  { label: 'PAS', type: SegmentType.PASS, color: '#064e3b' }, // Dark Green
  { label: 'İFLAS', type: SegmentType.BANKRUPT, color: '#7f1d1d' }, // Dark Red
  { label: 'PAS', type: SegmentType.PASS, color: '#064e3b' },
  { label: 'İFLAS', type: SegmentType.BANKRUPT, color: '#7f1d1d' },
  { label: 'İFLAS', type: SegmentType.BANKRUPT, color: '#7f1d1d' },
];

const COLORS = [
  '#1e3a8a', '#4c1d95', '#831843', '#7c2d12', '#713f12', '#164e63', '#064e3b', '#312e81'
];

const SARCASTIC_PHRASES = [
  "Git iş bul",
  "Ezik",
  "Kovuldun",
  "Güle güle",
  "CV hazır mı?",
  "LinkedIn'e bak bari",
  "Neyse ki tazminat var",
  "Tazminatınla dondurma al",
  "Yarın gelme",
  "Hadi canım ikile",
  "Yazık oldu be",
  "Patronun selamı var",
  "Kutunu topla",
  "Zaten sevmezdik"
];

const FlashyPhrases: React.FC = () => {
  const [phrases, setPhrases] = useState<{ id: number; text: string; top: string; left: string; rotate: string }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPhrase = {
        id: nextId.current++,
        text: SARCASTIC_PHRASES[Math.floor(Math.random() * SARCASTIC_PHRASES.length)],
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        rotate: `${Math.random() * 30 - 15}deg`
      };
      setPhrases(prev => [...prev.slice(-5), newPhrase]);

      setTimeout(() => {
        setPhrases(prev => prev.filter(p => p.id !== newPhrase.id));
      }, 800);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[60]">
      {phrases.map(p => (
        <div
          key={p.id}
          className="absolute font-black text-red-500 uppercase italic text-3xl md:text-5xl animate-flash-phrase drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] whitespace-nowrap"
          style={{
            top: p.top,
            left: p.left,
            transform: `rotate(${p.rotate})`,
            zIndex: 60 + p.id % 10
          }}
        >
          {p.text}
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [result, setResult] = useState<WheelSegment | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    fetch('/participants.json')
      .then(res => res.json())
      .then(data => {
        const loaded: Participant[] = data.names.map((name: string, idx: number) => ({
          id: crypto.randomUUID(),
          name,
          color: COLORS[idx % COLORS.length]
        }));
        setParticipants(loaded);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load participants:', err);
        setLoading(false);
      });
  }, []);

  const wheelSegments = useMemo(() => {
    const participantSegments: WheelSegment[] = participants.map((p) => ({
      label: p.name,
      type: SegmentType.PARTICIPANT,
      color: p.color
    }));

    const combined: WheelSegment[] = [];
    const totalFixed = FIXED_SEGMENTS.length;
    const totalParticipants = participantSegments.length;

    if (totalParticipants === 0) return FIXED_SEGMENTS;

    const interval = Math.floor(totalParticipants / totalFixed) || 1;

    let pIdx = 0;
    let fIdx = 0;

    while (pIdx < totalParticipants || fIdx < totalFixed) {
      for (let i = 0; i < interval && pIdx < totalParticipants; i++) {
        combined.push(participantSegments[pIdx++]);
      }
      if (fIdx < totalFixed) {
        combined.push(FIXED_SEGMENTS[fIdx++]);
      }
    }

    return combined;
  }, [participants]);

  useEffect(() => {
    if (result && !isSpinning) {
      const duration = 4 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 35, spread: 360, ticks: 100, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 60 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [result, isSpinning]);

  const addParticipant = () => {
    if (!newName.trim()) return;
    const newParticipant: Participant = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      color: COLORS[participants.length % COLORS.length]
    };
    setParticipants([...participants, newParticipant]);
    setNewName('');
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const clearParticipants = () => {
    if (confirm('Bütün katılımcıları silmek istediğinize emin misiniz?')) {
      setParticipants([]);
    }
  };

  const handleResult = (segment: WheelSegment) => {
    setResult(segment);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-6xl mx-auto overflow-x-hidden">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 mb-4 uppercase tracking-tighter drop-shadow-2xl">
          KİM KOVULDU?
        </h1>
        <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-sm opacity-80">Geleceğin bu çarkın ucunda...</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
        <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
          <section className="bg-slate-900/50 p-6 rounded-3xl border border-white/10 backdrop-blur-sm shadow-xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              Katılımcı Ekle
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addParticipant()}
                placeholder="İsim..."
                className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 text-white placeholder:text-slate-500 transition-all"
              />
              <button
                onClick={addParticipant}
                className="bg-yellow-500 text-slate-900 font-bold px-6 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20"
              >
                Ekle
              </button>
            </div>
          </section>

          <section className="bg-slate-900/50 p-6 rounded-3xl border border-white/10 backdrop-blur-sm flex-1 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Katılımcılar ({participants.length})</h2>
              {participants.length > 0 && (
                <button
                  onClick={clearParticipants}
                  className="text-xs text-slate-500 hover:text-red-400 transition-colors uppercase font-bold tracking-wider"
                >
                  Tümünü Temizle
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {participants.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-600">
                  <svg className="w-12 h-12 mb-2 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 015.25-2.906z" /></svg>
                  <p className="italic text-sm">Katılımcı bekleniyor...</p>
                </div>
              ) : (
                participants.map((p) => (
                  <div key={p.id} className="group flex items-center justify-between bg-slate-800/50 p-3 rounded-xl hover:bg-slate-800/80 transition-all border border-white/5">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="shrink-0 w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: p.color }}></div>
                      <span className="font-semibold text-slate-200 truncate">{p.name}</span>
                    </div>
                    <button
                      onClick={() => removeParticipant(p.id)}
                      className="shrink-0 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-8 flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="relative p-6 md:p-12 bg-slate-900/30 rounded-full border border-white/5 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 rounded-full bg-red-600/10 blur-3xl -z-10 animate-pulse"></div>
            <Wheel
              segments={wheelSegments}
              onResult={handleResult}
              spinning={isSpinning}
              setSpinning={setIsSpinning}
            />
          </div>
        </div>
      </div>

      {result && !isSpinning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
          <FlashyPhrases />

          <div className="bg-slate-900 border-t-8 border-yellow-500 p-12 rounded-[3rem] text-center max-w-2xl w-full shadow-[0_20px_100px_rgba(0,0,0,1)] relative overflow-hidden animate-bounce-in z-50">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-yellow-500 blur-md opacity-60"></div>

            <h3 className="text-yellow-500 font-black uppercase tracking-[0.4em] text-2xl mb-8 drop-shadow-lg italic">
              KOVULDUN!
            </h3>

            <div
              className={`text-4xl md:text-6xl font-black mb-10 p-8 rounded-[2rem] whitespace-nowrap overflow-hidden text-ellipsis shadow-2xl transition-all ${result.type === SegmentType.BANKRUPT ? 'text-red-500 bg-red-500/10 border-2 border-red-500/20' :
                result.type === SegmentType.PASS ? 'text-green-500 bg-green-500/10 border-2 border-green-500/20' :
                  'text-white bg-slate-800/80 border-2 border-yellow-500/20'
                }`}
            >
              {result.label}
            </div>

            <div className="mb-12 space-y-4">
              {result.type === SegmentType.BANKRUPT && (
                <p className="text-red-500 italic text-3xl md:text-5xl font-black uppercase tracking-widest drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse">
                  "ŞİRKET BATTI!"
                </p>
              )}
              {result.type === SegmentType.PASS && (
                <p className="text-green-500 italic text-3xl md:text-5xl font-black uppercase tracking-widest drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                  "PAS! ŞANSLI GÜNÜNDESİN."
                </p>
              )}
              {result.type === SegmentType.PARTICIPANT && (
                <p className="text-white font-black text-3xl md:text-5xl uppercase tracking-[0.2em] italic drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  KADERİNE BOYUN EĞ!
                </p>
              )}
            </div>

            <button
              onClick={() => setResult(null)}
              className="group relative bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black py-6 px-20 rounded-full uppercase tracking-[0.3em] text-xl transition-all transform hover:scale-110 active:scale-95 shadow-[0_10px_40px_rgba(234,179,8,0.4)]"
            >
              <span className="relative z-10">KAPAT</span>
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      )}

      <footer className="mt-auto pt-12 text-slate-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 bg-slate-900/40 px-8 py-3 rounded-full border border-white/5">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-800 shadow-[0_0_8px_rgba(34,197,94,0.3)]"></span> 2 PAS Bölmesi
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-900 shadow-[0_0_8px_rgba(239,68,68,0.3)]"></span> 3 İFLAS Bölmesi
          </span>
        </div>
        <p className="opacity-40 tracking-[0.5em]">Kovulma Şansı • Destiny Engine</p>
      </footer>

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes flash-phrase {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); }
          20% { opacity: 1; transform: scale(1.1) translateY(0); }
          80% { opacity: 1; transform: scale(1) translateY(-10px); }
          100% { opacity: 0; transform: scale(0.8) translateY(-30px); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-flash-phrase {
          animation: flash-phrase 0.8s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
};

export default App;
