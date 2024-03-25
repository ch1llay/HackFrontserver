document.addEventListener("DOMContentLoaded", async function() {
    let inputFile = document.querySelector(".container__input")
    let btn = document.querySelector(".header__buttons")
    let menu = document.querySelector(".menu")
    let container = document.querySelector(".right__top")
    let containerBottom = document.querySelector(".right__bottom")
    let form = document.querySelector(".main page")
    let modal = document.querySelector(".modal")
    let blackout = document.querySelector(".blackout")
    let againButton = document.querySelector(".modal__button")
    

    btn.addEventListener("click", function() {
        menu.classList.add("menu-active")
        
    })

    document.addEventListener("click", function(e) {
        let target = e.target;
        if (!target.closest(".menu") && !target.closest(".header__buttons")) {
            menu.classList.remove("menu-active");
        }
    }) 

    const element = document.querySelector('.item__select');
    const choices = new Choices(element, {
        searchEnabled: false
    });

    inputFile.addEventListener("input", function(event) {
        container.classList.add("right__container-active")
        if (inputFile.files[0].type.includes("image")) {
            document.querySelectorAll(".container__img").forEach(el => {
                el.remove()
            })
            let img = document.createElement("img")
            img.classList.add("container__img")
            containerBottom.append(img)
            img.src = webkitURL.createObjectURL(inputFile.files[0]);
            localStorage.setItem('myImage', img.src);
        }
        else {
            document.querySelectorAll(".container__img").forEach(el => {
                el.remove()
            })
            let video = document.createElement("video")
            video.classList.add("container__img")
            video.setAttribute("controls", '')
            containerBottom.append(video)
            video.src = webkitURL.createObjectURL(inputFile.files[0]);
            localStorage.setItem('myImage', video.src);
        }
    });

    let object = {
        "address": "string",
        "violationType": 0,
        "createdDate": "2024-03-24T09:15:42.951Z",
        "comment": "string",
        "fileLinks": [
            "50656ef2-4fff-46bd-aeae-c424754fc7e6"
        ]
    }

    let token = localStorage.getItem("token")
    let userId =  localStorage.getItem("user-id")

    form.addEventListener("submit", async function(e) {
        e.preventDefault()
    
        let addressInput = document.querySelector(".item__input");
        let typeInput = document.querySelector(".item__select");
        let commentInput = document.querySelector(".item__description");
        
        let id = await postFile(inputFile.files[0], token)
        let object = {
            "address": addressInput.value,
            "violationType": typeInput.value,
            "createdDate": new Date(),
            "comment": commentInput.value,
            "fileLinks": [
                id
            ]
        }
        await sendInfo(token, object)

        modal.classList.remove("none")
        blackout.classList.remove("none")
        
    })

    blackout.addEventListener("click", function() {
        modal.classList.add("none")
        blackout.classList.add("none")
    })

    againButton.addEventListener("click", function() {
        modal.classList.add("none")
        blackout.classList.add("none")
    })

    
    if(userId != null && token != null) {
        let res = await getUserById(localStorage.getItem("token"), localStorage.getItem("user-id"))
        document.querySelector(".profile__name").textContent = res.firstName + " " + res.lastName
        document.querySelector(".menu__name").textContent = res.firstName 
    }
 });


 
 async function sendInfo(token, object) {
     let response = await fetch("http://92.53.97.223:8081/violations", {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json;charset=utf-8',
             'Authorization': 'Bearer ' + token
         },
        body: JSON.stringify(object),
         // referrerPolicy: "strict-origin-when-cross-origin"
     });

     let res = await response.json()
     console.log(JSON.stringify(object))
 }

async function postFile(file, token) {
    const fd = new FormData();
    fd.append('formFile', file);
  
    let response = await fetch("http://92.53.97.223:8081/files", {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        method: 'POST',
        body: fd
    })

    let id = await response.json()
    return id;
}

async function getViolations(token) {
    let response = await fetch("http://92.53.97.223:8081/violations/my", {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + token
        },
        origin: "http://92.53.97.223:8081",
        // referrerPolicy: "strict-origin-when-cross-origin"
    });

    let res = await response.json()
    return res;
}

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
