class Usuario {

    static BASE_URL = 'https://api-kenzie-food.herokuapp.com';

    static async criarUsuario(dadosDeCadastro) {

        const URL = `${this.BASE_URL}/auth/register`;

        const resposta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosDeCadastro)
        });

        const dadosRetornados = await resposta.json();

        return dadosRetornados;

    }

    static async logarUsuario(dadosDeLogin) {

        const URL = `${this.BASE_URL}/auth/login`;

        const resposta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosDeLogin)
        });

        const dadosRetornados = await resposta.json();

        return dadosRetornados;

    }

}