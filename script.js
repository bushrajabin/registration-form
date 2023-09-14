function createNavbar() {
  const containerDiv = document.getElementById("contain");
  containerDiv.style.display = "flex";
  document.getElementById("form1").style.display = "none";
  const header = document.getElementById("navbar");
  const div = document.createElement("nav");
  div.className = "divForHead";
  div.innerHTML = `
      <img src="./images/images/logo.png" id="image"/>
      <i class="fa-solid fa-user fa-2x" onclick="showSideBar()" id="userIcon" ></i>`;
  header.appendChild(div);
}

async function loginForm() {
  // //   IN THIS LINE WE GET ALL USER INPUT
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("Cp").value;
  const number = document.getElementById("Contact").value;
  const profileInput = document.getElementById("profile").files[0];
  // Check length=
  const emailCheck = email.includes("@gmail.com");
  let checkNumber = number.length;
  const passCheck = password.length;
  //iN THIS LINE WE CHECK SOME CONDITIONS FOR EMAIL AND PASWORD

  if (
    !profileInput &&
    name == "" &&
    email === "" &&
    password === "" &&
    number == ""
  ) {
    const msg = "Please enter all the inputs!! , they can't be empty!!";
    showToast(msg, "error");
    //
  } else if (!profileInput || name == "" || email == "" || password == "") {
    if (!profileInput) {
      const msg = "Please select a file!! ";
      showToast(msg, "invalid");
    } else if (name == "") {
      const msg = "Please enter your Full Name!! ";
      showToast(msg, "invalid");
    } else if (email == "") {
      const msg = "Please enter emailid. It can't be empty!! ";
      showToast(msg, "error");
    } else if (password == "") {
      if (!emailCheck) {
        const msg = "email is not valid and also enter password";
        showToast(msg, "invalid");
        //
      } else {
        const msg = "Please enter Password. It can't be empty!! ";
        showToast(msg, "invalid");
      }

      // const msg = "Please enter Password. It can't be empty!! ";
      // showToast(msg, "invalid");
    }
  } else if (!emailCheck) {
    if (passCheck < 8) {
      const msg =
        "Email is not valid and Password length must be atleast 8 characters";
      showToast(msg, "invalid");
    } else {
      const msg = "email is not valid";
      showToast(msg, "invalid");
    }
  } else if (passCheck < 8) {
    if (!emailCheck) {
      const msg = "email is not valid password is incorrect";
      showToast(msg, "invalid");
    } else {
      const msg = "Password length must be atleast 8 characters";
      showToast(msg, "invalid");
    }
  } else if (password != confirmPassword) {
    const msg = "Password does not match!! ";
    showToast(msg, "invalid");
  } else if (checkNumber < 10 || checkNumber > 10) {
    const msg = "Invalid Contact Number!! ";
    showToast(msg, "invalid");
  } else {
    try {
      const profileImageBase64 = await fileToBase64(profileInput);
      var payload = {
        name,
        email,
        password,
        number,
        profileImage: profileImageBase64, // Use the external variable
      };
      if (!localStorage.getItem("person")) {
        localStorage.setItem("person", JSON.stringify(payload));
      } else {
        alert("user alredy created");
      }

      document.getElementById("box1").style.display = "flex";
      createNavbar();

      const msg = "congratulations ! succesfully logged in ";
      showToast(msg, "success");
    } catch (error) {
      // if any error,
      console.log("err haii kuch !!");
    }
  }
}

window.addEventListener("load", function () {
  // Your code to handle the page load event here

  if (localStorage.getItem("person")) {
    createNavbar();
  }
});

// showToast
let toastBox = document.getElementById("toastBox");
function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = "toast";
  switch (type) {
    case "success":
      toast.classList.add("Success");
      toast.innerHTML = `<img src="./images/images/checkMark.png" > ${message} `;
      break;
    case "error":
      toast.classList.add("Error");
      toast.innerHTML = `<img src="./images/images/crossMark.png" > ${message}`;
      break;
    case "invalid":
      toast.classList.add("Invalid");
      toast.innerHTML = `<img src="./images/images/errorMark.png" > ${message}`;

      break;
    default:
      console.log("please see all toast type , may be some type issue !!");
      break;
  }
  toastBox.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1000);
}
// for password
function showPassword() {
  var passField = document.getElementById("Cp");
  var showPass = document.getElementById("passwordDiv");
  if (passField.type === "password") {
    passField.type = "text";
    showPass.children[0].classList = "fa fa-lock-open fa-1x";
  } else {
    passField.type = "password";
    showPass.children[0].classList = "fa fa-lock fa-1x";
  }
}

