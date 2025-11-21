"use client";

import Link from "next/link";
import { CSSProperties, useMemo } from "react";
const confettiColors = ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"];

type ConfettiPiece = {
     id: number;
     left: string;
     delay: string;
     duration: string;
     size: string;
     color: string;
     opacity: number;
     drift: string;
     rotateMid: string;
     rotateEnd: string;
};

type ConfettiPieceStyle = CSSProperties & {
     "--confetti-drift"?: string;
     "--confetti-rotate-mid"?: string;
     "--confetti-rotate-end"?: string;
};

const generateConfettiPieces = (): ConfettiPiece[] =>
     Array.from({ length: 60 }, (_, index) => {
          const left = `${Math.random() * 100}%`;
          const delay = `${(Math.random() * 2).toFixed(2)}s`;
          const duration = `${(4 + Math.random() * 4).toFixed(2)}s`;
          const size = `${(6 + Math.random() * 8).toFixed(1)}px`;
          const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
          const opacity = 0.4 + Math.random() * 0.5;
          const drift = `${(Math.random() * 70 - 35).toFixed(1)}vw`;
          const rotateMid = `${Math.floor(Math.random() * 360)}deg`;
          const rotateEnd = `${Math.floor(Math.random() * 720)}deg`;

          return { id: index, left, delay, duration, size, color, opacity, drift, rotateMid, rotateEnd };
     });

export default function CelebratePage() {
     const confettiPieces = useMemo(() => generateConfettiPieces(), []);

     return (
          <div className="confetti-page">
               <div className="confetti-container" aria-hidden="true">
                    {confettiPieces.map((piece) => (
                         <span
                              key={piece.id}
                              className="confetti-piece"
                              style={{
                                   left: piece.left,
                                   animationDelay: piece.delay,
                                   animationDuration: piece.duration,
                                   width: piece.size,
                                   height: piece.size,
                                   backgroundColor: piece.color,
                                   opacity: piece.opacity,
                                   "--confetti-drift": piece.drift,
                                   "--confetti-rotate-mid": piece.rotateMid,
                                   "--confetti-rotate-end": piece.rotateEnd,
                              } as ConfettiPieceStyle}
                         />
                    ))}
               </div>
               <div className="confetti-message">
                    <h1>Celebrate!</h1>
                    <p>Enjoy a quick confetti break before heading back.</p>
                    <Link href="/" className="button celebrate">
                         Return Home
                    </Link>
               </div>
          </div>
     );
}
