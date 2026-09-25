// Architecture diagram (interactive), Timeline (scroll), Lineage (hover).

import React, { useRef, useState } from "react";
import { useScrollProgress } from "./scroll-fx.jsx";

export function ArchitectureDiagram({ beforeLabel, afterLabel }) {
  const [side, setSide] = useState("after");
  const [active, setActive] = useState(null);

  // 8 SI / sources préexistants chez Olaqin (SI métier + SharePoint annexe).
  const olaqinSources = [
    { id:"sag", x:14, y:8,   w:140, h:30, t:"Sage 100 ERP",  d:"ERP comptable et commercial (SQL Server). 98 tables Bronze - la plus grosse empreinte source." },
    { id:"crm", x:14, y:44,  w:140, h:30, t:"CRM Dynamics",  d:"Organisations B2B et traçabilité lecteurs Carte Vitale (réplique SQL Server). Opérationnel (pas commercial)." },
    { id:"hub", x:14, y:80,  w:140, h:30, t:"HubSpot",       d:"Marketing automation et ventes. API REST via APIM ; 11,5 M de lignes d'historique CDC sur la seule table company." },
    { id:"stl", x:14, y:116, w:140, h:30, t:"Stellair · VTC", d:"Plateforme de téléservices santé (SaaS). Dépôts SFTP quotidiens." },
    { id:"eco", x:14, y:152, w:140, h:30, t:"Saleor · ECOM", d:"Plateforme e-commerce (PostgreSQL)." },
    { id:"pfd", x:14, y:188, w:140, h:30, t:"PFD",           d:"Plateforme de facturation et distribution (MongoDB Atlas)." },
    { id:"tmj", x:14, y:224, w:140, h:30, t:"TMAJ",          d:"Télémétrie des terminaux Carte Vitale. 122 M de lignes de logs - la plus grosse table de la plateforme." },
    { id:"shp", x:14, y:260, w:140, h:30, t:"SharePoint",    d:"Fichiers de configuration et listes Excel administratives." },
  ];
  // Référentiels ajoutés par le projet (pas présents chez Olaqin avant la plateforme).
  const projectAddition = { id:"gov", x:14, y:296, w:140, h:30, t:"RPPS / FINESS", d:"Référentiels publics santé (RPPS, FINESS, SESAM, SYNTEC). Branchés par le projet pour réconcilier les professionnels de santé - 5,2 M de lignes." };

  const blocks = side === "before" ? [
    ...olaqinSources,
    { id:"adh", x:210, y:130, w:170, h:60, t:"Extractions ad-hoc", d:"Scripts Python et fichiers Excel manuels. Lent, fragile, non reproductible." },
    { id:"rep", x:430, y:130, w:170, h:60, t:"Rapports manuels",   d:"Tableaux refaits à chaque demande. Pas de source de vérité partagée." },
  ] : [
    ...olaqinSources,
    projectAddition,
    { id:"br",  x:175, y:130, w:115, h:60, t:"Bronze",        d:"Ingestion brute via 56 pipelines Fabric. 422 tables Delta, archivage jour par jour traçable." },
    { id:"sv",  x:310, y:130, w:115, h:60, t:"Silver",        d:"Réconciliation et historisation CDC Type 2 générique, piloté par métadonnées. 288 tables, 140 M+ lignes." },
    { id:"gd",  x:445, y:130, w:115, h:60, t:"Gold",          d:"85 tables d'usage métier. Exposées en Power BI et en GraphQL (e-commerce, partenaire)." },
    { id:"mdm", x:580, y:60,  w:165, h:50, t:"MDM",           d:"Master Data Management - 5 référentiels : entités, contacts, offres, souscriptions et devices. Génération d'IDs Olaqin unifiés, push-back vers Sage, Dynamics, HubSpot, Stellair." },
    { id:"pbi", x:580, y:210, w:165, h:50, t:"Power BI",      d:"15 semantic models et 12 reports : BI Exploitation, Marketing, Finance, Souscription…" },
  ];

  const conns = side === "before" ? [
    ...olaqinSources.map(b => [b.id, "adh"]),
    ["adh","rep"]
  ] : [
    ...olaqinSources.map(b => [b.id, "br"]),
    [projectAddition.id, "br"],
    ["br","sv"], ["sv","gd"],
    ["gd","mdm"], ["gd","pbi"]
  ];

  const map = Object.fromEntries(blocks.map(b => [b.id, b]));
  const activeBlock = blocks.find(b => b.id === active);

  return (
    <div>
      <div style={{
        display:"inline-flex",background:"var(--soft)",borderRadius:999,padding:4,marginBottom:24
      }}>
        {[{k:"before",l:beforeLabel},{k:"after",l:afterLabel}].map(o=>(
          <button key={o.k} onClick={()=>{setSide(o.k);setActive(null);}}
            style={{
              appearance:"none",border:"none",cursor:"pointer",
              background: side===o.k ? "var(--card)" : "transparent",
              boxShadow: side===o.k ? "0 1px 2px rgba(0,0,0,0.06)":"none",
              color: side===o.k ? "var(--ink)":"var(--muted)",
              padding:"8px 16px",borderRadius:999,
              fontFamily:"Inter Tight",fontSize:13,fontWeight:500
            }}>{o.l}</button>
        ))}
      </div>

      <div style={{
        background:"var(--card)",border:"1px solid var(--hair)",borderRadius:6,
        padding:24,position:"relative"
      }}>
        <svg viewBox="0 0 760 360" style={{width:"100%",height:"auto",display:"block"}}>
          {conns.map(([a,b],i)=>{
            const A=map[a],B=map[b];
            const x1=A.x+A.w, y1=A.y+A.h/2, x2=B.x, y2=B.y+B.h/2;
            const cx=(x1+x2)/2;
            const isHot = active && (a===active || b===active);
            return (
              <path key={i} d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke={isHot ? "var(--accent)" : "var(--hair)"}
                strokeWidth={isHot ? 1.6 : 1}
                style={{transition:"stroke 200ms"}}
              />
            );
          })}
          {blocks.map(b=>{
            const isActive = active===b.id;
            return (
              <g key={b.id} style={{cursor:"pointer"}}
                 onClick={()=>setActive(active===b.id?null:b.id)}
                 onMouseEnter={()=>setActive(b.id)}>
                <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="4"
                  fill={isActive ? "var(--accent)" : "var(--card)"}
                  stroke={isActive ? "var(--accent)" : "var(--hair)"}
                  strokeWidth="1"
                  style={{transition:"fill 180ms, stroke 180ms"}}
                />
                <text x={b.x+b.w/2} y={b.y+b.h/2+5} textAnchor="middle"
                  fontFamily="Inter Tight" fontSize="13" fontWeight="500"
                  fill={isActive ? "#fff" : "var(--ink)"}
                  style={{transition:"fill 180ms"}}>{b.t}</text>
              </g>
            );
          })}
        </svg>

        <div style={{
          marginTop:16,paddingTop:16,borderTop:"1px solid var(--hair)",
          minHeight:60
        }}>
          {activeBlock ? (
            <div>
              <div className="eyebrow" style={{marginBottom:8}}>{activeBlock.t}</div>
              <p style={{margin:0,fontSize:14,lineHeight:1.6,color:"var(--muted)"}}>{activeBlock.d}</p>
            </div>
          ) : (
            <p className="meta" style={{margin:0}}>Survolez un bloc · hover a block</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function MigrationTimeline({ items }) {
  const ref = useRef(null);
  const p = useScrollProgress(ref, { start: 0.92, end: 0.4 });
  return (
    // Labels are 160px wide and centred on their dot, so the first and last
    // would spill 80px past the track - inset it by half a label on each side.
    <div ref={ref} style={{position:"relative",padding:"24px 84px 60px"}}>
      <div style={{
        position:"relative",height:2,background:"var(--hair)",borderRadius:999,margin:"60px 0 0"
      }}>
        <div style={{
          position:"absolute",inset:0,
          width:`${p*100}%`,background:"var(--accent)",borderRadius:999,
          transition:"width 80ms linear"
        }}/>
        {items.map((it,i)=>{
          const at = i/(items.length-1);
          const reached = p >= at - 0.01;
          return (
            <div key={i} style={{
              position:"absolute",left:`${at*100}%`,top:-7,
              transform:"translateX(-50%)",
              width:16,height:16,borderRadius:999,
              background: reached ? "var(--accent)" : "var(--card)",
              border:`2px solid ${reached?"var(--accent)":"var(--hair)"}`,
              transition:"all 180ms"
            }}>
              <div style={{
                position:"absolute",top:24,left:"50%",transform:"translateX(-50%)",
                width:160,textAlign:"center",pointerEvents:"none"
              }}>
                <div className="mono meta" style={{
                  whiteSpace:"nowrap",
                  color: reached ? "var(--accent)" : "var(--muted)"
                }}>{it.month}</div>
                <div style={{
                  marginTop:6,fontSize:13,fontWeight:600,
                  color: reached ? "var(--ink)" : "var(--muted)",
                  letterSpacing:"-0.005em"
                }}>{it.title}</div>
                <div style={{
                  marginTop:4,fontSize:11,color:"var(--muted)",lineHeight:1.4
                }}>{it.note}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Generic left-to-right flow graph: columns of nodes, curved edges, hover
// highlights the full upstream + downstream closure of the hovered node.
function FlowGraph({ nodes, edges, columns, colors, hint }) {
  const [hover, setHover] = useState(null);
  const map = Object.fromEntries(nodes.map(n=>[n.id,n]));
  const isHovered = (id) => {
    if (!hover) return false;
    if (id===hover) return true;
    const up = new Set(); const down = new Set();
    let q = [hover];
    while (q.length){ const c=q.shift(); edges.forEach(([a,b])=>{ if(b===c && !up.has(a)){up.add(a);q.push(a);} }); }
    q = [hover];
    while (q.length){ const c=q.shift(); edges.forEach(([a,b])=>{ if(a===c && !down.has(b)){down.add(b);q.push(b);} }); }
    return up.has(id) || down.has(id);
  };
  const isEdgeHot = (a,b) => hover && (isHovered(a) && isHovered(b));
  const node = hover ? map[hover] : null;

  return (
    <div style={{
      background:"var(--card)",border:"1px solid var(--hair)",borderRadius:6,padding:24
    }}>
      <svg viewBox="0 0 880 340" style={{width:"100%",height:"auto",display:"block"}}>
        {columns.map((h,i)=>(
          <text key={i} x={h.x+65} y={24} textAnchor="middle"
            fontFamily="JetBrains Mono" fontSize="10" fill="var(--muted)" letterSpacing="2">
            {h.t.toUpperCase()}
          </text>
        ))}
        {edges.map(([a,b],i)=>{
          const A=map[a],B=map[b];
          const x1=A.x+130,y1=A.y+18,x2=B.x,y2=B.y+18;
          const cx=(x1+x2)/2;
          const hot = isEdgeHot(a,b);
          return (
            <path key={i}
              d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke={hot ? "var(--accent)" : "var(--hair)"}
              strokeWidth={hot ? 1.6 : 1}
              style={{transition:"stroke 180ms"}}
            />
          );
        })}
        {nodes.map(n=>{
          const dim = hover && !isHovered(n.id);
          return (
            <g key={n.id}
              onMouseEnter={()=>setHover(n.id)}
              onMouseLeave={()=>setHover(null)}
              style={{cursor:"pointer",opacity: dim ? 0.3 : 1, transition:"opacity 180ms"}}
            >
              <rect x={n.x} y={n.y} width="130" height="36" rx="4"
                fill="var(--card)"
                stroke={hover===n.id ? "var(--accent)" : "var(--hair)"}
                strokeWidth={hover===n.id ? 1.6 : 1}
              />
              <circle cx={n.x+8} cy={n.y+18} r="3" fill={colors[n.type]} />
              <text x={n.x+18} y={n.y+22}
                fontFamily="JetBrains Mono" fontSize="11" fontWeight="500"
                fill="var(--ink)">{n.t}</text>
            </g>
          );
        })}
      </svg>
      <div style={{
        marginTop:16,paddingTop:16,borderTop:"1px solid var(--hair)",
        minHeight:50
      }}>
        {node ? (
          <div style={{display:"flex",gap:12,alignItems:"baseline",flexWrap:"wrap"}}>
            <span className="mono" style={{fontSize:13,fontWeight:500}}>{node.t}</span>
            <span className="meta">{node.type}</span>
            <span style={{fontSize:14,color:"var(--muted)"}}>- {node.d}</span>
          </div>
        ) : (
          <p className="meta" style={{margin:0}}>{hint}</p>
        )}
      </div>
    </div>
  );
}

export function LineageGraph() {
  const nodes = [
    { id:"sag",  x:20,  y:60,  t:"sage_sql",         type:"source", d:"Sage 100 ERP - connexion SQL Server. Comptable, factures, abonnements." },
    { id:"crm",  x:20,  y:160, t:"crm_dynamics",     type:"source", d:"CRM Dynamics 365 - réplique SQL Server. Organisations B2B et traçabilité lecteurs Carte Vitale." },
    { id:"hub",  x:20,  y:260, t:"hubspot_api",      type:"source", d:"HubSpot - API REST v3 via APIM, export asynchrone. Marketing automation et ventes." },
    { id:"b1",   x:180, y:80,  t:"bronze.sage",      type:"bronze", d:"Lakehouse · partitionné par jour. Snapshot full quotidien + delta calculé." },
    { id:"b2",   x:180, y:200, t:"bronze.crm",       type:"bronze", d:"Lakehouse · ingestion quotidienne, delta calculé a posteriori." },
    { id:"s1",   x:340, y:60,  t:"silver.entity",    type:"silver", d:"Organisations unifiées (Sage ∪ Dynamics ∪ HubSpot ∪ Saleor). Dédoublonnage fuzzy + connected components." },
    { id:"s2",   x:340, y:160, t:"silver.contact",   type:"silver", d:"Contacts unifiés. CDC Type 2, tables d'identifiants croisés par SI." },
    { id:"s3",   x:340, y:260, t:"silver.subscr",    type:"silver", d:"Souscriptions cross-SI - modèle commun unifiant Sage, Dynamics, Stellair, PFD, Saleor." },
    { id:"g1",   x:500, y:80,  t:"gold.bi_sales",    type:"gold",   d:"BI Sales - KPIs commerciaux, rafraîchis quotidiennement." },
    { id:"g2",   x:500, y:200, t:"gold.bi_finance",  type:"gold",   d:"BI Finance - facturation, comptabilité, marges." },
    { id:"l1",   x:660, y:60,  t:"Power BI Sales",   type:"consumer",d:"Report Power BI - équipes commerciales." },
    { id:"l2",   x:660, y:160, t:"Power BI Finance", type:"consumer",d:"Report Power BI - direction financière." },
    { id:"l3",   x:660, y:260, t:"MDM push-back",    type:"consumer",d:"Sync bidirectionnelle vers Sage / Dynamics / HubSpot / Stellair." },
  ];
  const edges = [
    ["sag","b1"],["crm","b2"],["hub","b2"],
    ["b1","s1"],["b1","s3"],["b2","s1"],["b2","s2"],
    ["s1","g1"],["s2","g1"],["s1","g2"],["s3","g2"],
    ["g1","l1"],["g2","l2"],["s1","l3"],["s2","l3"],
  ];
  const colors = {
    source:"#65686d", bronze:"#b07e3b", silver:"#7e8a99", gold:"var(--accent)", consumer:"#15161a"
  };
  const columns = [
    {x:20,t:"Sources"},{x:180,t:"Bronze"},{x:340,t:"Silver"},{x:500,t:"Gold"},{x:660,t:"Consommateurs"}
  ];
  return (
    <FlowGraph nodes={nodes} edges={edges} columns={columns} colors={colors}
      hint="Survolez un nœud pour voir ses dépendances" />
  );
}

// ── Kereis ──────────────────────────────────────────────────────────────────

// The two modules and the line between them: one judges a single document
// against the file's context, the other reads the accepted batch as a whole.
const MODULES = {
  fr: {
    hint: "Survolez un bloc pour lire sa responsabilité",
    lanes: [
      { x:264, y:148, t:"Module 1 · Recevabilité" },
      { x:624, y:228, t:"Module 2 · Interprétation" },
    ],
    blocks: [
      { id:"doc", x:14,  y:120, t:"Pièce déposée",      d:"Un document à la fois - justificatif d'arrêt, attestation, pièce administrative. Le module ne voit que celui-là." },
      { id:"dos", x:14,  y:200, t:"Contexte dossier",   d:"L'identité de l'assuré, les dates du sinistre - plus le nombre et le type de pièces déjà rattachées. Compter n'est pas interpréter : le module ne rouvre jamais les autres pièces." },
      { id:"rec", x:194, y:160, t:"Recevabilité",       d:"16 règles déterministes sourcées, activables par configuration, plus une matrice de complétude sur le lot - générée depuis un contrat versionné chargé au démarrage, avec échec dur au moindre écart." },
      { id:"ko",  x:374, y:60,  t:"Rejetée",            d:"Refus porté par un code motif normé, assorti d'une justification en texte libre. Le rejet est une décision de recevabilité, jamais une décision d'interprétation." },
      { id:"mis", x:374, y:140, t:"Pièce manquante",    d:"Le module peut signaler qu'il manque une pièce au dossier - après avoir vérifié ce qui, dans le contexte, expliquerait légitimement son absence." },
      { id:"lot", x:374, y:240, t:"Lot recevable",      d:"Les pièces acceptées, regroupées. C'est le seul endroit où l'on a le droit de recouper les documents entre eux." },
      { id:"int", x:554, y:240, t:"Interprétation",     d:"Le lot complet en une passe. Le modèle consolide chaque champ avec sa source et décompose la lecture en étapes ; le code les exécute. Aucune conclusion n'est rendue sur la seule parole du modèle." },
      { id:"res", x:734, y:200, t:"Lecture consolidée", d:"Chaque valeur rattachée à la pièce dont elle sort, les valeurs discordantes signalées plutôt qu'arbitrées en silence." },
      { id:"man", x:734, y:280, t:"Traitement manuel",  d:"Le module ne rejette jamais une pièce et ne produit jamais d'à-peu-près : si une référence ne résout pas, le dossier repart en manuel, motif tracé." },
    ],
  },
  en: {
    hint: "Hover a block to read its responsibility",
    lanes: [
      { x:264, y:148, t:"Module 1 · Admissibility" },
      { x:624, y:228, t:"Module 2 · Interpretation" },
    ],
    blocks: [
      { id:"doc", x:14,  y:120, t:"Submitted document", d:"One document at a time - absence certificate, statement, administrative paper. The module sees only that one." },
      { id:"dos", x:14,  y:200, t:"File context",       d:"The insured's identity, the claim dates - plus the number and type of documents already attached. Counting is not interpreting: the module never reopens the others." },
      { id:"rec", x:194, y:160, t:"Admissibility",      d:"16 sourced deterministic rules, switchable by configuration, plus a completeness matrix over the batch - generated from a versioned contract loaded at startup, with hard failure on the slightest drift." },
      { id:"ko",  x:374, y:60,  t:"Rejected",           d:"Refusal carried by a normalised reason code plus a free-text justification. Rejection is an admissibility decision, never an interpretation decision." },
      { id:"mis", x:374, y:140, t:"Missing document",   d:"The module may report that a document is missing - after checking what, in the file's context, would legitimately explain its absence." },
      { id:"lot", x:374, y:240, t:"Admissible batch",   d:"The accepted documents, gathered. This is the only place where documents may be cross-checked against each other." },
      { id:"int", x:554, y:240, t:"Interpretation",     d:"The whole batch in a single pass. The model consolidates each field with its source and decomposes the reading into steps; the code executes them. No conclusion is ever returned on the model's word alone." },
      { id:"res", x:734, y:200, t:"Consolidated read",  d:"Every value tied back to the document it came from, conflicting values reported rather than silently arbitrated." },
      { id:"man", x:734, y:280, t:"Manual handling",    d:"The module never rejects a document and never produces an approximation: if a reference doesn't resolve, the file goes back to manual, reason traced." },
    ],
  },
};

const MODULE_CONNS = [
  ["doc","rec"],["dos","rec"],
  ["rec","ko"],["rec","mis"],["rec","lot"],
  ["lot","int"],
  ["int","res"],["int","man"],
];

const BOX_W = 140, BOX_H = 44;

export function BoundaryDiagram({ lang = "fr" }) {
  const [active, setActive] = useState(null);
  const data = MODULES[lang] || MODULES.fr;
  const blocks = data.blocks;

  const map = Object.fromEntries(blocks.map(b => [b.id, b]));
  const activeBlock = blocks.find(b => b.id === active);

  return (
    <div style={{
      background:"var(--card)",border:"1px solid var(--hair)",borderRadius:6,padding:24
    }}>
      <svg viewBox="0 0 890 350" style={{width:"100%",height:"auto",display:"block"}}>
        {data.lanes.map((l,i)=>(
          <text key={i} x={l.x} y={l.y} textAnchor="middle"
            fontFamily="JetBrains Mono" fontSize="10" fill="var(--muted)" letterSpacing="2">
            {l.t.toUpperCase()}
          </text>
        ))}
        {MODULE_CONNS.map(([a,b],i)=>{
          const A=map[a],B=map[b];
          const x1=A.x+BOX_W, y1=A.y+BOX_H/2, x2=B.x, y2=B.y+BOX_H/2;
          const cx=(x1+x2)/2;
          const isHot = active && (a===active || b===active);
          return (
            <path key={i} d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke={isHot ? "var(--accent)" : "var(--hair)"}
              strokeWidth={isHot ? 1.6 : 1}
              style={{transition:"stroke 200ms"}}
            />
          );
        })}
        {blocks.map(b=>{
          const isActive = active===b.id;
          return (
            <g key={b.id} style={{cursor:"pointer"}}
               onClick={()=>setActive(active===b.id?null:b.id)}
               onMouseEnter={()=>setActive(b.id)}>
              <rect x={b.x} y={b.y} width={BOX_W} height={BOX_H} rx="4"
                fill={isActive ? "var(--accent)" : "var(--card)"}
                stroke={isActive ? "var(--accent)" : "var(--hair)"}
                strokeWidth="1"
                style={{transition:"fill 180ms, stroke 180ms"}}
              />
              <text x={b.x+BOX_W/2} y={b.y+BOX_H/2+5} textAnchor="middle"
                fontFamily="Inter Tight" fontSize="13" fontWeight="500"
                fill={isActive ? "#fff" : "var(--ink)"}
                style={{transition:"fill 180ms"}}>{b.t}</text>
            </g>
          );
        })}
      </svg>

      <div style={{
        marginTop:16,paddingTop:16,borderTop:"1px solid var(--hair)",
        minHeight:60
      }}>
        {activeBlock ? (
          <div>
            <div className="eyebrow" style={{marginBottom:8}}>{activeBlock.t}</div>
            <p style={{margin:0,fontSize:14,lineHeight:1.6,color:"var(--muted)"}}>{activeBlock.d}</p>
          </div>
        ) : (
          <p className="meta" style={{margin:0}}>{data.hint}</p>
        )}
      </div>
    </div>
  );
}

// A plain left-to-right sequence of steps - one band, one column per beat.
export function ModulePipeline({ steps }) {
  return (
    <div style={{
      background:"var(--card)",border:"1px solid var(--hair)",borderRadius:6,
      display:"grid",gridTemplateColumns:`repeat(${steps.length},1fr)`
    }}>
      {steps.map((s,i)=>(
        <div key={i} style={{
          padding:"28px 22px",position:"relative",
          borderLeft: i===0 ? "none" : "1px solid var(--hair)"
        }}>
          {i>0 && (
            <span aria-hidden="true" style={{
              position:"absolute",left:-10,top:30,width:20,height:20,borderRadius:999,
              background:"var(--card)",border:"1px solid var(--hair)",
              display:"grid",placeItems:"center",
              fontSize:10,lineHeight:1,color:"var(--muted)"
            }}>→</span>
          )}
          <div className="mono" style={{fontSize:13,fontWeight:500,letterSpacing:".08em",color:"var(--accent)"}}>
            {String(i+1).padStart(2,"0")}
          </div>
          <div style={{marginTop:14,fontSize:19,fontWeight:600,letterSpacing:"-0.02em",lineHeight:1.15}}>{s.t}</div>
          <p style={{margin:"12px 0 0",fontSize:14,lineHeight:1.6,color:"var(--muted)"}}>{s.d}</p>
        </div>
      ))}
    </div>
  );
}
