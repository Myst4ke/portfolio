import React, { useEffect, useState } from "react";
import { useI18n } from "./i18n.jsx";
import { Section, PageHeader, Pill, Dot, Chip, PrimaryButton } from "./components.jsx";
import { Reveal, CountUp, DonutChart, BarChart, HBar } from "./scroll-fx.jsx";
import { ArchitectureDiagram, MigrationTimeline, LineageGraph, BoundaryDiagram, ModulePipeline } from "./diagrams.jsx";

// Case studies, in display order. Each id maps to an i18n object under `cases`.
export const CASE_IDS = ["olaqin", "kereis"];

const TIMELINES = {
  olaqin: {
    fr: [
      { month:"Fév 25", title:"Bronze formalisé",         note:"Lakehouse · ingestion brute" },
      { month:"Mar 25", title:"CDC Type 2 / Silver",      note:"Historisation pilotée par métadonnées" },
      { month:"Sep 25", title:"Gold + BI",                note:"Exploitation & Marketing en Power BI" },
      { month:"Nov 25", title:"MDM Device",               note:"2ᵉ référentiel MDM (terminaux Vitale)" },
      { month:"Juil 26", title:"Souscriptions end-to-end", note:"1ʳᵉˢ souscriptions MDM en prod, push 4 SI" },
      { month:"Sep 26", title:"Reprise des données historiques", note:"L'historique des SI intégré au MDM" },
    ],
    en: [
      { month:"Feb 25", title:"Bronze formalised",        note:"Lakehouse · raw ingestion" },
      { month:"Mar 25", title:"CDC Type 2 / Silver",      note:"Metadata-driven historisation" },
      { month:"Sep 25", title:"Gold + BI",                note:"Exploitation & Marketing on Power BI" },
      { month:"Nov 25", title:"MDM Device",               note:"2nd MDM referential (Vitale terminals)" },
      { month:"Jul 26", title:"End-to-end subscriptions", note:"1st MDM subscriptions in prod, 4-system push" },
      { month:"Sep 26", title:"Historical data recovery", note:"Legacy history folded into the MDM" },
    ],
  },
  kereis: {
    fr: [
      { month:"Août 26", title:"Démarrage du build",     note:"Hexagone posé contre des bouchons" },
      { month:"Sep 26",  title:"Recevabilité en place",  note:"16 règles + matrice de complétude" },
      { month:"Sep 26",  title:"Interprétation branchée", note:"Appel Bedrock réel, sortie validée" },
      { month:"Oct 26",  title:"GO live visé",           note:"19/10 · les deux modules branchés" },
    ],
    en: [
      { month:"Aug 26", title:"Build starts",            note:"Hexagon laid against stubs" },
      { month:"Sep 26", title:"Admissibility in place",  note:"16 rules + completeness matrix" },
      { month:"Sep 26", title:"Interpretation wired",    note:"Real Bedrock call, output validated" },
      { month:"Oct 26", title:"Target go-live",          note:"19/10 · both modules wired" },
    ],
  },
};

function CaseSwitcher({ current, onSelect }) {
  const { t } = useI18n();
  return (
    <div style={{
      display:"inline-flex",background:"var(--soft)",borderRadius:999,padding:4,
      marginBottom:36,flexWrap:"wrap",gap:2
    }}>
      {CASE_IDS.map(id=>{
        const tab = t(`cases.${id}.tab`);
        const active = id === current;
        return (
          <button key={id} onClick={()=>onSelect(id)}
            style={{
              appearance:"none",border:"none",cursor:"pointer",
              background: active ? "var(--card)" : "transparent",
              boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              color: active ? "var(--ink)" : "var(--muted)",
              padding:"10px 18px",borderRadius:999,
              fontFamily:"Inter Tight",fontSize:14,fontWeight:500,
              display:"flex",alignItems:"baseline",gap:8,
              transition:"all 160ms ease"
            }}
            onMouseEnter={(e)=>{if(!active)e.currentTarget.style.color="var(--ink)"}}
            onMouseLeave={(e)=>{if(!active)e.currentTarget.style.color="var(--muted)"}}
          >
            <span style={{fontWeight:600,letterSpacing:"-0.01em"}}>{tab.client}</span>
            <span className="meta" style={{color:active?"var(--muted)":"inherit"}}>{tab.topic}</span>
          </button>
        );
      })}
    </div>
  );
}

