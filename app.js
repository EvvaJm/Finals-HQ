'use strict';
const TZ='America/Toronto',KEY='finalshq.v1',VER='1.0.0';
const C={MC:{code:'CIS*2030',name:'Microcomputing',col:'#E8B8CB',pri:2},OOP:{code:'CIS*2430',name:'Object-Oriented Programming',col:'#CBBBE9',pri:3},DS:{code:'CIS*2520',name:'Data Structures',col:'#B9D9C4',pri:4},SD:{code:'CIS*3250',name:'Software Design III',col:'#BDD8E9',pri:5},PH:{code:'PHIL*2120',name:'Ethics',col:'#EED1AF',pri:1}};
const EX0={DS:{date:'2026-12-11',s:'19:00',e:'21:00',w:30},MC:{date:'2026-12-13',s:'14:30',e:'16:30',w:35},SD:{date:'2026-12-14',s:'14:30',e:'16:30',w:30},OOP:{date:'2026-12-15',s:'08:30',e:'10:30',w:30}};
const I={home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',cal:'<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',book:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',rev:'<path d="m3 17 2 2 4-4M3 7l2 2 4-4M13 6h8M13 12h8M13 18h8"/>',set:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',check:'<path d="M20 6 9 17l-5-5"/>',back:'<path d="m15 18-6-6 6-6"/>',plus:'<path d="M12 5v14M5 12h14"/>',next:'<path d="m9 18 6-6-6-6"/>'};
const ico=(n,s=20)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const today=()=>new Date().toLocaleDateString('en-CA',{timeZone:TZ});
const dn=s=>{const[y,m,d]=s.split('-').map(Number);return Date.UTC(y,m-1,d)/864e5};
const fromN=n=>new Date(n*864e5).toISOString().slice(0,10);
const fmt=(s,o)=>new Date(dn(s)*864e5).toLocaleDateString('en-US',{timeZone:'UTC',...o});
const D=s=>'2026-'+s;
const tm=s=>{if(!s)return'';const[h,m]=s.split(':').map(Number);return(h%12||12)+(m?':'+String(m).padStart(2,'0'):'')+(h<12?' AM':' PM')};
const dur=m=>m>=60?(m/60).toFixed(m%60?1:0).replace('.0','')+'h':m+'m';

/* ---------- seed data ---------- */
function seed(){
 let n=0,en=0;const T=[],E=[];
 const t=(c,title,d,o={})=>T.push({id:'t'+(n++),c,title,date:d?D(d):'',type:'content',dur:30,done:false,...o});
 const e=(d,title,s,en_,kind,o={})=>E.push({id:'e'+(en++),date:D(d),title,s,e:en_,kind,...o});
 const cl=(a,b)=>`https://courselink.uoguelph.ca/d2l/le/content/${a}/viewContent/${b}/View`;
 // Microcomputing
 const mcl=['4616278','4618421','4625737','4629997','4644013','4650093','4655716','4661743','4676681'],mcd=['11-25','11-27','11-28','11-30','12-01','12-01','12-02','12-03','12-04','12-05','12-06'];
 for(let i=1;i<=11;i++){const g='Week '+i,u=i<=9?cl(1059200,mcl[i-1]):'';
  t('MC',g+' — review slideshow and take notes (NotebookLM)',mcd[i-1],{sec:'Lectures',grp:g,url:u,dur:45,ln:1});
  t('MC',g+' — verbal understanding practice (ChatGPT Voice)',mcd[i-1],{sec:'Lectures',grp:g,url:u,dur:30,ln:1});}
 ['68000 Fundamentals','Architecture, Registers and Processor State','Bitwise Operations, Arithmetic and Flags','Shifts, Arithmetic and Addressing Modes','Subroutines and Stack Operations','Nested Subroutines and Calling Conventions','Stack Frames, Recursion and Parameters','UART and Input/Output'].forEach((s,i)=>t('MC',`MC Set ${i+1} — ${s} (10 questions)`,i<4?'12-09':'12-12',{sec:'Weekly multiple-choice practice',dur:20,sets:1}));
 t('MC','Complete Microcomputing midterm practice questions','12-05',{sec:'Midterm',dur:45});
 t('MC','Review Microcomputing midterm solutions and mistakes','12-07',{sec:'Midterm',dur:45});
 ['Easy68K Introduction','Bit Lengths','Basic Arithmetic','Addressing Modes','Control Flow','Subroutines','Stack Frames','Exceptions','Input/Output'].forEach((s,i)=>t('MC',`Lab ${i+1} review — ${s}`,['12-05','12-06','12-07'][Math.floor(i/3)],{sec:'Lab review',dur:20}));
 [['Practise tracing Easy68K assembly instructions','12-07'],['Practise writing short assembly code fragments','12-07'],['Practise explaining assembly code and processor behaviour','12-12'],['Complete mixed written-answer practice questions','12-12']].forEach(([s,d])=>t('MC',s,d,{sec:'Written-answer practice',dur:40}));
 // OOP
 const ol=[['Introduction',4608199,4617150],['Class Design 1',4618313,4624059],['Class Design 2',4622898,4630193],['Inheritance',4629305,4635636],['Files & Collections',4635063,4644032],['Exceptions',4641720,4651676],['GUI with Swing 1',4650670,4663009],['GUI with Swing 2',4662954,4666894],['Polymorphism',4668077,4676790],['Advanced Topics',4675110,4683081]],od=['11-29','11-30','12-01','12-02','12-03','12-04','12-05','12-06','12-07','12-08'];
 ol.forEach(([nm,a,b],i)=>{const g=String(i+1).padStart(2,'0')+' — '+nm;
  t('OOP',g+': review lecture and take notes (NotebookLM)',od[i],{sec:'Lectures',grp:g,url:cl(1053455,a),url2:cl(1053455,b),dur:45,ln:1});
  t('OOP',g+': verbal understanding practice (ChatGPT)',od[i],{sec:'Lectures',grp:g,url:cl(1053455,a),url2:cl(1053455,b),dur:30,ln:1});});
 t('OOP','Review OOP midterm solutions document and understand mistakes','12-05',{sec:'Midterm',dur:45});
 [['Practise identifying correct and incorrect Java syntax','12-09'],['Practise variable scope and access modifiers','12-09'],['Practise nested classes and member accessibility','12-10'],['Practise inheritance and polymorphism edge cases','12-10'],['Complete complex, multi-concept exam questions','12-12'],['Complete tricky wording and code-interpretation questions','12-12'],['Practise tracing Java code and predicting output','12-09'],['Practise debugging and identifying compilation errors','12-14'],['Practise writing Java code without notes','12-14']].forEach(([s,d])=>t('OOP',s,d,{sec:'Syntax & Exam Traps',dur:40,trap:1}));
 // Data Structures
 const ds=(sec,items,dates,px)=>items.forEach((s,i)=>t('DS',s,dates[i],{sec,dur:/practice|Practice/.test(s)?45:/verbal/.test(s)?30:40}));
 ds('Linked Lists (Weeks 1–2)',['Review Week 1 Course Introduction and take notes','Review Week 1 Singly Linked Lists and take notes','Review Week 2 Doubly Linked Lists and take notes','Complete linked-list practice problems','Complete linked-list verbal practice'],['11-30','11-30','11-30','12-05','12-05']);
 ds('Stacks and Queues (Weeks 2–3)',['Review Week 2 Stacks and take notes','Review Week 3 Queues and take notes','Complete stacks and queues practice problems','Complete stacks and queues verbal practice'],['11-30','11-30','12-05','12-05']);
 ds('Hashing (Week 4)',['Review Hashing 1 slideshow and take notes','Review Hashing 2 slideshow and take notes','Complete hashing practice problems','Complete verbal hashing practice'],['11-25','11-25','12-01','12-01']);
 ds('Trees and Heaps (Weeks 6–8)',['Review Week 6 Tree Introduction and take notes','Review Binary Search Trees and take notes','Review Week 7 AVL Trees and take notes','Review Week 8 Heaps and take notes','Review Week 8 Comparing Trees and take notes','Complete trees and heaps practice problems','Complete trees and heaps verbal practice'],['12-02','12-02','12-02','12-04','12-04','12-06','12-06']);
 ds('Graphs (Weeks 9–10)',['Review Graph Introduction and take notes','Review Graph Traversal and take notes','Review Shortest Path and take notes','Review Topological Sorting and take notes','Complete graph practice problems','Complete graph verbal practice'],['12-06','12-06','12-07','12-07','12-09','12-09']);
 ds('Midterms and mixed practice',['Review Midterm 1 answer key and grading feedback','Complete available Midterm 1 review/practice questions','Complete Midterm 2 practice questions','Review Midterm 2 returned exam and feedback','Complete mixed final exam practice problems'],['12-07','12-09','12-08','12-09','12-10']);
 T.find(x=>x.title.startsWith('Review Midterm 2 returned')).await=true;
 // Software Design
 t('SD','Make handwritten two-page cheat sheet','12-08',{sec:'Required content',dur:180});
 t('SD','Complete Midterm 1 practice questions','12-09',{sec:'Required content',dur:45});
 t('SD','Complete Midterm 2 practice questions','12-09',{sec:'Required content',dur:45});
 t('SD','Complete final exam practice questions','12-10',{sec:'Required content',dur:60});
 // Ethics
 [['Nov 5 Kant lecture',4666078],['Nov 10 Kant lecture',4670065],['Nov 12 Kant/Mill lecture',4672137],['Nov 17 Mill lecture',4679147],['Nov 19 Mill lecture',4681217]].forEach(([s,u])=>t('PH','Take notes on '+s,'11-23',{sec:'Test 4 (Nov 24, essay)',grp:s,url:cl(1061164,u),dur:40,ln:1}));
 t('PH','Identify and memorize 5–6 key definitions and concepts','11-23',{sec:'Test 4 (Nov 24, essay)',dur:60,defs:1});
 t('PH','Complete verbal essay practice using ChatGPT','11-23',{sec:'Test 4 (Nov 24, essay)',dur:45,ln:1,grp:'Essay practice'});
 t('PH','Study the final quiz readings','12-02',{sec:'Final quiz (Dec 3)',dur:60,note:'Readings not yet known — edit this task to add them.'});
 t('PH','Memorize relevant key concepts (final quiz)','12-02',{sec:'Final quiz (Dec 3)',dur:30});
 t('PH','Complete verbal understanding practice (final quiz)','12-02',{sec:'Final quiz (Dec 3)',dur:30,ln:1,grp:'Final quiz'});
 // coursework (not counted)
 const cw=(c,title,d,due,m,o={})=>t(c,title,d,{type:'coursework',sec:'Coursework & deadlines',due:due?D(due):'',dur:m,...o});
 cw('DS','Data Structures ZyBooks 5','11-21','11-27',120);cw('DS','Data Structures Assignment 3','11-26','11-27',120);cw('DS','Data Structures ZyBooks 6','12-03','12-04',120);
 cw('SD','Software Design Assignment 4 — begin','11-21','11-25',60);cw('SD','Software Design Assignment 4 — finish my portion','11-22','11-25',90);cw('SD','Confirm Software Design Assignment 4 submitted','11-25','11-25',10);
 cw('OOP','OOP Lab Exercise 5','11-26','11-27',90);cw('OOP','OOP Assignment 3 — work session','11-30','12-04',90);cw('OOP','OOP Assignment 3 — work session','12-02','12-04',90);cw('OOP','OOP Assignment 3 — work session','12-03','12-04',90);cw('OOP','Submit OOP Assignment 3','12-04','12-04',20);
 cw('OOP','Confirm OOP Lab 5 submitted','11-27','11-27',5);cw('DS','Confirm Assignment 3 submitted and ZyBooks 5 completed','11-27','11-27',5);
 cw('PH','Organize Ethics Test 4 materials','11-22','',30);
 // review (not counted)
 const rv=(c,title,d,m,o={})=>t(c,title,d,{type:'review',sec:'Review sessions (not counted)',dur:m,...o});
 rv('PH','Short Ethics review','11-24',30);
 [['12-06','MC'],['12-07','DS'],['12-08','OOP'],['12-09','DS'],['12-10','MC'],['12-12','MC'],['12-14','OOP']].forEach(([d,c])=>rv(c,C[c].name+' — Weak Topic Review (60 minutes)',d,60,{ws:1}));
 rv('SD','Software Design — Weak Topic Review (30–45 minutes, if time allows)','12-13',40,{ws:1});
 rv('DS','Data Structures final review and selected problems','12-11',90);rv('MC','Final Microcomputing review at school','12-13',120);rv('SD','Review Software Design cheat sheet (exam-day review)','12-14',45);rv('OOP','Optional short OOP review','12-12',30);
 // commitments
 const dnn={11:'-',};
 for(let d=dn(D('11-21'));d<=dn(D('12-15'));d++){const s=fromN(d).slice(5),w=new Date(d*864e5).getUTCDay();
  if(w===1)e(s,'Pitching practice','18:30','20:30','practice',s==='12-14'?{skip:1,note:'Skipping — final OOP review instead'}:{});
  if(w===2)e(s,'Softball practice','18:30','20:30','practice',{'11-24':{note:'Conditional on lab ending early'},'12-01':{note:'Subject to any lab conflict'},'12-15':{note:'Optional, after exams'}}[s]||{});
  if(w===0)e(s,'Softball practice','08:00','10:00','practice',s==='12-13'?{note:'Optional, if rested and prepared'}:{});}
 e('11-22','Work','12:00','17:00','work');e('11-23','Dedicated Ethics study day','','','personal');
 e('11-24','Ethics Test 4 (essay)','13:00','','exam',{c:'PH'});e('11-24','Microcomputing lab','16:30','19:30','lab',{c:'MC'});
 e('11-25','Personal planning/admin at Starbucks','08:00','09:30','personal');e('11-25','Ethics seminar','09:30','','class',{c:'PH'});e('11-25','Software Design lab','13:00','','lab',{c:'SD'});e('11-25','Study session with friend','16:00','18:00','personal');
 e('11-26','Presentation','13:00','14:20','class');e('11-26','Hollister shift','17:00','21:00','work');
 e('11-27','Work','17:30','23:00','work');e('11-28','Work','11:00','18:15','work');e('11-29','Work','13:15','19:00','work');
 e('12-03','Ethics final quiz (15 questions; time TBC)','','','exam',{c:'PH'});e('12-05','Hollister shift','18:00','22:00','work');
 e('12-07','Exam period begins','','','personal');e('12-13','Booked off work (Old Navy)','','','personal');
 E.sort((a,b)=>a.date.localeCompare(b.date)||(a.s||'').localeCompare(b.s||''));
 return{tasks:T,events:E,weak:[{id:'w0',c:'DS',topic:'Hashing',desc:'',grp:'Hashing (Week 4)',done:false}],defs:[],exams:JSON.parse(JSON.stringify(EX0)),n:{t:1000,e:1000,w:1000,d:1000},ver:VER};
}
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(x){}
if(!S||!S.tasks)S=seed();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(x){toast('Could not save — storage full or blocked')}};
const uid=p=>p+(S.n[p]++)+'_'+Date.now().toString(36);

