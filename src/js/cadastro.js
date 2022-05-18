import { Usuario } from "../controller/Usuario.js";

const form = document.getElementById('body__form--cadastro');
form.addEventListener('submit', receberDadosCadastro);

async function receberDadosCadastro(e) {
    e.preventDefault();

    let data = {};
    const elements = [...form];

    for (let i = 0; i < elements.length; i++) {
    let item = elements[i];

    if (item.name !== "") {
        data[item.name] = item.value;
        }
        
    }

    const retorno = await Usuario.criarUsuario(data);

    location.replace('/src/pages/login.html');
    
}
