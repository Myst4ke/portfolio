import React, { useEffect, useState } from "react";
import { useI18n } from "./i18n.jsx";
import { Section, PageHeader, Pill, Dot, Chip, PrimaryButton } from "./components.jsx";
import { Reveal, CountUp, DonutChart, BarChart, HBar } from "./scroll-fx.jsx";
import { ArchitectureDiagram, MigrationTimeline, LineageGraph } from "./diagrams.jsx";

export function CasePage() {
  const { t, lang } = useI18n();
  const meta = t("case.meta");
  const role = t("case.role");
  const steps = t("case.steps");
  const results = t("case.results");
  const costs = t("case.costs");
  const latency = t("case.latency");
  const capacities = t("case.capacities");

  const timelineItems = lang === "en" ? [
    { month:"Feb 25", title:"Bronze formalised",        note:"Lakehouse · raw ingestion" },
    { month:"Mar 25", title:"CDC Type 2 / Silver",      note:"Historisation in production" },
    { month:"May 25", title:"Terraform IaC",            note:"Infrastructure as code" },
    { month:"Sep 25", title:"Gold + BI",                note:"Exploitation & Marketing on Power BI" },
    { month:"Nov 25", title:"MDM Device",               note:"2nd MDM domain (Vitale terminals)" },
    { month:"Apr 26", title:"End-to-end subscription",  note:"Full Sage cycle automated" },
  ] : [
    { month:"Fév 25", title:"Bronze formalisé",         note:"Lakehouse · ingestion brute" },
    { month:"Mar 25", title:"CDC Type 2 / Silver",      note:"Historisation en production" },
    { month:"Mai 25", title:"Terraform IaC",            note:"Infrastructure as code" },
    { month:"Sep 25", title:"Gold + BI",                note:"Exploitation & Marketing en Power BI" },
    { month:"Nov 25", title:"MDM Device",               note:"2ᵉ domaine MDM (terminaux Vitale)" },
    { month:"Avr 26", title:"Souscription end-to-end",  note:"Cycle complet Sage automatisé" },
  ];

  return (
    <main>
      <Section style={{paddingTop:64}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,alignItems:"start"}}>
          <div style={{gridColumn:"span 8"}}>
            <div className="eyebrow">{t("case.eyebrow")}</div>
            <h1 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:88,lineHeight:0.95,letterSpacing:"-0.04em",margin:"24px 0 0"}}>
              {t("case.titleA")}<span style={{color:"var(--accent)"}}>{t("case.titleAccent")}</span>{t("case.titleColon")}<br/>
              {t("case.titleB")}<br/>
              {t("case.titleC")}<em style={{fontWeight:400}}>{t("case.titleEm")}</em>{t("case.titleD")}
            </h1>
            <p className="lead" style={{marginTop:28,maxWidth:680,fontSize:22,lineHeight:1.45}}>{t("case.lead")}</p>
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
            <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{t("case.ctxEyebrow")}</div>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
              {t("case.ctxTitleA")}<em style={{fontWeight:400}}>{t("case.ctxTitleEm")}</em>{t("case.ctxTitleB")}
            </h2>
          </div>
          <div style={{gridColumn:"5 / span 8"}}>
            <div style={{columnCount:2,columnGap:32,fontSize:16,lineHeight:1.7,color:"var(--ink)"}}>
              <p style={{margin:"0 0 18px"}}>
                <span style={{float:"left",fontFamily:"Inter Tight",fontWeight:600,fontSize:72,lineHeight:0.85,color:"var(--accent)",marginRight:12,marginTop:8}}>{t("case.ctxDrop")}</span>
                {t("case.ctxP1")}
              </p>
              <p style={{margin:"0 0 18px",color:"var(--muted)"}}>{t("case.ctxP2")}</p>
              <p style={{margin:"0",color:"var(--muted)"}}>{t("case.ctxP3")}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section style={{marginTop:96}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,alignItems:"start"}}>
          <div style={{gridColumn:"span 3"}}>
            <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{t("case.archEyebrow")}</div>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
              {t("case.archTitle")}
            </h2>
            <p className="body" style={{marginTop:18,fontSize:15}}>{t("case.archLead")}</p>
          </div>
          <div style={{gridColumn:"5 / span 8"}}>
            <ArchitectureDiagram beforeLabel={t("case.archBefore")} afterLabel={t("case.archAfter")} />
          </div>
        </div>
      </Section>

      <Section style={{marginTop:96}}>
        <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{t("case.timelineEyebrow")}</div>
        <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:"0 0 24px",lineHeight:1.05}}>
          {t("case.timelineTitle")}
        </h2>
        <MigrationTimeline items={timelineItems} />
      </Section>

      <Section style={{marginTop:96}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24}}>
          <div style={{gridColumn:"span 3"}}>
            <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{t("case.apprEyebrow")}</div>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
              {t("case.apprTitleA")}<br/>{t("case.apprTitleB")}
            </h2>
            <p className="body" style={{marginTop:20,fontSize:15}}>{t("case.apprLead")}</p>
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
            <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{t("case.lineageEyebrow")}</div>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
              {t("case.lineageTitle")}
            </h2>
            <p className="body" style={{marginTop:18,fontSize:15}}>{t("case.lineageLead")}</p>
          </div>
          <div style={{gridColumn:"5 / span 8"}}>
            <LineageGraph />
          </div>
        </div>
      </Section>

      <section style={{background:"var(--soft)",marginTop:96,padding:"96px 0"}}>
        <div style={{maxWidth:1440,margin:"0 auto",padding:"0 36px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24,marginBottom:48}}>
            <div style={{gridColumn:"span 3"}}>
              <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{t("case.resultsEyebrow")}</div>
              <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
                {t("case.resultsTitleA")}<em style={{fontWeight:400}}>{t("case.resultsTitleEm")}</em>{t("case.resultsTitleB")}
              </h2>
            </div>
            <div style={{gridColumn:"5 / span 8"}}>
              <p className="lead" style={{margin:0,maxWidth:560}}>{t("case.resultsLead")}</p>
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
              <div className="eyebrow" style={{marginBottom:18}}>{t("case.costsTitle")}</div>
              <DonutChart label="Total" total={100}
                segments={costs.map((s,i)=>({...s, color:["#169cdf","#15161a","#65686d","#cfd2d7"][i]||"#169cdf"}))}/>
            </div>
            <div style={{padding:36}}>
              <div className="eyebrow" style={{marginBottom:18}}>{t("case.latencyTitle")}</div>
              <BarChart height={220} items={latency} accentIndex={4}/>
              <div style={{marginTop:24,paddingTop:20,borderTop:"1px solid var(--hair)",display:"flex",flexDirection:"column",gap:14}}>
                {capacities.map((c,i)=><HBar key={i} value={c.v} label={c.l}/>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section style={{marginTop:96}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24}}>
          <div style={{gridColumn:"span 3"}}>
            <div className="mono meta" style={{marginBottom:14,color:"var(--accent)"}}>{t("case.stackEyebrow")}</div>
            <h2 style={{fontFamily:"Inter Tight",fontWeight:600,fontSize:36,letterSpacing:"-0.03em",margin:0,lineHeight:1.05}}>
              {t("case.stackTitle")}
            </h2>
            <p className="body" style={{marginTop:20,fontSize:15}}>{t("case.stackLead")}</p>
          </div>
          <div style={{gridColumn:"5 / span 8"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
              {["Microsoft Fabric","Lakehouse","Delta Lake","PySpark","Spark SQL","Notebooks Fabric","Fabric Data Pipelines","Power BI · DirectLake","TMDL","Azure","Azure Key Vault","Azure DevOps","Logic Apps","Terraform","GraphQL","mTLS","OAuth2 / APIM"].map((tag,i)=>(
                <Chip key={i}>{tag}</Chip>
              ))}
            </div>
            <div style={{marginTop:36,paddingTop:24,borderTop:"1px solid var(--hair)",display:"flex",justifyContent:"space-between"}}>
              <span className="meta">{t("case.nextLabel")}</span>
              <a href="#" style={{fontSize:14,fontWeight:500,color:"var(--accent)"}}>{t("case.nextValue")}</a>
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
