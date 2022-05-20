import { Usuario } from "../controller/Usuario.js";

const form = document.getElementById('body__form--login');
form.addEventListener('submit', receberDadosLogin);

async function receberDadosLogin(e) {

    e.preventDefault();
    
    let data = {};
    
    const elements = [...form];

    for (let i = 0; i < elements.length; i++) {
        let item = elements[i];

        if (item.name !== "") {
            data[item.name] = item.value;
        }
    }

    const retorno = await Usuario.logarUsuario(data);

    if (retorno.status == 200) {
        
        localStorage.setItem('token', retorno.token);
        location.replace('/src/pages/dashboard.html');
        
    }

}
