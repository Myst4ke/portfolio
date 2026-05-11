import React from "react";
import { useI18n } from "./i18n.jsx";
import { Section, PageHeader, Chip } from "./components.jsx";
import { Reveal, DonutChart } from "./scroll-fx.jsx";

export function SkillsPage() {
  const { t } = useI18n();
  const cats = t("skills.cats");
  const formation = t("skills.formation");
  const donut = t("skills.donut");

  return (
    <main>
      <PageHeader section={t("skills.section")} title={t("skills.title")} kicker={t("skills.kicker")} />

      <Section>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
          {cats.map((c,i)=>(
            <Reveal key={i} delay={i*80} y={22}>
              <div style={{border:"1px solid var(--hair)",borderRadius:6,padding:32,background:"var(--card)",height:"100%"}}>
                <div style={{display:"flex",alignItems:"baseline",gap:14,marginBottom:24}}>
                  <span className="mono" style={{fontSize:14,color:"var(--accent)",fontWeight:500,letterSpacing:".06em"}}>{c.num}</span>
                  <h3 style={{margin:0,fontSize:22,fontWeight:600,letterSpacing:"-0.02em"}}>{c.name}</h3>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {c.chips.map((ch,j)=><Chip key={j}>{ch}</Chip>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section style={{marginTop:96}}>
        <div className="mono meta" style={{marginBottom:18}}>{t("skills.formationEyebrow")}</div>
        <div style={{height:1,background:"var(--hair)"}}/>
        <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:"40px 0 24px"}}>
          {t("skills.formationTitle")}
        </h2>
        <div style={{borderTop:"1px solid var(--hair)"}}>
          {formation.map((row,i)=>(
            <div key={i} style={{
              display:"grid",gridTemplateColumns:"180px 1fr 1fr",gap:24,
              alignItems:"baseline",padding:"24px 0",borderBottom:"1px solid var(--hair)"
            }}>
              <div className="mono meta">{row.period}</div>
              <div style={{fontSize:20,fontWeight:600,letterSpacing:"-0.015em"}}>{row.school}</div>
              <div style={{fontSize:15,color:"var(--muted)"}}>{row.degree}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section style={{marginTop:96}}>
        <div className="mono meta" style={{marginBottom:18}}>{t("skills.timeAllocEyebrow")}</div>
        <div style={{height:1,background:"var(--hair)",marginBottom:40}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,alignItems:"start"}}>
          <div style={{gridColumn:"span 4"}}>
            <h3 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:32,letterSpacing:"-0.025em",margin:0,lineHeight:1.05}}>
              {t("skills.timeAllocTitle1")}<em style={{fontWeight:400}}>{t("skills.timeAllocTitleEm")}</em>{t("skills.timeAllocTitle2")}
            </h3>
            <p className="body" style={{marginTop:18,fontSize:15}}>{t("skills.timeAllocLead")}</p>
          </div>
          <div style={{gridColumn:"span 8"}}>
            <div style={{background:"var(--card)",border:"1px solid var(--hair)",borderRadius:6,padding:36}}>
              <DonutChart
                label={t("skills.timeAllocTitleEm")}
                total={100}
                segments={donut.map((s,i)=>({
                  ...s,
                  color: ["#169cdf","#15161a","#65686d","#9aa0a6","#cfd2d7"][i] || "#169cdf"
                }))}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section style={{marginTop:96}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24}}>
          <div style={{gridColumn:"span 4"}}>
            <div className="eyebrow" style={{marginBottom:14}}>{t("skills.methodEyebrow")}</div>
            <h3 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:32,letterSpacing:"-0.025em",margin:0,lineHeight:1.05}}>
              {t("skills.methodTitle")}
            </h3>
          </div>
          <div style={{gridColumn:"span 8"}}>
            <p className="body" style={{margin:0,fontSize:17}}>{t("skills.methodBody")}</p>
          </div>
        </div>
      </Section>
    </main>
  );
}

export function ExperiencePage() {
  const { t } = useI18n();
  const xp = t("exp.items");
  const talks = t("exp.talks");

  return (
    <main>
      <PageHeader section={t("exp.section")} title={t("exp.title")} kicker={t("exp.kicker")} />

      <Section>
        <div style={{borderTop:"1px solid var(--hair)"}}>
          {xp.map((e,i)=>(
            <Reveal key={i} delay={i*70} y={20}>
              <div style={{
                display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,
                padding:"40px 0",borderBottom:"1px solid var(--hair)"
              }}>
                <div style={{gridColumn:"span 2"}}>
                  <div className="mono" style={{fontSize:14,color:"var(--accent)",fontWeight:500,letterSpacing:".06em"}}>{e.num}</div>
                  <div className="mono meta" style={{marginTop:14}}>{e.period}</div>
                  <div className="mono meta" style={{marginTop:6}}>{e.city}</div>
                </div>
                <div style={{gridColumn:"span 4"}}>
                  <h3 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:32,lineHeight:1.05,letterSpacing:"-0.03em",margin:0}}>{e.company}</h3>
                  <div className="body" style={{marginTop:8,fontSize:16}}>{e.role}</div>
                </div>
                <div style={{gridColumn:"span 6"}}>
                  <p style={{margin:0,fontSize:16,lineHeight:1.6,color:"var(--ink)"}}>{e.summary}</p>
                  <ul style={{margin:"18px 0 0",padding:0,listStyle:"none"}}>
                    {e.bullets.map((b,j)=>(
                      <li key={j} style={{display:"flex",gap:12,padding:"6px 0",fontSize:15,lineHeight:1.55,color:"var(--muted)"}}>
                        <span style={{color:"var(--accent)",fontWeight:500,flex:"0 0 auto"}}>-</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section style={{marginTop:64}}>
        <div className="mono meta" style={{marginBottom:18}}>{t("exp.offstageEyebrow")}</div>
        <div style={{height:1,background:"var(--hair)"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,paddingTop:32}}>
          <div style={{gridColumn:"span 4"}}>
            <h3 style={{fontSize:24,fontWeight:600,letterSpacing:"-0.02em",margin:0}}>{t("exp.offstageTitle")}</h3>
          </div>
          <div style={{gridColumn:"span 8"}}>
            {talks.map((row,i)=>(
              <div key={i} style={{
                display:"grid",gridTemplateColumns:"80px 1fr auto",gap:24,
                padding:"16px 0",borderBottom:"1px solid var(--hair)",alignItems:"baseline"
              }}>
                <span className="mono meta">{row.y}</span>
                <span style={{fontSize:16,fontWeight:500}}>{row.t}</span>
                {row.href ? (
                  <a href={row.href} target="_blank" rel="noopener" className="meta"
                     style={{textAlign:"right",color:"var(--muted)",transition:"color 160ms"}}
                     onMouseEnter={(e)=>e.currentTarget.style.color="var(--accent)"}
                     onMouseLeave={(e)=>e.currentTarget.style.color="var(--muted)"}>{row.v}</a>
                ) : (
                  <span className="meta" style={{textAlign:"right"}}>{row.v}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
