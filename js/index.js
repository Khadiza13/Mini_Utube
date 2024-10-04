const loadcategory=()=>{
 fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
 .then(res => res.json())
 .then(data => displaycategory(data.categories))
}

const loadspecific=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
    removeActiveClass();
    //id er class k active korao
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add("active");
    displayvdos(data.category);
    })
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (let btn of buttons) {
      btn.classList.remove("active");
    }
  };

const displaycategory=(data)=>{
    const categoryContainer=document.getElementById('category-container')
    for(const val of data){
        const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${val.category_id}" onclick="loadspecific(${val.category_id})" class="btn category-btn">
       ${val.category}
      </button>
    `;

    //add button to catagory container
    categoryContainer.append(buttonContainer);
    }
}

loadcategory();

// get time
function getTimeString(time) {
    const SECONDS_IN_YEAR = 31536000; // 365 days
    const SECONDS_IN_MONTH = 2592000; // 30 days
    const SECONDS_IN_DAY = 86400; // 24 hours
    const SECONDS_IN_HOUR = 3600; // 60 minutes
    const SECONDS_IN_MINUTE = 60; // 60 seconds
  
    const years = Math.floor(time / SECONDS_IN_YEAR);
    time %= SECONDS_IN_YEAR;
  
    const months = Math.floor(time / SECONDS_IN_MONTH);
    time %= SECONDS_IN_MONTH;
  
    const days = Math.floor(time / SECONDS_IN_DAY);
    time %= SECONDS_IN_DAY;
  
    const hours = Math.floor(time / SECONDS_IN_HOUR);
    time %= SECONDS_IN_HOUR;
  
    const minutes = Math.floor(time / SECONDS_IN_MINUTE);
    const seconds = time % SECONDS_IN_MINUTE;
  
    let timeString = '';
  
    if (years) timeString += `${years} year `;
    if (months) timeString += `${months} month `;
    if (days) timeString += `${days} day `;
    if (hours) timeString += `${hours} hour `;
    if (minutes) timeString += `${minutes} minute `;
    if (seconds) timeString += `${seconds} second `;
  
    return timeString.trim() + ' ago';
  }

//showing details
const loadDetails = async (videoId) => {
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);
  };
  const displayDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById("modal-content");
  
    detailContainer.innerHTML = `
     <img src=${video.thumbnail} />
     <p>${video.description}</p>
    `;
  
    // way-1
    // document.getElementById("showModalData").click();
    //way-2
    document.getElementById("customModal").showModal();
};
  

// Loading videos

const loadvdos=(search="")=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
    .then(res => res.json())
    .then(data => displayvdos(data.videos))
}

const displayvdos=(datas)=>{
    const vdoContainer=document.getElementById('videos')
    vdoContainer.innerHTML="";
    if(datas.length==0){
        vdoContainer.classList.remove("grid");
    vdoContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
    
      <img src="assets/Icon.png" /> 
      <h2 class="text-center text-xl font-bold"> No Content Here in this Categery </h2> 
    </div>`;
  } else {
    vdoContainer.classList.add("grid");
    }
   for(const data of datas){
    console.log(data)
    const card=document.createElement('div');
    card.classList="card card-compact";
    card.innerHTML=
    `
    <figure class="h-[200px] relative">
    <img
      src="${data.thumbnail}"
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${
        data.others.posted_date?.length === 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-white text-xs p-1 rounded-lg">${getTimeString(data.others.posted_date)}</span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div class="">
        <img class="w-8 h-8 object-cover rounded-full" src=${data.authors[0].profile_picture}  alt="" srcset="">
    </div>
    <div>
    <h2 class="font-bold">${data.title}</h2>
    <div class="flex gap-2">
    <p class="text-sm text-gray-500">${data.authors[0].profile_name}</p>
    ${data.authors[0].verified===true ? `<img class="w-5 h-5 object-cover rounded-full" src="https://img.icons8.com/?size=48&id=nNYp7INJQs7d&format=png"  alt="" srcset="">` : ""}
    
    </div>
    <p class="text-sm text-gray-400">${data.others.views} views</p>
    <p> <button  onclick="loadDetails('${
          data.video_id
        }')" class="btn btn-sm bg-blue-300 my-2">Details</button> </p>
    </div>   
  </div>
    `
   vdoContainer.appendChild(card);
   }
}
document.getElementById("search-input").addEventListener("keyup", (e) => {
    loadvdos(e.target.value);
  });
loadvdos();


   
