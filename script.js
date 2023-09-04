const header = document.getElementById("mainHead");
const div = document.createElement("div");
div.className = "divForHead";
div.innerHTML = `
<img src="./images/images/logo.png" id="image"/>
<i class="fa-solid fa-user fa-2x" onclick="showHideDiv()" id="userIcon" ></i>`;
header.appendChild(div)

async function loginForm() {
    // //   IN THIS LINE WE GET ALL USER INPUT
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("Cp").value;
    const number = document.getElementById("Contact").value;
    const DOB = document.getElementById("Dob").value;
    const profileInput = document.getElementById("profile").files[0];
    // Check length=
    let checkNumber = number.length;
    const passCheck = password.length;
    const emailCheck = email.includes("@gmail.com")
    //iN THIS LINE WE CHECK SOME CONDITIONS FOR EMAIL AND PASWORD
    if (name === "" && email === "" && password === "" && number === "" && DOB === "") {
        const msg = "Please enter all fields , it can't be empty!!";
        showToast(msg, "error");
    } else if (name == "" || email == "" || password == "" || confirmPassword == "" || number == "" || DOB == "") {
        if (name == "") {
            const msg = "Please enter yourFullName. It can't be empty!! ";
            showToast(msg, "error");
        } else if (email == "") {
            if (!emailCheck) {
                const msg = "email is not valid and also enter password";
                showToast(msg, "invalid");
                //
            } else {
                const msg = "Please enter Password. It can't be empty!! ";
                showToast(msg, "error");
            }
        }
    } else {
        if (!emailCheck) {
            if (passCheck < 8) {
                const msg =
                    "Email is not valid and Password length must be atleast 8 characters";
                showToast(msg, "invalid");
            } else {
                const msg = "email is not valid";
                showToast(msg, "invalid");
            }
        } else if (passCheck < 8) {
            const msg = "Password length must be atleast 8 characters";
            showToast(msg, "invalid");
        }
        else if (password != confirmPassword) {
            alert("password does not match");
        } else if (checkNumber < 10 || checkNumber > 10) {
            const msg = "Invalid Contact Number!! ";
            showToast(msg, "invalid");
        }
        else {
            try {

                const profileImageBase64 = await fileToBase64(profileInput);
                var person = {
                    name,
                    email,
                    password,
                    number,
                    DOB,
                    profileImage: profileImageBase64, // Use the external variable
                };
                // document.getElementById("contain").style.display = "flex";
                // document.getElementById("mainHead").style.display = "flex";

                // document.getElementById("box1").style.display = "flex";
                // document.getElementById("form1").style.display = "none";
                // creating a new object

                if (!localStorage.getItem("person")) {
                    localStorage.setItem("person", JSON.stringify(person));

                } else {
                    alert("user alredy created");
                }

                const containerDiv = document.getElementById("contain");
                containerDiv.style.display = "flex";
                createNavbar();
            } catch (error) {
                // if any error,
                console.log("err haii kuch !!");
            }
        }
    }
}


window.addEventListener("load", function () {
    // Your code to handle the page load event here

    if (localStorage.getItem("person")) {
        document.getElementById("contain").style.display = "flex";
        document.getElementById("mainHead").style.display = "flex";

        document.getElementById("box1").style.display = "flex";
        document.getElementById("form1").style.display = "none";

        const containerDiv = document.getElementById("contain");
        containerDiv.style.display = "flex";
        // createNavbar();
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
    }, 9000);
}
// for password
function showPassword() {
    var passField = document.getElementById("Cp");
    var showPass = document.getElementById("passwordDiv");
    if (passField.type === "password") {
        passField.type = "text";
        showPass.children[0].classList = "fa fa-lock-open fa-1x"
    } else {
        passField.type = "password";
        showPass.children[0].classList = "fa fa-lock fa-1x"
    }
}

// function for generating only object URL..
function createObjectURL(event) {
    const file = event.target.files[0];
    if (file) {
        const result = URL.createObjectURL(file)
        return result;
    }
    previewImage(event)
}




// this function  is only for preview seleted image in 
// login form only

function previewImage(event) {
    const newURL = createObjectURL(event)
    // console.log(newURL)
    if (newURL) {
        document.getElementById("picture").src = newURL
    }
}

// this function is only for preview new seleted image 
// inside sidemenu only---
function previewNewImage(event) {
    const newImageURL = createObjectURL(event)
    console.log(newImageURL)
    if (newImageURL) {
        document.getElementById("previewImage").src = newImageURL
    }
}



// previewImage
// const getImage = function (event) {
//     const showImage = document.getElementById("profile");
//     const uploadedImage = document.getElementById("picture");
//     uploadedImage.src = URL.createObjectURL(event.target.files[0]);
//     uploadedImage.onload = function () {
//         URL.revokeObjectURL(uploadedImage.src); // free memory
//     };
// };

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
function removeDiv() {
    document.getElementById("hideDiv").style.display = "none";
}

function showHideDiv() {
    if (document.getElementById("forData")) {
        document.getElementById("hideDiv").style.display = "flex"
    } else {
        document.getElementById("hideDiv").style.display = "flex";
        if (JSON.parse(localStorage.getItem("person"))) {
            let userData = JSON.parse(localStorage.getItem('person'))
            const showForm = document.getElementById("hideDiv");
            const show = document.createElement('div');
            show.id = "forData"
            show.innerHTML = `

        <img src="${userData.profileImage}" id="previewImage"/>
        <input type="file"  name="profile" accept="image/*" onchange="previewNewImage(event)" />

    
        <span style="font-size:12px;">Useremail address</span>
        <input type="email"value=${userData.email} id="emailDiv"><br><hr>
        console.log(userData.email)

        <span style="color:Blue;font-size:14px;">Name</span><br>
        <input type="text" value=${userData.name} id="nameDiv"><br><hr>

        <span style="color:Blue;font-size:14px;">Emergency Contact</span><i class="fa-solid fa-phone fa-2xs "></i> <br>
        <input type="number" value=${userData.number} id="contactDiv"><br><hr>

        <span style="color:Blue;font-size:14px;">DOB</span><br>
        <input type="date" value=${userData.DOB} id="DOBDiv"><br><hr>

        <button onclick="updateForm()" id="update">Update form</button>
         <button onclick="removeDiv()" id="close">X</button>`;

            showForm.appendChild(show);
        }
    }

}

// Update form
