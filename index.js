import express from 'express';
import rotaCliente from './routes/rotaCliente.js';

const localhost = '0.0.0.0';
const port = 4000;

const app = express();
app.use(express.json()); //permite que o express entenda o json

app.use("/cliente", rotaCliente);
//app.use("/cidade", rotaCidade);


app.listen(port, localhost, () => console.log(`API escutando na porta ${port}`));
