// Shared: Logo, Header, Footer, primitives. i18n + theme aware.

import React, { Fragment } from "react";
import { useI18n, useTheme } from "./i18n.jsx";

export const PAGE_IDS = ["home","skills","exp","case","contact"];

export function Logo() {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 3, background: "var(--ink)",
      position: "relative", display: "grid", placeItems: "center",
      flex: "0 0 36px"
    }}>
      <span style={{
        color: "var(--bg)", fontFamily: "Inter Tight", fontWeight: 600,
        fontSize: 18, letterSpacing: "-0.02em", lineHeight: 1
      }}>F</span>
      <span style={{
        position: "absolute", right: 4, bottom: 4,
        width: 5, height: 5, borderRadius: 999, background: "var(--accent)"
      }} />
    </div>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      onClick={()=>setTheme(dark?"light":"dark")}
      title={dark ? "Light" : "Dark"}
      aria-label="Toggle theme"
      style={{
        appearance:"none",border:"1px solid var(--hair)",
        background:"transparent",cursor:"pointer",
        width:32,height:32,borderRadius:999,
        display:"grid",placeItems:"center",
        color:"var(--muted)",transition:"color 160ms"
      }}
      onMouseEnter={(e)=>e.currentTarget.style.color="var(--ink)"}
      onMouseLeave={(e)=>e.currentTarget.style.color="var(--muted)"}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M4.93 19.07l1.41-1.41 M17.66 6.34l1.41-1.41" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}

export function CVButton({ compact }) {
  const { lang } = useI18n();
  // Static PDFs in /public - replace placeholders with the real files.
  const file = lang === "en"
    ? `${import.meta.env.BASE_URL}cv-florian-posez-en.pdf`
    : `${import.meta.env.BASE_URL}cv-florian-posez-fr.pdf`;
  const label = lang === "en" ? "Download CV" : "Télécharger CV";
  return (
    <a href={file} target="_blank" rel="noopener"
      style={{
        display:"inline-flex",alignItems:"center",gap:6,
        border:"1px solid var(--hair)",borderRadius:999,
        padding: compact ? "6px 12px" : "8px 14px",
        fontSize:12,fontWeight:500,letterSpacing:".02em",
        color:"var(--muted)",transition:"all 160ms",
        whiteSpace:"nowrap"
      }}
      onMouseEnter={(e)=>{e.currentTarget.style.color="var(--ink)";e.currentTarget.style.borderColor="var(--ink)";}}
      onMouseLeave={(e)=>{e.currentTarget.style.color="var(--muted)";e.currentTarget.style.borderColor="var(--hair)";}}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span>{label}</span>
    </a>
  );
}

