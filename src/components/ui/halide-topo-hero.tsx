"use client";

import React, { useEffect, useRef } from "react";

const HalideLanding: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;
      canvas.style.transform = `rotateX(${Math.max(0, 38 + y * 1.8)}deg) rotateZ(${-17 + x}deg)`;
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        const depth = (index + 1) * 15;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    canvas.style.opacity = "0";
    canvas.style.transform = "rotateX(90deg) rotateZ(0deg) scale(0.8)";
    const timeout = setTimeout(() => {
      canvas.style.transition = "all 2.5s cubic-bezier(0.16, 1, 0.3, 1)";
      canvas.style.opacity = "1";
      canvas.style.transform = "rotateX(55deg) rotateZ(-25deg) scale(1)";
    }, 300);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <style>{`
        .halide-wrap { background-color:#0a0a0a; color:#e0e0e0; font-family:'Montserrat',sans-serif; overflow:hidden; position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
        .halide-grain { position:absolute; inset:0; pointer-events:none; z-index:2; opacity:0.15; }
        .halide-viewport { perspective:2000px; width:100%; height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden; position:absolute; inset:0; }
        .halide-canvas { position:relative; width:800px; height:500px; transform-style:preserve-3d; transition:transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .halide-layer { position:absolute; inset:0; border:1px solid rgba(224,224,224,0.1); background-size:cover; background-position:center; transition:transform 0.5s ease; }
        .halide-l1 { background-image:url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200'); filter:grayscale(1) contrast(1.2) brightness(0.5); }
        .halide-l2 { background-image:url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200'); filter:grayscale(1) contrast(1.1) brightness(0.7); opacity:0.6; mix-blend-mode:screen; }
        .halide-l3 { background-image:url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200'); filter:grayscale(1) contrast(1.3) brightness(0.8); opacity:0.4; mix-blend-mode:overlay; }
        .halide-contours { position:absolute; width:300%; height:300%; top:-100%; left:-100%; background-image:repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 22px, rgba(255,255,255,0.12) 23px, transparent 24px); -webkit-mask-image:radial-gradient(circle at 50% 50%, black 25%, transparent 52%); mask-image:radial-gradient(circle at 50% 50%, black 25%, transparent 52%); transform:translateZ(-5px); pointer-events:none; }
        .halide-grid { position:absolute; inset:0; padding:4rem; display:grid; grid-template-columns:1fr 1fr; grid-template-rows:auto 1fr auto; z-index:55; pointer-events:none; }
        .halide-title { font-size:clamp(4rem,9vw,10rem); line-height:0.9; letter-spacing:-0.03em; mix-blend-mode:difference; font-style:italic; }
        .halide-sub { font-family:monospace; font-size:clamp(0.7rem,1.2vw,0.9rem); color:rgba(224,224,224,0.55); margin-top:1.2rem; max-width:520px; line-height:1.6; mix-blend-mode:difference; font-style:normal; }
        .halide-cta { pointer-events:auto; background:#ffffff; color:#0a0a0a; padding:1rem 2rem; text-decoration:none; font-weight:700; clip-path:polygon(0 0,100% 0,100% 70%,85% 100%,0 100%); transition:0.3s; cursor:pointer; display:inline-block; }
        .halide-cta:hover { background:#ff3c00; transform:translateY(-5px); }
        .halide-caption { position:absolute; bottom:-1.8rem; left:0; right:0; text-align:center; font-family:monospace; font-size:0.65rem; color:rgba(255,60,0,0.85); letter-spacing:0.12em; z-index:60; }
        .halide-scroll-hint { position:absolute; z-index:55; bottom:2.5rem; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:0.5rem; font-family:monospace; font-size:0.6rem; letter-spacing:0.18em; color:rgba(255,255,255,0.85); text-transform:uppercase; animation:halide-bob 2s ease-in-out infinite; cursor:pointer; }
        .halide-scroll-hint span { display:block; }
        .halide-scroll-hint .halide-arrow { font-size:1rem; color:#ff3c00; }
        @keyframes halide-bob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,700&display=swap" rel="stylesheet" />
      <div className="halide-wrap">
        <svg style={{ position:"absolute", width:0, height:0 }}>
          <filter id="halide-grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>
        <div className="halide-grain" style={{ filter:"url(#halide-grain-filter)" }} />
        <div className="halide-grid">
          <div style={{ fontWeight:700 }}>JAT_DIGITAL</div>
          <div style={{ textAlign:"right", fontFamily:"monospace", color:"#ff3c00", fontSize:"0.7rem" }}>
            <div>UPTIME: 24 / 7 / 365</div>
            <div>RESPONSE: &lt; 60 SEC</div>
          </div>
          <div style={{ gridColumn: "1/-1", alignSelf: "center" }}>
          <h1 className="halide-title">PUT <span style={{color:"#ff3c00"}}>AI</span><br />TO WORK.</h1>
          <p className="halide-sub">More leverage, less grind. Custom AI systems that help your business scale without you lifting a finger.</p>
        </div>
          <div style={{ gridColumn:"1/-1", display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
            <div style={{ fontFamily:"monospace", fontSize:"0.75rem" }}>
              <p>[ JAT DIGITAL — EST. 2026 ]</p>
              <p>AI SYSTEMS, BUILT AND HANDED OFF</p>
            </div>
            <a href="https://calendly.com/joelatorres1305/lets-chat" className="halide-cta">BOOK A CALL</a>
          </div>
        </div>
        <div className="halide-viewport">
          <div className="halide-canvas" ref={canvasRef}>
            <div className="halide-layer halide-l1" ref={(el) => { if (el) layersRef.current[0] = el; }} />
            <div className="halide-layer halide-l2" ref={(el) => { if (el) layersRef.current[1] = el; }} />
            <div className="halide-layer halide-l3" ref={(el) => { if (el) layersRef.current[2] = el; }} />
            <div className="halide-contours" />
            <div className="halide-caption">[ LIVE ] INBOUND CALL &rarr; QUALIFIED LEAD &middot; 2.4s</div>
          </div>
        </div>
        <div className="halide-scroll-hint"><span>scroll</span><span className="halide-arrow">↓</span></div>
      </div>
    </>
  );
};

export default HalideLanding;
