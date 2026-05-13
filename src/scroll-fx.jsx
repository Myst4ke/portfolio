// Scroll-driven animation primitives.
// useScrollProgress(ref) returns 0..1 as the element traverses the viewport.
// useInViewProgress(ref) returns 0..1 once the element enters, then sticks at 1.

import React, { useEffect, useRef, useState } from "react";

export function useScrollProgress(ref, { start = 0.95, end = 0.25 } = {}) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const vh = window.innerHeight || 800;
      const topFrac = r.top / vh;
      const v = (start - topFrac) / (start - end);
      setP(Math.max(0, Math.min(1, v)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, start, end]);
  return p;
}

export function useInViewProgress(ref, { threshold = 0.2, duration = 1200 } = {}) {
  const [p, setP] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const t0 = performance.now();
          const tick = (t) => {
            const k = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - k, 3);
            setP(eased);
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold, duration]);
  return p;
}

export function Reveal({ children, delay = 0, y = 18, style }) {
  const ref = useRef(null);
  const p = useInViewProgress(ref, { threshold: 0.15, duration: 900 });
  return (
    <div ref={ref} style={{
      opacity: p,
      transform: `translateY(${(1 - p) * y}px)`,
      transition: "none",
      transitionDelay: `${delay}ms`,
      ...style
    }}>{children}</div>
  );
}

export function CountUp({ value, suffix = "", duration = 1400, decimals = 0 }) {
  const ref = useRef(null);
  const p = useInViewProgress(ref, { threshold: 0.4, duration });
  const v = value * p;
  return (
    <span ref={ref}>
      {decimals === 0 ? Math.round(v) : v.toFixed(decimals)}
      <span style={{color:"var(--muted)",fontWeight:400}}>{suffix}</span>
    </span>
  );
}

