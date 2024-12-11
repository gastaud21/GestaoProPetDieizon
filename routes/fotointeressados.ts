import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

// const prisma = new PrismaClient()
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

const router = Router();

router.get("/:animalId", async (req, res) => {
  const { animalId } = req.params;
  try {
    const fotos = await prisma.fotoAnimal.findMany({
      where: { animalId: Number(animalId) },
    });
    res.status(200).json(fotos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", upload.single("codigoFoto"), async (req, res) => {
  const { descricao, animalId } = req.body;
  const codigo = req.file?.buffer.toString("base64");

  if (!descricao || !animalId || !codigo) {
    res.status(400).json({ erro: "Informe descricao, animalId e codigoFoto!" });
    return;
  }

  try {
    const fotos = await prisma.fotoAnimal.create({
      data: {
        descricao,
        animalId: Number(animalId),
        codigoFoto: codigo as string,
      },
    });
    res.status(201).json(fotos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const fotos = await prisma.fotoAnimal.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(fotos);
  } catch (error) {
    res.status(400).json(error);
  }
});

// router.put("/:id", async (req, res) => {
//   const { id } = req.params
//   const { nome } = req.body

//   if (!nome ) {
//     res.status(400).json({ "erro": "Informe a espécie!" })
//     return
//   }

//   try {
//     const fotos = await prisma.foto.update({
//       where: { id: Number(id) },
//       data: { nome }
//     })
//     res.status(200).json(fotos)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// router.get("/lista/animais", async (req, res) => {
//   try {
//     const fotos = await prisma.foto.findMany({
//       include: {
//         animais: true
//       }
//     })
//     res.status(200).json(fotos)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

export default router;
