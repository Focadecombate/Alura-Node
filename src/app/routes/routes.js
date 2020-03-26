const LivroDao = require('../model/livro-dao');
const db = require('../../config/database')
module.exports = (app) => {

    app.get('/', function(req, res) {
        res.marko(
            require('../views/base/home/home.marko')
        );
    });

    app.get('/livros/form/:id', function (req, res) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.procura(id)
            .then(livro =>
                res.marko(
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
        console.log('Adiciona');
        console.log(req.body);
        const livroDao = new LivroDao(db)
        livroDao.adiciona(req.body)
            .then(
                res.redirect('/livros')
            )
            .catch(erro => console.log(erro));
    });

    app.put('/livros', (req, res) => {
        console.log('Atualiza');
        console.log(req.body);
        
        const livroDao = new LivroDao(db)
        livroDao.atualiza(req.body)
            .then(
                res.redirect('/livros')
            )
            .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', (req, res) => {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => res.status(200).end())
            .catch(erro => console.log(erro));
    });
}