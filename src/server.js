const app = require('./config/custom-express');
const porta = 3000;
app.listen(porta,()=> console.log('Servidor rodando na porta 3000'));