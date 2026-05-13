import React, { Fragment } from "react";
import { useI18n, computeExperienceMonths } from "./i18n.jsx";
import { Section, Dot, PrimaryButton } from "./components.jsx";
import { CountUp, DataPrintLive, Reveal } from "./scroll-fx.jsx";

// Flip to true once real testimonials are available in i18n (home.testimonials).
const SHOW_TESTIMONIALS = false;

function StatBand({ items }) {
  return (
    <div style={{
      display:"grid",gridTemplateColumns:`repeat(${items.length},1fr)`,
      border:"1px solid var(--hair)",borderRadius:6,marginTop:64
    }}>
      {items.map((it,i)=>(
        <div key={i} style={{padding:"36px 28px",borderLeft: i===0?"none":"1px solid var(--hair)"}}>
          <div style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:56,lineHeight:1,letterSpacing:"-0.04em"}}>
            <CountUp value={it.numeric} suffix={it.suffix||""} duration={1400}/>
          </div>
          <div className="meta" style={{marginTop:14}}>{it.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage({ setPage }) {
  const { t } = useI18n();
  const stats = t("home.stats");
  const projects = t("home.projects");
  const testimonials = t("home.testimonials");
  const featuredMeta = t("home.featuredMeta");

  // First stat (months on the ground) is computed live from EXPERIENCE_PERIODS.
  const monthsXP = computeExperienceMonths();
  const dynamicStats = stats.map((s, i) => i === 0 ? { ...s, numeric: monthsXP } : s);

  return (
    <main>
      <Section style={{paddingTop:64,paddingBottom:24}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,alignItems:"start"}}>
          <div style={{gridColumn:"span 7"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:10,
              background:"var(--soft)",borderRadius:999,padding:"8px 14px",fontSize:13,fontWeight:500}}>
              <Dot />
              <span>{t("common.available")}</span>
            </div>
            <h1 style={{
              fontFamily:"Inter Tight",fontWeight:600,
              fontSize:128,lineHeight:0.92,letterSpacing:"-0.045em",
              margin:"36px 0 0",color:"var(--ink)"
            }}>
              {t("home.heroL1a")}<span style={{color:"var(--accent)"}}>{t("home.heroAccent")}</span>{t("home.heroL1b")}<br/>
              {t("home.heroL2a")}<em style={{fontWeight:400,fontStyle:"italic"}}>{t("home.heroEm")}</em>
            </h1>
            <p className="lead" style={{maxWidth:540,marginTop:36}}>{t("home.lead")}</p>
            <div style={{display:"flex",gap:12,marginTop:36,alignItems:"center",flexWrap:"wrap"}}>
              <PrimaryButton onClick={()=>setPage("case")}>{t("common.viewCase")}</PrimaryButton>
              <a href="mailto:florianposezdarsonval@gmail.com" style={{
                fontSize:14,fontWeight:500,color:"var(--accent)",
                borderBottom:"1px solid var(--accent)",paddingBottom:2
              }}>florianposezdarsonval@gmail.com</a>
            </div>
          </div>

          <div style={{gridColumn:"span 5",paddingTop:8}}>
            <div style={{
              aspectRatio:"3/4",background:"var(--card)",border:"1px solid var(--hair)",borderRadius:6,
              padding:24,display:"flex",flexDirection:"column"
            }}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span className="mono meta">Fig. 01</span>
                <span className="mono meta">2026</span>
              </div>
              <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",margin:"16px 0"}}>
                <DataPrintLive />
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                paddingTop:16,borderTop:"1px solid var(--hair)"}}>
                <span className="mono" style={{fontSize:10,letterSpacing:".1em",color:"var(--muted)",textTransform:"uppercase"}}>Plate I - Pipelines · 2026</span>
                <span className="mono" style={{fontSize:10,letterSpacing:".1em",color:"var(--muted)",textTransform:"uppercase"}}>p.01</span>
              </div>
            </div>
          </div>
        </div>

        <StatBand items={dynamicStats} />
      </Section>

      <Section style={{marginTop:120}}>
        <div className="mono meta" style={{marginBottom:18}}>{t("common.currentEdition")}</div>
        <div style={{height:1,background:"var(--hair)"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,paddingTop:48}}>
          <div style={{gridColumn:"span 5"}}>
            <div className="eyebrow" style={{marginBottom:18}}>{t("home.featuredEyebrow")}</div>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:44,lineHeight:1.02,letterSpacing:"-0.035em",margin:0}}>
              {t("home.featuredTitleA")}<br/>
              <em style={{fontWeight:400}}>{t("home.featuredTitleEm")}</em>{t("home.featuredTitleB")}
            </h2>
            <p className="lead" style={{marginTop:24,maxWidth:460}}>{t("home.featuredLead")}</p>
            <div style={{marginTop:32}}>
              <PrimaryButton onClick={()=>setPage("case")}>{t("common.readCase")}</PrimaryButton>
            </div>
            <div className="meta" style={{marginTop:36,display:"flex",gap:24}}>
              {featuredMeta.map((m,i)=>(
                <Fragment key={i}>
                  <span>{m}</span>
                  {i<featuredMeta.length-1 && <span style={{color:"var(--hair)"}}>-</span>}
                </Fragment>
              ))}
            </div>
          </div>

          <div style={{gridColumn:"span 7"}}>
            <div style={{columnCount:2,columnGap:32,fontSize:16,lineHeight:1.65,color:"var(--ink)"}}>
              <p style={{margin:"0 0 18px"}}>
                <span style={{
                  float:"left",fontFamily:"Inter Tight",fontWeight:600,
                  fontSize:56,lineHeight:0.85,color:"var(--accent)",
                  marginRight:10,marginTop:6
                }}>{t("home.featuredP1Drop")}</span>
                {t("home.featuredP1")}
              </p>
              <p style={{margin:"0 0 18px",color:"var(--muted)"}}>{t("home.featuredP2")}</p>
              <p style={{margin:"0",color:"var(--muted)"}}>{t("home.featuredP3")}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section style={{marginTop:120}}>
        <div className="mono meta" style={{marginBottom:18}}>{t("common.otherWork")}</div>
        <div style={{height:1,background:"var(--hair)"}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginTop:40}}>
          {projects.map((p,i)=>{
            const cardStyle = {
              background:"var(--card)",border:"1px solid var(--hair)",borderRadius:6,
              padding:28,display:"flex",flexDirection:"column",gap:20,
              transition:"transform 220ms ease, border-color 220ms ease",cursor:"pointer",height:"100%",
              textDecoration:"none",color:"inherit"
            };
            const Inner = (
              <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span className="eyebrow">{p.tag}</span>
                  <span className="mono meta">{p.year}</span>
                </div>
                <h3 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:28,lineHeight:1.1,letterSpacing:"-0.025em",margin:0}}>{p.title}</h3>
                <p style={{fontSize:15,lineHeight:1.6,color:"var(--muted)",margin:0}}>{p.desc}</p>
                <div style={{marginTop:"auto",paddingTop:16,borderTop:"1px solid var(--hair)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span className="mono meta">No. 0{i+2}</span>
                  {p.href && <span style={{fontSize:13,color:"var(--accent)",fontWeight:500}}>{t("common.visit")}</span>}
                </div>
              </>
            );
            const onEnter = (e)=>{e.currentTarget.style.borderColor="var(--ink)"};
            const onLeave = (e)=>{e.currentTarget.style.borderColor="var(--hair)"};
            return (
              <Reveal key={i} delay={i*60} y={24}>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener" style={cardStyle}
                     onMouseEnter={onEnter} onMouseLeave={onLeave}>{Inner}</a>
                ) : (
                  <article style={cardStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>{Inner}</article>
                )}
              </Reveal>
            );
          })}
        </div>
      </Section>

      {SHOW_TESTIMONIALS && <Section style={{marginTop:120}}>
        <div className="mono meta" style={{marginBottom:18}}>{t("home.testimonialsEyebrow")}</div>
        <div style={{height:1,background:"var(--hair)"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,paddingTop:48}}>
          <div style={{gridColumn:"span 4"}}>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
              {t("home.testimonialsTitle")}
            </h2>
            <p className="body" style={{marginTop:18,fontSize:15}}>{t("home.testimonialsLead")}</p>
          </div>
          <div style={{gridColumn:"span 8",display:"flex",flexDirection:"column",gap:20}}>
            {testimonials.map((q,i)=>(
              <Reveal key={i} delay={i*80} y={20}>
                <figure style={{
                  margin:0,background:"var(--card)",border:"1px solid var(--hair)",borderRadius:6,
                  padding:32,display:"flex",gap:24,alignItems:"flex-start"
                }}>
                  <div style={{
                    fontFamily:"Inter Tight",fontWeight:600,fontSize:64,lineHeight:0.6,
                    color:"var(--accent)",flex:"0 0 40px"
                  }}>"</div>
                  <div style={{flex:1}}>
                    <blockquote style={{
                      margin:0,fontSize:19,lineHeight:1.5,letterSpacing:"-0.01em",
                      color:"var(--ink)",fontWeight:400
                    }}>{q.quote}</blockquote>
                    <figcaption style={{
                      marginTop:18,paddingTop:16,borderTop:"1px solid var(--hair)",
                      display:"flex",alignItems:"center",gap:14
                    }}>
                      <div style={{
                        width:36,height:36,borderRadius:999,background:"var(--soft)",
                        display:"grid",placeItems:"center",
                        fontSize:13,fontWeight:600,color:"var(--ink)",letterSpacing:"-0.01em",
                        flex:"0 0 36px"
                      }}>{q.name.split(' ').map(p=>p[0]).slice(0,2).join('')}</div>
                      <div>
                        <div style={{fontSize:14,fontWeight:600,letterSpacing:"-0.005em"}}>{q.name}</div>
                        <div className="meta" style={{marginTop:2}}>{q.role}</div>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>}
    </main>
  );
}