/* ---------- helpers ---------- */
const isCount=x=>x.type==='content'&&x.count!==false;
const prog=c=>{const a=S.tasks.filter(x=>x.c===c&&isCount(x));const d=a.filter(x=>x.done).length;return{d,t:a.length,p:a.length?Math.round(d/a.length*100):0}};
const weakN=c=>S.weak.filter(w=>w.c===c&&!w.done).length;
const exEv=d=>Object.entries(S.exams).filter(([c,x])=>x.date===d).map(([c,x])=>({id:'x'+c,date:d,title:`${C[c].code} ${C[c].name} Final`,s:x.s,e:x.e,kind:'exam',c,fixed:1}));
const evOn=d=>[...S.events.filter(x=>x.date===d),...exEv(d)].sort((a,b)=>(a.s||'').localeCompare(b.s||''));
const tOn=d=>S.tasks.filter(x=>x.date===d);
const load=a=>a.filter(x=>!x.done).reduce((s,x)=>s+(+x.dur||0),0);
const kindCol={exam:'#D9AB83',work:'#C4B5AE',practice:'#A5BDA8',class:'#BDD8E9',lab:'#BDD8E9',personal:'#E9DFD5',study:'#CBBBE9',coursework:'#EED1AF'};
let V={tab:'home',course:null,open:{},sec:{},ahead:false,next:0,weak:null,sel:today(),month:today().slice(0,7),defshow:{}};