export function DonutChart({ segments, label, total }) {
  const wrapRef = useRef(null);
  const p = useScrollProgress(wrapRef, { start: 0.9, end: 0.45 });
  const sum = segments.reduce((a, s) => a + s.value, 0);
  const R = 120, r = 78, cx = 150, cy = 150;
  const C = 2 * Math.PI * R;

  let acc = 0;
  return (
    <div ref={wrapRef} style={{display:"flex",gap:36,alignItems:"center"}}>
      <div style={{position:"relative",width:300,height:300,flex:"0 0 300px"}}>
        <svg viewBox="0 0 300 300" style={{width:"100%",height:"100%"}}>
          <circle cx={cx} cy={cy} r={R} fill="none"
            stroke="var(--soft)" strokeWidth={R - r} />
          {segments.map((s, i) => {
            const frac = s.value / sum;
            const len = C * frac;
            const visible = Math.max(0, Math.min(1, (p - acc / sum) / Math.max(0.0001, frac))) * len;
            const node = (
              <circle key={i}
                cx={cx} cy={cy} r={R}
                fill="none"
                stroke={s.color}
                strokeWidth={R - r}
                strokeDasharray={`${visible} ${C}`}
                strokeDashoffset={-(C * (acc / sum)) + 0}
                transform={`rotate(-90 ${cx} ${cy})`}
                style={{transition:"stroke-dasharray 60ms linear"}}
              />
            );
            acc += s.value;
            return node;
          })}
          <circle cx={cx} cy={cy} r={r} fill="var(--card)" stroke="var(--hair)" strokeWidth="1"/>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--hair)" strokeWidth="1"/>
        </svg>
        <div style={{
          position:"absolute",inset:0,display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",pointerEvents:"none"
        }}>
          <div className="mono meta" style={{color:"var(--muted)"}}>{label}</div>
          <div style={{
            fontFamily:"Inter Tight",fontWeight:600,fontSize:42,
            letterSpacing:"-0.03em",lineHeight:1,marginTop:6
          }}>
            {Math.round(p * (total ?? sum))}
            <span style={{fontSize:18,color:"var(--muted)",fontWeight:400,marginLeft:2}}>%</span>
          </div>
        </div>
      </div>

      <div style={{flex:1,display:"flex",flexDirection:"column",gap:14}}>
        {segments.map((s,i)=>{
          const segStart = segments.slice(0,i).reduce((a,x)=>a+x.value,0)/sum;
          const segFrac = s.value/sum;
          const sp = Math.max(0, Math.min(1, (p - segStart) / segFrac));
          return (
            <div key={i} style={{
              display:"grid",gridTemplateColumns:"14px 1fr auto",gap:14,
              alignItems:"baseline",
              padding:"12px 0",borderBottom:"1px solid var(--hair)"
            }}>
              <span style={{width:10,height:10,borderRadius:2,background:s.color,display:"inline-block",alignSelf:"center"}}/>
              <span style={{fontSize:15,fontWeight:500}}>{s.label}</span>
              <span className="mono" style={{fontSize:14,color:"var(--ink)",fontWeight:500,fontVariantNumeric:"tabular-nums"}}>
                {Math.round(sp * s.value)}<span style={{color:"var(--muted)"}}>%</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function BarChart({ items, height = 260, accentIndex = -1 }) {
  const ref = useRef(null);
  const p = useScrollProgress(ref, { start: 0.9, end: 0.5 });
  const max = Math.max(...items.map(i=>i.value));
  return (
    <div ref={ref} style={{position:"relative"}}>
      <div style={{position:"relative",height,padding:"0 4px"}}>
        {[0.25,0.5,0.75,1].map((g,i)=>(
          <div key={i} style={{
            position:"absolute",left:0,right:0,bottom:`${g*100}%`,
            borderTop:"1px dashed var(--hair)"
          }}>
            <span className="mono" style={{
              position:"absolute",right:0,top:-9,fontSize:10,color:"var(--muted)",
              background:"var(--card)",padding:"0 4px"
            }}>{Math.round(max*g)}</span>
          </div>
        ))}
        <div style={{
          position:"absolute",inset:0,display:"flex",alignItems:"flex-end",
          gap:12,paddingRight:36
        }}>
          {items.map((it,i)=>{
            const targetH = (it.value / max) * height;
            const h = targetH * Math.max(0, Math.min(1, (p - i*0.04) / (1 - i*0.04)));
            const isAccent = accentIndex === -1 ? (i % 2 === 1) : (i === accentIndex);
            return (
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                <div style={{
                  width:"100%",
                  height: h,
                  background: isAccent ? "var(--accent)" : "var(--ink)",
                  borderRadius:"3px 3px 0 0",
                  transition:"height 80ms linear"
                }}/>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{display:"flex",gap:12,paddingRight:36,marginTop:10}}>
        {items.map((it,i)=>(
          <div key={i} style={{flex:1,textAlign:"center"}}>
            <div className="mono meta" style={{whiteSpace:"nowrap"}}>{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DataPrintLive() {
  const ref = useRef(null);

  // Intro reveal: one-shot at mount, ramps from 0 to 1 over 1.8s.
  // Long enough for the three sequenced phases (bars, curve, dots) to be readable.
  const p = useInViewProgress(ref, { threshold: 0.05, duration: 1800 });

  // Continuous breathing kicks in once intro reveal is mostly done.
  const breathe = Math.max(0, Math.min(1, (p - 0.85) / 0.15));
  const breatheOn = breathe > 0.01;

  // RAF time loop for the breathing oscillation, only when needed.
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!breatheOn) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      setT((now - t0) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [breatheOn]);

  const lines = [];
  for (let i=0;i<14;i++) lines.push(
    <line key={"l"+i} x1="40" y1={60 + i*22} x2="420" y2={60 + i*22}
      stroke="var(--hair)" strokeWidth="0.6" />
  );
  const pts = [
    [50,310],[100,300],[150,280],[200,240],
    [250,260],[300,200],[350,150],[410,90]
  ];
  const dots = [pts[1],pts[3],pts[4],pts[5],pts[7]];

  const path = pts.reduce((acc,pt,i)=>{
    if (i===0) return `M ${pt[0]} ${pt[1]}`;
    const prev = pts[i-1];
    const cx = (prev[0]+pt[0])/2;
    return acc + ` Q ${cx} ${prev[1]} ${cx} ${(prev[1]+pt[1])/2} T ${pt[0]} ${pt[1]}`;
  },"");

  const heights = [22,34,18,42,28,46,24,38,30];

  const PATH_LEN = 700;

  // Sequenced reveal phases (chorégraphie A):
  //   0.00 → 0.30 : bars cascade left → right
  //   0.30 → 0.70 : curve draws
  //   0.70 → 1.00 : dots pop one by one, last one with a halo
  const clamp01 = v => Math.max(0, Math.min(1, v));
  const curveP = clamp01((p - 0.30) / 0.40);

  // Breathing modulations - amplified for visibility.
  const curveBreathe = breathe * 0.55 * Math.sin(t * 1.8);
  const strokeW = 2.4 + curveBreathe;

  // Halo pulse on the last dot (continuous after reveal).
  const haloPhase = 0.5 + 0.5 * Math.sin(t * 1.4);
  const haloR = 12 + breathe * 10 * haloPhase;
  const haloOpacity = breathe * 0.35 * (1 - haloPhase);

  return (
    <svg ref={ref} viewBox="0 0 460 460" style={{width:"100%",height:"100%",display:"block"}}>
      {lines}

      {/* Phase 1: bars cascade (0 → 0.30) */}
      {heights.map((h,i)=>{
        const phase = i / (heights.length - 1); // 0..1
        const start = phase * 0.20;             // last bar starts at 0.20
        const dur = 0.10;                       // each bar grows over 0.10
        const localP = clamp01((p - start) / dur);
        const wave = breathe * 0.14 * Math.sin(t * 2.4 + i * 0.55);
        const scaledH = Math.max(0, h * localP * (1 + wave));
        const barY = 380, barH = 50;
        return (
          <rect key={"b"+i}
            x={50 + i*40} y={barY + (barH - scaledH)} width={26} height={scaledH}
            fill={i%2===0 ? "var(--ink)" : "var(--accent)"} />
        );
      })}

      {/* Phase 2: curve draws (0.30 → 0.70), then breathing stroke width */}
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth={strokeW}
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={PATH_LEN}
        strokeDashoffset={PATH_LEN * (1 - curveP)}
        style={{transition:"stroke-dashoffset 80ms linear"}}
      />

      {/* Phase 3: dots pop (0.70 → 1.00), last dot wrapped in halo */}
      {dots.map((d,i)=>{
        const phase = i / (dots.length - 1);  // 0..1
        const start = 0.70 + phase * 0.20;    // staggered between 0.70 and 0.90
        const dur = 0.10;
        const localP = clamp01((p - start) / dur);
        const sinPhase = Math.sin(t * 2.6 + i * 1.1);
        const ringR = 9 + breathe * 3.2 * sinPhase;
        const ringOpacity = localP * (0.5 + 0.5 * breathe * (0.5 + 0.5 * sinPhase));
        const isLast = i === dots.length - 1;
        return (
          <g key={"d"+i} style={{
            opacity: localP,
            transform:`scale(${localP})`,
            transformOrigin:`${d[0]}px ${d[1]}px`,
            transition:"opacity 120ms linear"
          }}>
            {isLast && (
              <circle cx={d[0]} cy={d[1]} r={haloR} fill="none"
                stroke="var(--accent)" strokeWidth="1"
                style={{opacity: haloOpacity}} />
            )}
            <circle cx={d[0]} cy={d[1]} r={ringR} fill="none"
              stroke="var(--accent)" strokeWidth="1.4"
              style={{opacity: ringOpacity}} />
            <circle cx={d[0]} cy={d[1]} r="3.2" fill="var(--ink)"/>
          </g>
        );
      })}
    </svg>
  );
}

export function HBar({ value, max = 100, label, suffix = "%", color = "var(--accent)" }) {
  const ref = useRef(null);
  const p = useScrollProgress(ref, { start: 0.9, end: 0.55 });
  return (
    <div ref={ref}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
        <span style={{fontSize:14,fontWeight:500}}>{label}</span>
        <span className="mono" style={{fontSize:13,color:"var(--muted)",fontVariantNumeric:"tabular-nums"}}>
          {Math.round((value*p))}{suffix}
        </span>
      </div>
      <div style={{height:6,background:"var(--soft)",borderRadius:999,overflow:"hidden"}}>
        <div style={{
          height:"100%",
          width:`${(value/max)*100*p}%`,
          background:color,
          transition:"width 80ms linear"
        }}/>
      </div>
    </div>
  );
}

export function PageScrollBar() {
  const [p, setP] = useState(0);
  useEffect(()=>{
    const tick = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return ()=>{
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  },[]);
  return (
    <div style={{
      position:"fixed",top:0,left:0,right:0,height:2,zIndex:60,
      background:"transparent",pointerEvents:"none"
    }}>
      <div style={{
        height:"100%",width:`${p*100}%`,background:"var(--accent)",
        transition:"width 80ms linear"
      }}/>
    </div>
  );
}