export function Header({ page, setPage }) {
  const { t, lang, setLang } = useI18n();
  const pages = PAGE_IDS.map(id => ({ id, label: t(`nav.${id}`) }));
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "color-mix(in oklab, var(--bg) 92%, transparent)",
      backdropFilter: "saturate(160%) blur(8px)",
      WebkitBackdropFilter: "saturate(160%) blur(8px)",
      borderBottom: "1px solid var(--hair)"
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "18px 36px",
        gap: 24,
        maxWidth: 1440, margin: "0 auto"
      }}>
        <div style={{display:"flex",alignItems:"center",gap:12,minWidth:0}}>
          <Logo />
          <div style={{lineHeight:1.2,minWidth:0}}>
            <div style={{fontSize:16,fontWeight:600,letterSpacing:"-0.01em"}}>Florian Posez</div>
            <div className="meta" style={{marginTop:2,letterSpacing:".06em"}}>{t("common.tagline")}</div>
          </div>
        </div>

        <nav style={{
          display: "flex", alignItems: "center", gap: 2,
          background: "var(--soft)", borderRadius: 999, padding: 4
        }}>
          {pages.map(p => {
            const active = p.id === page;
            return (
              <button
                key={p.id}
                onClick={() => setPage(p.id)}
                style={{
                  appearance: "none", border: "none", cursor: "pointer",
                  background: active ? "var(--card)" : "transparent",
                  boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                  color: active ? "var(--ink)" : "var(--muted)",
                  fontFamily: "Inter Tight",
                  fontSize: 14, fontWeight: 500,
                  padding: "8px 16px", borderRadius: 999,
                  transition: "all 160ms ease",
                  letterSpacing: "-0.005em"
                }}
                onMouseEnter={(e)=>{if(!active)e.currentTarget.style.color="var(--ink)"}}
                onMouseLeave={(e)=>{if(!active)e.currentTarget.style.color="var(--muted)"}}
              >{p.label}</button>
            );
          })}
        </nav>

        <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:14}}>
          <CVButton compact />
          <ThemeToggle />
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            {["fr","en"].map((l,i)=>(
              <Fragment key={l}>
                <button
                  onClick={()=>setLang(l)}
                  style={{
                    appearance:"none",border:"none",background:"transparent",cursor:"pointer",
                    fontFamily:"Inter Tight",fontSize:13,fontWeight:600,letterSpacing:".04em",
                    color: lang===l ? "var(--ink)" : "var(--muted)",
                    padding:"6px 4px"
                  }}
                >{l.toUpperCase()}</button>
                {i===0 && <span style={{color:"var(--hair)",fontSize:13}}>/</span>}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer style={{borderTop:"1px solid var(--hair)",marginTop:96}}>
      <div style={{
        display:"grid",gridTemplateColumns:"1fr 1fr 1fr",alignItems:"center",
        padding:"28px 36px",maxWidth:1440,margin:"0 auto",
        fontSize:12,color:"var(--muted)",letterSpacing:".02em"
      }}>
        <div>{t("footer.copyright")}</div>
        <div style={{textAlign:"center"}}>
          <a href="mailto:florianposezdarsonval@gmail.com" style={{color:"var(--muted)"}}
             onMouseEnter={(e)=>e.currentTarget.style.color="var(--ink)"}
             onMouseLeave={(e)=>e.currentTarget.style.color="var(--muted)"}>florianposezdarsonval@gmail.com</a>
        </div>
        <div style={{textAlign:"right"}}>
          <a href="https://linkedin.com/in/florian-posez" target="_blank" rel="noopener" style={{color:"var(--muted)"}}
             onMouseEnter={(e)=>e.currentTarget.style.color="var(--ink)"}
             onMouseLeave={(e)=>e.currentTarget.style.color="var(--muted)"}>linkedin.com/in/florian-posez ↗</a>
        </div>
      </div>
    </footer>
  );
}

export function Pill({ children, variant = "soft" }) {
  const styles = {
    soft: { background: "var(--soft)", color: "var(--ink)", border: "1px solid transparent" },
    accent: { background: "transparent", color: "var(--accent)", border: "1px solid var(--accent)" }
  }[variant];
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",gap:8,
      padding:"8px 14px",borderRadius:999,
      fontSize:13,fontWeight:500,letterSpacing:"-0.005em",
      ...styles
    }}>{children}</span>
  );
}

export function Dot({ color = "var(--accent)" }) {
  return <span style={{width:7,height:7,borderRadius:999,background:color,display:"inline-block",flex:"0 0 7px"}} />;
}

export function Chip({ children }) {
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",
      background:"var(--soft)",borderRadius:999,
      padding:"8px 14px",fontSize:14,fontWeight:500,
      color:"var(--ink)",letterSpacing:"-0.005em"
    }}>{children}</span>
  );
}

export function PrimaryButton({ children, onClick, as, href, ...rest }) {
  const style = {
    appearance:"none",border:"none",cursor:"pointer",
    background:"var(--ink)",color:"var(--bg)",
    borderRadius:999,padding:"14px 22px",
    fontFamily:"Inter Tight",fontSize:14,fontWeight:500,letterSpacing:"-0.005em",
    display:"inline-flex",alignItems:"center",gap:10,
    transition:"transform 200ms ease, background 200ms ease",
    textDecoration:"none"
  };
  if (as === "a") {
    return <a href={href} style={style} {...rest}>{children}</a>;
  }
  return (
    <button onClick={onClick} style={style} {...rest}
      onMouseEnter={(e)=>{e.currentTarget.style.opacity=0.85}}
      onMouseLeave={(e)=>{e.currentTarget.style.opacity=1}}
    >{children}</button>
  );
}

export function PageHeader({ section, title, kicker }) {
  return (
    <div style={{padding:"72px 36px 40px",maxWidth:1440,margin:"0 auto"}}>
      <div className="mono meta" style={{marginBottom:18}}>{section}</div>
      <h1 style={{
        fontFamily:"Inter Tight",fontWeight:600,
        fontSize:88,lineHeight:0.95,letterSpacing:"-0.04em",
        margin:0
      }}>{title}</h1>
      {kicker && <p className="lead" style={{maxWidth:560,marginTop:20}}>{kicker}</p>}
      <div style={{height:1,background:"var(--hair)",marginTop:48}} />
    </div>
  );
}

export function Section({ children, style }) {
  return (
    <section style={{padding:"0 36px",maxWidth:1440,margin:"0 auto",...style}}>
      {children}
    </section>
  );
}
