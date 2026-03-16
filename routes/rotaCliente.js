import { Router } from "express";
import ClienteCtrl from "../Controller/clienteCtrl.js";

const rotaCliente = Router();
const cliCtrl = new ClienteCtrl();

rotaCliente.get("/", cliCtrl.consultar);
rotaCliente.get("/:id", cliCtrl.consultar);
rotaCliente.post("/", cliCtrl.gravar);
rotaCliente.put("/:id", cliCtrl.editar);
rotaCliente.patch("/:id", cliCtrl.editar);
rotaCliente.delete("/:id", cliCtrl.excluir);

export default rotaCliente;