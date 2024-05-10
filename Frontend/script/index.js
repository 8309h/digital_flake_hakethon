document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showRegisterBtn = document.getElementById("showRegisterForm");
    const showLoginFormBtn = document.getElementById("showLoginForm");

    registerForm.style.display = "none";

    showRegisterBtn.addEventListener("click", function(event) {
        event.preventDefault();
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    });

    showLoginFormBtn.addEventListener("click", function(event) {
        event.preventDefault();
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });

})

    


let form = document.getElementById('registerForm');
form.addEventListener('submit', myfun);

function myfun(event) {
    event.preventDefault();

    const email = document.getElementById("register_email").value;
    const password = document.getElementById("register_password").value;

    if (email === "" || password === "") {
        alert("All fields are required");
    } else {
        let payload = {email, password,};
        let deployed = "http://localhost:8080/user/register";

        fetch(deployed, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            console.log("data", data.msg);

            if (data.msg === "User already exists. Please login") {
                alert(data.msg);
                location.href = "index.html";
            } else if (data.msg === "New user registered successfully") {
                alert("SignUp Success");
                location.href = "login.html";
                
                loginForm.style.display = "block";
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
}


// Function for login form
function handleLoginForm(event) {
    event.preventDefault();

    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    if (loginEmail === "" || loginPassword === "") {
        alert("All fields are required");
        return false;
    }

    const payload = { email: loginEmail, password: loginPassword };
    console.log("payload", payload);

    const deployedUrl = "http://localhost:8080/user/login";

    fetch(deployedUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then((res) => {
        console.log("res",res)
        if (!res.ok) {
            alert("Invalid Credentials")
        }
        return res.json();
    })
    .then((res) => {
        console.log("userback", res.user);

        if (res.msg === "Login successful") {
            localStorage.setItem("digitoken", res.token);
            localStorage.setItem("haslogin", true);
            const userObject = res.user;
            const userJSON = JSON.stringify(userObject);
            localStorage.setItem("login_user", userJSON);
            alert("Login Successful");
            location.href = "dashboard.html";
        } else {
            alert("Login failed");
        }
    })
    .catch((err) => {
        console.error("Error:", err);
    });
}

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", handleLoginForm);


function togglePasswordVisibility() {
    const passwordInput = document.getElementById("loginPassword");
    const eyeIcon = document.getElementById("eye");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.textContent = "👁️"; 
    } else {
        passwordInput.type = "password";
        eyeIcon.textContent = "👁️"; 
    }
}


function togglePasswordVisibilityforregister(){

    const register_password =  document.getElementById('register_password')
    const eyeIcon = document.getElementById("eye");

    if (register_password.type === "password") {
        register_password.type = "text";
        eyeIcon.textContent = "👁️"; 
    } else {
        register_password.type = "password";
        eyeIcon.textContent = "👁️"; 
    }

}





