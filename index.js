
let add_creativ = document.querySelector("#add-creativ");
let drawer_open = document.querySelector(".left");
let drawer = document.querySelector(".right");
let close = document.querySelector("#close");
let done = document.querySelector("#done");
let leftspan = document.querySelectorAll("span.left-span");
let rightspan = document.querySelectorAll("span.right-span");
let progress_report = document.querySelector(".bar2");
let prog_text = document.querySelector(".progress h3");
let list = document.querySelector(".list");
let searchbox=document.getElementById("search");
let progress = [];
var colors = [];
let isleftActive = "";
let isActiveColor = "";
let title = "";
let subTitle = "";

const fetchColor=()=>
{
   return new Promise((resolve,reject)=>
   {
    setTimeout(()=>
    {
      let res=fetch("https://random-flat-colors.vercel.app/api/random?count=6")  
    resolve(res);
    },500)
   }) 
}
fetchColor().then(res=>res.json()).then((res)=>{
  console.log(res)
    leftspan.forEach((e, i) => {
    e.style.backgroundColor = res.colors[i];
  
  });
  

    rightspan.forEach((e, i) => {
    e.style.backgroundColor = res.colors[+(i % 6)];
    e.addEventListener("click", (event) => {
      rightspan.forEach((ele, ind) => {
        ele.classList.remove("active");
      });
      isActiveColor = event.target.style.backgroundColor;
      event.target.classList.add("active");
    });
  });
})

function progreeHandler() {
  progress_report.style.width = `${progress.length * 20}%`;
  prog_text.innerHTML = `${progress.length}/5 Creatives`;
}
add_creativ.addEventListener("click", () => {
  drawer_open.classList.add("drawer-open");
  drawer.classList.add("drawer");
  add_creativ.setAttribute("disabled", "true");
});
done.addEventListener("click", (event) => {
  event.preventDefault();
  if (title.trim() !== "" && subTitle.trim() !== "" && isActiveColor !== "") {
    let li = document.createElement("li");
    li.style.backgroundColor = isActiveColor;
    let h2 = document.createElement("h2");
    h2.innerText = title;
    li.appendChild(h2);
    let h4 = document.createElement("h4");
    h4.innerText = subTitle;
    li.appendChild(h4);
    list.appendChild(li);
    progress.push(li);
    progreeHandler();
    document.querySelector(".b1 form input").value = "";
    document.querySelector(".b2 form input").value = "";
    title = "";
    subTitle = "";
    isActiveColor = "";
    drawer_open.classList.remove("drawer-open");

    rightspan.forEach((e) => e.classList.remove("active"));
    drawer.classList.remove("drawer");
    if (progress.length < 5) {
      add_creativ.removeAttribute("disabled");
    }
  }
});
close.addEventListener("click", () => {
  drawer.classList.remove("drawer");
  drawer_open.classList.remove("drawer-open");
  title = "";
  subTitle = "";
  isActiveColor = "";
  rightspan.forEach((e) => e.classList.remove("active"));
  document.querySelector(".b1 form input").value = "";
    document.querySelector(".b2 form input").value = "";
  if (progress.length < 5) {
    add_creativ.removeAttribute("disabled");
  }
});
function ch1(event) {
  title = event.target.value;
}
function ch2(event) {
  subTitle = event.target.value;
}

document.addEventListener("keydown",(event)=>
{
  if(event.key ==="Escape")
  {
    drawer.classList.remove("drawer");
  drawer_open.classList.remove("drawer-open");
  title = "";
    subTitle = "";
    isActiveColor = "";
    rightspan.forEach((e) => e.classList.remove("active"));
    document.querySelector(".b1 form input").value = "";
    document.querySelector(".b2 form input").value = "";
  if (progress.length < 5) {
    add_creativ.removeAttribute("disabled");
  }
  }
  
})

// search cratives
searchbox.addEventListener("keyup",(e)=>
{

  e.preventDefault()
  let listall=document.querySelector(".left .left-bottom-box .list").children;
  for(let i=0;i<listall.length;i++)
  {
   
    if((listall[i].children[0].innerText.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) || listall[i].children[1].innerText.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) || listall[i].style.backgroundColor===isleftActive )
    {
      listall[i].style.display="";
    }
    else{
      listall[i].style.display="none";
    }
  
  }
})



leftspan.forEach((e)=>
{
  e.addEventListener("click",(event)=>
  {
     leftspan.forEach(e2=>e2.classList.remove("active"))
    event.target.classList.add("active");
    isleftActive=event.target.style.backgroundColor;
  })

})


