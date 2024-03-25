let regUrl = "/Auth/reg?withHash=false"
document.addEventListener("DOMContentLoaded", function() {
    let btn = document.querySelector(".main__enter")
    let loginInput = document.querySelector(".input-login page")
    let passwordInput = document.querySelector(".input-password")
    btn.addEventListener("click", function(e) {
        e.preventDefault()
        let login = loginInput.value
        let password = passwordInput.value

        if(login.length !=0 && password.length !=0) {
            let object = {
                "login": login, 
                "password": password, 
            }

            addNewBackend(object)
        }
    })
})

async function addNewBackend(object) {
    let response = await fetch("http://92.53.97.223:8081/access/auth", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'

        },
        body: JSON.stringify(object),
        referrerPolicy: "strict-origin-when-cross-origin"
    });

    if(response.status == 200) {
        let res = await response.json()
        localStorage.setItem("token", res.accessToken)
        localStorage.setItem("user-id", res.user.id)

    }
    
    console.log(response)
    if(response.status == 403) {
        err = {
            message: "неправильный пароль/логин",
            code: response.status,
            ok: response.ok
            }
    }

    if(response.status == 200) {
        // window.location.replace("http://127.0.0.1:5500/main%20page/index.html")
       window.location.href = "http://127.0.0.1:5500/main%20page/index.html";
    }
}