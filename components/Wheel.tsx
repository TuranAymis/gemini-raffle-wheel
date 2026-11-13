
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { WheelSegment } from '../types';
import { audioManager } from '../utils/audio';
import { WHEEL_CHROME, WHEEL_PALETTE, labelColorFor, type WheelTheme } from './wheelPalette';

interface WheelProps {
  segments: WheelSegment[];
  onResult: (segment: WheelSegment) => void;
  spinning: boolean;
  setSpinning: (s: boolean) => void;
  labels: { spin: string; spinning: string };
  theme: WheelTheme;
}

/** Lets the page start a spin, e.g. from the Space key. */
export interface WheelHandle {
  spin: () => void;
}

const Wheel = forwardRef<WheelHandle, WheelProps>(({ segments, onResult, spinning, setSpinning, labels, theme }, ref) => {
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
    const palette = WHEEL_PALETTE[theme];
    const chrome = WHEEL_CHROME[theme];

    ctx.clearRect(0, 0, width, height);

    const sliceAngle = (2 * Math.PI) / (segments.length || 1);

    // Slices
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
      ctx.strokeStyle = palette.boundary;
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

    // Outer ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = chrome.ring;
    ctx.lineWidth = 10;
    ctx.stroke();

    // Hub: the spin button sits on top of it, at 16% of the wheel width
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = chrome.hub;
    ctx.fill();

    // Pointer at 3 o'clock
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

    ctx.fillStyle = chrome.pointer;
    ctx.fill();
    ctx.strokeStyle = chrome.pointerEdge;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }, [segments, spinning, theme]);

  const spin = useCallback(() => {
    if (spinning || segments.length === 0) return;

    // Optimized for a ~5 second energetic spin
    velocityRef.current = 0.5 + Math.random() * 0.2;
    setSpinning(true);
  }, [spinning, setSpinning, segments.length]);

  useImperativeHandle(ref, () => ({ spin }), [spin]);

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
    <div className="relative w-full max-w-[640px] mx-auto aspect-square">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="w-full h-full"
        onClick={() => !spinning && spin()}
      />
      <button
        type="button"
        onClick={spin}
        disabled={spinning || segments.length === 0}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[16%] aspect-square rounded-full font-display font-bold text-[11px] md:text-sm shadow-2 disabled:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        style={{ backgroundColor: WHEEL_CHROME[theme].hub, color: WHEEL_CHROME[theme].hubText }}
      >
        {spinning ? labels.spinning : labels.spin}
      </button>
    </div>
  );
});

export default Wheel;
