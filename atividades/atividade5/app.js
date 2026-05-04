const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('form', { erros: [] });
});

app.post('/agendamento', (req, res) => {
    const dados = req.body;
    let erros = [];

    const camposObrigatorios = [
        'nome', 'sobrenome', 'cpf', 'nascimento',
        'telefone', 'cep', 'endereco',
        'clinica', 'especialidade', 'data_hora'
    ];

    camposObrigatorios.forEach(campo => {
        if (!dados[campo]) {
            erros.push(`O campo ${campo} é obrigatório.`);
        }
    });

    // Validação de data futura
    if (dados.data_hora) {
        const dataForm = new Date(dados.data_hora);
        const agora = new Date();

        if (dataForm <= agora) {
            erros.push("A data do agendamento deve ser futura.");
        }
    }

    if (erros.length > 0) {
        return res.render('form', { erros });
    }

    res.render('resultado', { dados });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});