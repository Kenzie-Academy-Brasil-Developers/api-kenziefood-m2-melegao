class Produtos {

    static BASE_URL = 'https://api-kenzie-food.herokuapp.com';

    static async listarTodosProdutos() {

        const URL = `${this.BASE_URL}/products`;

        const resposta = await fetch(URL, {
            method: "GET"
        });

        const dadosRetornados = await resposta.json();

        return dadosRetornados;

    }

    static async listarProdutosEquipe() {

        const URL = `${this.BASE_URL}/my/products`;

        const resposta = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        });

        const dadosRetornados = await resposta.json();

        return dadosRetornados;

    }

    static async criarProduto(dadosDoProduto) {

        const URL = `${this.BASE_URL}/my/products`;

        const resposta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(dadosDoProduto)
        });

        const dadosRetornados = await resposta.json();

        return dadosRetornados;

    }

    static async editarProduto(dadosDoProduto, idDoProduto) {

        const URL = `${this.BASE_URL}/my/products/:${idDoProduto}`;

        const resposta = await fetch(URL, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(dadosDoProduto)
        });

        const dadosRetornados = await resposta.json();

        return dadosRetornados;

    }

    static async deletarProduto(idDoProduto) {

        const URL = `${this.BASE_URL}/my/products/:${idDoProduto}`;

        const resposta = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        });

        const dadosRetornados = await resposta.json();

        return dadosRetornados;

    }

}