let theme=localStorage.getItem("theme");
if(theme==null) localStorage.setItem("theme","dark");
else chTheme(theme);
let allNotes=localStorage.getItem("allnotes")?JSON.parse(localStorage.getItem("allnotes")):[];
let bakTitle="";
showPrevNotes();


function showPrevNotes(){
    document.querySelector(".allnotes").innerHTML='';
    for(let i=0;i<allNotes.length;i++){
        let ogcard=document.querySelector(".note-card");
        let card=ogcard.cloneNode(true);
        card.style.display="inline";
        card.querySelector("h5").innerText=allNotes[i][0];
        card.querySelector("p").innerText=allNotes[i][1].slice(0,101);
        document.querySelector(".allnotes").appendChild(card);
    }
}

function chTheme(th){
    let html=document.querySelector("html");
    if(html.getAttribute("data-bs-theme")=="default" || th=="dark"){
        html.setAttribute("data-bs-theme","dark");
        document.querySelector(".theme").innerText="Light Mode";
        localStorage.setItem("theme","dark");
    }
    else{
        html.setAttribute("data-bs-theme","default");
        document.querySelector(".theme").innerText="Dark Mode";
        localStorage.setItem("theme","default");
    }
}

//add new note

function toggleAddNote(form){
    if(document.querySelector(".noteedit").style.display=="flex") toggleEditNote();
    let d=document.querySelector(".notecreate");
    if(d.style.display=="flex") d.style.display="none";
    else d.style.display="flex";
    if(form!=null){
    form.title.value="";
    form.body.value="";}
    else{
        let f=d.querySelector("form");
        f.title.value="";
        f.body.value="";
    }
}

function saveNote(form){
    if(form.title.value.length==0 && form.body.value.length==0) return;
    if(form.parentElement.classList.contains("editnote")) noteDel();
    let ogcard=document.querySelector(".note-card");
    let card=ogcard.cloneNode(true);
    card.style.display="inline";
    card.querySelector("h5").innerText=form.title.value;
    card.querySelector("p").innerText=form.body.value.slice(0,101);
    document.querySelector(".allnotes").appendChild(card);
    savelocalNote(form.title.value,form.body.value);
    if(form.parentElement.classList.contains("newnote")) toggleAddNote(form);
    else toggleEditNote(form);
}

function savelocalNote(title,body){
    allNotes.push([title.trim(),body]);
    localStorage.setItem("allnotes",JSON.stringify(allNotes));
}

//edit notes
function toggleEditNote(form){
    if(document.querySelector(".notecreate").style.display=="flex") toggleAddNote();
    let d=document.querySelector(".noteedit");
    if(d.style.display=="flex") d.style.display="none";
    else d.style.display="flex";
    if(form!=null){
    form.title.value="";
    form.body.value="";}
    else{
        let f=d.querySelector("form");
        f.title.value="";
        f.body.value="";
    }
}

function noteClick(div){
    let tit=div.querySelector("h5").innerText;
    console.log(">"+tit+"<");
    for(let i=0;i<allNotes.length;i++){
        if(allNotes[i][0]==tit){
            console.log("found");
            // let d=document.querySelector(".noteedit");
            // d.style.display="flex";
            toggleEditNote();
            let form=document.querySelectorAll("form")[1];
            form.title.value=bakTitle=allNotes[i][0];
            form.body.value=allNotes[i][1];
            break;
        }
    }
}

function noteDel(form){
    let j=0; let count=0;
    for(let i=0;i<allNotes.length;i++){
        if(allNotes[i][0]!=bakTitle){
            allNotes[j++]=allNotes[i];
        }
        else count++;
    }
    while(count--) allNotes.pop();
    showPrevNotes();bakTitle="";
    localStorage.setItem("allnotes",JSON.stringify(allNotes));
    document.querySelector(".noteedit").style.display="none";
}

function allNotesDel(){
    allNotes=[];bakTitle="";
    localStorage.setItem("allnotes","");
    showPrevNotes();
}