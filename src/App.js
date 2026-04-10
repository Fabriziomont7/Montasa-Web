/* eslint-disable */
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://xstrugwgpozoipgjjspy.supabase.co', 'sb_publishable_vSdEcWognHjuLuAnjJHq3A_C_zwP6W0');

import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED DATA
// ═══════════════════════════════════════════════════════════════════════════════

const EQUIPOS_DATA = [
  { id:"MT-001", codigo:"MT99", tipo:"Montacargas", marca:"Toyota", modelo:"8FGU25", serie:"8FGU25-12345", capacidad:"2,500 kg", altura:"5.5 m", año:2021, horas_uso:1240, horas_vida_util:12000, estado:"disponible", ubicacion:"Bodega Central", costo_adquisicion:38500, inversion_total:41200, ultimo_mantenimiento:"2024-11-15", proximo_mant_fecha:"2025-06-01", proximo_mant_horas:1350, estado_tecnico:"bueno" },
  { id:"MT-002", codigo:"GR45", tipo:"Grúa", marca:"Liebherr", modelo:"LTM 1045", serie:"LTM1045-98761", capacidad:"45 ton", altura:"38 m", año:2020, horas_uso:3100, horas_vida_util:20000, estado:"renta", ubicacion:"Cliente: Constructora Ríos", costo_adquisicion:185000, inversion_total:197400, ultimo_mantenimiento:"2024-12-10", proximo_mant_fecha:"2025-04-20", proximo_mant_horas:3180, estado_tecnico:"bueno" },
  { id:"MT-003", codigo:"EL22", tipo:"Elevador", marca:"JLG", modelo:"450AJ", serie:"450AJ-55678", capacidad:"230 kg", altura:"13.7 m", año:2022, horas_uso:890, horas_vida_util:10000, estado:"mantenimiento", ubicacion:"Taller Montasa", costo_adquisicion:52000, inversion_total:54100, ultimo_mantenimiento:"2025-04-01", proximo_mant_fecha:"2025-06-01", proximo_mant_horas:1020, estado_tecnico:"en_reparacion" },
  { id:"MT-004", codigo:"MT55", tipo:"Montacargas", marca:"Hyster", modelo:"H5.5FT", serie:"H55FT-24891", capacidad:"5,500 kg", altura:"3.0 m", año:2019, horas_uso:4820, horas_vida_util:12000, estado:"detenido", ubicacion:"Bodega Norte", costo_adquisicion:48000, inversion_total:55300, ultimo_mantenimiento:"2025-01-05", proximo_mant_fecha:"2025-04-05", proximo_mant_horas:4950, estado_tecnico:"critico", razon_detencion:"Esperando repuesto de transmisión - ETA: 20 Abr" },
  { id:"MT-005", codigo:"CM12", tipo:"Camión", marca:"Mercedes-Benz", modelo:"Actros 2545", serie:"MB2545-10023", capacidad:"15 ton", altura:"—", año:2021, horas_uso:62000, horas_vida_util:300000, estado:"reparacion", ubicacion:"Taller Externo - AutoFix", costo_adquisicion:95000, inversion_total:101200, ultimo_mantenimiento:"2025-04-02", proximo_mant_fecha:"2025-05-15", proximo_mant_horas:63000, estado_tecnico:"en_reparacion" },
  { id:"MT-006", codigo:"MT33", tipo:"Montacargas", marca:"Crown", modelo:"FC5200", serie:"FC5200-77432", capacidad:"3,000 kg", altura:"6.0 m", año:2020, horas_uso:5600, horas_vida_util:12000, estado:"vendido", ubicacion:"—", costo_adquisicion:31000, inversion_total:33000, ultimo_mantenimiento:"2024-10-01", proximo_mant_fecha:"—", proximo_mant_horas:0, estado_tecnico:"bueno" },
  { id:"MT-007", codigo:"EL44", tipo:"Elevador", marca:"JLG", modelo:"660SJ", serie:"660SJ-33421", capacidad:"230 kg", altura:"20 m", año:2023, horas_uso:320, horas_vida_util:10000, estado:"disponible", ubicacion:"Bodega Central", costo_adquisicion:68000, inversion_total:68000, ultimo_mantenimiento:"2025-02-01", proximo_mant_fecha:"2025-08-01", proximo_mant_horas:470, estado_tecnico:"bueno" },
  { id:"MT-008", codigo:"GR20", tipo:"Grúa", marca:"Grove", modelo:"RT530E", serie:"GRT530-88901", capacidad:"30 ton", altura:"32 m", año:2022, horas_uso:1100, horas_vida_util:20000, estado:"disponible", ubicacion:"Bodega Central", costo_adquisicion:145000, inversion_total:146200, ultimo_mantenimiento:"2025-03-15", proximo_mant_fecha:"2025-07-15", proximo_mant_horas:1300, estado_tecnico:"bueno" },
];

const RENTAS_DATA = [
  { id:"RNT-001", estado:"activa", cliente:"Constructora Ríos S.A.", contacto:"Ing. Mario Soto", tel:"+504 9876-5432", equipo_codigo:"GR45", equipo_desc:"Grúa Liebherr LTM 1045", cotizacion:"COT-2025-001", fecha_inicio:"2025-03-01", fecha_fin:"2025-04-30", tipo_cobro:"mensual", valor:4500, pagos:[{mes:"Marzo",monto:4500,estado:"pagado",fecha_pago:"2025-03-01"},{mes:"Abril",monto:4500,estado:"pendiente",vence:"2025-04-01"}], cobros_extra:[] },
  { id:"RNT-002", estado:"activa", cliente:"Zona Franca Industrial", contacto:"Lic. Andrea Flores", tel:"+504 8765-4321", equipo_codigo:"MT33", equipo_desc:"Montacargas Crown FC5200", cotizacion:"COT-2025-002", fecha_inicio:"2025-03-15", fecha_fin:"2025-03-29", tipo_cobro:"semanal", valor:850, pagos:[{mes:"Semana 1",monto:425,estado:"pagado",fecha_pago:"2025-03-15"},{mes:"Semana 2",monto:425,estado:"vencido",vence:"2025-03-22"}], cobros_extra:[{concepto:"Daño en horquilla",monto:380,cobrado:false}] },
  { id:"RNT-003", estado:"cotizacion", cliente:"INGCA Ingeniería", contacto:"Arq. Roberto Castellanos", tel:"+504 6543-2109", equipo_codigo:null, equipo_desc:"Elevador tijera — por asignar", cotizacion:"COT-2025-003", fecha_inicio:"2025-04-20", fecha_fin:"2025-05-20", tipo_cobro:"mensual", valor:1200, pagos:[], cobros_extra:[] },
];

const CLIENTES_DATA = [
  { id:"CLI-001", empresa:"Constructora Ríos S.A.", contacto:"Ing. Mario Soto", cargo:"Gerente de Operaciones", tel:"+504 9876-5432", email:"msoto@constructorarios.hn", industria:"constructora", ciudad:"Tegucigalpa", vendedor:"Carlos Méndez", estado:"activo", ultima_actividad:"2025-04-07", valor_total:27000, opps_activas:1 },
  { id:"CLI-002", empresa:"Zona Franca Industrial", contacto:"Lic. Andrea Castellanos", cargo:"Jefa de Compras", tel:"+504 8765-4321", email:"acastellanos@zfin.hn", industria:"zonafranca", ciudad:"San Pedro Sula", vendedor:"Andrea Flores", estado:"activo", ultima_actividad:"2025-03-25", valor_total:11100, opps_activas:1 },
  { id:"CLI-003", empresa:"Almacenes La Fe", contacto:"Sr. Juan Martínez", cargo:"Gerente General", tel:"+504 7654-3210", email:"jmartinez@almaceneslife.hn", industria:"logistica", ciudad:"Tegucigalpa", vendedor:"Roberto Díaz", estado:"frio", ultima_actividad:"2025-01-15", valor_total:900, opps_activas:0 },
  { id:"CLI-004", empresa:"INGCA Ingeniería", contacto:"Arq. Roberto Castellanos", cargo:"Director de Proyectos", tel:"+504 6543-2109", email:"rcastellanos@ingca.hn", industria:"constructora", ciudad:"Tegucigalpa", vendedor:"Carlos Méndez", estado:"prospecto", ultima_actividad:"2025-04-05", valor_total:0, opps_activas:1 },
];

