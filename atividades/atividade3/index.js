const express = require('express');
const app = express();

const PORT = 3000;

let estoque = [];

app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;

    // verifica se já existe
    const produto = estoque.find(p => p.id == id);
    if (produto) {
        return res.send("Produto já existe!");
    }

    estoque.push({
        id: id,
        nome: nome,
        qtd: parseInt(qtd)
    });

    res.send("Produto adicionado com sucesso!");
});

app.get('/listar', (req, res) => {
    res.json(estoque);
});


app.get('/remover/:id', (req, res) => {
    const { id } = req.params;

    const index = estoque.findIndex(p => p.id == id);

    if (index === -1) {
        return res.send("Produto não encontrado!");
    }

    estoque.splice(index, 1);
    res.send("Produto removido!");
});

app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;

    const produto = estoque.find(p => p.id == id);

    if (!produto) {
        return res.send("Produto não encontrado!");
    }

    produto.qtd = parseInt(qtd);
    res.send("Quantidade atualizada!");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
