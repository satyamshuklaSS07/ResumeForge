const $ = (id) => document.getElementById(id);
const form = $("resumeForm");
const storageKey = "resumeforge-v1";

const defaults = {
  name:"Satyam Shukla", title:"Software Developer", email:"satyam@example.com", phone:"+91 98765 43210",
  location:"Delhi, India", website:"linkedin.com/in/satyam-shukla",
  summary:"Motivated MCA student and software development enthusiast with hands-on experience building responsive web applications. Strong foundation in Java, Python, JavaScript and modern development workflows.",
  skills:"Java, Python, JavaScript, HTML5, CSS3, SQL, Git, MySQL",
  github:"github.com/satyamshuklaSS07", portfolio:"satyamshukla.vercel.app",
  education:[{degree:"MCA",school:"Guru Gobind Singh Indraprastha University",year:"2026 – 2028",grade:"In Progress"},{degree:"BCA",school:"CCSU, Meerut",year:"2023 – 2026",grade:"60%"}],
  experience:[{role:"Software Development Intern",company:"Internship Project",period:"2026",location:"Remote",description:"Built and deployed responsive web projects using HTML, CSS and JavaScript.\nImplemented interactive UI components, local storage and reusable front-end patterns.\nMaintained GitHub repositories and deployed projects with Vercel."}],
  projects:[{name:"Interactive Resume Builder",stack:"HTML · CSS · JavaScript",description:"Created a live resume editor with dynamic sections, instant preview, photo upload, local storage and print-ready PDF output.",link:"github.com/satyamshuklaSS07"}]
};

function addRepeat(type, data={}){
  const template = $(`${type}Template`);
  const target = $(`${type}Fields`);
  const node = template.content.cloneNode(true);
  const card = node.querySelector(".repeat-card");
  Object.entries(data).forEach(([key,val]) => {
    const el = card.querySelector(`[data-field="${key}"]`);
    if(el) el.value = val ?? "";
  });
  card.querySelector(".remove-btn").addEventListener("click",()=>{card.remove(); update();});
  target.appendChild(node);
}
function readRepeats(type){
  return [...$(`${type}Fields`).querySelectorAll(".repeat-card")].map(card=>{
    const obj={}; card.querySelectorAll("[data-field]").forEach(el=>obj[el.dataset.field]=el.value.trim()); return obj;
  });
}
function val(id){return $(id).value.trim()}

function update(){
  $("previewName").textContent = val("name") || "Your Name";
  $("previewTitle").textContent = val("title") || "Professional Title";
  $("footerName").textContent = val("name") || "Your Name";
  const contact=[val("email"),val("phone"),val("location")].filter(Boolean).join(" · ");
  $("previewContact").textContent=contact || "email@example.com · +91 00000 00000 · City, Country";
  $("previewLinks").textContent=[val("website"),val("github"),val("portfolio")].filter(Boolean).join("  ·  ");
  $("previewSummary").textContent=val("summary") || "A concise professional summary will appear here. Highlight your strengths, experience and the value you bring.";

  const exp=readRepeats("experience");
  $("previewExperience").innerHTML=exp.length ? exp.map(x=>`
    <div class="resume-item">
      <div class="item-head"><strong>${esc(x.role||"Role")}</strong><time>${esc(x.period||"")}</time></div>
      <div class="item-sub">${esc(x.company||"Company")}${x.location?" · "+esc(x.location):""}</div>
      <div class="item-desc">${esc(x.description||"Add responsibilities and achievements.")}</div>
    </div>`).join("") : '<div class="empty-state">No experience added yet.</div>';

  const edu=readRepeats("education");
  $("previewEducation").innerHTML=edu.length ? edu.map(x=>`
    <div class="resume-item"><div class="item-head"><strong>${esc(x.degree||"Degree")}</strong><time>${esc(x.year||"")}</time></div>
    <div class="item-sub">${esc(x.school||"Institution")}</div><div class="item-desc">${esc(x.grade||"")}</div></div>`).join("") : '<div class="empty-state">No education added yet.</div>';

  const projects=readRepeats("project");
  $("previewProjects").innerHTML=projects.length ? projects.map(x=>`
    <div class="resume-item"><div class="item-head"><strong>${esc(x.name||"Project")}</strong></div>
    <div class="item-sub">${esc(x.stack||"")}</div><div class="item-desc">${esc(x.description||"Add project details.")}</div>
    ${x.link?`<div class="project-link">${esc(x.link)}</div>`:""}</div>`).join("") : '<div class="empty-state">No projects added yet.</div>';

  const skills=val("skills").split(",").map(s=>s.trim()).filter(Boolean);
  $("previewSkills").innerHTML=skills.length ? skills.map(s=>`<span class="skill-tag">${esc(s)}</span>`).join("") : '<div class="empty-state">Add your skills.</div>';

  const filled=["name","title","email","phone","location","summary","skills"].filter(id=>val(id)).length;
  const repeated=exp.length+edu.length+projects.length;
  const percent=Math.min(100,Math.round(((filled+Math.min(repeated,3))/10)*100));
  $("completion").textContent=percent+"%";
  document.querySelector(".progress-ring").style.setProperty("--progress",percent+"%");
  localStorage.setItem(storageKey,JSON.stringify(collect()));
  $("savedStatus").textContent="Auto-saved · "+new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
}
function collect(){
  const obj={}; ["name","title","email","phone","location","website","summary","skills","github","portfolio"].forEach(id=>obj[id]=val(id));
  obj.education=readRepeats("education");obj.experience=readRepeats("experience");obj.projects=readRepeats("project");return obj;
}
function esc(str){return String(str).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function load(data){
  ["name","title","email","phone","location","website","summary","skills","github","portfolio"].forEach(id=>$(id).value=data[id]||"");
  ["education","experience","project"].forEach(type=>$(`${type}Fields`).innerHTML="");
  (data.education||[]).forEach(x=>addRepeat("education",x));
  (data.experience||[]).forEach(x=>addRepeat("experience",x));
  (data.projects||[]).forEach(x=>addRepeat("project",x));
  update();
}
form.addEventListener("input",update);
$("addEducation").onclick=()=>{addRepeat("education");update()};
$("addExperience").onclick=()=>{addRepeat("experience");update()};
$("addProject").onclick=()=>{addRepeat("project");update()};
$("printBtn").onclick=()=>window.print();
$("sampleBtn").onclick=()=>load(defaults);
$("clearBtn").onclick=()=>{
  if(confirm("Clear all resume data?")){localStorage.removeItem(storageKey);load({education:[{}],experience:[],projects:[]});}
};
$("photoInput").addEventListener("change",e=>{
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=ev=>{
    $("avatarPreview").innerHTML=`<img src="${ev.target.result}" alt="Profile">`;
    $("resumePhoto").style.display="block";$("resumePhoto").style.backgroundImage=`url("${ev.target.result}")`;
    localStorage.setItem("resumePhoto",ev.target.result);
  };reader.readAsDataURL(file);
});

const saved=JSON.parse(localStorage.getItem(storageKey)||"null");
load(saved || defaults);
const photo=localStorage.getItem("resumePhoto");
if(photo){$("avatarPreview").innerHTML=`<img src="${photo}" alt="Profile">`;$("resumePhoto").style.display="block";$("resumePhoto").style.backgroundImage=`url("${photo}")`;}
