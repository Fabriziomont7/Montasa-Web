/* eslint-disable */
import { createClient } from '@supabase/supabase-js';
import { useState, useRef, useEffect } from "react";

const supabase = createClient(
  'https://xstrugwgpozoipgjjspy.supabase.co',
  'sb_publishable_vSdEcWognHjuLuAnjJHq3A_C_zwP6W0'
);

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

const STATUS_CFG = {
  disponible:    { label:"Disponible",    color:"#00E5A0", icon:"✅" },
  en_renta:      { label:"En Renta",      color:"#3B9EFF", icon:"📋" },
  mantenimiento: { label:"Mantenimiento", color:"#FFB930", icon:"🔧" },
  detenido:      { label:"Detenido",      color:"#FF6B35", icon:"⚠️" },
  reparacion:    { label:"Por Reparar",   color:"#FF3B8B", icon:"🛠️" },
  vendido:       { label:"Vendido",       color:"#5A6070", icon:"💼" },
  inactivo:      { label:"Inactivo",      color:"#5A6070", icon:"⛔" },
  desconocido:   { label:"Sin estado",    color:"#353840", icon:"❓" },
};

const EST_TEC = {
  bueno:         { label:"Bueno",         color:"#00E5A0", icon:"✅" },
  en_reparacion: { label:"En Reparación", color:"#FF3B8B", icon:"🛠️" },
  critico:       { label:"Crítico",       color:"#FF4444", icon:"🚨" },
};

