document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logoutbutton");

    const confirmdiv = document.getElementById('logout_confimdiv')
    confirmdiv.style.display = 'none'

    logoutButton.addEventListener("click", function(e) {
        e.preventDefault()
        console.log("button hits...")
        confirmdiv.style.display = 'block'
        confirmdiv.style.position= "fixed"
        confirmdiv.style.top = "100px";
        confirmdiv.style.left = "77%";
        confirmdiv.style.height = "200px"
        confirmdiv.style.backgroundColor ='whitesmoke'
        confirmdiv.style.color ='black'


        const confirmlogoutbutton = document.getElementById('confirm_logout')
        confirmlogoutbutton.addEventListener('click',function(){
            fetch("http://localhost:8080/user/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                
            }
        })
        .then(response => {
            if (response.message ="Logout successful" ) {
                alert("Logout successful");
                window.location.href = "index.html";
            } else {
                alert("Logout failed");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Logout failed. Please try again.");
        });

        })


        
    });


    const cancel_logout = document.getElementById('cancel')
    cancel_logout.addEventListener('click', function(){
        confirmdiv.style.display = 'none'
    })
});