/* ---------- prompts ---------- */
const PR={
 MC:t=>`Act as my university Microcomputing tutor. I am reviewing ${t} of CIS*2030 at the University of Guelph. I will provide my lecture material. Quiz me verbally, one question at a time, on the concepts from this lecture. Make sure I genuinely understand the content rather than simply memorizing definitions. Include conceptual questions, 68000 assembly syntax, code tracing and application questions where relevant. Wait for my answer before giving feedback. If I answer incorrectly, explain the concept and test me again with a different example. Ask me to explain my reasoning. Do not invent details from slides you haven't been given.`,
 OOP:t=>`Act as a demanding but helpful university Java professor. I am preparing for my CIS*2430 Object-Oriented Programming final exam, currently on: ${t}. I will provide my lecture notes. Quiz me one question at a time, including Java syntax, code tracing, compilation errors, scope, access modifiers and concepts relevant to this topic. Make the questions progressively harder. Include tricky questions that combine multiple Java rules. Don't reveal answers before I respond. Ask me to explain why my answer is correct and why other possibilities are incorrect. Correct any mistakes and make sure I understand the exact Java rule involved. Do not invent details that aren't in the material I give you.`,
 DS:t=>`Act as my university Data Structures tutor. I am preparing for my CIS*2520 final at the University of Guelph, currently on: ${t}. I will provide my slides or notes. Ask me one question at a time covering concepts, operations, step-by-step tracing of algorithms, and time complexity. Wait for my answer, then give feedback. If I'm wrong, explain the idea and test me with a different example. Ask me to justify my steps. Do not invent details that aren't in the material I give you.`,
 PH:t=>`Act as my university Ethics professor. I am preparing for an essay-based assessment covering Kant and Mill (${t}). I will provide my course notes. Ask me university-level verbal questions about the philosophers' theories, key definitions, arguments and differences. Ask one question at a time. Make me explain concepts in my own words and connect them to possible essay prompts. Give constructive feedback and help me strengthen my explanations. Do not invent course-specific definitions.`,
 SD:t=>`Act as my university Software Design III tutor (CIS*3250). I will provide my uploaded course notes on: ${t}. Ask me multiple-choice review questions one at a time, wait for my answer, then explain why it is right or wrong. Only use the material I provide; do not invent course-specific content.`};
