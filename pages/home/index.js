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
if(selectJob.length === 0){
    const p = document.createElement("p")
    p.classList.add("not-yet")
    p.innerText = "Você ainda não aplicou para nenhuma vaga"
    return listSetJob.appendChild(p)
} 
else {
  const p = document.querySelector(".not-yet");
  return listSetJob.removeChild(p)
}
}
notYet()
function renderJob(job) {
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

  button.addEventListener("click", (e) => {
    const id = e.target.id;
    let pushItem = { ...item };
    const find = selectJob.find((element) => element.id == id);

    if (typeof find === "undefined") {
      pushItem.id = id;
      pushItem.title = job.title;
      pushItem.enterprise = job.enterprise;
      pushItem.location = job.location;
      pushItem.descrition = job.descrition;
      job.modalities.forEach((elem) => {
        pushItem.modalities.push(elem);
      });
      selectJob.push(pushItem);
      localStorage.setItem(`job-data ${id}`, JSON.stringify(pushItem));
      button.innerText = "Remover candidatura";
      renderSelJob(job);
      notYet()
    }
    if (typeof find !== "undefined") {
      listSetJob.innerHTML = "";
      const findIndex = selectJob.findIndex((element) => element.id === id);
      selectJob.splice(findIndex, 1);
      localStorage.removeItem(`job-data ${id}`);
      button.innerText = "Candidatar";
      selectJob.map((job) => renderSelJob(job));
      notYet()
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
  trash.src = "../assets/img/trash.png";
  trash.addEventListener("click", (e) => {
    listSetJob.innerHTML = "";
    const id = e.target.id;
    const submitBtn = document.querySelectorAll(".submit-btn");
    const findIndex = selectJob.find((element) => element.id === id);
    selectJob.splice(findIndex, 1);
    localStorage.removeItem(`job-data ${id}`);
    for (let i = 0; i < submitBtn.length; i++) {
      if (submitBtn[i].id === id) {
        submitBtn[i].innerText = "Candidatar";
      }
    }
    selectJob.map((job) => renderSelJob(job));
    notYet()
  }
  );

  where.append(enterprise, location);
  firstBox.append(title, where);
  trashBox.appendChild(trash);
  li.append(firstBox, trashBox);
  listSetJob.appendChild(li);
}

jobsData.map((job) => renderJob(job));
selectJob.map((job) => renderJob(job));