const OPPS_DATA = [
  { id:"OPP-001", titulo:"Grúa CA-5 · Carretera", cliente:"INGCA Ingeniería", valor:22500, etapa:"cotizacion", prob:40, ultimo_seguimiento:"2025-04-08", vendedor:"Carlos Méndez" },
  { id:"OPP-002", titulo:"Flota 3 montacargas", cliente:"Zona Franca Industrial", valor:14400, etapa:"negociacion", prob:60, ultimo_seguimiento:"2025-04-05", vendedor:"Andrea Flores" },
  { id:"OPP-003", titulo:"Renovación contrato Q2+Q3", cliente:"Constructora Ríos", valor:18000, etapa:"seguimiento", prob:75, ultimo_seguimiento:"2025-04-07", vendedor:"Carlos Méndez" },
];

const ALERTAS_DATA = [
  { id:1, tipo:"critico", modulo:"Mantenimiento", icono:"🚨", texto:"MT55 — Transmisión averiada, detenido hace 12 días", color:"#FF4444", nav:"mantenimiento" },
  { id:2, tipo:"critico", modulo:"Mantenimiento", icono:"🛠️", texto:"EL22 — Módulo eléctrico quemado, en reparación", color:"#FF4444", nav:"mantenimiento" },
  { id:3, tipo:"urgente", modulo:"Rentas", icono:"💰", texto:"Zona Franca — Pago Semana 2 VENCIDO ($425)", color:"#FF6B35", nav:"rentas" },
  { id:4, tipo:"urgente", modulo:"Seguimiento", icono:"🎯", texto:"INGCA $22,500 — 48h sin seguimiento", color:"#FF6B35", nav:"seguimiento" },
  { id:5, tipo:"aviso", modulo:"Mantenimiento", icono:"⚠️", texto:"MT99 — Service programado en 14 días", color:"#FFB930", nav:"mantenimiento" },
  { id:6, tipo:"aviso", modulo:"CRM", icono:"👥", texto:"Almacenes La Fe — Sin contacto hace 84 días", color:"#FFB930", nav:"crm" },
  { id:7, tipo:"info", modulo:"Sugerencias", icono:"💡", texto:"2 sugerencias del equipo sin leer", color:"#3B9EFF", nav:"dashboard" },
];

