import Cliente from "./Model/cliente.js";
import Cidade from "./Model/cidade.js";

const cidade = new Cidade(1, "Presidente Prudente", "SP");

const cliente_atual = new Cliente(1, "123.456.789-00", 
                                    "Renato Goncalves", 
                                    "Rua 1", "Bairro 1", 
                                    cidade, 
                                    "Telefone 1", 
                                    "Email 1");

cliente_atual.consultar("Renato")
.then((lista) => {
    for (const cliente of lista) console.log(cliente.toString());
})
.catch((erro) => console.log(erro.message));
