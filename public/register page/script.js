document.addEventListener("DOMContentLoaded", function() {
    let btn = document.querySelector(".main__enter")

    let lastNameInput = document.querySelector(".input-lastName")
    let firstNameInput = document.querySelector(".input-firstName")
    let patronymicInput = document.querySelector(".input-patronymic")
    let loginInput = document.querySelector(".input-login page")
    let passwordInput = document.querySelector(".input-password")
    let emailInput = document.querySelector(".input-email")
    let numberInput = document.querySelector(".input-number")


    btn.addEventListener("click", function(e) {
        e.preventDefault()
        
        let login = loginInput.value
        let password = passwordInput.value

        if(login.length !=0 && password.length !=0) {
            let object = {
                "login": loginInput.value,
                "password": passwordInput.value,
                "firstName": firstNameInput.value,
                "lastName": lastNameInput.value,
                "patronymic": patronymicInput.value,
                "phoneNumber": numberInput.value,
                "email": emailInput.value
            }

            addNewBackend(object)
        }
    })


})

async function addNewBackend(object) {
    let response = await fetch("http://92.53.97.223:8081/access/reg", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'

        },
        body: JSON.stringify(object),
        referrerPolicy: "strict-origin-when-cross-origin"
    });

    let res = await response.json()
    console.log(res)
    if(response.status == 200) {
        // let res = await response.json()
        localStorage.setItem("token", res.accessToken)
        localStorage.setItem("user-id", res.id)
        window.location.href = "http://127.0.0.1:5500/login%20page/index.html";
    }
    
    if(response.status == 403) {
        err = {
            message: "неправильный пароль/логин",
            code: response.status,
            ok: response.ok
        }

        throw err
    }
    // console.log(res)
}