const SUGERENCIAS_DATA = [
  { id:"S001", de:"Carlos Méndez", rol:"Ventas", fecha:"2025-04-08", texto:"Constructora Ríos preguntó por descuento del 5% si firman contrato anual. Son $18,000 garantizados.", leida:false, prioridad:"alta" },
  { id:"S002", de:"Luis Fuentes", rol:"Técnico", fecha:"2025-04-07", texto:"Encontré repuesto MT55 en Repuestos Centroamérica a $2,400 vs $2,800 del proveedor oficial. ¿Autorizamos?", leida:false, prioridad:"alta" },
  { id:"S003", de:"Andrea Flores", rol:"Ventas", fecha:"2025-04-06", texto:"Clientes preguntan si incluimos operadores certificados. Podría ser diferenciador vs competencia.", leida:true, prioridad:"media" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS & CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

const STATUS_CFG = {
  disponible:    { label:"Disponible",    color:"#00E5A0", icon:"✅" },
  renta:         { label:"En Renta",      color:"#3B9EFF", icon:"📋" },
  mantenimiento: { label:"Mantenimiento", color:"#FFB930", icon:"🔧" },
  detenido:      { label:"Detenido",      color:"#FF6B35", icon:"⚠️" },
  reparacion:    { label:"Por Reparar",   color:"#FF3B8B", icon:"🛠️" },
  vendido:       { label:"Vendido",       color:"#5A6070", icon:"💼" },
};

const EST_TEC = {
  bueno:         { label:"Bueno",         color:"#00E5A0", icon:"✅" },
  en_reparacion: { label:"En Reparación", color:"#FF3B8B", icon:"🛠️" },
  critico:       { label:"Crítico",       color:"#FF4444", icon:"🚨" },
};

const IND_CFG = {
  constructora:{ label:"Constructora",    color:"#FF6B35", icon:"🏗️" },
  logistica:   { label:"Almacén/Log.",    color:"#3B9EFF", icon:"📦" },
  zonafranca:  { label:"Zona Franca",     color:"#00E5A0", icon:"🏭" },
  otro:        { label:"Otro",            color:"#8A8FA0", icon:"🏢" },
};

const NAV = [
  { id:"dashboard",    label:"Dashboard",    icon:"🏠" },
  { id:"flota",        label:"Flota",        icon:"🏗️" },
  { id:"mantenimiento",label:"Mantenimiento",icon:"🔧" },
  { id:"rentas",       label:"Rentas",       icon:"📋" },
  { id:"crm",          label:"CRM",          icon:"👥" },
  { id:"seguimiento",  label:"Seguimiento",  icon:"🎯" },
  { id:"elsa",         label:"ELSA IA",      icon:"🤖" },
];

const fmt = n => `$${Number(n||0).toLocaleString("en-US")}`;
const dDesde = f => f ? Math.floor((new Date()-new Date(f))/864e5) : 999;
const dHasta = f => f&&f!=="—" ? Math.ceil((new Date(f)-new Date())/864e5) : null;

// ═══════════════════════════════════════════════════════════════════════════════
// ELSA FLOATING
// ═══════════════════════════════════════════════════════════════════════════════

function ElsaFloat({ mod }) {
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState([]);
  const [inp,setInp]=useState("");
  const [loading,setLoading]=useState(false);
  const ref=useRef(null);
  const criticas=ALERTAS_DATA.filter(a=>a.tipo==="critico").length;

  useEffect(()=>{
    if(open&&msgs.length===0){
      const bienvenidas={
        dashboard:`¡Hola! Soy **ELSA** 🤖 Hay **${criticas} alertas críticas** hoy. ¿Qué resolvemos primero?`,
        flota:`¡Hola! Soy **ELSA** 🤖 Hay **${EQUIPOS_DATA.filter(e=>e.estado==="disponible").length} equipos disponibles** ahora. ¿Agrego uno o consulto algo?`,
        mantenimiento:`¡Hola! Soy **ELSA** 🤖 **MT55** y **EL22** necesitan atención urgente. ¿Empezamos?`,
        rentas:`¡Hola! Soy **ELSA** 🤖 Hay un **pago vencido** de Zona Franca ($425). ¿Lo registramos?`,
        crm:`¡Hola! Soy **ELSA** 🤖 **Almacenes La Fe** lleva 84 días sin contacto. ¿Lo agendamos?`,
        seguimiento:`¡Hola! Soy **ELSA** 🤖 **INGCA ($22,500)** lleva 48h sin seguimiento. ¿Contactamos ahora?`,
      };
      setMsgs([{role:"assistant",content:bienvenidas[mod]||"¡Hola! Soy **ELSA** 🤖 ¿En qué te ayudo?"}]);
    }
    if(open&&ref.current) setTimeout(()=>{ref.current.scrollTop=ref.current.scrollHeight;},100);
  },[open,mod]);

  useEffect(()=>{ if(ref.current) ref.current.scrollTop=ref.current.scrollHeight; },[msgs]);

  const enviar=async(t)=>{
    const texto=t||inp.trim(); if(!texto||loading) return; setInp("");
    const nuevos=[...msgs,{role:"user",content:texto}]; setMsgs(nuevos); setLoading(true);
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:1000,
        system:`Eres ELSA, asistente IA de Montasa Handling Co. Módulo activo: ${mod}.
Contexto: ${EQUIPOS_DATA.filter(e=>e.estado==="disponible").length} equipos disponibles, ${EQUIPOS_DATA.filter(e=>e.estado==="renta").length} en renta. MT55 y EL22 críticos. Pago vencido Zona Franca $425. Pipeline $${OPPS_DATA.reduce((s,o)=>s+o.valor,0).toLocaleString()}.
Responde en español, máximo 80 palabras, usa emojis. Sé proactiva y práctica.`,
        messages:nuevos.map(m=>({role:m.role,content:m.content})),
      })});
      const d=await res.json();
      setMsgs(p=>[...p,{role:"assistant",content:d.content?.[0]?.text||"Error."}]);
    } catch { setMsgs(p=>[...p,{role:"assistant",content:"⚠️ Error de conexión."}]); }
    finally { setLoading(false); }
  };

  const md=t=>t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br/>");

  return (
    <>
      {open&&(
        <div style={{position:"fixed",bottom:82,right:18,width:310,height:400,background:"#0C0E14",border:"1px solid #1E2230",borderRadius:14,display:"flex",flexDirection:"column",boxShadow:"0 20px 60px #00000090",zIndex:1000,overflow:"hidden"}}>
          <div style={{padding:"10px 12px",borderBottom:"1px solid #1E2230",background:"#0E1018",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:"linear-gradient(135deg,#FFB930,#FF3B8B)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🤖</div>
              <div><div style={{fontSize:12,fontWeight:800}}>ELSA</div><div style={{fontSize:9,color:"#353840"}}>{NAV.find(n=>n.id===mod)?.label}</div></div>
            </div>
            <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",color:"#5A6070",fontSize:15,cursor:"pointer"}}>✕</button>
          </div>
          <div ref={ref} style={{flex:1,overflowY:"auto",padding:"10px",display:"flex",flexDirection:"column",gap:8}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",flexDirection:m.role==="user"?"row-reverse":"row",gap:5,alignItems:"flex-end"}}>
                {m.role==="assistant"&&<div style={{width:18,height:18,borderRadius:"50%",background:"linear-gradient(135deg,#FFB930,#FF3B8B)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,flexShrink:0}}>🤖</div>}
                <div style={{maxWidth:"80%",padding:"8px 10px",borderRadius:m.role==="assistant"?"3px 9px 9px 9px":"9px 3px 9px 9px",background:m.role==="assistant"?"#141720":"#3B9EFF18",border:`1px solid ${m.role==="assistant"?"#1E2230":"#3B9EFF30"}`,fontSize:11,lineHeight:1.5,color:"#D4D8E8"}} dangerouslySetInnerHTML={{__html:md(m.content)}}/>
              </div>
            ))}
            {loading&&<div style={{display:"flex",gap:5,alignItems:"flex-end"}}><div style={{width:18,height:18,borderRadius:"50%",background:"linear-gradient(135deg,#FFB930,#FF3B8B)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9}}>🤖</div><div style={{background:"#141720",border:"1px solid #1E2230",borderRadius:"3px 9px 9px 9px",padding:"9px 11px",display:"flex",gap:3}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:"#FF6B35",animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}</div></div>}
          </div>
          <div style={{padding:"7px",borderTop:"1px solid #1E2230",display:"flex",gap:5}}>
            <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&enviar()} placeholder="Pregúntale a ELSA..." style={{flex:1,background:"#141720",border:"1px solid #1E2230",borderRadius:7,padding:"7px 9px",color:"#D4D8E8",fontSize:11,outline:"none"}}/>
            <button onClick={()=>enviar()} disabled={!inp.trim()||loading} style={{width:30,height:30,borderRadius:7,border:"none",background:inp.trim()?"linear-gradient(135deg,#FFB930,#FF6B35)":"#141720",color:inp.trim()?"#06080D":"#353840",cursor:inp.trim()?"pointer":"default",fontSize:13}}>→</button>
          </div>
        </div>
      )}
      <button onClick={()=>setOpen(!open)} style={{position:"fixed",bottom:18,right:18,width:50,height:50,borderRadius:"50%",background:"linear-gradient(135deg,#FFB930,#FF6B35,#FF3B8B)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:criticas>0?"0 0 0 8px #FF6B3518,0 4px 20px #FF6B3540":"0 4px 20px #FF6B3540",zIndex:1001,animation:criticas>0?"elsaPulse 2s ease-in-out infinite":"none"}}>🤖</button>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULES
// ═══════════════════════════════════════════════════════════════════════════════

function Dashboard({navigate}) {
  const ingresos=RENTAS_DATA.filter(r=>r.estado==="activa").reduce((s,r)=>s+r.valor,0);
  const pipeline=OPPS_DATA.reduce((s,o)=>s+o.valor,0);
  const alertasTotal=ALERTAS_DATA.filter(a=>["critico","urgente"].includes(a.tipo)).length;

  return (
    <div style={{padding:"16px",overflowY:"auto",flex:1}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:16}}>
        {[
          {label:"Ingresos/mes",val:fmt(ingresos),color:"#00E5A0",icon:"💰",nav:"rentas"},
          {label:"Disponibles",val:EQUIPOS_DATA.filter(e=>e.estado==="disponible").length,color:"#3B9EFF",icon:"🏗️",nav:"flota"},
          {label:"Pipeline",val:fmt(pipeline),color:"#FFB930",icon:"🎯",nav:"seguimiento"},
          {label:"Alertas",val:alertasTotal,color:"#FF4444",icon:"🚨",nav:"mantenimiento"},
          {label:"Clientes activos",val:CLIENTES_DATA.filter(c=>c.estado==="activo").length,color:"#FF3B8B",icon:"👥",nav:"crm"},
        ].map((k,i)=>(
          <div key={i} onClick={()=>navigate(k.nav)} style={{background:"#0C0E14",border:`1px solid ${k.color}20`,borderRadius:10,padding:"12px 14px",borderTop:`3px solid ${k.color}`,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><div style={{fontSize:9,color:"#5A6070",textTransform:"uppercase",letterSpacing:"0.08em"}}>{k.label}</div><span style={{fontSize:15}}>{k.icon}</span></div>
            <div style={{fontSize:22,fontWeight:800,color:k.color}}>{k.val}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 240px",gap:12,marginBottom:12}}>
        <div style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:10,overflow:"hidden"}}>
          <div style={{padding:"11px 14px",borderBottom:"1px solid #12151C",fontSize:12,fontWeight:800}}>🚨 Centro de Alertas</div>
          {ALERTAS_DATA.map((a,i)=>(
            <div key={i} onClick={()=>navigate(a.nav)} style={{padding:"9px 14px",borderBottom:i<ALERTAS_DATA.length-1?"1px solid #0E1018":"none",display:"flex",alignItems:"center",gap:8,borderLeft:`3px solid ${a.color}`,cursor:"pointer"}}>
              <span style={{fontSize:14,flexShrink:0}}>{a.icono}</span>
              <div style={{flex:1}}><div style={{fontSize:11,color:"#D4D8E8"}}>{a.texto}</div><div style={{fontSize:9,color:"#353840"}}>{a.modulo}</div></div>
              <div style={{width:7,height:7,borderRadius:"50%",background:a.color,flexShrink:0}}/>
            </div>
          ))}
        </div>
        <div style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:10,overflow:"hidden"}}>
          <div style={{padding:"11px 14px",borderBottom:"1px solid #12151C",fontSize:12,fontWeight:800}}>🏗️ Estado Flota</div>
          <div style={{padding:"12px"}}>
            {Object.entries(STATUS_CFG).map(([k,v])=>{
              const c=EQUIPOS_DATA.filter(e=>e.estado===k).length;
              if(!c) return null;
              return (
                <div key={k} onClick={()=>navigate("flota")} style={{display:"flex",alignItems:"center",gap:7,marginBottom:7,cursor:"pointer"}}>
                  <span style={{fontSize:12}}>{v.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:10,color:"#8A8FA0"}}>{v.label}</span><span style={{fontSize:11,fontWeight:700,color:v.color}}>{c}</span></div>
                    <div style={{height:3,background:"#12151C",borderRadius:2}}><div style={{width:`${(c/EQUIPOS_DATA.length)*100}%`,height:"100%",background:v.color,borderRadius:2}}/></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
        <div style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:10,overflow:"hidden"}}>
          <div onClick={()=>navigate("rentas")} style={{padding:"11px 14px",borderBottom:"1px solid #12151C",display:"flex",justifyContent:"space-between",cursor:"pointer"}}><div style={{fontSize:12,fontWeight:800}}>📋 Rentas Activas</div><span style={{fontSize:10,color:"#3B9EFF",fontWeight:700}}>{fmt(ingresos)}/mes →</span></div>
          {RENTAS_DATA.filter(r=>r.estado==="activa").map((r,i)=>{
            const dias=dHasta(r.fecha_fin); const venc=r.pagos.some(p=>p.estado==="vencido");
            return <div key={i} style={{padding:"9px 14px",borderBottom:"1px solid #0E1018",borderLeft:`3px solid ${venc?"#FF4444":"#00E5A0"}`}}><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:11,fontWeight:700}}>{r.cliente}</div><div style={{fontSize:10,color:"#5A6070"}}>{r.equipo_codigo}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:800,color:"#FFB930"}}>{fmt(r.valor)}</div><div style={{fontSize:9,color:dias&&dias<7?"#FF4444":"#5A6070"}}>{dias&&dias<0?"Venció":`${dias}d`}</div></div></div></div>;
          })}
        </div>
        <div style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:10,overflow:"hidden"}}>
          <div onClick={()=>navigate("seguimiento")} style={{padding:"11px 14px",borderBottom:"1px solid #12151C",display:"flex",justifyContent:"space-between",cursor:"pointer"}}><div style={{fontSize:12,fontWeight:800}}>🎯 Pipeline Top</div><span style={{fontSize:10,color:"#FFB930",fontWeight:700}}>{fmt(pipeline)} →</span></div>
          {OPPS_DATA.map((o,i)=>{
            const dias=dDesde(o.ultimo_seguimiento);
            return <div key={i} style={{padding:"9px 14px",borderBottom:"1px solid #0E1018",borderLeft:`3px solid ${dias>=2?"#FF4444":"#FFB930"}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><div><div style={{fontSize:11,fontWeight:700}}>{o.cliente}</div><div style={{fontSize:9,color:"#5A6070"}}>{o.etapa} · {o.prob}%</div></div><div style={{fontSize:13,fontWeight:800,color:"#FFB930"}}>{fmt(o.valor)}</div></div><div style={{height:3,background:"#12151C",borderRadius:2}}><div style={{width:`${o.prob}%`,height:"100%",background:"#FFB930",borderRadius:2}}/></div></div>;
          })}
        </div>
        <div style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:10,overflow:"hidden"}}>
          <div style={{padding:"11px 14px",borderBottom:"1px solid #12151C",fontSize:12,fontWeight:800}}>💡 Sugerencias del Equipo</div>
          {SUGERENCIAS_DATA.map((s,i)=>(
            <div key={i} style={{padding:"9px 14px",borderBottom:i<SUGERENCIAS_DATA.length-1?"1px solid #0E1018":"none",borderLeft:`3px solid ${s.leida?"#1E2230":"#3B9EFF"}`,opacity:s.leida?0.5:1}}>
              <div style={{fontSize:10,fontWeight:700,color:"#8A8FA0"}}>{s.de} · {s.rol}</div>
              <div style={{fontSize:11,color:"#D4D8E8",marginTop:2,lineHeight:1.3}}>{s.texto.substring(0,65)}...</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Flota() {
  const [sel,setSel]=useState(null);
  const [filtro,setFiltro]=useState("todos");
  const [search,setSearch]=useState("");
  const eq=sel?EQUIPOS_DATA.find(e=>e.id===sel):null;
  const filtered=EQUIPOS_DATA.filter(e=>(filtro==="todos"||e.estado===filtro)&&(!search||[e.codigo,e.tipo,e.marca,e.modelo].some(v=>v.toLowerCase().includes(search.toLowerCase()))));

  return (
    <div style={{display:"flex",flex:1,overflow:"hidden"}}>
      <div style={{width:270,borderRight:"1px solid #12151C",display:"flex",flexDirection:"column",background:"#080A10"}}>
        <div style={{padding:"10px 12px",borderBottom:"1px solid #12151C"}}>
          <input placeholder="🔍 Buscar..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%",boxSizing:"border-box",background:"#12151C",border:"1px solid #1E2230",borderRadius:7,padding:"7px 10px",color:"#D4D8E8",fontSize:11,outline:"none",marginBottom:7}}/>
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {["todos",...Object.keys(STATUS_CFG)].map(f=>{const cfg=f==="todos"?{color:"#D4D8E8",label:"Todos"}:STATUS_CFG[f];return <button key={f} onClick={()=>setFiltro(f)} style={{padding:"2px 7px",borderRadius:20,fontSize:9,border:"none",cursor:"pointer",background:filtro===f?cfg.color:"#12151C",color:filtro===f?"#06080D":"#5A6070",fontWeight:filtro===f?800:400}}>{cfg.label||"Todos"}</button>;})}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto"}}>
          {filtered.map(e=>{const st=STATUS_CFG[e.estado];const isSel=sel===e.id;return(
            <div key={e.id} onClick={()=>setSel(e.id)} style={{padding:"10px 12px",borderBottom:"1px solid #0D0F14",cursor:"pointer",background:isSel?"#0D0F14":"transparent",borderLeft:`3px solid ${isSel?st.color:"transparent"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontSize:12,fontWeight:700}}>{e.codigo}</div><div style={{fontSize:10,color:"#5A6070"}}>{e.marca} {e.modelo}</div><div style={{fontSize:10,color:"#353840"}}>{e.tipo} · {e.capacidad}</div></div><span style={{fontSize:9,fontWeight:700,color:st.color,background:`${st.color}15`,border:`1px solid ${st.color}30`,borderRadius:20,padding:"2px 6px",whiteSpace:"nowrap"}}>{st.icon} {st.label}</span></div>
            </div>
          );})}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"18px"}}>
        {!eq?(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#1E2230"}}><div style={{fontSize:48}}>🏗️</div><div style={{fontSize:13,fontWeight:700,marginTop:10,color:"#2A2D3A"}}>Selecciona un equipo</div></div>):(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
              <div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><h2 style={{margin:0,fontSize:18,fontWeight:800}}>{eq.codigo}</h2><span style={{fontSize:9,fontWeight:700,color:STATUS_CFG[eq.estado].color,background:`${STATUS_CFG[eq.estado].color}15`,borderRadius:20,padding:"3px 9px"}}>{STATUS_CFG[eq.estado].icon} {STATUS_CFG[eq.estado].label}</span><span style={{fontSize:9,fontWeight:700,color:EST_TEC[eq.estado_tecnico]?.color,background:`${EST_TEC[eq.estado_tecnico]?.color}15`,borderRadius:20,padding:"3px 9px"}}>{EST_TEC[eq.estado_tecnico]?.icon} {EST_TEC[eq.estado_tecnico]?.label}</span></div><div style={{fontSize:11,color:"#5A6070"}}>{eq.tipo} · {eq.marca} {eq.modelo} · {eq.serie}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:10,color:"#5A6070"}}>Inversión Total</div><div style={{fontSize:20,fontWeight:800,color:"#FFB930"}}>{fmt(eq.inversion_total)}</div></div>
            </div>
            {eq.razon_detencion&&<div style={{background:"#FF6B3510",border:"1px solid #FF6B3530",borderRadius:8,padding:"9px 13px",marginBottom:12,fontSize:11,color:"#FF6B35"}}>⚠️ {eq.razon_detencion}</div>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginBottom:14}}>
              {[{l:"Capacidad",v:eq.capacidad},{l:"Altura",v:eq.altura},{l:"Año",v:eq.año},{l:"Horas Uso",v:`${eq.horas_uso.toLocaleString()} h`},{l:"Ubicación",v:eq.ubicacion},{l:"Último Mant.",v:eq.ultimo_mantenimiento}].map((f,i)=>(
                <div key={i} style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:8,padding:"9px 11px"}}><div style={{fontSize:9,color:"#353840",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>{f.l}</div><div style={{fontSize:12,fontWeight:600}}>{f.v}</div></div>
              ))}
            </div>
            <div style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:8,padding:"12px 14px"}}>
              <div style={{fontSize:10,color:"#5A6070",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Vida Útil</div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#5A6070",marginBottom:4}}><span>{eq.horas_uso.toLocaleString()} h</span><span>{eq.horas_vida_util.toLocaleString()} h</span></div>
              <div style={{height:6,background:"#12151C",borderRadius:3,overflow:"hidden"}}><div style={{width:`${Math.min((eq.horas_uso/eq.horas_vida_util)*100,100)}%`,height:"100%",background:(eq.horas_uso/eq.horas_vida_util)>0.8?"#FF4444":"#00E5A0",borderRadius:3}}/></div>
              <div style={{fontSize:10,color:"#5A6070",marginTop:3}}>{((eq.horas_uso/eq.horas_vida_util)*100).toFixed(1)}% vida útil consumida</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Mantenimiento() {
  const [sel,setSel]=useState(null);
  const eq=sel?EQUIPOS_DATA.find(e=>e.id===sel):null;
  const alNivel=e=>{ if(["critico","en_reparacion"].includes(e.estado_tecnico)) return "critico"; const d=dHasta(e.proximo_mant_fecha); if(d===null||d<0) return "vencido"; if(d<=14) return "urgente"; return "ok"; };
  const alCfg={critico:{c:"#FF4444",l:"CRÍTICO"},vencido:{c:"#FF4444",l:"VENCIDO"},urgente:{c:"#FF6B35",l:"URGENTE"},ok:{c:"#00E5A0",l:"Al día"}};

  return (
    <div style={{display:"flex",flex:1,overflow:"hidden"}}>
      <div style={{width:270,borderRight:"1px solid #12151C",display:"flex",flexDirection:"column",background:"#080A10"}}>
        <div style={{padding:"10px 12px",borderBottom:"1px solid #12151C"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            {[{l:"Críticos",v:EQUIPOS_DATA.filter(e=>["critico","en_reparacion"].includes(e.estado_tecnico)).length,c:"#FF4444"},{l:"Al día",v:EQUIPOS_DATA.filter(e=>{ const d=dHasta(e.proximo_mant_fecha); return d!==null&&d>=14; }).length,c:"#00E5A0"}].map((s,i)=>(
              <div key={i} style={{background:"#12151C",borderRadius:6,padding:"7px",textAlign:"center"}}><div style={{fontSize:18,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:9,color:"#5A6070"}}>{s.l}</div></div>
            ))}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto"}}>
          {EQUIPOS_DATA.filter(e=>e.estado!=="vendido").map(e=>{const nivel=alNivel(e);const cfg=alCfg[nivel];const dias=dHasta(e.proximo_mant_fecha);const isSel=sel===e.id;return(
            <div key={e.id} onClick={()=>setSel(e.id)} style={{padding:"10px 12px",borderBottom:"1px solid #0D0F14",cursor:"pointer",background:isSel?"#0D0F14":"transparent",borderLeft:`3px solid ${isSel?cfg.c:"transparent"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,fontWeight:700}}>{e.codigo}</span><span style={{fontSize:9,fontWeight:800,color:cfg.c,background:`${cfg.c}15`,padding:"2px 6px",borderRadius:20}}>{cfg.l}</span></div>
              <div style={{fontSize:10,color:"#5A6070"}}>{e.marca} {e.modelo}</div>
              <div style={{fontSize:10,marginTop:2,color:e.estado_tecnico==="critico"?"#FF4444":dias&&dias<0?"#FF4444":dias&&dias<=14?"#FF6B35":"#5A6070"}}>
                {e.estado_tecnico==="critico"?"🚨 Crítico":e.estado_tecnico==="en_reparacion"?"🛠️ En reparación":dias===null?"—":dias<0?`Vencido ${Math.abs(dias)}d`:`Service en ${dias}d`}
              </div>
            </div>
          );})}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"18px"}}>
        {!eq?(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#1E2230"}}><div style={{fontSize:48}}>🔧</div><div style={{fontSize:13,fontWeight:700,marginTop:10,color:"#2A2D3A"}}>Selecciona un equipo</div></div>):(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
              <div><h2 style={{margin:0,fontSize:17,fontWeight:800,marginBottom:3}}>{eq.codigo} · {eq.marca} {eq.modelo}</h2><div style={{fontSize:11,color:"#5A6070"}}>{eq.serie} · {eq.tipo}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:10,color:"#5A6070"}}>Estado técnico</div><div style={{fontSize:14,fontWeight:800,color:EST_TEC[eq.estado_tecnico]?.color}}>{EST_TEC[eq.estado_tecnico]?.icon} {EST_TEC[eq.estado_tecnico]?.label}</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:9,marginBottom:14}}>
              {[
                {l:"Horas uso",v:`${eq.horas_uso.toLocaleString()} h`,c:"#D4D8E8"},
                {l:"Último service",v:eq.ultimo_mantenimiento,c:"#3B9EFF"},
                {l:"Próx. fecha",v:(()=>{const d=dHasta(eq.proximo_mant_fecha);return d===null?"—":d<0?`VENC. ${Math.abs(d)}d`:`en ${d}d`;})(),c:(()=>{const d=dHasta(eq.proximo_mant_fecha);return d&&d<0?"#FF4444":d&&d<=14?"#FF6B35":"#FFB930";})()},
                {l:"Próx. horas",v:(()=>{const h=eq.proximo_mant_horas-eq.horas_uso;return h<0?`VENC. ${Math.abs(h)}h`:`en ${h}h`;})(),c:(()=>{const h=eq.proximo_mant_horas-eq.horas_uso;return h<0?"#FF4444":h<=50?"#FF6B35":"#FFB930";})()},
              ].map((k,i)=>(
                <div key={i} style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:8,padding:"9px 11px"}}><div style={{fontSize:9,color:"#353840",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>{k.l}</div><div style={{fontSize:12,fontWeight:800,color:k.c}}>{k.v}</div></div>
              ))}
            </div>
            <div style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:8,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontSize:10,color:"#5A6070",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Vida Útil</div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#5A6070",marginBottom:4}}><span>{eq.horas_uso.toLocaleString()} h</span><span>{eq.horas_vida_util.toLocaleString()} h</span></div>
              <div style={{height:5,background:"#12151C",borderRadius:3,overflow:"hidden"}}><div style={{width:`${Math.min((eq.horas_uso/eq.horas_vida_util)*100,100)}%`,height:"100%",background:(eq.horas_uso/eq.horas_vida_util)>0.8?"#FF4444":"#3B9EFF",borderRadius:3}}/></div>
            </div>
            <button style={{width:"100%",padding:"9px",borderRadius:8,border:"1px dashed #1E2230",background:"transparent",color:"#5A6070",fontSize:11,cursor:"pointer"}}>+ Registrar Mantenimiento</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Rentas() {
  const [sel,setSel]=useState(null);
  const [tab,setTab]=useState("detalle");
  const r=sel?RENTAS_DATA.find(x=>x.id===sel):null;
  const ESTAT={cotizacion:{l:"Cotización",c:"#3B9EFF",i:"📋"},activa:{l:"Activa",c:"#00E5A0",i:"🟢"},finalizada:{l:"Finalizada",c:"#5A6070",i:"✅"}};

  return (
    <div style={{display:"flex",flex:1,overflow:"hidden"}}>
      <div style={{width:270,borderRight:"1px solid #12151C",display:"flex",flexDirection:"column",background:"#080A10"}}>
        <div style={{padding:"10px 12px",borderBottom:"1px solid #12151C"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            <div style={{background:"#12151C",borderRadius:7,padding:"8px",textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:"#00E5A0"}}>{RENTAS_DATA.filter(x=>x.estado==="activa").length}</div><div style={{fontSize:9,color:"#5A6070"}}>Activas</div></div>
            <div style={{background:"#12151C",borderRadius:7,padding:"8px",textAlign:"center"}}><div style={{fontSize:13,fontWeight:800,color:"#FFB930"}}>{fmt(RENTAS_DATA.filter(x=>x.estado==="activa").reduce((s,x)=>s+x.valor,0))}</div><div style={{fontSize:9,color:"#5A6070"}}>/mes</div></div>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto"}}>
          {RENTAS_DATA.map(x=>{const cfg=ESTAT[x.estado]||{c:"#5A6070",i:"—",l:x.estado};const venc=x.pagos.some(p=>p.estado==="vencido");const isSel=sel===x.id;const dias=dHasta(x.fecha_fin);return(
            <div key={x.id} onClick={()=>{setSel(x.id);setTab("detalle");}} style={{padding:"10px 12px",borderBottom:"1px solid #0D0F14",cursor:"pointer",background:isSel?"#0D0F14":"transparent",borderLeft:`3px solid ${isSel?cfg.c:"transparent"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><div><div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:12,fontWeight:700}}>{x.cliente}</span>{venc&&<span style={{fontSize:8,background:"#FF444415",color:"#FF4444",padding:"1px 4px",borderRadius:4,fontWeight:800}}>VENCIDO</span>}</div><div style={{fontSize:10,color:"#5A6070"}}>{x.equipo_desc.substring(0,28)}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:9,color:cfg.c,fontWeight:700}}>{cfg.i} {cfg.l}</div><div style={{fontSize:12,fontWeight:800,color:"#FFB930"}}>{fmt(x.valor)}</div></div></div>
              {x.estado==="activa"&&<div style={{fontSize:10,color:dias&&dias<=7?"#FF4444":"#5A6070"}}>⏱ {dias&&dias<0?`Venció`:`${dias}d`}</div>}
            </div>
          );})}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"18px"}}>
        {!r?(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#1E2230"}}><div style={{fontSize:48}}>📋</div><div style={{fontSize:13,fontWeight:700,marginTop:10,color:"#2A2D3A"}}>Selecciona una renta</div></div>):(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div><h2 style={{margin:0,fontSize:17,fontWeight:800,marginBottom:3}}>{r.cliente}</h2><div style={{fontSize:11,color:"#5A6070"}}>{r.cotizacion} · {r.tel}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:10,color:"#5A6070"}}>Valor {r.tipo_cobro}</div><div style={{fontSize:20,fontWeight:800,color:"#FFB930"}}>{fmt(r.valor)}</div></div></div>
            <div style={{display:"flex",gap:4,marginBottom:14}}>{["detalle","pagos","cobros_extra"].map(t=><button key={t} onClick={()=>setTab(t)} style={{padding:"5px 11px",borderRadius:6,fontSize:11,border:"none",cursor:"pointer",background:tab===t?"#12151C":"transparent",color:tab===t?"#D4D8E8":"#353840",fontWeight:tab===t?700:400}}>{t==="detalle"?"📋 Detalle":t==="pagos"?"💰 Pagos":"⚠️ Cobros Extra"}</button>)}</div>
            {tab==="detalle"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>{[{l:"Cliente",v:r.cliente},{l:"Contacto",v:r.contacto},{l:"Teléfono",v:r.tel},{l:"Cotización",v:r.cotizacion},{l:"Inicio",v:r.fecha_inicio},{l:"Fin",v:r.fecha_fin},{l:"Tipo cobro",v:r.tipo_cobro},{l:"Equipo",v:r.equipo_desc}].map((f,i)=><div key={i} style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:8,padding:"9px 11px"}}><div style={{fontSize:9,color:"#353840",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>{f.l}</div><div style={{fontSize:12,fontWeight:600}}>{f.v||"—"}</div></div>)}</div>}
            {tab==="pagos"&&<div>{r.pagos.length===0?<div style={{textAlign:"center",padding:"30px",color:"#353840"}}>Sin pagos</div>:r.pagos.map((p,i)=>{const pC={pagado:{c:"#00E5A0",i:"✅"},pendiente:{c:"#FFB930",i:"⏳"},vencido:{c:"#FF4444",i:"🔴"}}[p.estado];return<div key={i} style={{background:"#0C0E14",border:`1px solid ${pC.c}25`,borderRadius:9,padding:"11px 13px",marginBottom:7,borderLeft:`3px solid ${pC.c}`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:12,fontWeight:700}}>{p.mes}</div><div style={{fontSize:10,color:"#5A6070"}}>{p.fecha_pago?`Pagado: ${p.fecha_pago}`:p.vence?`Vence: ${p.vence}`:""}</div></div><div style={{display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:9,fontWeight:800,color:pC.c,background:`${pC.c}15`,padding:"2px 6px",borderRadius:20}}>{pC.i} {p.estado}</span><div style={{fontSize:14,fontWeight:800,color:"#FFB930"}}>{fmt(p.monto)}</div></div></div></div>;})}</div>}
            {tab==="cobros_extra"&&<div>{r.cobros_extra.length===0?<div style={{textAlign:"center",padding:"40px",color:"#353840"}}><div style={{fontSize:28,marginBottom:8}}>✅</div><div>Sin cobros extra</div></div>:r.cobros_extra.map((c,i)=><div key={i} style={{background:"#0C0E14",border:`1px solid ${c.cobrado?"#00E5A030":"#FF3B8B30"}`,borderRadius:9,padding:"11px 13px",marginBottom:7,borderLeft:`3px solid ${c.cobrado?"#00E5A0":"#FF3B8B"}`}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:12,fontWeight:700}}>{c.concepto}</div><div><div style={{fontSize:14,fontWeight:800,color:"#FF3B8B"}}>{fmt(c.monto)}</div><div style={{fontSize:9,color:c.cobrado?"#00E5A0":"#FF3B8B",fontWeight:700,textAlign:"right"}}>{c.cobrado?"Cobrado":"PENDIENTE"}</div></div></div></div>)}<button style={{width:"100%",padding:"9px",borderRadius:8,border:"1px dashed #1E2230",background:"transparent",color:"#5A6070",fontSize:11,cursor:"pointer"}}>+ Cobro extra</button></div>}
          </div>
        )}
      </div>
    </div>
  );
}

