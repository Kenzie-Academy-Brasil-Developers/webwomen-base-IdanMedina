const listJob = document.querySelector(".list-job");
const listSetJob = document.querySelector(".list-setjob");


let item = {
  id: 0,
  title: "",
  enterprise: "",
  location: "",
  descrition: "",
  modalities: [],
};
let selectJob = [];

function notYet(){
  const p = document.createElement("p")
if(selectJob.length === 0){
    p.classList.add("not-yet");
    p.innerText = "Você ainda não aplicou para nenhuma vaga"
    return listSetJob.appendChild(p)
} 
}


function Yet(){
  const p = document.querySelector(".not-yet")
  if(p){
    return listSetJob.removeChild(p)
  }
}

function renderJob(job) {
  const saveJob = localStorage.getItem("job-data");
  const li = document.createElement("li");
  const title = document.createElement("h3");
  const where = document.createElement("div");
  const enterprise = document.createElement("p");
  const location = document.createElement("p");
  const description = document.createElement("p");
  const submit = document.createElement("div");
  const modalities = document.createElement("section");
  const button = document.createElement("button");

  li.classList.add("card-job");
  where.classList.add("where");
  description.classList.add("description");
  submit.classList.add("submit");
  modalities.classList.add("modalities");
  button.classList.add("submit-btn");

  title.innerText = job.title;
  enterprise.innerText = job.enterprise;
  location.innerText = job.location;
  description.innerText = job.descrition;
  job.modalities.forEach((elem) => {
    const modality = document.createElement("div");
    modality.classList.add("modality");
    modality.innerText = elem;
    modalities.append(modality);
  });
  button.id = job.id;
  button.innerText = "Candidatar";

  if(saveJob){
    const iterate = JSON.parse(saveJob)
    const findBtn = iterate.find(saved => saved.id === button.id) 
    if(typeof findBtn !== "undefined"){
      button.innerText = "Remover candidatura"}
  }

  button.addEventListener("click", (e) => {
    const id = e.target.id;
    
    const find = selectJob.find((element) => element.id == id);

    if (typeof find === "undefined") {
      let pushItem = { ...item };
      pushItem.id = id;
      pushItem.title = job.title;
      pushItem.enterprise = job.enterprise;
      pushItem.location = job.location;
      pushItem.descrition = job.descrition;
      pushItem.modalities = [];
      job.modalities.forEach((elem) => {
        pushItem.modalities.push(elem);
      });
      selectJob.push(pushItem);
      localStorage.setItem(`job-data`, JSON.stringify(selectJob));
      button.innerText = "Remover candidatura";
      renderSelJob(job);
      Yet()
    }
    if (typeof find !== "undefined") {
      listSetJob.innerHTML = "";
      const findIndex = selectJob.findIndex((element) => element.id === id);
      selectJob.splice(findIndex, 1);
      localStorage.setItem(`job-data`, JSON.stringify(selectJob));
      button.innerText = "Candidatar";
      selectJob.map((job) => renderSelJob(job));
      notYet()
      deleteSave()
    }
  });

  where.append(enterprise, location);
  submit.append(modalities, button);
  li.append(title, where, description, submit);
  listJob.appendChild(li);
}

function renderSelJob(seljob) {
  const li = document.createElement("li");
  const firstBox = document.createElement("div");
  const title = document.createElement("h4");
  const where = document.createElement("div");
  const enterprise = document.createElement("p");
  const location = document.createElement("p");
  const trashBox = document.createElement("span");
  const trash = document.createElement("img");

  li.classList.add("card-seljob");
  where.classList.add("where");
  trashBox.classList.add("trash-box");
  trash.classList.add("trash");

  li.id = seljob.id;
  title.innerText = seljob.title;
  enterprise.innerText = seljob.enterprise;
  location.innerText = seljob.location;
  trash.id = seljob.id;
  trash.src = "./assets/img/trash.png";
  trash.addEventListener("click", (e) => {
    listSetJob.innerHTML = "";
    const id = e.target.id;
    const submitBtn = document.querySelectorAll(".submit-btn");
    const findIndex = selectJob.findIndex((element) => element.id === id);
    selectJob.splice(findIndex, 1);
    localStorage.setItem(`job-data`, JSON.stringify(selectJob));
    for (let i = 0; i < submitBtn.length; i++) {
      if (submitBtn[i].id === id) {
        submitBtn[i].innerText = "Candidatar";
      }
    }
    selectJob.map((job) => renderSelJob(job));
    notYet()
    deleteSave()
  }
  );

  where.append(enterprise, location);
  firstBox.append(title, where);
  trashBox.appendChild(trash);
  li.append(firstBox, trashBox);
  listSetJob.appendChild(li);
}


function save(){
  const saveJob = localStorage.getItem("job-data");
  if(saveJob){
    const iterate = JSON.parse(saveJob)
    iterate.map((job) => selectJob.push(job))
    jobsData.map((job) => renderJob(job));
    } else {
      jobsData.map((job) => renderJob(job));
    }
}

function deleteSave(){
  const saveJob = JSON.parse(localStorage.getItem("job-data"));
if(saveJob.length === 0){
localStorage.removeItem("job-data")
}
}


save()
selectJob.map((job) => renderSelJob(job));
notYet()