const prompt=x=>PR[x.c](x.grp||x.title);
function copy(txt){const ok=()=>toast('Prompt copied — paste it into ChatGPT');
 const fb=()=>{const a=document.createElement('textarea');a.value=txt;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();try{document.execCommand('copy')?ok():toast('Copy failed — select the text manually')}catch(e){toast('Copy failed')}a.remove()};
 navigator.clipboard?navigator.clipboard.writeText(txt).then(ok,fb):fb()}
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.className='show';clearTimeout(tt);tt=setTimeout(()=>t.className='',2200)}

/* ---------- views ---------- */
const ring=(p,col,sz=64)=>{const r=sz/2-6,c=2*Math.PI*r,h=sz/2;return`<svg class="ring" width="${sz}" height="${sz}"><circle cx="${h}" cy="${h}" r="${r}" fill="none" stroke="#E9DFD5" stroke-width="6"/><circle cx="${h}" cy="${h}" r="${r}" fill="none" stroke="${col}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${c}" style="stroke-dashoffset:${c}" data-o="${c*(1-p/100)}" transform="rotate(-90 ${h} ${h})"/><text x="${h}" y="${h+4}" text-anchor="middle" font-size="${sz>70?17:13}" font-weight="600" fill="#4B403B">${p}%</text></svg>`};
const chip=c=>`<span class="chip" style="background:${C[c].col}">${C[c].code}</span>`;
const short=d=>fmt(d,{month:'short',day:'numeric'});
function row(x,showC=true){const o=V.open[x.id];
 return`<div class="row ${x.done?'dn':''} ${x.type!=='content'?'t-'+x.type:''}"><div class="rr"><button class="ck ${x.done?'on':''}" data-a="tog" data-id="${x.id}" ${x.await&&!x.done?'disabled':''} aria-label="Mark complete">${x.done?ico('check',16):''}</button><div class="rb" data-a="open" data-id="${x.id}"><div class="tt">${esc(x.title)}</div><div class="meta">${showC?chip(x.c):''}<span>${dur(x.dur)}</span>${x.due?`<span class="due">due ${short(x.due)}</span>`:''}${x.pr?'<span class="due">priority</span>':''}${x.await?'<span class="due">awaiting material</span>':''}${x.score!==undefined&&x.score!==''?`<span>score ${x.score}/10</span>`:''}</div></div></div>${o?det(x):''}</div>`}
function det(x){const b=[];
 if(x.url)b.push(`<a class="btn" href="${esc(x.url)}" target="_blank" rel="noopener">Open slideshow</a>`);else if(x.ln||x.url===''&&x.grp)b.push(`<span class="mut">Resource not added yet.</span><button class="btn" data-a="edit" data-id="${x.id}">Add link</button>`);
 if(x.url2)b.push(`<a class="btn" href="${esc(x.url2)}" target="_blank" rel="noopener">Working notes</a>`);
 if(x.ws)b.push(`<button class="btn p" data-a="weakc" data-c="${x.c}">Open weak topics</button>`);
 let p='';if(x.type==='content'&&PR[x.c])p=`<div class="pp"><b>Practise with ChatGPT</b><p class="mut">Copies a ready-made prompt. You provide your own notes or slides to ChatGPT — this app can't attach them.</p><button class="btn" data-a="copy" data-id="${x.id}">Copy prompt</button><a class="btn" href="https://chatgpt.com" target="_blank" rel="noopener">Open ChatGPT</a></div>`;
 return`<div class="det">${x.note?`<p class="mut">${esc(x.note)}</p>`:''}<div class="bts">${b.join('')}${x.type!=='coursework'&&!x.ws?`<button class="btn" data-a="addweak" data-c="${x.c}" data-g="${esc(x.grp||x.title)}">Add to Weak Topics</button>`:''}</div>${p}<div class="bts"><button class="btn" data-a="edit" data-id="${x.id}">Edit</button><button class="btn" data-a="movet" data-id="${x.id}">Move to today</button><button class="btn" data-a="moved" data-id="${x.id}">Pick date</button></div></div>`}