// function for generating only object URL..
function createObjectURL(event) {
  const file = event.target.files[0];
  if (file) {
    const result = URL.createObjectURL(file);
    return result;
  }
  previewImage(event);
}

// this function  is only for preview seleted image in
// login form only

function previewImage(event) {
  const newURL = createObjectURL(event);
  // console.log(newURL)
  if (newURL) {
    document.getElementById("picture").src = newURL;
  }
}

// this function is only for preview new seleted image
// inside sidemenu only---
function previewNewImage(event) {
  const newImageURL = createObjectURL(event);
  if (newImageURL) {
    document.getElementById("previewImage").src = newImageURL;
  }
}

// ADDED PRODUCT IMAGE

// function addedProductImage(event) {
//     const newImageURL = createObjectURL(event);
//     if (newImageURL) {
//         document.getElementById("").src = newImageURL;
//     }
// }
// file to base64 converter

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const base64Data = e.target.result;
      resolve(base64Data);
    };

    reader.readAsDataURL(file);
  });
}

// REmove SideBar
function removeSideBar() {
  document.getElementById("hideDiv").style.display = "none";
}

function showSideBar() {
  document.getElementById("hideDiv").style.display = "flex";
}

// profile data to show in sidebar...
// adding logged-in  user data from localstorage to sidemenu profile...

window.addEventListener("load", () => {
  showDataInSideBar();
});

// THIS FUNCTION IS FOR GET DATA FROM LOCAL STORAGE AND SHOW IN SIDEBAR
function showDataInSideBar() {
  const userData = JSON.parse(localStorage.getItem("person"));

  const { name, email, number, profileImage } = userData;

  const showForm = document.getElementById("hideDiv");
  const show = document.createElement("div");
  show.id = "forData";
  show.innerHTML = `
                      <img src= "${profileImage}" id="previewImage" />

                      <label for="cameraIcon" >
                      <input type="file" onchange="previewNewImage(event)" accept="image/*"  id="cameraIcon" >
                      <i class="fa-solid fa-camera fa-2x " id="camera"></i>
                      </label>
  
                      <input type="file"  name="profile" accept="image/*" id="profileUpdateImage" ><br><br>
          
                    
                      
                      <p> <span style="font-size:12px;">Useremail address</span></p>
                      <input type="email" value=${email} id="emailDiv"><br><hr>
                      <p><span style="color:Blue;font-size:14px;">Name</span><br></p>
                      <input type="text" value=${name} id="nameDiv"><br><hr>
          
                      <p><span style="color:Blue;font-size:14px;"> Emergency Contact </span> <i class="fa-solid fa-phone fa-2xs "></i></p><br>
                      <input type="number" value=${number} id="contactDiv"><br><hr>
          
                      <button onclick="updateForm()" id="update">Update form</button>
                      <button onclick="logout()" id="delete">log-out</button>
                      <button onclick="removeSideBar()" id="close">X</button>
                      `;

  showForm.appendChild(show);
}
// // Update form whne user click on update button
async function updateForm() {
  // GET ALL UPDATED VALUE
  const name = document.getElementById("nameDiv").value;
  const email = document.getElementById("emailDiv").value;
  const number = document.getElementById("contactDiv").value;
  const profile = document.getElementById("cameraIcon").files[0];

  // retriveing old  profile data from localstorage...

  try {
    var updateImageToBase64 = await fileToBase64(profile);
  } catch {
    console.log("error");
  }

  const oldData = JSON.parse(localStorage.getItem("person"));
  const { profileImage } = oldData;

  const newData = {
    name,
    email,
    number,
    profileImage: profile ? updateImageToBase64 : profileImage,
  };

  const isSame = JSON.stringify(oldData) === JSON.stringify(newData);

  if (isSame) {
    alert("mo any cnhages in profile data");
  } else {
    localStorage.setItem("person", JSON.stringify(newData));

    alert("proile updated");
  }
}

// for log out the form
function logout() {
  localStorage.removeItem("person");
  document.getElementById("box1").style.display = "none";
  document.getElementById("form1").style.display = "flex";
  document.getElementById("hideDiv").style.display = "none";
  document.getElementById("navbar").style.display = "none";
}

// THIS IS OR SUBMIT PRODUCT FORM...
function submitproductForm() {

    document.getElementById("form-for-added-product").style.display="none";

  document.getElementById("show-data").style.display="flex";
  const productName = document.getElementById("productName").value;
  const aboutProduct = document.getElementById("About-product").value;

  const product = {
    productName,
    aboutProduct,
  };
  localStorage.setItem("product", JSON.stringify(product));
}
