document.addEventListener("DOMContentLoaded", async function() {

    // let img = document.querySelector(".container__img")
    // let input = document.querySelector(".container__input")
    let btn = document.querySelector(".header__buttons")
    let menu = document.querySelector(".menu")
    // let sendLabel = document.querySelector(".container__label")
    // let container = document.querySelector(".right__top")
    let token = localStorage.getItem("token")
    let userId =  localStorage.getItem("user-id")
    let scrollbarContainer = document.querySelector(".simplebar-content")

    let textCategory = document.querySelector(".left__category")
    let textDate = document.querySelector(".right__date")
    let imgViolation = document.querySelector(".main__img")
    let textDescription = document.querySelector(".main__description")
    let textAddress = document.querySelector(".main__addres")
    let textConclusion = document.querySelector(".container__conclusion")

    let res = await getViolations(token)
    console.log(res)
    if(res.length != 0) {

        switch(res[0].violationType) { 
            case 1:
                textCategory.textContent = "Проезд автомобиля на красный сигнал светофора";
                break;
            case 2:
                textCategory.textContent = "Переход пешеходом дороги на красный сигнал светофора";
                break;
            case 3:
                textCategory.textContent = "Водитель не пропустил пешехода";
                break;
            case 4:
                textCategory.textContent = "Выезд за стоп линию";
                break;
        }
        let dateCreate = new Date(res[0].createdDate)
        textDate.textContent = dateCreate.getDate() + "." + dateCreate.getMonth() + "." + dateCreate.getFullYear()
        textAddress.textContent =  res[0].address
        textDescription.textContent = res[0].comment
        imgViolation.src = "http://92.53.97.223:8081/files/" + res[0].fileLinks[0]
    
        
        res.forEach(element => {
            console.log(element)
            let item = createScrollbarItem(element)
            scrollbarContainer.append(item)
            item.addEventListener("click", function() {
                console.log(element.violationType)
                switch(element.violationType) { 
                    case 1:
                        textCategory.textContent = "Проезд автомобиля на красный сигнал светофора";
                        break;
                    case 2:
                        textCategory.textContent = "Переход пешеходом дороги на красный сигнал светофора";
                        break;
                    case 3:
                        textCategory.textContent = "Водитель не пропустил пешехода";
                        break;
                    case 4:
                        textCategory.textContent = "Выезд за стоп линию";
                        break;
                }
                let dateCreate = new Date(element.createdDate)
                textDate.textContent = dateCreate.getDate() + "." + dateCreate.getMonth() + "." + dateCreate.getFullYear()
                textAddress.textContent =  element.address
                textDescription.textContent = element.comment
                imgViolation.src = "http://92.53.97.223:8081/files/" + element.fileLinks[0]
                // textConclusion.textContent = element.
            })
        })
    }

        // console.log(item)
    btn.addEventListener("click", function() {
        menu.classList.add("menu-active")

    })

    document.addEventListener("click", function(e) {
        let target = e.target;
        if (!target.closest(".menu") && !target.closest(".header__buttons")) {
            menu.classList.remove("menu-active");
        }
    }) 


    new SimpleBar(document.querySelector(".left__container"), {

        // autoHide: false,
        scrollbarMaxSize: 25,
    });

    if(userId != null && token != null) {
        let res = await getUserById(localStorage.getItem("token"), localStorage.getItem("user-id"))
        document.querySelector(".profile__name").textContent = res.firstName + " " + res.lastName
        document.querySelector(".menu__name").textContent = res.firstName 
    }
});

function createScrollbarItem(object) {
    let mainContainer = document.createElement("div")
    let svg =  document.createElement("svg")
    // '<svg class="item__icon" width="61" height="53" viewBox="0 0 61 52"><use href="sprite.svg#message" x="0" y="0"></use></svg>'
    let textContainer = document.createElement("div")
    let heading = document.createElement("h3")
    let date = document.createElement("p")

    // 1 - Проезд автомобиля на красный сигнал светофора
    // 2 - Переход пешеходом дороги на красный сигнал светофора
    // 3 - Водитель не пропустил пешехода
    // 4 - Выезд за стоп линию

    mainContainer.classList.add("left__item")
    textContainer.classList.add("item__text")
    heading.classList.add("text__heading")
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
    date.classList.add("text__date")
    let dateCreate = new Date(object.createdDate)
    date.textContent = dateCreate.getDate() + "." + dateCreate.getMonth() + "." + dateCreate.getFullYear()
    svg.classList.add("item__icon")
    svg.setAttribute("viewBox", "0 0 61 52")
    svg.setAttribute("width", "61px")
    svg.setAttribute("height", "53px")
    // svg.innerHTML = `<path fill-rule="evenodd" clip-rule="evenodd" d="M6 6V34H17.4097C17.9472 34 18.462 34.2163 18.8381 34.6001L30.5 46.5L42.1619 34.6001C42.538 34.2163 43.0528 34 43.5903 34H55V6H6ZM2 0C0.89543 0 0 0.895431 0 2V38C0 39.1046 0.895432 40 2 40H16.25L30.5 55L44.75 40H59C60.1046 40 61 39.1046 61 38V2C61 0.895431 60.1046 0 59 0H2Z" fill="#1343EA"/>
    // <path d="M32.4886 9L32.2045 29.9091H28.9091L28.625 9H32.4886ZM30.5568 38.3182C29.8561 38.3182 29.2547 38.0672 28.7528 37.5653C28.2509 37.0634 28 36.4621 28 35.7614C28 35.0606 28.2509 34.4593 28.7528 33.9574C29.2547 33.4555 29.8561 33.2045 30.5568 33.2045C31.2576 33.2045 31.8589 33.4555 32.3608 33.9574C32.8627 34.4593 33.1136 35.0606 33.1136 35.7614C33.1136 36.2254 32.9953 36.6515 32.7585 37.0398C32.5312 37.428 32.2235 37.7405 31.8352 37.9773C31.4564 38.2045 31.0303 38.3182 30.5568 38.3182Z" fill="#1343EA"/>`
    mainContainer.innerHTML = '<svg class="item__icon" width="61" height="53" viewBox="0 0 61 52"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 6V34H17.4097C17.9472 34 18.462 34.2163 18.8381 34.6001L30.5 46.5L42.1619 34.6001C42.538 34.2163 43.0528 34 43.5903 34H55V6H6ZM2 0C0.89543 0 0 0.895431 0 2V38C0 39.1046 0.895432 40 2 40H16.25L30.5 55L44.75 40H59C60.1046 40 61 39.1046 61 38V2C61 0.895431 60.1046 0 59 0H2Z" fill="#1343EA"/><path d="M32.4886 9L32.2045 29.9091H28.9091L28.625 9H32.4886ZM30.5568 38.3182C29.8561 38.3182 29.2547 38.0672 28.7528 37.5653C28.2509 37.0634 28 36.4621 28 35.7614C28 35.0606 28.2509 34.4593 28.7528 33.9574C29.2547 33.4555 29.8561 33.2045 30.5568 33.2045C31.2576 33.2045 31.8589 33.4555 32.3608 33.9574C32.8627 34.4593 33.1136 35.0606 33.1136 35.7614C33.1136 36.2254 32.9953 36.6515 32.7585 37.0398C32.5312 37.428 32.2235 37.7405 31.8352 37.9773C31.4564 38.2045 31.0303 38.3182 30.5568 38.3182Z" fill="#1343EA"/></svg>'
    textContainer.append(heading)
    textContainer.append(date)
    // mainContainer.append(svg)
    mainContainer.append(textContainer)

    return mainContainer
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
