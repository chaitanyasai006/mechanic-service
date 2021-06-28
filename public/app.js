var firebaseConfig = {
  //PASTE YOUR FIREBASE CONFIG
  //HERE
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let db = firebase.firestore();

// Initializing AOS library
AOS.init();

const searchbtn = document.getElementById("search-btn");
const input = document.getElementById("input");
const slocation = document.getElementById("location");
const results = document.getElementById("results");
const infoboxes = document.querySelector(".infoboxes");
let userinfo = [];

//Search input bar listener, listens for user input
input.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredInfo = userinfo.filter((uinfo) => {
    return uinfo.location.toLowerCase().includes(searchString);
  });
  displayInfo(filteredInfo);
});

searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
});
//Get data from Firebase Firestore
const udata = () => {
  try {
    db.collection("users")
      .get()
      .then((info) => {
        info.forEach((data) => {
          userinfo.push(data.data());
          displayInfo(userinfo);
        });
      });
  } catch (error) {
    console.log(error.message);
  }
};

//Display the retrieved info from Firestore
const displayInfo = (uinfos) => {
  const htmlString = uinfos
    .map((uinfo) => {
      return `
      <div class="infobox">
      <h1 id="name">${uinfo.name}</h1>
      <p id="address"><span><i class="far fa-address-book"></i></span> ${uinfo.address}</p>
      <p id="location"><span><i class="bi bi-geo-alt"></i></span>${uinfo.location}</p>
      <p id="mobile"><span><i class="bi bi-telephone"></i></span> <a href="tel: ${uinfo.mobile}" id="mobile-cta">${uinfo.mobile}</a></p>
    </div>
          `;
    })
    .join("");
  infoboxes.innerHTML = htmlString;
};

udata();