function evRow(x){const t=x.s?tm(x.s)+(x.e?'–'+tm(x.e):''):'All day';return`<div class="ev ${x.skip?'skip':''}" style="border-left-color:${x.c?C[x.c].col:kindCol[x.kind]||'#E9DFD5'}" data-a="${x.fixed?'exedit':'evedit'}" data-id="${x.id}" data-c="${x.c||''}"><div class="et">${t}</div><div class="eb"><b>${esc(x.title)}</b>${x.skip?' (skipped)':''}<div class="meta"><span>${x.kind}</span>${x.note?`<span>${esc(x.note)}</span>`:''}</div></div></div>`}
function home(){const td=today(),h=+new Date().toLocaleString('en-US',{timeZone:TZ,hour:'numeric',hour12:false})%24;
 const g=h<12?'Good morning!':h<18?'Good afternoon!':'Good evening!';
 const tk=tOn(td),dn_=tk.filter(x=>x.done).length;
 const over=S.tasks.filter(x=>x.date&&x.date<td&&!x.done&&!x.await).sort((a,b)=>a.date.localeCompare(b.date));
 let h_=`<h1>${g}</h1><p class="sub">${fmt(td,{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</p><p class="mut">One day at a time. You've got this.</p>`;
 h_+=`<h2>Exams</h2><div class="exs">`+Object.entries(S.exams).sort((a,b)=>a[1].date.localeCompare(b[1].date)).map(([c,x])=>{const d=dn(x.date)-dn(td),mins=(+x.e.slice(0,2)*60+ +x.e.slice(3))-(+x.s.slice(0,2)*60+ +x.s.slice(3));
  return`<div class="ex" style="border-top-color:${C[c].col}"><div class="mut">${C[c].code}</div><b>${C[c].name}</b><div class="big">${d<0?'Exam finished':d===0?'Today':d+(d===1?' day':' days')}</div><div class="mut">${fmt(x.date,{weekday:'short',month:'short',day:'numeric'})} · ${tm(x.s)}</div><div class="mut">${dur(mins)} · ${x.w}%</div></div>`}).join('')+`</div>`;
 const ev=evOn(td);h_+=`<h2>Today's schedule</h2>`+(ev.length?ev.map(evRow).join(''):'<p class="mut">Nothing scheduled.</p>');
 h_+=`<h2>Today's study checklist</h2><div class="card"><div class="mut">${dn_} of ${tk.length} tasks completed today${tk.length?` · about ${dur(load(tk))} left`:''}</div><div class="bar"><i style="width:${tk.length?dn_/tk.length*100:0}%"></i></div></div>`;
 h_+=tk.length?(dn_===tk.length?'<p class="mut">Everything on today\'s list is complete.</p>':'')+tk.map(x=>row(x)).join(''):'<p class="mut">No tasks scheduled for today.</p>';
 if(over.length)h_+=`<h2>Unfinished tasks</h2>`+over.map(x=>row(x)+`<div class="bts ind"><button class="btn" data-a="tog" data-id="${x.id}">Complete</button><button class="btn" data-a="movet" data-id="${x.id}">Move to today</button><button class="btn" data-a="moved" data-id="${x.id}">Move to date</button></div>`).join('');
 h_+=`<div class="bts big-b"><button class="btn p" data-a="ahead">${V.ahead?'Hide upcoming tasks':'Work Ahead'}</button></div>`;
 if(V.ahead){const up=S.tasks.filter(x=>x.date>td&&!x.done&&!x.await).sort((a,b)=>a.date.localeCompare(b.date)||(a.due?-1:0)-(b.due?-1:0)).slice(0,10);h_+=up.map(x=>`<div class="mut dl">${fmt(x.date,{weekday:'short',month:'short',day:'numeric'})}</div>`+row(x)).join('')||'<p class="mut">Nothing upcoming.</p>'}
 h_+=`<h2>What should I study next?</h2><div class="bts">`+[15,30,60,90].map(m=>`<button class="btn ${V.next===m?'p':''}" data-a="next" data-m="${m}">${m} min</button>`).join('')+`</div>`;
 if(V.next)h_+=suggest(V.next).map(x=>{const pre=prereq(x);return row(x)+(pre?`<p class="mut ind">Suggested first: ${esc(pre.title)}</p>`:'')}).join('')||'<p class="mut">Nothing left to suggest.</p>';
 return h_}
function prereq(x){if(!/practice|verbal/i.test(x.title))return;const i=S.tasks.indexOf(x);return S.tasks.find((y,j)=>j<i&&y.c===x.c&&y.sec===x.sec&&!y.done&&/notes|Review/.test(y.title))}
function suggest(min){const key=x=>x.due?x.due:x.c==='PH'?x.date||'2027':S.exams[x.c]?.date||'2027';
 const c=S.tasks.filter(x=>!x.done&&!x.await&&['content','coursework','review'].includes(x.type)).sort((a,b)=>key(a).localeCompare(key(b))||C[a.c].pri-C[b.c].pri||(a.date||'z').localeCompare(b.date||'z')||S.tasks.indexOf(a)-S.tasks.indexOf(b));
 const out=[];let left=min;for(const x of c){if(x.dur<=left){out.push(x);left-=x.dur}if(left<=0||out.length>=6)break}
 return out.length?out:c.slice(0,1)}
function calendar(){const[y,m]=V.month.split('-').map(Number),first=Date.UTC(y,m-1,1)/864e5,w0=new Date(first*864e5).getUTCDay(),dim=new Date(Date.UTC(y,m,0)).getUTCDate(),td=today();
 let g=['S','M','T','W','T','F','S'].map(d=>`<div class="wd">${d}</div>`).join('')+'<div></div>'.repeat(w0);
 for(let i=1;i<=dim;i++){const d=fromN(first+i-1),dots=[...evOn(d).map(e=>e.c?C[e.c].col:kindCol[e.kind]),...tOn(d).map(x=>C[x.c].col)].slice(0,6),ex=evOn(d).some(e=>e.kind==='exam');
  g+=`<button class="day ${d===td?'td':''} ${d===V.sel?'sel':''} ${ex?'exd':''}" data-a="sel" data-d="${d}">${i}<span class="dots">${dots.map(c=>`<i style="background:${c}"></i>`).join('')}</span></button>`}
 const pm=fromN(Date.UTC(y,m-2,1)/864e5).slice(0,7),nm=fromN(Date.UTC(y,m,1)/864e5).slice(0,7);
 const tk=tOn(V.sel),ev=evOn(V.sel);
 return`<div class="mh"><button class="ib" data-a="mon" data-m="${pm}">${ico('back')}</button><h1>${fmt(V.month+'-01',{month:'long',year:'numeric'})}</h1><button class="ib" data-a="mon" data-m="${nm}">${ico('next')}</button></div><div class="grid">${g}</div><h2>${fmt(V.sel,{weekday:'long',month:'long',day:'numeric'})}</h2>${tk.length?`<p class="mut">Study load: about ${dur(load(tk))} remaining${load(tk)>300?' — heavy day, consider moving something.':''}</p>`:''}`+(ev.length?ev.map(evRow).join(''):'<p class="mut">No events.</p>')+tk.map(x=>row(x)).join('')+`<div class="bts"><button class="btn" data-a="addt" data-d="${V.sel}">${ico('plus',14)} Task</button><button class="btn" data-a="adde" data-d="${V.sel}">${ico('plus',14)} Event</button></div>`}