const IND_CFG = {
  constructora:{ label:"Constructora", color:"#FF6B35", icon:"🏗️" },
  logistica:   { label:"Almacén/Log.", color:"#3B9EFF", icon:"📦" },
  zonafranca:  { label:"Zona Franca",  color:"#00E5A0", icon:"🏭" },
  otro:        { label:"Otro",         color:"#8A8FA0", icon:"🏢" },
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

function ElsaFloat({ mod, equiposCount }) {
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState([]);
  const [inp,setInp]=useState("");
  const [loading,setLoading]=useState(false);
  const ref=useRef(null);
  const criticas=ALERTAS_DATA.filter(a=>a.tipo==="critico").length;

  useEffect(()=>{
    if(open&&msgs.length===0){
      setMsgs([{role:"assistant",content:`¡Hola! Soy **ELSA** 🤖 Estás en **${NAV.find(n=>n.id===mod)?.label}**. Tenés **${equiposCount} equipos reales** en Supabase. ¿En qué te ayudo?`}]);
    }
    if(open&&ref.current) setTimeout(()=>{ref.current.scrollTop=ref.current.scrollHeight;},100);
  },[open,mod,equiposCount]);

  useEffect(()=>{ if(ref.current) ref.current.scrollTop=ref.current.scrollHeight; },[msgs]);

  const enviar=async(t)=>{
    const texto=t||inp.trim(); if(!texto||loading) return; setInp("");
    const nuevos=[...msgs,{role:"user",content:texto}]; setMsgs(nuevos); setLoading(true);
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:1000,
        system:`Eres ELSA, asistente IA de Montasa Handling Co. Módulo: ${mod}. Flota real: ${equiposCount} equipos en Supabase. Responde en español, máx 80 palabras, usa emojis.`,
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
              <div><div style={{fontSize:12,fontWeight:800}}>ELSA</div><div style={{fontSize:9,color:"#353840"}}>{equiposCount} equipos · Supabase ✅</div></div>
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
      <button onClick={()=>setOpen(!open)} style={{position:"fixed",bottom:18,right:18,width:50,height:50,borderRadius:"50%",background:"linear-gradient(135deg,#FFB930,#FF6B35,#FF3B8B)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:"0 4px 20px #FF6B3540",zIndex:1001,animation:criticas>0?"elsaPulse 2s ease-in-out infinite":"none"}}>🤖</button>
    </>
  );
}

function Dashboard({navigate, equipos}) {
  const ingresos=RENTAS_DATA.filter(r=>r.estado==="activa").reduce((s,r)=>s+r.valor,0);
  const pipeline=OPPS_DATA.reduce((s,o)=>s+o.valor,0);
  const alertasTotal=ALERTAS_DATA.filter(a=>["critico","urgente"].includes(a.tipo)).length;
  const disponibles=equipos.filter(e=>e.estado==="disponible").length;

  return (
    <div style={{padding:"16px",overflowY:"auto",flex:1}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:16}}>
        {[
          {label:"Ingresos/mes",val:fmt(ingresos),color:"#00E5A0",icon:"💰",nav:"rentas"},
          {label:"Disponibles",val:disponibles,color:"#3B9EFF",icon:"🏗️",nav:"flota"},
          {label:"Pipeline",val:fmt(pipeline),color:"#FFB930",icon:"🎯",nav:"seguimiento"},
          {label:"Alertas",val:alertasTotal,color:"#FF4444",icon:"🚨",nav:"mantenimiento"},
          {label:"Total Flota",val:equipos.length,color:"#FF3B8B",icon:"📊",nav:"flota"},
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
          <div style={{padding:"11px 14px",borderBottom:"1px solid #12151C"}}>
            <div style={{fontSize:12,fontWeight:800}}>🏗️ Estado Flota</div>
            <div style={{fontSize:10,color:"#00E5A0",marginTop:2}}>✅ {equipos.length} equipos · Supabase</div>
          </div>
          <div style={{padding:"12px"}}>
            {Object.entries(STATUS_CFG).map(([k,v])=>{
              const c=equipos.filter(e=>e.estado===k).length;
              if(!c) return null;
              return (
                <div key={k} onClick={()=>navigate("flota")} style={{display:"flex",alignItems:"center",gap:7,marginBottom:7,cursor:"pointer"}}>
                  <span style={{fontSize:12}}>{v.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:10,color:"#8A8FA0"}}>{v.label}</span><span style={{fontSize:11,fontWeight:700,color:v.color}}>{c}</span></div>
                    <div style={{height:3,background:"#12151C",borderRadius:2}}><div style={{width:`${(c/equipos.length)*100}%`,height:"100%",background:v.color,borderRadius:2}}/></div>
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
  const [equipos,setEquipos]=useState([]);
  const [loading,setLoading]=useState(true);
  const [sel,setSel]=useState(null);
  const [filtro,setFiltro]=useState("todos");
  const [search,setSearch]=useState("");
  const [showForm,setShowForm]=useState(false);
  const [guardando,setGuardando]=useState(false);
  const [form,setForm]=useState({codigo:"",marca:"",tipo_equipo:"",modelo:"",serie:"",año:"",combustible:"DIESEL",capacidad_kg:"",capacidad_elevacion_m:"",estado:"disponible",ubicacion:"",observaciones:"",costo_adquisicion:"",estado_tecnico:"bueno"});

  useEffect(()=>{ cargarEquipos(); },[]);

  const cargarEquipos = async () => {
    setLoading(true);
    const {data,error} = await supabase.from('equipos').select('*').order('codigo');
    if (!error && data) setEquipos(data);
    setLoading(false);
  };

  const guardarEquipo = async () => {
    if(!form.codigo||!form.marca) return alert("Código y marca son requeridos");
    setGuardando(true);
    const payload = {
      ...form,
      año:form.año?parseInt(form.año):null,
      capacidad_kg:form.capacidad_kg?parseFloat(form.capacidad_kg):null,
      capacidad_elevacion_m:form.capacidad_elevacion_m?parseFloat(form.capacidad_elevacion_m):null,
      costo_adquisicion:form.costo_adquisicion?parseFloat(form.costo_adquisicion):null,
      inversion_total:form.costo_adquisicion?parseFloat(form.costo_adquisicion):null
    };
    const {error} = await supabase.from('equipos').insert([payload]);
    if (!error) {
      await cargarEquipos();
      setShowForm(false);
      setForm({codigo:"",marca:"",tipo_equipo:"",modelo:"",serie:"",año:"",combustible:"DIESEL",capacidad_kg:"",capacidad_elevacion_m:"",estado:"disponible",ubicacion:"",observaciones:"",costo_adquisicion:"",estado_tecnico:"bueno"});
    } else {
      alert("Error al guardar: " + error.message);
    }
    setGuardando(false);
  };

  const eq=sel?equipos.find(e=>e.id===sel):null;
  const filtered=equipos.filter(e=>(filtro==="todos"||e.estado===filtro)&&(!search||[e.codigo,e.tipo_equipo,e.marca,e.modelo].filter(Boolean).some(v=>v.toLowerCase().includes(search.toLowerCase()))));

  return (
    <div style={{display:"flex",flex:1,overflow:"hidden",position:"relative"}}>
      {showForm&&(
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#06080Dcc",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
          <div style={{background:"#0E1018",border:"1px solid #1E2230",borderRadius:14,padding:"24px",width:520,maxHeight:"85vh",overflowY:"auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <div style={{fontSize:15,fontWeight:800}}>➕ Nuevo Equipo</div>
              <button onClick={()=>setShowForm(false)} style={{background:"none",border:"none",color:"#5A6070",fontSize:18,cursor:"pointer"}}>✕</button>
            </div>
            {[
              {l:"Código * (ej: MT-50)",k:"codigo",t:"text"},{l:"Marca *",k:"marca",t:"text"},
              {l:"Tipo de Equipo",k:"tipo_equipo",t:"text"},{l:"Modelo",k:"modelo",t:"text"},
              {l:"N° Serie",k:"serie",t:"text"},{l:"Año",k:"año",t:"number"},
              {l:"Combustible",k:"combustible",t:"select",ops:["DIESEL","ELÉCTRICO","DUAL","GAS"]},
              {l:"Capacidad (kg)",k:"capacidad_kg",t:"number"},{l:"Altura máx. (m)",k:"capacidad_elevacion_m",t:"number"},
              {l:"Estado",k:"estado",t:"select",ops:["disponible","en_renta","mantenimiento","detenido","reparacion","inactivo"]},
              {l:"Estado Técnico",k:"estado_tecnico",t:"select",ops:["bueno","en_reparacion","critico"]},
              {l:"Ubicación",k:"ubicacion",t:"text"},{l:"Costo Adquisición ($)",k:"costo_adquisicion",t:"number"},
              {l:"Observaciones",k:"observaciones",t:"textarea"},
            ].map((f,i)=>(
              <div key={i} style={{marginBottom:10}}>
                <div style={{fontSize:10,color:"#5A6070",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4}}>{f.l}</div>
                {f.t==="select"?(
                  <select value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})} style={{width:"100%",background:"#141720",border:"1px solid #1E2230",borderRadius:7,padding:"8px 10px",color:"#D4D8E8",fontSize:12,outline:"none"}}>
                    {f.ops.map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                ):f.t==="textarea"?(
                  <textarea value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})} rows={2} style={{width:"100%",boxSizing:"border-box",background:"#141720",border:"1px solid #1E2230",borderRadius:7,padding:"8px 10px",color:"#D4D8E8",fontSize:12,outline:"none",resize:"none"}}/>
                ):(
                  <input type={f.t} value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})} style={{width:"100%",boxSizing:"border-box",background:"#141720",border:"1px solid #1E2230",borderRadius:7,padding:"8px 10px",color:"#D4D8E8",fontSize:12,outline:"none"}}/>
                )}
              </div>
            ))}
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button onClick={()=>setShowForm(false)} style={{flex:1,padding:"10px",borderRadius:8,border:"1px solid #1E2230",background:"transparent",color:"#5A6070",fontSize:12,cursor:"pointer"}}>Cancelar</button>
              <button onClick={guardarEquipo} disabled={guardando} style={{flex:2,padding:"10px",borderRadius:8,border:"none",background:"linear-gradient(135deg,#00E5A0,#3B9EFF)",color:"#06080D",fontSize:12,fontWeight:800,cursor:"pointer"}}>
                {guardando?"Guardando...":"✅ Guardar en Supabase →"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{width:270,borderRight:"1px solid #12151C",display:"flex",flexDirection:"column",background:"#080A10"}}>
        <div style={{padding:"10px 12px",borderBottom:"1px solid #12151C"}}>
          <input placeholder="🔍 Buscar..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%",boxSizing:"border-box",background:"#12151C",border:"1px solid #1E2230",borderRadius:7,padding:"7px 10px",color:"#D4D8E8",fontSize:11,outline:"none",marginBottom:7}}/>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:7}}>
            {["todos",...Object.keys(STATUS_CFG)].map(f=>{const cfg=f==="todos"?{color:"#D4D8E8",label:"Todos"}:STATUS_CFG[f];return <button key={f} onClick={()=>setFiltro(f)} style={{padding:"2px 7px",borderRadius:20,fontSize:9,border:"none",cursor:"pointer",background:filtro===f?cfg.color:"#12151C",color:filtro===f?"#06080D":"#5A6070",fontWeight:filtro===f?800:400}}>{cfg.label||"Todos"}</button>;})}
          </div>
          <button onClick={()=>setShowForm(true)} style={{width:"100%",padding:"7px",borderRadius:7,border:"none",background:"linear-gradient(135deg,#00E5A0,#3B9EFF)",color:"#06080D",fontSize:11,fontWeight:800,cursor:"pointer"}}>+ Agregar Equipo</button>
        </div>
        <div style={{flex:1,overflowY:"auto"}}>
          {loading?(
            <div style={{padding:"20px",textAlign:"center",color:"#5A6070",fontSize:11}}>⏳ Cargando equipos desde Supabase...</div>
          ):filtered.length===0?(
            <div style={{padding:"20px",textAlign:"center",color:"#5A6070",fontSize:11}}>Sin resultados</div>
          ):filtered.map(e=>{
            const st=STATUS_CFG[e.estado]||{color:"#5A6070",label:e.estado||"—",icon:"❓"};
            const isSel=sel===e.id;
            return (
              <div key={e.id} onClick={()=>setSel(e.id)} style={{padding:"10px 12px",borderBottom:"1px solid #0D0F14",cursor:"pointer",background:isSel?"#0D0F14":"transparent",borderLeft:`3px solid ${isSel?st.color:"transparent"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontSize:12,fontWeight:700}}>{e.codigo||"Sin código"}</div>
                    <div style={{fontSize:10,color:"#5A6070"}}>{e.marca} {e.modelo}</div>
                    <div style={{fontSize:10,color:"#353840"}}>{e.tipo_equipo}{e.capacidad_kg?` · ${e.capacidad_kg.toLocaleString()} kg`:""}</div>
                  </div>
                  <span style={{fontSize:9,fontWeight:700,color:st.color,background:`${st.color}15`,border:`1px solid ${st.color}30`,borderRadius:20,padding:"2px 6px",whiteSpace:"nowrap"}}>{st.icon} {st.label}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{padding:"7px 12px",borderTop:"1px solid #12151C",background:"#080A10",fontSize:9,color:"#5A6070",textAlign:"center"}}>
          {filtered.length} de {equipos.length} equipos · Supabase ✅
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"18px"}}>
        {!eq?(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#1E2230"}}>
            <div style={{fontSize:48}}>🏗️</div>
            <div style={{fontSize:13,fontWeight:700,marginTop:10,color:"#2A2D3A"}}>Selecciona un equipo</div>
            <div style={{fontSize:11,color:"#1E2230",marginTop:4}}>{equipos.length} equipos reales · Supabase ✅</div>
          </div>
        ):(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <h2 style={{margin:0,fontSize:18,fontWeight:800}}>{eq.codigo}</h2>
                  {eq.estado&&<span style={{fontSize:9,fontWeight:700,color:(STATUS_CFG[eq.estado]||{color:"#5A6070"}).color,background:`${(STATUS_CFG[eq.estado]||{color:"#5A6070"}).color}15`,borderRadius:20,padding:"3px 9px"}}>{(STATUS_CFG[eq.estado]||{icon:"❓",label:eq.estado}).icon} {(STATUS_CFG[eq.estado]||{label:eq.estado}).label}</span>}
                  {eq.estado_tecnico&&EST_TEC[eq.estado_tecnico]&&<span style={{fontSize:9,fontWeight:700,color:EST_TEC[eq.estado_tecnico].color,background:`${EST_TEC[eq.estado_tecnico].color}15`,borderRadius:20,padding:"3px 9px"}}>{EST_TEC[eq.estado_tecnico].icon} {EST_TEC[eq.estado_tecnico].label}</span>}
                </div>
                <div style={{fontSize:11,color:"#5A6070"}}>{eq.tipo_equipo} · {eq.marca} {eq.modelo}</div>
                {eq.serie&&<div style={{fontSize:10,color:"#353840"}}>Serie: {eq.serie}</div>}
              </div>
              <div style={{textAlign:"right"}}>
                {eq.costo_adquisicion&&<><div style={{fontSize:10,color:"#5A6070"}}>Costo Adquisición</div><div style={{fontSize:18,fontWeight:800,color:"#FFB930"}}>{fmt(eq.costo_adquisicion)}</div></>}
              </div>
            </div>
            {eq.observaciones&&<div style={{background:"#FFB93010",border:"1px solid #FFB93030",borderRadius:8,padding:"9px 13px",marginBottom:12,fontSize:11,color:"#FFB930"}}>📝 {eq.observaciones}</div>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginBottom:14}}>
              {[
                {l:"Capacidad",v:eq.capacidad_kg?`${eq.capacidad_kg.toLocaleString()} kg`:"—"},
                {l:"Altura máx.",v:eq.capacidad_elevacion_m?`${eq.capacidad_elevacion_m} m`:"—"},
                {l:"Combustible",v:eq.combustible||"—"},
                {l:"Año",v:eq.año||"—"},
                {l:"Ubicación",v:eq.ubicacion||"—"},
                {l:"Estado técnico",v:eq.estado_tecnico||"—"},
              ].map((f,i)=>(
                <div key={i} style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:8,padding:"9px 11px"}}>
                  <div style={{fontSize:9,color:"#353840",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>{f.l}</div>
                  <div style={{fontSize:12,fontWeight:600}}>{f.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Mantenimiento({ equipos }) {
  const [sel,setSel]=useState(null);
  const eq=sel?equipos.find(e=>e.id===sel):null;
  const alNivel=e=>{ if(["critico","en_reparacion"].includes(e.estado_tecnico)) return "critico"; return "ok"; };
  const alCfg={critico:{c:"#FF4444",l:"CRÍTICO"},ok:{c:"#00E5A0",l:"Al día"}};

  return (
    <div style={{display:"flex",flex:1,overflow:"hidden"}}>
      <div style={{width:270,borderRight:"1px solid #12151C",display:"flex",flexDirection:"column",background:"#080A10"}}>
        <div style={{padding:"10px 12px",borderBottom:"1px solid #12151C"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            {[{l:"Críticos",v:equipos.filter(e=>["critico","en_reparacion"].includes(e.estado_tecnico)).length,c:"#FF4444"},{l:"Al día",v:equipos.filter(e=>e.estado_tecnico==="bueno").length,c:"#00E5A0"}].map((s,i)=>(
              <div key={i} style={{background:"#12151C",borderRadius:6,padding:"7px",textAlign:"center"}}><div style={{fontSize:18,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:9,color:"#5A6070"}}>{s.l}</div></div>
            ))}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto"}}>
          {equipos.filter(e=>e.estado!=="vendido").map(e=>{
            const nivel=alNivel(e);const cfg=alCfg[nivel];const isSel=sel===e.id;
            return(
              <div key={e.id} onClick={()=>setSel(e.id)} style={{padding:"10px 12px",borderBottom:"1px solid #0D0F14",cursor:"pointer",background:isSel?"#0D0F14":"transparent",borderLeft:`3px solid ${isSel?cfg.c:"transparent"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,fontWeight:700}}>{e.codigo}</span><span style={{fontSize:9,fontWeight:800,color:cfg.c,background:`${cfg.c}15`,padding:"2px 6px",borderRadius:20}}>{cfg.l}</span></div>
                <div style={{fontSize:10,color:"#5A6070"}}>{e.marca} {e.modelo}</div>
                <div style={{fontSize:10,marginTop:2,color:e.estado_tecnico==="critico"?"#FF4444":e.estado_tecnico==="en_reparacion"?"#FF3B8B":"#5A6070"}}>
                  {e.estado_tecnico==="critico"?"🚨 Crítico":e.estado_tecnico==="en_reparacion"?"🛠️ En reparación":"✅ Buen estado"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"18px"}}>
        {!eq?(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#1E2230"}}><div style={{fontSize:48}}>🔧</div><div style={{fontSize:13,fontWeight:700,marginTop:10,color:"#2A2D3A"}}>Selecciona un equipo</div></div>):(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
              <div><h2 style={{margin:0,fontSize:17,fontWeight:800,marginBottom:3}}>{eq.codigo} · {eq.marca} {eq.modelo}</h2><div style={{fontSize:11,color:"#5A6070"}}>{eq.serie||"—"} · {eq.tipo_equipo}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:10,color:"#5A6070"}}>Estado técnico</div><div style={{fontSize:14,fontWeight:800,color:EST_TEC[eq.estado_tecnico]?.color||"#5A6070"}}>{EST_TEC[eq.estado_tecnico]?.icon||"❓"} {EST_TEC[eq.estado_tecnico]?.label||eq.estado_tecnico||"—"}</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:9,marginBottom:14}}>
              {[{l:"Ubicación",v:eq.ubicacion||"—"},{l:"Combustible",v:eq.combustible||"—"},{l:"Capacidad",v:eq.capacidad_kg?`${eq.capacidad_kg.toLocaleString()} kg`:"—"},{l:"Costo reparación est.",v:eq.costo_reparacion_estimado?fmt(eq.costo_reparacion_estimado):"—"}].map((k,i)=>(
                <div key={i} style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:8,padding:"9px 11px"}}><div style={{fontSize:9,color:"#353840",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>{k.l}</div><div style={{fontSize:12,fontWeight:800,color:"#D4D8E8"}}>{k.v}</div></div>
              ))}
            </div>
            {eq.observaciones&&<div style={{background:"#FFB93010",border:"1px solid #FFB93030",borderRadius:8,padding:"10px 13px",marginBottom:10,fontSize:11,color:"#FFB930"}}>📝 {eq.observaciones}</div>}
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
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><div><div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:12,fontWeight:700}}>{x.cliente}</span>{venc&&<span style={{fontSize:8,background:"#FF444415",color:"#FF4444",padding:"1px 4px",borderRadius:4,fontWeight:800}}>VENCIDO</span>}</div><div style={{fontSize:10,color:"#5A6070"}}>{x.equipo_desc&&x.equipo_desc.substring(0,28)}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:9,color:cfg.c,fontWeight:700}}>{cfg.i} {cfg.l}</div><div style={{fontSize:12,fontWeight:800,color:"#FFB930"}}>{fmt(x.valor)}</div></div></div>
              {x.estado==="activa"&&<div style={{fontSize:10,color:dias&&dias<=7?"#FF4444":"#5A6070"}}>⏱ {dias&&dias<0?"Venció":`${dias}d`}</div>}
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
            {tab==="pagos"&&<div>{r.pagos.map((p,i)=>{const pC={pagado:{c:"#00E5A0",i:"✅"},pendiente:{c:"#FFB930",i:"⏳"},vencido:{c:"#FF4444",i:"🔴"}}[p.estado];return<div key={i} style={{background:"#0C0E14",border:`1px solid ${pC.c}25`,borderRadius:9,padding:"11px 13px",marginBottom:7,borderLeft:`3px solid ${pC.c}`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:12,fontWeight:700}}>{p.mes}</div></div><div style={{display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:9,fontWeight:800,color:pC.c,background:`${pC.c}15`,padding:"2px 6px",borderRadius:20}}>{pC.i} {p.estado}</span><div style={{fontSize:14,fontWeight:800,color:"#FFB930"}}>{fmt(p.monto)}</div></div></div></div>;})}
            </div>}
            {tab==="cobros_extra"&&<div>{r.cobros_extra.length===0?<div style={{textAlign:"center",padding:"30px",color:"#353840"}}>✅ Sin cobros extra</div>:r.cobros_extra.map((c,i)=><div key={i} style={{background:"#0C0E14",border:`1px solid #FF3B8B30`,borderRadius:9,padding:"11px 13px",marginBottom:7}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:12,fontWeight:700}}>{c.concepto}</div><div style={{fontSize:14,fontWeight:800,color:"#FF3B8B"}}>{fmt(c.monto)}</div></div></div>)}</div>}
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
          {CLIENTES_DATA.filter(c=>filtro==="todos"||c.estado===filtro).map(c=>{const ind=IND_CFG[c.industria]||{color:"#5A6070",icon:"🏢"};const ecli=ECLI[c.estado]||{c:"#5A6070",l:c.estado};const dias=dDesde(c.ultima_actividad);const isSel=sel===c.id;return(
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
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div><h2 style={{margin:0,fontSize:17,fontWeight:800,marginBottom:3}}>{(IND_CFG[cli.industria]||{icon:"🏢"}).icon} {cli.empresa}</h2><div style={{fontSize:11,color:"#5A6070"}}>{cli.contacto} · {cli.cargo}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:10,color:"#5A6070"}}>Total rentas</div><div style={{fontSize:20,fontWeight:800,color:"#FFB930"}}>{fmt(cli.valor_total)}</div></div></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginBottom:14}}>{[{l:"Estado",v:cli.estado,c:(ECLI[cli.estado]||{c:"#5A6070"}).c},{l:"Última actividad",v:`hace ${dDesde(cli.ultima_actividad)}d`,c:dDesde(cli.ultima_actividad)>30?"#FFB930":"#D4D8E8"},{l:"Opps activas",v:cli.opps_activas,c:"#3B9EFF"}].map((s,i)=><div key={i} style={{background:"#0C0E14",border:"1px solid #12151C",borderRadius:8,padding:"9px 11px"}}><div style={{fontSize:9,color:"#353840",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>{s.l}</div><div style={{fontSize:16,fontWeight:800,color:s.c}}>{s.v}</div></div>)}</div>
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
        <div style={{padding:"10px 12px",borderBottom:"1px solid #12151C"}}><div style={{fontSize:10,color:"#5A6070"}}>OPORTUNIDADES +$10,000</div><div style={{fontSize:12,fontWeight:700,color:"#FFB930",marginTop:2}}>{fmt(OPPS_DATA.reduce((s,o)=>s+o.valor,0))} pipeline</div></div>
        <div style={{flex:1,overflowY:"auto"}}>
          {OPPS_DATA.map(o=>{const dias=dDesde(o.ultimo_seguimiento);const alerta=dias>=2;const isSel=sel===o.id;return(
            <div key={o.id} onClick={()=>setSel(o.id)} style={{padding:"11px 12px",borderBottom:"1px solid #0D0F14",cursor:"pointer",background:isSel?"#0D0F14":"transparent",borderLeft:`3px solid ${isSel?(alerta?"#FF4444":"#FF6B35"):"transparent"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><div><div style={{display:"flex",gap:5,alignItems:"center"}}><span style={{fontSize:12,fontWeight:700}}>{o.cliente}</span>{alerta&&<span style={{fontSize:8,background:"#FF444415",color:"#FF4444",padding:"1px 4px",borderRadius:4,fontWeight:800}}>⚠️</span>}</div><div style={{fontSize:10,color:"#5A6070"}}>{o.titulo}</div></div><div style={{fontSize:13,fontWeight:800,color:"#FFB930"}}>{fmt(o.valor)}</div></div>
              <div style={{height:3,background:"#12151C",borderRadius:2,marginTop:5}}><div style={{width:`${o.prob}%`,height:"100%",background:alerta?"#FF4444":"#FF6B35",borderRadius:2}}/></div>
            </div>
          );})}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"18px"}}>
        {!opp?(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#1E2230"}}><div style={{fontSize:48}}>🎯</div><div style={{fontSize:13,fontWeight:700,marginTop:10,color:"#2A2D3A"}}>Selecciona una oportunidad</div></div>):(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div><h2 style={{margin:0,fontSize:17,fontWeight:800,marginBottom:3}}>{opp.titulo}</h2><div style={{fontSize:11,color:"#5A6070"}}>{opp.cliente} · {opp.vendedor}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:22,fontWeight:800,color:"#FFB930"}}>{fmt(opp.valor)}</div><div style={{fontSize:11,color:"#FF6B35"}}>{opp.prob}%</div></div></div>
            {dDesde(opp.ultimo_seguimiento)>=2&&<div style={{background:"#FF444410",border:"1px solid #FF444430",borderRadius:9,padding:"12px 14px",marginBottom:14}}><div style={{fontSize:12,fontWeight:800,color:"#FF4444"}}>🚨 {dDesde(opp.ultimo_seguimiento)*24}h sin seguimiento</div></div>}
            {["¿Cuándo estima cerrar?","¿Cómo pagan?","¿Con quién más cotizan?","¿Obstáculo para cerrar?","¿Presupuesto aprobado?"].map((p,i)=>(
              <div key={i} style={{marginBottom:9}}><div style={{fontSize:11,color:"#8A8FA0",marginBottom:4}}><span style={{color:"#FF6B35",marginRight:5}}>{i+1}.</span>{p}</div><input placeholder="Respuesta..." style={{width:"100%",boxSizing:"border-box",background:"#141720",border:"1px solid #1E2230",borderRadius:7,padding:"7px 10px",color:"#D4D8E8",fontSize:11,outline:"none"}}/></div>
            ))}
            <button style={{width:"100%",padding:"10px",borderRadius:8,border:"none",background:"linear-gradient(135deg,#FF6B35,#FF3B8B)",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer",marginTop:8}}>🎯 Guardar Seguimiento →</button>
          </div>
        )}
      </div>
    </div>
  );
}

function ElsaModule({ equiposCount }) {
  const [msgs,setMsgs]=useState([{role:"assistant",content:`¡Hola! Soy **ELSA** 🤖\n\nEstoy conectada a Supabase con **${equiposCount} equipos reales** de Montasa.\n\n¿En qué te ayudo hoy?`}]);
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
        system:`Eres ELSA, asistente IA de Montasa Handling Co. Flota real en Supabase: ${equiposCount} equipos. Rentas activas: 2 ($5,350/mes). Pipeline: $54,900. Responde en español.`,
        messages:nuevos.map(m=>({role:m.role,content:m.content})),
      })});
      const d=await res.json();
      setMsgs(p=>[...p,{role:"assistant",content:d.content?.[0]?.text||"Error."}]);
    }catch{setMsgs(p=>[...p,{role:"assistant",content:"⚠️ Error."}]);}
    finally{setLoading(false);}
  };

  const md=t=>t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br/>");

  return(
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"}}>
      <div style={{padding:"9px 14px",borderBottom:"1px solid #12151C",background:"#080A10",overflowX:"auto"}}>
        <div style={{display:"flex",gap:5,minWidth:"max-content"}}>
          {[{i:"📊",t:"Dame un resumen de Montasa hoy"},{i:"🚨",t:"¿Qué necesita atención urgente?"},{i:"🏗️",t:"¿Cuántos equipos disponibles hay?"},{i:"💰",t:"¿Cuánto generamos este mes?"},{i:"💡",t:"Quiero enviar una sugerencia a gerencia"}].map((a,i)=>(
            <button key={i} onClick={()=>enviar(a.t)} style={{padding:"4px 10px",borderRadius:20,fontSize:10,border:"1px solid #1E2230",background:"#0C0E14",color:"#8A8FA0",cursor:"pointer",whiteSpace:"nowrap"}}>{a.i} {a.t}</button>
          ))}
        </div>
      </div>
      <div ref={ref} style={{flex:1,overflowY:"auto",padding:"18px 20px",display:"flex",flexDirection:"column",gap:12}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",flexDirection:m.role==="user"?"row-reverse":"row",alignItems:"flex-end",gap:7}}>
            <div style={{width:30,height:30,borderRadius:"50%",flexShrink:0,background:m.role==="assistant"?"linear-gradient(135deg,#FFB930,#FF3B8B)":"#3B9EFF20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{m.role==="assistant"?"🤖":"👔"}</div>
            <div style={{maxWidth:"72%",background:m.role==="assistant"?"#0E1018":"#3B9EFF18",border:`1px solid ${m.role==="assistant"?"#1E2230":"#3B9EFF30"}`,borderRadius:m.role==="assistant"?"4px 12px 12px 12px":"12px 4px 12px 12px",padding:"11px 13px",fontSize:12,lineHeight:1.6,color:"#D4D8E8"}} dangerouslySetInnerHTML={{__html:md(m.content)}}/>
          </div>
        ))}
        {loading&&<div style={{display:"flex",alignItems:"flex-end",gap:7}}><div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#FFB930,#FF3B8B)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🤖</div><div style={{background:"#0E1018",border:"1px solid #1E2230",borderRadius:"4px 12px 12px 12px",padding:"13px 15px",display:"flex",gap:4}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"#FF6B35",animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}</div></div>}
      </div>
      <div style={{padding:"11px 14px",borderTop:"1px solid #12151C",background:"#080A10",display:"flex",gap:7,alignItems:"flex-end"}}>
        <textarea value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();enviar();}}} placeholder="Escribe tu mensaje..." rows={1} style={{flex:1,background:"#0C0E14",border:"1px solid #1E2230",borderRadius:9,padding:"9px 13px",color:"#D4D8E8",fontSize:12,outline:"none",resize:"none",fontFamily:"inherit"}}/>
        <button onClick={()=>enviar()} disabled={!inp.trim()||loading} style={{width:38,height:38,borderRadius:9,border:"none",background:inp.trim()&&!loading?"linear-gradient(135deg,#FFB930,#FF6B35)":"#12151C",color:inp.trim()&&!loading?"#06080D":"#353840",cursor:inp.trim()&&!loading?"pointer":"default",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>→</button>
      </div>
    </div>
  );
}

export default function MontasaApp() {
  const [mod,setMod]=useState("dashboard");
  const [equipos,setEquipos]=useState([]);
  const alertasTotal=ALERTAS_DATA.filter(a=>["critico","urgente"].includes(a.tipo)).length;
  const criticas=ALERTAS_DATA.filter(a=>a.tipo==="critico").length;

  useEffect(()=>{
    const cargar = async () => {
      const {data} = await supabase.from('equipos').select('*');
      if(data) setEquipos(data);
    };
    cargar();
  },[]);

  return (
    <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",background:"#06080D",height:"100vh",display:"flex",flexDirection:"column",color:"#D4D8E8",overflow:"hidden"}}>
      <div style={{borderBottom:"1px solid #12151C",padding:"0 14px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#080A10",height:48,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,#FFB930,#FF6B35)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🏗️</div>
          <div>
            <div style={{fontSize:12,fontWeight:800,letterSpacing:"0.04em"}}>MONTASA HANDLING CO.</div>
            <div style={{fontSize:8,color:"#2E3240",letterSpacing:"0.12em"}}>SISTEMA INTEGRAL v2.0 · {equipos.length} EQUIPOS · SUPABASE ✅</div>
          </div>
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
                {item.id==="elsa"&&criticas>0&&<span style={{width:6,height:6,borderRadius:"50%",background:"#FF6B35"}}/>}
              </button>
            );
          })}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:10,color:"#00E5A0",fontWeight:700}}>✅ Supabase</span>
          <div style={{display:"flex",alignItems:"center",gap:5,background:"#12151C",border:"1px solid #1E2230",borderRadius:7,padding:"4px 8px"}}>
            <div style={{width:18,height:18,borderRadius:"50%",background:"linear-gradient(135deg,#FFB930,#FF6B35)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9}}>👔</div>
            <span style={{fontSize:11,fontWeight:600}}>Gerencia</span>
          </div>
        </div>
      </div>

      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        {mod==="dashboard"    &&<Dashboard navigate={setMod} equipos={equipos}/>}
        {mod==="flota"        &&<Flota/>}
        {mod==="mantenimiento"&&<Mantenimiento equipos={equipos}/>}
        {mod==="rentas"       &&<Rentas/>}
        {mod==="crm"          &&<CRM/>}
        {mod==="seguimiento"  &&<Seguimiento/>}
        {mod==="elsa"         &&<ElsaModule equiposCount={equipos.length}/>}
      </div>

      <div style={{borderTop:"1px solid #0D0F14",padding:"4px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#080A10",flexShrink:0}}>
        <span style={{fontSize:8,color:"#1E2230",letterSpacing:"0.1em"}}>MONTASA HANDLING CO. · v2.0 · SUPABASE CONECTADO · {equipos.length} EQUIPOS REALES</span>
        <div style={{display:"flex",gap:10}}>
          {Object.entries(STATUS_CFG).map(([k,v])=>{const c=equipos.filter(e=>e.estado===k).length;if(!c)return null;return<span key={k} style={{display:"flex",alignItems:"center",gap:3,fontSize:8,color:"#353840"}}><span style={{width:4,height:4,borderRadius:"50%",background:v.color,display:"inline-block"}}/>{c} {v.label}</span>;})}
        </div>
      </div>

      {mod!=="elsa"&&<ElsaFloat mod={mod} equiposCount={equipos.length}/>}

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