function CRM() {
  const [sel,setSel]=useState(null);
  const [filtro,setFiltro]=useState("todos");
  const cli=sel?CLIENTES_DATA.find(c=>c.id===sel):null;
  const ECLI={activo:{c:"#00E5A0",l:"Activo"},prospecto:{c:"#3B9EFF",l:"Prospecto"},frio:{c:"#FFB930",l:"Frío"}};

  return (
    <div style={{display:"flex",flex:1,overflow:"hidden"}}>
      <div style={{width:270,borderRight:"1px solid #12151C",display:"flex",flexDirection:"column",background:"#080A10"}}>
        <div style={{padding:"10px 12px",borderBottom:"1px solid #12151C"}}>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{["todos","activo","prospecto","frio"].map(f=>{const cfg=f==="todos"?{c:"#D4D8E8",l:"Todos"}:ECLI[f];return<button key={f} onClick={()=>setFiltro(f)} style={{padding:"2px 8px",borderRadius:20,fontSize:9,border:"none",cursor:"pointer",background:filtro===f?cfg.c:"#12151C",color:filtro===f?"#06080D":"#5A6070",fontWeight:filtro===f?800:400}}>{cfg.l}</button>;})}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto"}}>
          {CLIENTES_DATA.filter(c=>filtro==="todos"||c.estado===filtro).map(c=>{const ind=IND_CFG[c.industria];const ecli=ECLI[c.estado];const dias=dDesde(c.ultima_actividad);const isSel=sel===c.id;return(
            <div key={c.id} onClick={()=>setSel(c.id)} style={{padding:"10px 12px",borderBottom:"1px solid #0D0F14",cursor:"pointer",background:isSel?"#0D0F14":"transparent",borderLeft:`3px solid ${isSel?ind.color:"transparent"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><div><div style={{fontSize:12,fontWeight:700}}>{ind.icon} {c.empresa}</div><div style={{fontSize:10,color:"#5A6070"}}>{c.contacto}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:9,color:ecli.c,fontWeight:700}}>{ecli.l}</div>{c.valor_total>0&&<div style={{fontSize:11,fontWeight:700,color:"#FFB930"}}>{fmt(c.valor_total)}</div>}</div></div>
              <div style={{fontSize:10,color:dias>30?"#FFB930":"#353840"}}>⏱ {dias===0?"Hoy":`hace ${dias}d`}</div>
            </div>
          );})}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"18px"}}>
        {!cli?(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#1E2230"}}><div style={{fontSize:48}}>👥</div><div style={{fontSize:13,fontWeight:700,marginTop:10,color:"#2A2D3A"}}>Selecciona un cliente</div></div>):(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div><h2 style={{margin:0,fontSize:17,fontWeight:800,marginBottom:3}}>{IND_CFG[cli.industria].icon} {cli.empresa}</h2><div style={{fontSize:11,color:"#5A6070"}}>{cli.contacto} · {cli.cargo}</div><div style={{fontSize:11,color:"#353840"}}>{cli.email} · {cli.ciudad}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:10,color:"#5A6070"}}>Total rentas</div><div style={{fontSize:20,fontWeight:800,color:"#FFB930"}}>{fmt(cli.valor_total)}</div></div></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginBottom:14}}>{[{l:"Estado",v:cli.estado,c:ECLI[cli.estado]?.c||"#5A6070"},{l:"Última actividad",v:`hace ${dDesde(cli.ultima_actividad)}d`,c:dDesde(cli.ultima_actividad)>30?"#FFB930":"#D4D8E8"},{l:"Opps activas",v:cli.opps_activas,c:"#3B9EFF"}].map((s,i)=><div key={i} style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:8,padding:"9px 11px"}}><div style={{fontSize:9,color:"#353840",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>{s.l}</div><div style={{fontSize:16,fontWeight:800,color:s.c}}>{s.v}</div></div>)}</div>
            {OPPS_DATA.filter(o=>o.cliente.includes(cli.empresa.split(" ")[0])).map((o,i)=>(
              <div key={i} style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:8,padding:"11px 13px",marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:12,fontWeight:700}}>{o.titulo}</div><div style={{fontSize:10,color:"#5A6070"}}>{o.etapa} · {o.prob}%</div></div><div style={{fontSize:14,fontWeight:800,color:"#FFB930"}}>{fmt(o.valor)}</div></div></div>
            ))}
            <button style={{width:"100%",padding:"9px",borderRadius:8,border:"1px dashed #1E2230",background:"transparent",color:"#5A6070",fontSize:11,cursor:"pointer"}}>+ Registrar actividad</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Seguimiento() {
  const [sel,setSel]=useState(null);
  const opp=sel?OPPS_DATA.find(o=>o.id===sel):null;

  return (
    <div style={{display:"flex",flex:1,overflow:"hidden"}}>
      <div style={{width:270,borderRight:"1px solid #12151C",display:"flex",flexDirection:"column",background:"#080A10"}}>
        <div style={{padding:"10px 12px",borderBottom:"1px solid #12151C"}}><div style={{fontSize:10,color:"#5A6070",letterSpacing:"0.1em"}}>OPORTUNIDADES +$10,000</div><div style={{fontSize:12,fontWeight:700,color:"#FFB930",marginTop:2}}>{fmt(OPPS_DATA.reduce((s,o)=>s+o.valor,0))} pipeline</div></div>
        <div style={{flex:1,overflowY:"auto"}}>
          {OPPS_DATA.map(o=>{const dias=dDesde(o.ultimo_seguimiento);const alerta=dias>=2;const isSel=sel===o.id;return(
            <div key={o.id} onClick={()=>setSel(o.id)} style={{padding:"11px 12px",borderBottom:"1px solid #0D0F14",cursor:"pointer",background:isSel?"#0D0F14":"transparent",borderLeft:`3px solid ${isSel?(alerta?"#FF4444":"#FF6B35"):"transparent"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><div><div style={{display:"flex",gap:5,alignItems:"center"}}><span style={{fontSize:12,fontWeight:700}}>{o.cliente}</span>{alerta&&<span style={{fontSize:8,background:"#FF444415",color:"#FF4444",padding:"1px 4px",borderRadius:4,fontWeight:800}}>⚠️</span>}</div><div style={{fontSize:10,color:"#5A6070"}}>{o.titulo}</div></div><div style={{fontSize:13,fontWeight:800,color:"#FFB930"}}>{fmt(o.valor)}</div></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10}}><span style={{color:"#5A6070"}}>{o.etapa} · {o.prob}%</span><span style={{color:alerta?"#FF4444":"#5A6070"}}>hace {dias}d</span></div>
              <div style={{marginTop:4,height:3,background:"#12151C",borderRadius:2}}><div style={{width:`${o.prob}%`,height:"100%",background:alerta?"#FF4444":"#FF6B35",borderRadius:2}}/></div>
            </div>
          );})}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"18px"}}>
        {!opp?(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#1E2230"}}><div style={{fontSize:48}}>🎯</div><div style={{fontSize:13,fontWeight:700,marginTop:10,color:"#2A2D3A"}}>Selecciona una oportunidad</div></div>):(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div><div style={{fontSize:9,color:"#FF6B35",fontWeight:800,letterSpacing:"0.1em",marginBottom:4}}>🎯 SEGUIMIENTO PROFUNDO · +$10,000</div><h2 style={{margin:0,fontSize:17,fontWeight:800,marginBottom:3}}>{opp.titulo}</h2><div style={{fontSize:11,color:"#5A6070"}}>{opp.cliente} · 👤 {opp.vendedor}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:22,fontWeight:800,color:"#FFB930"}}>{fmt(opp.valor)}</div><div style={{fontSize:11,color:"#FF6B35"}}>{opp.prob}% prob.</div></div></div>
            {dDesde(opp.ultimo_seguimiento)>=2&&<div style={{background:"#FF444410",border:"1px solid #FF444430",borderRadius:9,padding:"12px 14px",marginBottom:14}}><div style={{fontSize:12,fontWeight:800,color:"#FF4444",marginBottom:3}}>🚨 ALERTA — {dDesde(opp.ultimo_seguimiento)*24}h sin seguimiento</div><div style={{fontSize:11,color:"#FF4444"}}>Esta oportunidad de {fmt(opp.valor)} requiere contacto inmediato.</div></div>}
            <div style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:9,padding:"14px",marginBottom:12}}>
              <div style={{fontSize:11,fontWeight:700,color:"#8A8FA0",marginBottom:10}}>PREGUNTAS DE SEGUIMIENTO</div>
              {["¿Cuándo estima cerrar?","¿Cuándo y cómo pagan?","¿Con quién más cotizan?","¿Cuál es el obstáculo para cerrar?","¿Tienen presupuesto aprobado?"].map((p,i)=>(
                <div key={i} style={{marginBottom:9}}><div style={{fontSize:11,color:"#8A8FA0",marginBottom:4}}><span style={{color:"#FF6B35",marginRight:5}}>{i+1}.</span>{p}</div><input placeholder="Respuesta..." style={{width:"100%",boxSizing:"border-box",background:"#141720",border:"1px solid #1E2230",borderRadius:7,padding:"7px 10px",color:"#D4D8E8",fontSize:11,outline:"none"}}/></div>
              ))}
            </div>
            <button style={{width:"100%",padding:"10px",borderRadius:8,border:"none",background:"linear-gradient(135deg,#FF6B35,#FF3B8B)",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer"}}>🎯 Guardar Seguimiento →</button>
          </div>
        )}
      </div>
    </div>
  );
}

