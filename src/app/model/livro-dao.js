class LivroDao {
    //funcionalidades relacionadas a livro e o banco de dados
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultado) => {
                    if (erro) return reject('Não foi possivel listar os livros');
                    return resolve(resultado);
                })
        })

    }
    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO livros(
                    titulo,
                    preco,
                    descricao
                ) values(?,?,?)`,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                (err) => {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possivel adicionar o livro!');
                    }
                    resolve();
                }
            )
        });
    }
    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                DELETE 
                FROM livros
                WHERE id = ?`,
                [id]
                ,
                (err) => {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possivel adicionar o livro!');
                    }
                    resolve();
                }
            )
        });
    }
    procura(id) {
        return new Promisse((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM livros
                    WHERE id = ?
                `,[id],
                (erro, livro) => {
                    if (erro) return reject('Não foi encontrado');
                    return resolve(livro);
                }
            )
        })
    }
    atualiza(livro) {
        return new Promise((resolve, reject) => {
            if (livro.titulo.lenght != 0 || livro.preco != 0 || livro.descricao.lenght != 0) {
                this._db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?`,
                    [
                        livro.titulo,
                        livro.preco,
                        livro.descricao,
                        livro.id
                    ],
                    (err) => {
                        if (err) {
                            console.log(err);
                            return reject('Não foi possivel adicionar o livro!');
                        }
                        resolve();
                    }
                )
            }
        });
    }

}

module.exports = LivroDao;