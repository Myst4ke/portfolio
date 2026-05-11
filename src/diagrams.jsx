// Architecture diagram (interactive), Timeline (scroll), Lineage (hover).

import React, { useRef, useState } from "react";
import { useScrollProgress } from "./scroll-fx.jsx";

export function ArchitectureDiagram({ beforeLabel, afterLabel }) {
  const [side, setSide] = useState("after");
  const [active, setActive] = useState(null);

  // 7 SI / sources préexistants chez Olaqin (6 SI métier + 1 SharePoint annexe).
  const olaqinSources = [
    { id:"sag", x:14, y:8,   w:140, h:30, t:"Sage ERP",      d:"ERP comptable et commercial. 15,6 M lignes - 60 % du volume Bronze à terme." },
    { id:"crm", x:14, y:44,  w:140, h:30, t:"CRM Dynamics",  d:"Organisations B2B et traçabilité lecteurs Carte Vitale. Opérationnel (pas commercial)." },
    { id:"hub", x:14, y:80,  w:140, h:30, t:"HubSpot",       d:"Marketing automation et ventes (sales hub)." },
    { id:"stl", x:14, y:116, w:140, h:30, t:"Stellair · VTC", d:"Plateforme de téléservices santé (SaaS)." },
    { id:"pfd", x:14, y:152, w:140, h:30, t:"PFD",           d:"Plateforme de facturation et distribution." },
    { id:"tmj", x:14, y:188, w:140, h:30, t:"TMAJ",          d:"Mises à jour terminaux Carte Vitale." },
    { id:"shp", x:14, y:224, w:140, h:30, t:"SharePoint",    d:"Fichiers de configuration et listes Excel administratives." },
  ];
  // Référentiel ajouté par le projet (pas présent chez Olaqin avant la plateforme).
  const projectAddition = { id:"gov", x:14, y:260, w:140, h:30, t:"RPPS / FINESS", d:"Référentiels gouvernementaux santé. Branchés par le projet pour réconcilier les professionnels de santé - non présents chez Olaqin avant la plateforme (7,3 M lignes)." };

  const blocks = side === "before" ? [
    ...olaqinSources,
    { id:"adh", x:210, y:130, w:170, h:60, t:"Extractions ad-hoc", d:"Scripts Python et fichiers Excel manuels. Lent, fragile, non reproductible." },
    { id:"rep", x:430, y:130, w:170, h:60, t:"Rapports manuels",   d:"Tableaux refaits à chaque demande. Pas de source de vérité partagée." },
  ] : [
    ...olaqinSources,
    projectAddition,
    { id:"br",  x:175, y:130, w:115, h:60, t:"Bronze",        d:"Ingestion brute via 43 pipelines Fabric. 418 tables, 25,7 M lignes traçables jour par jour." },
    { id:"sv",  x:310, y:130, w:115, h:60, t:"Silver",        d:"Réconciliation et historisation CDC Type 2 via 39 notebooks PySpark." },
    { id:"gd",  x:445, y:130, w:115, h:60, t:"Gold",          d:"Tables d'usage métier. Exposées en Power BI DirectLake." },
    { id:"mdm", x:580, y:60,  w:165, h:50, t:"MDM",           d:"Master Data Management - 3 domaines : Clients / Contacts (organisations B2B + utilisateurs), Devices (terminaux Carte Vitale) et Souscription (modèle commun cross-SI). Push-back vers Sage, Dynamics, HubSpot, Stellair." },
    { id:"pbi", x:580, y:210, w:165, h:50, t:"Power BI · DirectLake", d:"4 semantic models et 4 reports : BI Exploitation, Marketing, Sales, Finance." },
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
        <svg viewBox="0 0 760 320" style={{width:"100%",height:"auto",display:"block"}}>
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
    <div ref={ref} style={{position:"relative",padding:"24px 0 60px"}}>
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

export function LineageGraph() {
  const [hover, setHover] = useState(null);
  const nodes = [
    { id:"sag",  x:20,  y:60,  t:"sage_api",         type:"source", d:"Sage ERP - API REST mTLS. Comptable, factures, abonnements." },
    { id:"crm",  x:20,  y:160, t:"crm_dynamics",     type:"source", d:"CRM Dynamics - API REST mTLS. Organisations B2B et traçabilité lecteurs Carte Vitale." },
    { id:"hub",  x:20,  y:260, t:"hubspot_api",      type:"source", d:"HubSpot - API REST + API key. Marketing automation et ventes." },
    { id:"b1",   x:180, y:80,  t:"bronze.sage",      type:"bronze", d:"Lakehouse · partitionné par jour. ≈ 15,6 M lignes." },
    { id:"b2",   x:180, y:200, t:"bronze.crm",       type:"bronze", d:"Lakehouse · ingestion API quotidienne mTLS." },
    { id:"s1",   x:340, y:60,  t:"silver.entity",    type:"silver", d:"Organisations unifiées (Sage ∪ Dynamics ∪ HubSpot). Dédoublonnage hash MD5." },
    { id:"s2",   x:340, y:160, t:"silver.contact",   type:"silver", d:"Contacts unifiés. CDC Type 2." },
    { id:"s3",   x:340, y:260, t:"silver.subscr",    type:"silver", d:"Souscriptions cross-SI - modèle commun unifiant Sage, Dynamics, Stellair." },
    { id:"g1",   x:500, y:80,  t:"gold.bi_sales",    type:"gold",   d:"BI Sales - KPIs commerciaux, rafraîchis quotidiennement." },
    { id:"g2",   x:500, y:200, t:"gold.bi_finance",  type:"gold",   d:"BI Finance - facturation, comptabilité, marges." },
    { id:"l1",   x:660, y:60,  t:"Power BI Sales",   type:"consumer",d:"Report DirectLake - équipes commerciales." },
    { id:"l2",   x:660, y:160, t:"Power BI Finance", type:"consumer",d:"Report DirectLake - direction financière." },
    { id:"l3",   x:660, y:260, t:"MDM push-back",    type:"consumer",d:"Sync bidirectionnelle vers Sage / Dynamics / HubSpot / Stellair." },
  ];
  const edges = [
    ["sag","b1"],["crm","b2"],["hub","b2"],
    ["b1","s1"],["b1","s3"],["b2","s1"],["b2","s2"],
    ["s1","g1"],["s2","g1"],["s1","g2"],["s3","g2"],
    ["g1","l1"],["g2","l2"],["s1","l3"],["s2","l3"],
  ];
  const map = Object.fromEntries(nodes.map(n=>[n.id,n]));
  const colors = {
    source:"#65686d", bronze:"#b07e3b", silver:"#7e8a99", gold:"#169cdf", consumer:"#15161a"
  };
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
        {[
          {x:20,t:"Sources"},{x:180,t:"Bronze"},{x:340,t:"Silver"},{x:500,t:"Gold"},{x:660,t:"Consommateurs"}
        ].map((h,i)=>(
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
              <circle cx={n.x+8} cy={n.y+18} r="3" fill={n.type==="gold"?"var(--accent)":colors[n.type]} />
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
          <p className="meta" style={{margin:0}}>Survolez un nœud pour voir ses dépendances</p>
        )}
      </div>
    </div>
  );
}