function ElsaModule() {
  const [msgs,setMsgs]=useState([{role:"assistant",content:"¡Hola! Soy **ELSA** 🤖, la asistente IA de Montasa Handling Co.\n\nEstoy conectada a todos los módulos. Puedo ayudarte a:\n\n• 📝 **Agregar datos** paso a paso\n• 🔍 **Consultar** estados, alertas y reportes\n• ✏️ **Sugerir cambios** en la interfaz o procesos\n• 💡 **Enviar sugerencias** a gerencia\n• 📊 **Analizar** pipeline, inversiones y flota\n\n¿Con qué empezamos?"}]);
  const [inp,setInp]=useState("");
  const [loading,setLoading]=useState(false);
  const ref=useRef(null);

  useEffect(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},[msgs]);

  const enviar=async(t)=>{
    const texto=t||inp.trim();if(!texto||loading)return;setInp("");
    const nuevos=[...msgs,{role:"user",content:texto}];setMsgs(nuevos);setLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:1000,
        system:`Eres ELSA, asistente IA de Montasa Handling Co. con acceso total al sistema.
Datos actuales del sistema:
- Flota: ${EQUIPOS_DATA.length} equipos. Disponibles: ${EQUIPOS_DATA.filter(e=>e.estado==="disponible").length}. En renta: ${EQUIPOS_DATA.filter(e=>e.estado==="renta").length}. Críticos: MT55 (transmisión averiada), EL22 (módulo eléctrico quemado).
- Rentas activas: ${RENTAS_DATA.filter(r=>r.estado==="activa").length}. Ingresos/mes: ${fmt(RENTAS_DATA.filter(r=>r.estado==="activa").reduce((s,r)=>s+r.valor,0))}. Pago vencido: Zona Franca $425.
- CRM: ${CLIENTES_DATA.length} clientes. Activos: ${CLIENTES_DATA.filter(c=>c.estado==="activo").length}. Pipeline total: ${fmt(OPPS_DATA.reduce((s,o)=>s+o.valor,0))}.
- Oportunidades +$10k: INGCA $22,500 (40%), Zona Franca $14,400 (60%), Const. Ríos $18,000 (75%).
- Alertas activas: ${ALERTAS_DATA.filter(a=>["critico","urgente"].includes(a.tipo)).length}. Sugerencias sin leer: ${SUGERENCIAS_DATA.filter(s=>!s.leida).length}.
Responde siempre en español. Sé proactiva, usa emojis ocasionalmente. Si el usuario quiere agregar datos, guíalo paso a paso. Si quiere cambiar la interfaz, registra y confirma. Máximo 150 palabras salvo reportes.`,
        messages:nuevos.map(m=>({role:m.role,content:m.content})),
      })});
      const d=await res.json();
      setMsgs(p=>[...p,{role:"assistant",content:d.content?.[0]?.text||"Error de conexión."}]);
    }catch{setMsgs(p=>[...p,{role:"assistant",content:"⚠️ Error de conexión. Intenta de nuevo."}]);}
    finally{setLoading(false);}
  };

  const md=t=>t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br/>");

  return(
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"}}>
      <div style={{padding:"9px 14px",borderBottom:"1px solid #12151C",background:"#080A10",overflowX:"auto"}}>
        <div style={{display:"flex",gap:5,minWidth:"max-content"}}>
          {[{i:"📊",t:"Dame un resumen de Montasa hoy"},{i:"🚨",t:"¿Qué necesita atención urgente?"},{i:"➕",t:"Quiero agregar un equipo nuevo"},{i:"💰",t:"¿Cuánto generamos este mes?"},{i:"📋",t:"Clientes sin contacto en 30+ días"},{i:"🎯",t:"Oportunidades en riesgo de perderse"},{i:"💡",t:"Quiero enviar una sugerencia"},{i:"🔧",t:"Equipos con mantenimiento urgente"}].map((a,i)=>(
            <button key={i} onClick={()=>enviar(a.t)} style={{padding:"4px 10px",borderRadius:20,fontSize:10,border:"1px solid #1E2230",background:"#0C0E14",color:"#8A8FA0",cursor:"pointer",whiteSpace:"nowrap"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#FFB930";e.currentTarget.style.color="#FFB930";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#1E2230";e.currentTarget.style.color="#8A8FA0";}}>{a.i} {a.t}</button>
          ))}
        </div>
      </div>
      <div ref={ref} style={{flex:1,overflowY:"auto",padding:"18px 20px",display:"flex",flexDirection:"column",gap:12}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",flexDirection:m.role==="user"?"row-reverse":"row",alignItems:"flex-end",gap:7}}>
            <div style={{width:30,height:30,borderRadius:"50%",flexShrink:0,background:m.role==="assistant"?"linear-gradient(135deg,#FFB930,#FF3B8B)":"#3B9EFF20",border:`1px solid ${m.role==="assistant"?"#FF6B3540":"#3B9EFF30"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{m.role==="assistant"?"🤖":"👔"}</div>
            <div style={{maxWidth:"72%",background:m.role==="assistant"?"#0E1018":"#3B9EFF18",border:`1px solid ${m.role==="assistant"?"#1E2230":"#3B9EFF30"}`,borderRadius:m.role==="assistant"?"4px 12px 12px 12px":"12px 4px 12px 12px",padding:"11px 13px",fontSize:12,lineHeight:1.6,color:"#D4D8E8"}} dangerouslySetInnerHTML={{__html:md(m.content)}}/>
          </div>
        ))}
        {loading&&<div style={{display:"flex",alignItems:"flex-end",gap:7}}><div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#FFB930,#FF3B8B)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🤖</div><div style={{background:"#0E1018",border:"1px solid #1E2230",borderRadius:"4px 12px 12px 12px",padding:"13px 15px",display:"flex",gap:4}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"#FF6B35",animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}</div></div>}
      </div>
      <div style={{padding:"11px 14px",borderTop:"1px solid #12151C",background:"#080A10",display:"flex",gap:7,alignItems:"flex-end"}}>
        <textarea value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();enviar();}}} placeholder="Escribe tu mensaje... (Enter para enviar)" rows={1} style={{flex:1,background:"#0C0E14",border:"1px solid #1E2230",borderRadius:9,padding:"9px 13px",color:"#D4D8E8",fontSize:12,outline:"none",resize:"none",fontFamily:"inherit"}}/>
        <button onClick={()=>enviar()} disabled={!inp.trim()||loading} style={{width:38,height:38,borderRadius:9,border:"none",background:inp.trim()&&!loading?"linear-gradient(135deg,#FFB930,#FF6B35)":"#12151C",color:inp.trim()&&!loading?"#06080D":"#353840",cursor:inp.trim()&&!loading?"pointer":"default",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>→</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP SHELL
// ═══════════════════════════════════════════════════════════════════════════════

export default function MontasaApp() {
  const [mod,setMod]=useState("dashboard");
  const alertasTotal=ALERTAS_DATA.filter(a=>["critico","urgente"].includes(a.tipo)).length;
  const criticas=ALERTAS_DATA.filter(a=>a.tipo==="critico").length;

  return (
    <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",background:"#06080D",height:"100vh",display:"flex",flexDirection:"column",color:"#D4D8E8",overflow:"hidden"}}>

      {/* TOP NAV */}
      <div style={{borderBottom:"1px solid #12151C",padding:"0 14px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#080A10",height:48,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,#FFB930,#FF6B35)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🏗️</div>
          <div><div style={{fontSize:12,fontWeight:800,letterSpacing:"0.04em"}}>MONTASA HANDLING CO.</div><div style={{fontSize:8,color:"#2E3240",letterSpacing:"0.12em"}}>SISTEMA INTEGRAL v1.0</div></div>
        </div>

        <div style={{display:"flex",gap:0}}>
          {NAV.map(item=>{
            const activo=mod===item.id;
            return(
              <button key={item.id} onClick={()=>setMod(item.id)} style={{padding:"0 11px",height:48,border:"none",cursor:"pointer",background:activo?"#12151C":"transparent",color:activo?"#D4D8E8":"#353840",fontSize:11,fontWeight:activo?700:400,borderBottom:activo?"2px solid #FFB930":"2px solid transparent",display:"flex",alignItems:"center",gap:4,position:"relative",transition:"all 0.15s"}}
                onMouseEnter={e=>{if(!activo){e.currentTarget.style.color="#8A8FA0";e.currentTarget.style.background="#0C0E14";}}}
                onMouseLeave={e=>{if(!activo){e.currentTarget.style.color="#353840";e.currentTarget.style.background="transparent";}}}
              >
                <span>{item.icon}</span><span>{item.label}</span>
                {item.id==="dashboard"&&alertasTotal>0&&<span style={{position:"absolute",top:7,right:3,width:14,height:14,borderRadius:"50%",background:"#FF4444",color:"#fff",fontSize:8,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center"}}>{alertasTotal}</span>}
                {item.id==="elsa"&&criticas>0&&<span style={{width:6,height:6,borderRadius:"50%",background:"#FF6B35",animation:"elsaPulse 2s ease-in-out infinite"}}/>}
              </button>
            );
          })}
        </div>

        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{fontSize:10,color:"#353840"}}>Jue 9 Abr 2025</div>
          <div style={{display:"flex",alignItems:"center",gap:5,background:"#12151C",border:"1px solid #1E2230",borderRadius:7,padding:"4px 8px"}}>
            <div style={{width:18,height:18,borderRadius:"50%",background:"linear-gradient(135deg,#FFB930,#FF6B35)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9}}>👔</div>
            <span style={{fontSize:11,fontWeight:600}}>Gerencia</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        {mod==="dashboard"    &&<Dashboard navigate={setMod}/>}
        {mod==="flota"        &&<Flota/>}
        {mod==="mantenimiento"&&<Mantenimiento/>}
        {mod==="rentas"       &&<Rentas/>}
        {mod==="crm"          &&<CRM/>}
        {mod==="seguimiento"  &&<Seguimiento/>}
        {mod==="elsa"         &&<ElsaModule/>}
      </div>

      {/* FOOTER */}
      <div style={{borderTop:"1px solid #0D0F14",padding:"4px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#080A10",flexShrink:0}}>
        <span style={{fontSize:8,color:"#1E2230",letterSpacing:"0.1em"}}>MONTASA HANDLING CO. · SISTEMA INTEGRAL v1.0</span>
        <div style={{display:"flex",gap:10}}>
          {Object.entries(STATUS_CFG).map(([k,v])=>{const c=EQUIPOS_DATA.filter(e=>e.estado===k).length;if(!c)return null;return<span key={k} style={{display:"flex",alignItems:"center",gap:3,fontSize:8,color:"#353840"}}><span style={{width:4,height:4,borderRadius:"50%",background:v.color,display:"inline-block"}}/>{c} {v.label}</span>;})}
        </div>
      </div>

      {/* ELSA FLOATING */}
      {mod!=="elsa"&&<ElsaFloat mod={mod}/>}

      <style>{`
        @keyframes elsaPulse{0%,100%{box-shadow:0 0 0 0 #FF6B3540,0 4px 20px #FF6B3540}50%{box-shadow:0 0 0 10px #FF6B3508,0 4px 20px #FF6B3540}}
        @keyframes pulse{0%,80%,100%{opacity:0.3;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:#0A0C12}
        ::-webkit-scrollbar-thumb{background:#1E2230;border-radius:2px}
      `}</style>
    </div>
  );
}
