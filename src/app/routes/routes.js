const LivroDao = require('../model/livro-dao');
const db = require('../../config/database')
module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send(
            `
        <html>
            <head>
                <meta charset="utf-8"/>
            </head>
            <body>
                <h1>Casa do Código</h1>
            </body>
        </html>

        `
        );
    });
    app.get('/livros/form/:id', function (req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.procura(id)
            .then(livro =>
                resp.marko(
                    require('../views/livros/form/form.marko'), {
                        livro: livro
                    }
                )
            )
            .catch(erro => console.log(erro));

    });
    app.get('/livros', (req, res) => {
        const livroDao = new LivroDao(db);
        livroDao.lista()
            .then(livros => {
                res.marko(
                    require('../views/livros/lista/lista.marko'), {
                        livros: livros
                    }
                )
            })
            .catch(erro => console.log(erro))
    });
    app.get('/livros/form', (req, res) => {
        res.marko(
            require('../views/livros/form/form.marko'), {
                livro: {}
            });
    });
    app.post('/livros', (req, res) => {
        console.log(req.body);
        const livroDao = new LivroDao(db)
        livroDao.adiciona(req.body)
            .then(
                res.redirect('/livros')
            )
            .catch(erro => console.log(erro));
    });
    app.put('/livros', (req, res) => {
        console.log(req.body);
        const livroDao = new LivroDao(db)
        livroDao.adiciona(req.body)
            .then(
                res.redirect('/livros')
            )
            .catch(erro => console.log(erro));
    });
    app.delete('/livros/:id', (req, resp) => {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));

    });
}