document.addEventListener("DOMContentLoaded", async function() {
    let btn = document.querySelector(".header__buttons")
    let menu = document.querySelector(".menu")

    
    let token = localStorage.getItem("token")
    let userId =  localStorage.getItem("user-id")

    btn.addEventListener("click", function() {
        menu.classList.add("menu-active")

    })

    if(userId != null && token != null) {
        let res = await getUserById(localStorage.getItem("token"), localStorage.getItem("user-id"))
        document.querySelector(".profile__name").textContent = res.firstName + " " + res.lastName
        document.querySelector(".menu__name").textContent = res.firstName 
        document.querySelector(".left__heading").textContent = res.firstName + " " + res.lastName + " " + res.patronymic
        document.querySelector(".fio__text").textContent = res.firstName + " " + res.lastName + " " + res.patronymic
        document.querySelector(".number__number").textContent = res.phoneNumber
        document.querySelector(".email__email").textContent = res.email
    }

    document.addEventListener("click", function(e) {
        let target = e.target;
        if (!target.closest(".menu") && !target.closest(".header__buttons")) {
            menu.classList.remove("menu-active");
        }
    }) 

    let res = await getViolations(token)
    res.forEach(element => {
        let item = createScrollbarItem(element)
        document.querySelector(".simplebar-content").append(item)
    });
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
    console.log(res)
    return res;
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

function createScrollbarItem(object) {
    let mainContainer = document.createElement("div")
    let svg =  document.createElement("svg")
    let textContainer = document.createElement("div")
    let heading = document.createElement("h3")
    let date = document.createElement("p")

    // 1 - Проезд автомобиля на красный сигнал светофора
    // 2 - Переход пешеходом дороги на красный сигнал светофора
    // 3 - Водитель не пропустил пешехода
    // 4 - Выезд за стоп линию

    mainContainer.classList.add("right__item")
    textContainer.classList.add("item__text")
    heading.classList.add("item__heading")
    switch(object.violationType) {
        case 1:
            heading.textContent = "Проезд автомобиля на красный сигнал светофора";
            break;
        case 2:
            heading.textContent = "Переход пешеходом дороги на красный сигнал светофора";
            break;
        case 3:
            heading.textContent = "Водитель не пропустил пешехода";
            break;
        case 4:
            heading.textContent = "Выезд за стоп линию";
            break;
    }
    date.classList.add("item__text")
    date.textContent = object.comment
    svg.classList.add("item__icon")
    svg.setAttribute("viewBox", "0 0 61 52")
    svg.setAttribute("width", "61px")
    svg.setAttribute("height", "53px")
    mainContainer.innerHTML = '<svg class="item__icon" width="43" height="35" viewBox="0 0 43 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.95618 33V2M1.95618 33H40.746M1.95618 33L16.6169 17.1961M1.95618 2H40.746M1.95618 2L16.6169 17.1961M40.746 2V33M40.746 2L26.3907 17.1961M40.746 33L26.3907 17.1961M16.6169 17.1961L21.1984 22.0588L26.3907 17.1961" stroke="#1343EA" stroke-width="3"/></svg>'
    textContainer.append(heading)
    textContainer.append(date)
    // mainContainer.append(svg)
    mainContainer.append(textContainer)

    return mainContainer
}