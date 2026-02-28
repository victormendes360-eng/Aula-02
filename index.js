import express from 'express';

const host = '0.0.0.0';
const port = 3000;
const app = express();

var listacadastros = [];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Página Inicial</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
        <div class="container mt-5">
            <h1>Página Inicial</h1>
            <p>Bem-vindo ao sistema de cadastro!</p>
            <a href="/cadastro" class="btn btn-primary">Fazer Cadastro</a>
            <a href="/cadastros" class="btn btn-secondary">Ver Cadastros</a>
        </div>
        </body>
        </html>
    `);
});


// Rota GET - Formulário
app.get('/cadastro', (req, res) => {
    res.send(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Cadastro</title> 
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
        <div class="container mt-5">
            <form method="POST" action="/cadastro" class="row g-3">
                <div class="col-md-4">
                    <label class="form-label">Primeiro Nome</label>
                    <input type="text" class="form-control" name="primeiroNome" required>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Sobrenome</label>
                    <input type="text" class="form-control" name="sobrenome" required>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Nome de Usuário</label>
                    <input type="text" class="form-control" name="nomeUsuario" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Cidade</label>
                    <input type="text" class="form-control" name="cidade" required>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Estado</label>
                    <input type="text" class="form-control" name="estado" required>
                </div>
                <div class="col-md-3">
                    <label class="form-label">CEP</label>
                    <input type="text" class="form-control" name="cep" required>
                </div>
                <div class="col-12">
                    <input type="checkbox" name="termos" required> Aceito os termos
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Enviar</button>
                </div>
            </form>
            <br>
            <a href="/cadastros" class="btn btn-secondary">Ver Cadastros</a>
        </div>
        </body>
        </html>
    `);
});

// Rota POST
app.post('/cadastro', (req, res) => {

    const cadastro = {
        nome: req.body.primeiroNome,
        sobrenome: req.body.sobrenome,
        nomeUsuario: req.body.nomeUsuario,
        cidade: req.body.cidade,
        estado: req.body.estado,
        cep: req.body.cep,
        termos: req.body.termos ? "Sim" : "Não"
    };

    listacadastros.push(cadastro);

    res.redirect('/cadastros');
});

// Rota GET - Listagem
app.get('/cadastros', (req, res) => {

    let tabela = `
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Lista de Cadastros</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
        <div class="container mt-5">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Usuário</th>
                    <th>Cidade</th>
                    <th>Estado</th>
                    <th>CEP</th>
                    <th>Termos</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < listacadastros.length; i++) {
        const c = listacadastros[i];

        tabela += `
            <tr>
                <td>${i + 1}</td>
                <td>${c.nome}</td>
                <td>${c.sobrenome}</td>
                <td>${c.nomeUsuario}</td>
                <td>${c.cidade}</td>
                <td>${c.estado}</td>
                <td>${c.cep}</td>
                <td>${c.termos}</td>
            </tr>
        `;
    }

    tabela += `
            </tbody>
        </table>
        <a href="/cadastro" class="btn btn-primary">Novo Cadastro</a>
        </div>
        </body>
        </html>
    `;

    res.send(tabela);
});

app.listen(port, host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
});