function courses(){if(V.course)return coursePage(V.course);
 return`<h1>Courses</h1><p class="mut">Rings show required content covered — not your grade or readiness.</p>`+Object.keys(C).map(c=>{const p=prog(c),ex=S.exams[c];return`<div class="card cc" data-a="course" data-c="${c}" style="border-left:5px solid ${C[c].col}">${ring(p.p,C[c].col)}<div><div class="mut">${C[c].code}</div><b>${C[c].name}</b><div class="mut">${ex?'Final '+short(ex.date):'Test 4 Nov 24 · Quiz Dec 3'}</div><div class="mut">${p.d}/${p.t} content tasks · ${weakN(c)} weak topics</div></div></div>`}).join('')}
function coursePage(c){const p=prog(c),ex=S.exams[c],ts=S.tasks.filter(x=>x.c===c);
 const sk=x=>x.sec||(x.type==='coursework'?'Coursework & deadlines':x.type==='review'?'Review sessions (not counted)':'Other');
 const secs=[...new Set(ts.map(sk))];
 let h=`<button class="btn" data-a="course" data-c="">${ico('back',14)} Courses</button><div class="card ch" style="border-left:5px solid ${C[c].col}">${ring(p.p,C[c].col,84)}<div><div class="mut">${C[c].code}</div><h1>${C[c].name}</h1><div class="mut">${p.d}/${p.t} study tasks completed</div>${ex?`<div class="mut">Final: ${fmt(ex.date,{weekday:'short',month:'short',day:'numeric'})}, ${tm(ex.s)}–${tm(ex.e)} · ${ex.w}%</div>`:'<div class="mut">Test 4 Tue Nov 24 (~1 PM, 20%) · Final quiz Thu Dec 3 (5%)</div>'}</div></div>`;
 secs.forEach(s=>{const k=c+s,items=ts.filter(x=>sk(x)===s),d=items.filter(x=>x.done).length,o=V.sec[k];
  h+=`<div class="sec"><div class="sh2" data-a="sec" data-k="${esc(k)}"><b>${esc(s)}</b><span class="mut">${d}/${items.length}</span></div>`;
  if(o){const gs=[];items.forEach(x=>{const g=x.grp||x.id;let G=gs.find(y=>y.g===g);if(!G)gs.push(G={g,l:[]});G.l.push(x)});
   h+=gs.map(G=>G.l.length>1&&G.l[0].grp?`<div class="lec"><b>${esc(G.g)}</b>${G.l.map(x=>row(x,false)).join('')}</div>`:G.l.map(x=>row(x,false)).join('')).join('')+(s.startsWith('Weekly')?'<p class="mut">Set-to-week mapping isn\'t confirmed. Tap a set, then Edit to log a score or notes.</p>':'')}
  h+='</div>'});
 h+=`<div class="bts"><button class="btn" data-a="addt" data-c="${c}">${ico('plus',14)} Add task</button></div><h2>Weak topics <span class="mut">${weakN(c)} remaining</span></h2>`+weakList(c);
 if(c==='PH')h+=defs();
 if(c==='DS')h+=`<h2>Supplementary resources</h2><p class="mut">Linked-list questions, hashing solutions, labs 1–4, BST lab, week 10 graph exercise, assignments 1–3, ZyBooks (reference only). Resource not added yet — add links as notes on any task via Edit.</p>`;
 if(c==='SD')h+=`<div class="sec"><div class="sh2" data-a="sec" data-k="SDref"><b>Reference material</b></div>${V.sec.SDref?'<ul class="ref"><li><b>Opening</b> Software Evolution and Decay; Dynamic Modelling for Maintenance</li><li><b>Wk 3</b> UML; SciTools Understand; gdb and strace</li><li><b>Wk 4</b> OO Reengineering Patterns (Setting Direction, First Contact); Reverse Engineering; Meridian strace guide</li><li><b>Midterms</b> Midterm 1 practice; Midterm 2 practice and answers</li><li><b>Wk 6</b> Redistribute Responsibilities; Design Patterns in the Wild</li><li><b>Wk 7</b> Decay Signatures Lab; Legacy and AI Code; Version Control; SE at Google: Version Control; Pro Git; Learn From the Past</li><li><b>Wk 8</b> Large-Scale Changes; Change Management; Packaging and Releasing; Deprecation; Continuous Delivery</li><li><b>Wk 9</b> Changing Safely; Migration Strategies</li><li><b>Wk 10</b> Code Review; SE at Google: Code Review; What to Look For</li><li><b>Wk 11</b> Testing for Evolution</li></ul>':''}</div>`;
 return h}
function weakList(c){const a=S.weak.filter(w=>w.c===c),u=a.filter(w=>!w.done),d=a.filter(w=>w.done);
 const r=w=>`<div class="row ${w.done?'dn':''}"><div class="rr"><button class="ck ${w.done?'on':''}" data-a="wtog" data-id="${w.id}">${w.done?ico('check',16):''}</button><div class="rb" data-a="wedit" data-id="${w.id}"><div class="tt">${esc(w.topic)}</div><div class="meta"><span>${esc(w.desc)}</span>${w.grp?`<span>${esc(w.grp)}</span>`:''}</div></div></div></div>`;
 return(u.length?u.map(r).join(''):'<p class="mut">No topics to revisit yet.</p>')+(d.length?`<p class="mut dl">Completed</p>`+d.map(r).join(''):'')+`<div class="bts"><button class="btn" data-a="addweak" data-c="${c}">${ico('plus',14)} Add topic</button></div>`}
