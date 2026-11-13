
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { WheelSegment, SegmentType } from '../types';
import { audioManager } from '../utils/audio';
import { WHEEL_PALETTE, labelColorFor } from './wheelPalette';

interface WheelProps {
  segments: WheelSegment[];
  onResult: (segment: WheelSegment) => void;
  spinning: boolean;
  setSpinning: (s: boolean) => void;
  labels: { spin: string; spinning: string; hint: string };
}

const Wheel: React.FC<WheelProps> = ({ segments, onResult, spinning, setSpinning, labels }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTickSegmentRef = useRef(-1);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 30;

    ctx.clearRect(0, 0, width, height);

    const sliceAngle = (2 * Math.PI) / (segments.length || 1);

    // Draw slices
    segments.forEach((segment, i) => {
      const startAngle = i * sliceAngle + rotationRef.current;
      const endAngle = (i + 1) * sliceAngle + rotationRef.current;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = segment.color;
      ctx.fill();

      // Slice boundary: 2px, so neighboring colors stay apart
      ctx.strokeStyle = WHEEL_PALETTE.dark.boundary;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text: dark or white, whichever reads better on this slice
      const labelColor = labelColorFor(segment.color);
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = labelColor;

      // Responsive font size, never below 12px
      const fontSize = segments.length > 20 ? 12 : 16;
      ctx.font = `bold ${fontSize}px sans-serif`;
      // The shadow only helps white text; on dark text it would blur the letters
      ctx.shadowBlur = labelColor === '#FFFFFF' ? 6 : 0;
      ctx.shadowColor = 'rgba(0,0,0,0.8)';

      // Trim long labels
      const label = segment.label.length > 15 ? segment.label.substring(0, 13) + '..' : segment.label;
      // A label is left out when its slice is too narrow to hold the text (many slices): the full names stay in the list.
      const arcWidth = sliceAngle * (radius - 40);
      if (arcWidth >= fontSize * 1.4) ctx.fillText(label, radius - 40, fontSize / 3);
      ctx.restore();
    });

    // Outer Ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Inner Circle / Center Point
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Shiny center effect
    ctx.beginPath();
    ctx.arc(centerX - 8, centerY - 8, 12, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fill();

    // --- Pointer Logic ---
    let vibrateX = 0;
    let vibrateY = 0;
    if (spinning && velocityRef.current > 0) {
      const intensity = Math.min(velocityRef.current * 20, 6);
      vibrateX = (Math.random() - 0.5) * intensity;
      vibrateY = (Math.random() - 0.5) * intensity;
    }

    ctx.save();
    ctx.translate(centerX + radius + 15 + vibrateX, centerY + vibrateY);

    ctx.beginPath();
    ctx.moveTo(-25, 0);
    ctx.lineTo(15, -15);
    ctx.lineTo(5, 0);
    ctx.lineTo(15, 15);
    ctx.closePath();

    ctx.fillStyle = '#facc15';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(5, 0);
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.stroke();

    ctx.restore();

  }, [segments, spinning]);

  const spin = useCallback(() => {
    if (spinning || segments.length === 0) return;

    // Optimized for a ~5 second energetic spin
    velocityRef.current = 0.5 + Math.random() * 0.2;
    setSpinning(true);
  }, [spinning, setSpinning, segments.length]);

  useEffect(() => {
    let animationId: number;

    const update = () => {
      if (spinning) {
        rotationRef.current += velocityRef.current;

        // Deceleration Phases - Tuned for a 5-second total duration with a tense finish
        if (velocityRef.current > 0.1) {
          velocityRef.current *= 0.992; // Fast phase
        } else if (velocityRef.current > 0.03) {
          velocityRef.current *= 0.985; // Noticeable slow down
        } else if (velocityRef.current > 0.002) {
          velocityRef.current *= 0.970; // Final suspenseful crawl
        } else {
          velocityRef.current = 0;
          setSpinning(false);

          const sliceAngle = (2 * Math.PI) / (segments.length || 1);
          const normalizedRotation = (2 * Math.PI - (rotationRef.current % (2 * Math.PI))) % (2 * Math.PI);
          const index = Math.floor(normalizedRotation / sliceAngle);

          audioManager.playWin();
          onResult(segments[index % segments.length]);
        }

        const sliceAngle = (2 * Math.PI) / (segments.length || 1);
        const normalizedRotation = (2 * Math.PI - (rotationRef.current % (2 * Math.PI))) % (2 * Math.PI);
        const currentSegment = Math.floor(normalizedRotation / sliceAngle);

        if (currentSegment !== lastTickSegmentRef.current) {
          if (velocityRef.current > 0) {
            audioManager.playTick();
          }
          lastTickSegmentRef.current = currentSegment;
        }
      }

      draw();
      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, [spinning, segments, onResult, draw, setSpinning]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className={`max-w-full h-auto drop-shadow-[0_0_50px_rgba(0,0,0,0.7)] transition-transform duration-500 ${!spinning ? 'hover:scale-[1.03]' : ''}`}
          onClick={() => !spinning && spin()}
        />
        {!spinning && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-red-600/20 text-red-500 px-8 py-3 rounded-full border border-red-500/50 backdrop-blur-md font-black uppercase tracking-[0.3em] text-lg shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              {labels.hint}
            </div>
          </div>
        )}
      </div>

      {!spinning && (
        <button
          onClick={spin}
          className="mt-12 px-16 py-6 bg-gradient-to-b from-red-500 to-red-800 hover:from-red-400 hover:to-red-700 text-white font-black rounded-full text-4xl uppercase tracking-[0.3em] transition-all transform hover:scale-110 active:scale-90 shadow-[0_15px_40px_rgba(239,68,68,0.4)] border-b-8 border-red-950"
        >
          {labels.spin}
        </button>
      )}

      {spinning && (
        <div className="mt-12 h-[88px] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-3">
            <span className="w-5 h-5 rounded-full bg-red-600 animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-5 h-5 rounded-full bg-red-600 animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-5 h-5 rounded-full bg-red-600 animate-bounce"></span>
          </div>
          <span className="text-red-500 font-black tracking-[0.5em] text-xs animate-pulse">{labels.spinning}</span>
        </div>
      )}
    </div>
  );
};

export default Wheel;
