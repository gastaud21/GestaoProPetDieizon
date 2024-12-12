import express from "express";
import cors from "cors";
import especiesRoutes from "./routes/especies";
import animaisRoutes from "./routes/animais";
// import fotoAnimaisRoutes from "./routes/fotoAnimais";
import fotoFuncionariosRoutes from "./routes/fotoFuncionarios";
// import  fotoInteressadoRoutes  from "./routes/fotoInteressadoRoutes;
import interessadosRoutes from "./routes/interessados";
import adminsRoutes from "./routes/funcionarios";
import dashboardRoutes from "./routes/dashboard";
import userSistemaRoutes from "./routes/usersistema";

const app = express();
const port = 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/especies", especiesRoutes);
app.use("/animais", animaisRoutes);
// app.use("/fotoAnimais", fotoAnimaisRoutes);
app.use("/fotoFuncionarios", fotoFuncionariosRoutes);
// app.use("/fotosInteressado", fotoInteressadosRoutes);
app.use("/", userSistemaRoutes);

app.use("/interessados", interessadosRoutes);

app.get("/", (req, res) => {
  res.send("API: Sistema de Canil");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});

// "id": 1,
// "nome": "Rodrigo",
// "email": "rodrigo@propet.com",
// "senha": "$2b$12$50/qy50qmKvqcoF8Xo0RUuiJt4cNRHwOUyymnzcWYELSC9bj1FDkq",