function defs(){const a=S.defs;return`<h2>Key definitions</h2>`+(a.map(d=>`<div class="card"><div class="mut">${esc(d.who)}</div><b>${esc(d.name)}</b><div class="${V.defshow[d.id]?'':'blur'}">${esc(d.def)}${d.note?`<div class="mut">${esc(d.note)}</div>`:''}</div><div class="bts"><button class="btn" data-a="defshow" data-id="${d.id}">${V.defshow[d.id]?'Hide':'Reveal'}</button><button class="btn" data-a="defedit" data-id="${d.id}">Edit</button></div></div>`).join('')||'<p class="mut">No definitions yet.</p>')+`<div class="bts"><button class="btn" data-a="defedit">${ico('plus',14)} Add definition</button></div>`}
function review(){if(V.weak)return`<button class="btn" data-a="weakc" data-c="">${ico('back',14)} Review</button><h1>${C[V.weak].name}</h1><p class="mut">${weakN(V.weak)} topics remaining. Completing these doesn't change the course ring.</p>`+weakList(V.weak);
 return`<h1>Review</h1><p class="mut">Topics you want to strengthen, by course.</p>`+Object.keys(C).map(c=>`<div class="card cc" data-a="weakc" data-c="${c}" style="border-left:5px solid ${C[c].col}"><div><b>${C[c].name}</b><div class="mut">${weakN(c)} topics remaining</div></div>${ico('next')}</div>`).join('')}
function settings(){return`<h1>Settings</h1><h2>Exams</h2>`+Object.entries(S.exams).map(([c,x])=>`<div class="card cc" data-a="exedit" data-c="${c}"><div><b>${C[c].code}</b><div class="mut">${fmt(x.date,{month:'short',day:'numeric'})} · ${tm(x.s)}–${tm(x.e)} · ${x.w}%</div></div><span class="btn">Edit</span></div>`).join('')+`<h2>Backup</h2><p class="mut">Data is stored only in this browser on this device. Clearing Safari website data can erase it, so export a backup now and then.</p><div class="bts"><button class="btn p" data-a="export">Export backup</button><label class="btn">Import backup<input type="file" accept="application/json" id="imp" hidden></label><button class="btn d" data-a="reset">Restore initial data</button></div><h2>Install on iPhone</h2><p class="mut">Open the HTTPS site in Safari → Share → Add to Home Screen → Add. Launch from the new icon.</p><p class="mut">Finals HQ v${VER}</p>`}

/* ---------- render ---------- */
const TABS=[['home','Home','home'],['cal','Calendar','cal'],['courses','Courses','book'],['review','Review','rev'],['settings','Settings','set']];
function render(){const y=scrollY;const v={home,cal:calendar,courses,review,settings}[V.tab]();
 $('#app').innerHTML=v;$('#nav').innerHTML=TABS.map(t=>`<button class="${V.tab===t[0]?'on':''}" data-a="tab" data-t="${t[0]}">${ico(t[2])}<span>${t[1]}</span></button>`).join('');
 scrollTo(0,y);requestAnimationFrame(()=>requestAnimationFrame(()=>$$('[data-o]').forEach(c=>c.style.strokeDashoffset=c.dataset.o)))}
const go=()=>{save();render()};

/* ---------- forms ---------- */
let FN;
function form(title,fs,cb,del){$('#sheet').innerHTML=`<div class="ov" data-a="close"></div><div class="shd"><h3>${title}</h3>${fs.map(f=>`<label>${f.l}${f.t==='select'?`<select name="${f.k}">${f.o.map(o=>`<option value="${o[0]}" ${o[0]==f.v?'selected':''}>${esc(o[1])}</option>`).join('')}</select>`:f.t==='check'?`<input type="checkbox" name="${f.k}" ${f.v?'checked':''}>`:f.t==='area'?`<textarea name="${f.k}">${esc(f.v)}</textarea>`:`<input name="${f.k}" type="${f.t||'text'}" value="${esc(f.v)}">`}</label>`).join('')}<div class="bts"><button class="btn p" data-a="fsave">Save</button>${del?'<button class="btn d" data-a="fdel">Delete</button>':''}<button class="btn" data-a="close">Cancel</button></div></div>`;$('#sheet').className='open';FN={cb,del,fs}}
const closeF=()=>{$('#sheet').className='';$('#sheet').innerHTML=''};
const TY=['content','coursework','review','commitment','assessment'].map(x=>[x,x]),KI=['Study','Coursework','Class','Lab','Practice','Work','Exam','Personal'].map(x=>[x.toLowerCase(),x]),CO=Object.keys(C).map(c=>[c,C[c].code+' '+C[c].name]);
const taskF=x=>form('Edit task',[{k:'title',l:'Title',v:x.title},{k:'date',l:'Scheduled date',t:'date',v:x.date},{k:'due',l:'Due date',t:'date',v:x.due},{k:'dur',l:'Minutes',t:'number',v:x.dur},{k:'type',l:'Type',t:'select',o:TY,v:x.type},{k:'count',l:'Counts toward progress ring',t:'check',v:isCount(x)},{k:'url',l:'Link (URL)',v:x.url},{k:'url2',l:'Second link',v:x.url2},{k:'score',l:'Score /10 (optional)',v:x.score},{k:'await',l:'Awaiting material',t:'check',v:x.await},{k:'note',l:'Notes',t:'area',v:x.note}],v=>{Object.assign(x,v);if(v.type==='content')x.count=v.count;if(v.type!=='content')x.count=false},()=>{S.tasks=S.tasks.filter(y=>y!==x)});
const dateF=(x,k='date')=>form('Move to date',[{k:'date',l:'Date',t:'date',v:x.date}],v=>{x.date=v.date});
const weakF=(w,c,g)=>form(w?'Edit weak topic':'Add weak topic',[{k:'topic',l:'Topic',v:w?.topic},{k:'desc',l:'What exactly is confusing? (optional)',t:'area',v:w?.desc},{k:'grp',l:'Related lecture/topic (optional)',v:w?.grp??g}],v=>{if(w)Object.assign(w,v);else S.weak.push({id:uid('w'),c,done:false,...v})},w&&(()=>{S.weak=S.weak.filter(y=>y!==w)}));
const exF=c=>{const x=S.exams[c];form(C[c].code+' exam',[{k:'date',l:'Date',t:'date',v:x.date},{k:'s',l:'Start',t:'time',v:x.s},{k:'e',l:'End',t:'time',v:x.e},{k:'w',l:'Weight %',t:'number',v:x.w}],v=>Object.assign(x,v))};

