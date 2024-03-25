document.addEventListener("DOMContentLoaded", async function() {
    let btn = document.querySelector(".header__buttons")
    let menu = document.querySelector(".menu")
    let closeBtn = document.querySelector(".menu__exit")
    btn.addEventListener("click", function() {
        menu.classList.add("menu-active")
        
    })
    document.addEventListener("click", function(e) {
        let target = e.target;
        if (!target.closest(".menu") && !target.closest(".header__buttons")) {
            menu.classList.remove("menu-active");
        }
    }) 
    
    if(localStorage.getItem("user-id") != null && localStorage.getItem("token") != null) {
       let res = await getUserById(localStorage.getItem("token"), localStorage.getItem("user-id"))
       document.querySelector(".profile__name").textContent = res.firstName + " " + res.lastName
       document.querySelector(".menu__name").textContent = res.firstName
    }
});

async function getUserById(token, userId) {
    let response = await fetch(`http://92.53.97.223:8081/users/by-id/${userId}`, {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + token
        },
        // referrerPolicy: "strict-origin-when-cross-origin"
    });

    let res = await response.json()
    return res;
}