export function CasePage({ caseId, setCaseId }) {
  const { t, lang } = useI18n();
  const id = CASE_IDS.includes(caseId) ? caseId : CASE_IDS[0];
  const c = t(`cases.${id}`);
  const other = CASE_IDS[(CASE_IDS.indexOf(id) + 1) % CASE_IDS.length];

  const meta = c.meta;
  const role = c.role;
  const steps = c.steps;
  const results = c.results;
  const costs = c.costs;
  const latency = c.latency;
  const capacities = c.capacities;

  const timelineItems = TIMELINES[id][lang] || TIMELINES[id].fr;

  // Switching study mid-page would otherwise leave the reader deep in the old one.
  useEffect(()=>{ window.scrollTo({ top:0, behavior:"instant" }); },[id]);

  return (
    <main>
      <Section style={{paddingTop:64}}>
        <CaseSwitcher current={id} onSelect={setCaseId} />
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,alignItems:"start"}}>
          <div style={{gridColumn:"span 8"}}>
            <div className="eyebrow">{c.eyebrow}</div>
            <h1 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:88,lineHeight:0.95,letterSpacing:"-0.04em",margin:"24px 0 0"}}>
              {c.titleA}<span style={{color:"var(--accent)"}}>{c.titleAccent}</span>{c.titleColon}<br/>
              {c.titleB}<br/>
              {c.titleC}<em style={{fontWeight:400}}>{c.titleEm}</em>{c.titleD}
            </h1>
            <p className="lead" style={{marginTop:28,maxWidth:680,fontSize:22,lineHeight:1.45}}>{c.lead}</p>
          </div>
          <div style={{gridColumn:"span 4"}}>
            <div style={{border:"1px solid var(--hair)",borderRadius:6,display:"grid",gridTemplateColumns:"1fr 1fr"}}>
              {meta.map((m,i)=>(
                <div key={i} style={{
                  padding:24,
                  borderRight: i%2===0 ? "1px solid var(--hair)":"none",
                  borderBottom: i<2 ? "1px solid var(--hair)":"none"
                }}>
                  <div className="meta">{m.l}</div>
                  <div style={{marginTop:10,fontSize:18,fontWeight:600,letterSpacing:"-0.01em"}}>{m.v}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:16,padding:"14px 18px",border:"1px solid var(--hair)",borderRadius:6,display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
              <span className="meta">{role.l}</span>
              <span style={{fontSize:14,fontWeight:500}}>{role.v}</span>
            </div>
          </div>
        </div>
      </Section>

      <Section style={{marginTop:96}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24}}>
          <div style={{gridColumn:"span 3"}}>
            <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{c.ctxEyebrow}</div>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
              {c.ctxTitleA}<em style={{fontWeight:400}}>{c.ctxTitleEm}</em>{c.ctxTitleB}
            </h2>
          </div>
          <div style={{gridColumn:"5 / span 8"}}>
            <div style={{columnCount:2,columnGap:32,fontSize:16,lineHeight:1.7,color:"var(--ink)"}}>
              <p style={{margin:"0 0 18px"}}>
                <span style={{float:"left",fontFamily:"Inter Tight",fontWeight:600,fontSize:72,lineHeight:0.85,color:"var(--accent)",marginRight:12,marginTop:8}}>{c.ctxDrop}</span>
                {c.ctxP1}
              </p>
              <p style={{margin:"0 0 18px",color:"var(--muted)"}}>{c.ctxP2}</p>
              <p style={{margin:"0",color:"var(--muted)"}}>{c.ctxP3}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section style={{marginTop:96}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,alignItems:"start"}}>
          <div style={{gridColumn:"span 3"}}>
            <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{c.archEyebrow}</div>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
              {c.archTitle}
            </h2>
            <p className="body" style={{marginTop:18,fontSize:15}}>{c.archLead}</p>
          </div>
          <div style={{gridColumn:"5 / span 8"}}>
            {id === "olaqin"
              ? <ArchitectureDiagram beforeLabel={c.archBefore} afterLabel={c.archAfter} />
              : <BoundaryDiagram lang={lang} />}
          </div>
        </div>
      </Section>

      <Section style={{marginTop:96}}>
        <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{c.timelineEyebrow}</div>
        <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:"0 0 24px",lineHeight:1.05}}>
          {c.timelineTitle}
        </h2>
        <MigrationTimeline items={timelineItems} />
      </Section>

      <Section style={{marginTop:96}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24}}>
          <div style={{gridColumn:"span 3"}}>
            <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{c.apprEyebrow}</div>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
              {c.apprTitleA}<br/>{c.apprTitleB}
            </h2>
            <p className="body" style={{marginTop:20,fontSize:15}}>{c.apprLead}</p>
          </div>
          <div style={{gridColumn:"5 / span 8"}}>
            <div style={{borderTop:"1px solid var(--hair)"}}>
              {steps.map((s,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"60px 1fr",gap:20,padding:"24px 0",borderBottom:"1px solid var(--hair)"}}>
                  <div className="mono" style={{fontSize:14,color:"var(--accent)",fontWeight:500,letterSpacing:".06em"}}>{s.n}</div>
                  <div>
                    <div style={{fontSize:22,fontWeight:600,letterSpacing:"-0.02em"}}>{s.t}</div>
                    <p style={{margin:"10px 0 0",fontSize:15,color:"var(--muted)",lineHeight:1.6}}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section style={{marginTop:96}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,alignItems:"start"}}>
          <div style={{gridColumn:"span 3"}}>
            <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{c.lineageEyebrow}</div>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
              {c.lineageTitle}
            </h2>
            <p className="body" style={{marginTop:18,fontSize:15}}>{c.lineageLead}</p>
          </div>
          <div style={{gridColumn:"5 / span 8"}}>
            {id === "olaqin" ? <LineageGraph /> : <ModulePipeline steps={c.pipeline} />}
          </div>
        </div>
      </Section>

      <section style={{background:"var(--soft)",marginTop:96,padding:"96px 0"}}>
        <div style={{maxWidth:1440,margin:"0 auto",padding:"0 36px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,marginBottom:48}}>
            <div style={{gridColumn:"span 3"}}>
              <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{c.resultsEyebrow}</div>
              <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
                {c.resultsTitleA}<em style={{fontWeight:400}}>{c.resultsTitleEm}</em>{c.resultsTitleB}
              </h2>
            </div>
            <div style={{gridColumn:"5 / span 8"}}>
              <p className="lead" style={{margin:0,maxWidth:560}}>{c.resultsLead}</p>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
            {results.map((r,i)=>(
              <Reveal key={i} delay={i*80}>
                <div style={{background:"var(--card)",border:"1px solid var(--hair)",borderRadius:6,padding:36}}>
                  <div style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:64,lineHeight:1,letterSpacing:"-0.04em",color:"var(--accent)"}}>
                    {r.prefix||""}<CountUp value={r.num} decimals={r.decimals||0} duration={1600}/>{r.suffix}
                  </div>
                  <div style={{marginTop:18,fontSize:15,fontWeight:500,color:"var(--ink)"}}>{r.l}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginTop:48,background:"var(--card)",border:"1px solid var(--hair)",borderRadius:6}}>
            <div style={{padding:36,borderRight:"1px solid var(--hair)"}}>
              <div className="eyebrow" style={{marginBottom:18}}>{c.costsTitle}</div>
              <DonutChart label="Total" total={100}
                segments={costs.map((s,i)=>({...s, color:["#169cdf","#15161a","#65686d","#cfd2d7"][i]||"#169cdf"}))}/>
            </div>
            <div style={{padding:36}}>
              <div className="eyebrow" style={{marginBottom:18}}>{c.latencyTitle}</div>
              <BarChart height={220} items={latency} accentIndex={id === "olaqin" ? 6 : 0}/>
              <div style={{marginTop:24,paddingTop:20,borderTop:"1px solid var(--hair)",display:"flex",flexDirection:"column",gap:14}}>
                {capacities.map((cap,i)=><HBar key={i} value={cap.v} label={cap.l}/>)}
              </div>
            </div>
          </div>

          {c.resultsNote && (
            <p className="body" style={{
              margin:"32px 0 0",maxWidth:760,fontSize:15,lineHeight:1.7,color:"var(--muted)"
            }}>{c.resultsNote}</p>
          )}
        </div>
      </section>

      <Section style={{marginTop:96}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24}}>
          <div style={{gridColumn:"span 3"}}>
            <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{c.stackEyebrow}</div>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
              {c.stackTitle}
            </h2>
            <p className="body" style={{marginTop:20,fontSize:15}}>{c.stackLead}</p>
          </div>
          <div style={{gridColumn:"5 / span 8"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
              {c.stackTags.map((tag,i)=>(
                <Chip key={i}>{tag}</Chip>
              ))}
            </div>
            <div style={{marginTop:36,paddingTop:24,borderTop:"1px solid var(--hair)",display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:16}}>
              <span className="meta">{c.nextLabel}</span>
              <button onClick={()=>setCaseId(other)}
                style={{
                  appearance:"none",border:"none",background:"transparent",cursor:"pointer",
                  padding:0,fontFamily:"Inter Tight",fontSize:14,fontWeight:500,
                  color:"var(--accent)",textAlign:"right",
                  borderBottom:"1px solid transparent",transition:"border-color 200ms"
                }}
                onMouseEnter={(e)=>e.currentTarget.style.borderBottomColor="var(--accent)"}
                onMouseLeave={(e)=>e.currentTarget.style.borderBottomColor="transparent"}
              >{c.nextValue}</button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgodrngn";

function ContactForm() {
  const { t } = useI18n();
  const subjects = t("contact.fSubjects");
  const timelines = t("contact.fTimelines");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState(subjects[0]);
  const [timeline, setTimeline] = useState(timelines[1]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(()=>{
    setSubject(subjects[0]);
    setTimeline(timelines[1]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[subjects[0]]);

  const submitForm = async (e) => {
    e?.preventDefault?.();
    if (status === "sending") return;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg(t("contact.fErrMissing"));
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `[${subject}] ${name}${company ? " · " + company : ""}`,
          _replyto: email,
          name, email, company, subject, timeline, message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.ok === true || data.ok === "true")) {
        setStatus("sent");
        setName(""); setEmail(""); setCompany(""); setMessage("");
        setSubject(subjects[0]); setTimeline(timelines[1]);
      } else {
        const errs = Array.isArray(data?.errors) ? data.errors.map(e=>e.message).join(" · ") : null;
        throw new Error(errs || "Submission failed");
      }
    } catch (err) {
      setErrorMsg(t("contact.fErrGeneric"));
      setStatus("error");
    }
  };

  const inputStyle = {
    appearance:"none",
    width:"100%",
    background:"var(--bg)",
    border:"1px solid var(--hair)",
    borderRadius:4,
    padding:"12px 14px",
    fontFamily:"Inter Tight",
    fontSize:14,
    color:"var(--ink)",
    transition:"border-color 160ms",
    outline:"none",
  };
  const labelStyle = { display:"block", marginBottom:8, fontSize:11, fontWeight:500, letterSpacing:".12em", textTransform:"uppercase", color:"var(--muted)" };

  const Segment = ({ value, options, onChange }) => (
    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
      {options.map(o=>{
        const active = o === value;
        return (
          <button key={o} type="button" onClick={()=>onChange(o)}
            style={{
              appearance:"none",cursor:"pointer",
              border:`1px solid ${active?"var(--ink)":"var(--hair)"}`,
              background: active ? "var(--ink)" : "transparent",
              color: active ? "var(--bg)" : "var(--ink)",
              borderRadius:999,padding:"6px 12px",
              fontFamily:"Inter Tight",fontSize:13,fontWeight:500,
              transition:"all 140ms"
            }}
          >{o}</button>
        );
      })}
    </div>
  );

  return (
    <div style={{
      background:"var(--card)",border:"1px solid var(--hair)",borderRadius:6,
      padding:36
    }}>
      <div className="eyebrow" style={{marginBottom:14}}>{t("contact.formEyebrow")}</div>
      <h3 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:28,letterSpacing:"-0.025em",margin:"0 0 10px",lineHeight:1.1}}>
        {t("contact.formTitle")}
      </h3>
      <p className="body" style={{margin:"0 0 28px",fontSize:15}}>{t("contact.formLead")}</p>

      <form onSubmit={submitForm} noValidate>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
          <div>
            <label style={labelStyle}>{t("contact.fName")}</label>
            <input style={inputStyle} value={name} onChange={e=>setName(e.target.value)}
              placeholder={t("contact.fNamePh")}
              onFocus={e=>e.target.style.borderColor="var(--accent)"}
              onBlur={e=>e.target.style.borderColor="var(--hair)"}/>
          </div>
          <div>
            <label style={labelStyle}>{t("contact.fEmail")}</label>
            <input type="email" style={inputStyle} value={email} onChange={e=>setEmail(e.target.value)}
              placeholder={t("contact.fEmailPh")}
              onFocus={e=>e.target.style.borderColor="var(--accent)"}
              onBlur={e=>e.target.style.borderColor="var(--hair)"}/>
          </div>
        </div>

        <div style={{marginTop:18}}>
          <label style={labelStyle}>{t("contact.fCompany")}</label>
          <input style={inputStyle} value={company} onChange={e=>setCompany(e.target.value)}
            placeholder={t("contact.fCompanyPh")}
            onFocus={e=>e.target.style.borderColor="var(--accent)"}
            onBlur={e=>e.target.style.borderColor="var(--hair)"}/>
        </div>

        <div style={{marginTop:18}}>
          <label style={labelStyle}>{t("contact.fSubject")}</label>
          <Segment value={subject} options={subjects} onChange={setSubject} />
        </div>

        <div style={{marginTop:18}}>
          <label style={labelStyle}>{t("contact.fTimeline")}</label>
          <Segment value={timeline} options={timelines} onChange={setTimeline} />
        </div>

        <div style={{marginTop:18}}>
          <label style={labelStyle}>{t("contact.fMessage")}</label>
          <textarea rows="5" style={{...inputStyle,resize:"vertical",lineHeight:1.5}}
            value={message} onChange={e=>setMessage(e.target.value)}
            placeholder={t("contact.fMessagePh")}
            onFocus={e=>e.target.style.borderColor="var(--accent)"}
            onBlur={e=>e.target.style.borderColor="var(--hair)"}/>
        </div>

        {/* Honeypot anti-bot (caché, lu par Formspree via name="_gotcha") */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off"
          style={{position:"absolute",left:"-9999px",opacity:0,pointerEvents:"none"}}/>

        <div style={{marginTop:24,display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
          <PrimaryButton onClick={submitForm} disabled={status==="sending"}>
            {status === "sending" ? t("contact.fSending")
              : status === "sent" ? t("contact.fSent")
              : t("contact.fSend")}
          </PrimaryButton>
          <span className="meta" style={{
            maxWidth:280,textAlign:"right",
            color: status==="error" ? "#c44" : status==="sent" ? "var(--accent)" : "var(--muted)"
          }}>
            {status === "error" ? errorMsg : status === "sent" ? t("contact.fSent") : t("contact.fHint")}
          </span>
        </div>
      </form>
    </div>
  );
}

export function ContactPage() {
  const { t } = useI18n();
  const meta = t("contact.meta");
  const colophon = t("contact.colophonItems");

  return (
    <main>
      <PageHeader section={t("contact.section")} title={t("contact.title")} />

      <Section>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,alignItems:"start",paddingTop:24}}>
          <div style={{gridColumn:"span 6"}}>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:80,lineHeight:0.95,letterSpacing:"-0.04em",margin:0}}>
              {t("contact.heroA")}<br/>
              <span style={{color:"var(--accent)"}}>{t("contact.heroB")}<em style={{fontWeight:400,color:"var(--accent)"}}>{t("contact.heroDot")}</em></span>
            </h2>
            <p className="lead" style={{marginTop:28,maxWidth:480}}>{t("contact.lead")}</p>
            <div style={{marginTop:32,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
              <Pill variant="accent">
                <Dot />
                <span>{t("common.available")}</span>
              </Pill>
              <span className="meta">{t("contact.formats")}</span>
            </div>
          </div>

          <div style={{gridColumn:"8 / span 5"}}>
            <div style={{background:"var(--card)",border:"1px solid var(--hair)",borderRadius:6}}>
              {meta.map((row,i,a)=>(
                <div key={i} style={{
                  display:"grid",gridTemplateColumns:"120px 1fr",gap:16,
                  padding:"22px 28px",
                  borderBottom: i<a.length-1 ? "1px solid var(--hair)":"none",
                  alignItems:"baseline"
                }}>
                  <div className="meta">{row.l}</div>
                  <div style={{fontSize:15,fontWeight:500}}>
                    {row.href ? (
                      <a href={row.href} target={row.href.startsWith("http")?"_blank":undefined} rel="noopener" style={{color:"var(--ink)",borderBottom:"1px solid transparent",transition:"border-color 200ms"}}
                         onMouseEnter={(e)=>e.currentTarget.style.borderBottomColor="var(--accent)"}
                         onMouseLeave={(e)=>e.currentTarget.style.borderBottomColor="transparent"}>{row.v}</a>
                    ) : row.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section style={{marginTop:96}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <ContactForm />
        </div>
      </Section>

      <Section style={{marginTop:96}}>
        <div className="mono meta" style={{marginBottom:18}}>{t("contact.colophon")}</div>
        <div style={{height:1,background:"var(--hair)"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,paddingTop:32}}>
          {colophon.map((row,i)=>(
            <div key={i} style={{gridColumn:"span 4"}}>
              <div className="meta" style={{marginBottom:8}}>{row.l}</div>
              <div style={{fontSize:18,fontWeight:500}}>{row.v}</div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