/* ---------- actions ---------- */
const tk=id=>S.tasks.find(x=>x.id===id);
const A={
 tab:d=>{V.tab=d.t;V.course=null;V.weak=null;scrollTo(0,0);render()},
 tog:d=>{const x=tk(d.id);x.done=!x.done;go()},
 open:d=>{const x=tk(d.id);if(x.ws&&!V.open[x.id]){V.open[x.id]=1}else V.open[x.id]=!V.open[x.id];render()},
 edit:d=>taskF(tk(d.id)),
 movet:d=>{tk(d.id).date=today();go();toast('Moved to today')},
 moved:d=>dateF(tk(d.id)),
 copy:d=>copy(prompt(tk(d.id))),
 ahead:()=>{V.ahead=!V.ahead;render()},next:d=>{V.next=V.next==+d.m?0:+d.m;render()},
 sel:d=>{V.sel=d.d;render()},mon:d=>{V.month=d.m;render()},
 course:d=>{V.course=d.c||null;scrollTo(0,0);render()},
 sec:d=>{V.sec[d.k]=!V.sec[d.k];render()},
 weakc:d=>{V.tab='review';V.weak=d.c||null;scrollTo(0,0);render()},
 addweak:d=>weakF(null,d.c,d.g),
 wtog:d=>{const w=S.weak.find(x=>x.id===d.id);w.done=!w.done;go()},
 wedit:d=>weakF(S.weak.find(x=>x.id===d.id)),
 defshow:d=>{V.defshow[d.id]=!V.defshow[d.id];render()},
 defedit:d=>{const x=S.defs.find(y=>y.id===d.id);form('Definition',[{k:'who',l:'Philosopher',v:x?.who},{k:'name',l:'Concept name',v:x?.name},{k:'def',l:'Definition',t:'area',v:x?.def},{k:'note',l:'Notes (optional)',v:x?.note}],v=>{x?Object.assign(x,v):S.defs.push({id:uid('d'),...v})},x&&(()=>{S.defs=S.defs.filter(y=>y!==x)}))},
 addt:d=>{const c=d.c||'DS';form('Add task',[{k:'c',l:'Course',t:'select',o:CO,v:c},{k:'sec',l:'Section',v:''},{k:'title',l:'Title',v:''},{k:'date',l:'Date',t:'date',v:d.d||''},{k:'dur',l:'Minutes',t:'number',v:30},{k:'type',l:'Type',t:'select',o:TY,v:'content'}],v=>{S.tasks.push({id:uid('t'),done:false,count:v.type==='content',...v});V.sec[v.c+v.sec]=1})},
 adde:d=>form('Add event',[{k:'title',l:'Title',v:''},{k:'date',l:'Date',t:'date',v:d.d},{k:'s',l:'Start',t:'time',v:''},{k:'e',l:'End',t:'time',v:''},{k:'kind',l:'Type',t:'select',o:KI,v:'work'},{k:'note',l:'Note',v:''}],v=>S.events.push({id:uid('e'),...v})),
 evedit:d=>{const x=S.events.find(y=>y.id===d.id);form('Edit event',[{k:'title',l:'Title',v:x.title},{k:'date',l:'Date',t:'date',v:x.date},{k:'s',l:'Start',t:'time',v:x.s},{k:'e',l:'End',t:'time',v:x.e},{k:'kind',l:'Type',t:'select',o:KI,v:x.kind},{k:'note',l:'Note',v:x.note},{k:'skip',l:'Skipped',t:'check',v:x.skip}],v=>Object.assign(x,v),()=>{S.events=S.events.filter(y=>y!==x)})},
 exedit:d=>exF(d.c||d.id.slice(1)),
 fsave:()=>{const v={};FN.fs.forEach(f=>{const el=$(`#sheet [name="${f.k}"]`);v[f.k]=f.t==='check'?el.checked:f.t==='number'?(+el.value||0):el.value});if(v.title!==undefined&&!v.title.trim()){toast('Add a title first');return}if(v.topic!==undefined&&!v.topic.trim()){toast('Add a topic first');return}FN.cb(v);closeF();go()},
 fdel:()=>{if(confirm('Delete this? This can\'t be undone.')){FN.del();closeF();go()}},
 close:closeF,
 export:()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:'application/json'}));a.download=`finals-hq-backup-${today()}.json`;a.click();toast('Backup exported')},
 reset:()=>{if(confirm('Replace ALL your data with the original schedule? Export a backup first if unsure.')){S=seed();go();toast('Initial data restored')}}};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b&&A[b.dataset.a])A[b.dataset.a](b.dataset,b)});
document.addEventListener('change',e=>{if(e.target.id!=='imp')return;const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d.tasks||!d.events||!d.weak)throw 0;if(!confirm('Replace current data with this backup?'))return;S=d;go();toast('Backup imported')}catch(x){toast('That file is not a valid Finals HQ backup')}};r.readAsText(f)});
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});
render();
