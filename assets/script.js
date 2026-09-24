const announcements = [
  {date:"September 2026", title:"Welcome to the SJCC Library Website", text:"Explore library services, resources, guidelines, announcements, and contact information in one place."},
  {date:"2026", title:"Library Resources & Research Support", text:"Students and faculty may visit the Library Department for assistance in locating information and using available resources."},
  {date:"2026", title:"Library Hours", text:"The SJCC Library is open Monday to Friday, 8:00 AM to 5:00 PM. Please check official advisories for schedule changes."}
];

const catalog = [
  {title:"Sample Entry — Add Your Library Holdings", author:"Library Staff", subject:"Catalog Template", call:"Add call number", status:"Template"},
  {title:"Library Research Fundamentals", author:"Sample Author", subject:"Research / Information Literacy", call:"RES-001", status:"Example"},
  {title:"Philippine Local History: Sample Record", author:"Sample Author", subject:"Filipiniana / Local History", call:"FIL-001", status:"Example"},
  {title:"Academic Writing and Research", author:"Sample Author", subject:"Academic Writing", call:"RES-002", status:"Example"}
];

function renderAnnouncements(targetId, limit=null){
  const target=document.getElementById(targetId); if(!target)return;
  const data=limit?announcements.slice(0,limit):announcements;
  target.innerHTML=data.map(n=>`<article class="news-card"><time>${n.date}</time><h3>${n.title}</h3><p>${n.text}</p></article>`).join("");
}
function renderCatalog(items=catalog){
  const target=document.getElementById("catalogResults"); if(!target)return;
  if(!items.length){target.innerHTML='<div class="empty">No matching records found. Try another title, author, subject, or call number.</div>';return;}
  target.innerHTML=items.map(b=>`<article class="catalog-item"><h3>${b.title}</h3><div class="catalog-meta">Author: ${b.author} • Subject: ${b.subject} • Call No.: ${b.call} • Status: ${b.status}</div></article>`).join("");
}
function searchCatalog(){
  const q=(document.getElementById("catalogSearch")?.value||"").toLowerCase().trim();
  if(!q){renderCatalog();return;}
  renderCatalog(catalog.filter(b=>Object.values(b).join(" ").toLowerCase().includes(q)));
}
function handleContact(e){
  e.preventDefault();
  const n=document.getElementById("contactName").value;
  const em=document.getElementById("contactEmail").value;
  const msg=document.getElementById("contactMessage").value;
  const subject=encodeURIComponent("SJCC Library Website Inquiry");
  const body=encodeURIComponent(`Name: ${n}
Email: ${em}

${msg}`);
  window.location.href=`mailto:sjcclibrary7@gmail.com?subject=${subject}&body=${body}`;
  return false;
}
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelector(".menu-toggle")?.addEventListener("click",()=>document.querySelector(".nav")?.classList.toggle("open"));
  renderAnnouncements("homeAnnouncements",3);
  renderAnnouncements("allAnnouncements");
  renderCatalog();
});
