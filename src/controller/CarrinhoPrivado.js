class CarrinhoPrivado {

    static BASE_URL = 'https://api-kenzie-food.herokuapp.com';

    static async listarCarrinho() {
        
        const URL = `${this.BASE_URL}/cart`;

        const resposta = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        });

        const dadosRetornados = await resposta.json();

        return dadosRetornados;

    }

    static async adicionarAoCarrinho(dadosDoProduto) {

        const URL = `${this.BASE_URL}/cart/add`;

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

    static async deletarDoCarrinho(idDoProduto) {

        const URL = `${this.BASE_URL}/cart/remove/${idDoProduto}`;

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

export {CarrinhoPrivado}