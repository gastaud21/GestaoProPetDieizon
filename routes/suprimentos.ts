import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const suprimentos = await prisma.suprimento.findMany();
    res.status(200).json(suprimentos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { item, categoriaId, estoque, marca, minqtd, descricao } = req.body;

  if (!item || !categoriaId || !estoque) {
    res.status(400).json({
      erro: "Informe item, categoriaId, estoque, e unidade",
    });
    return;
  }

  try {
    const suprimento = await prisma.suprimento.create({
      data: {
        item,
        estoque,
        categoriaId,
        ...(marca && { marca }),
        ...(minqtd && { minqtd }),
        ...(descricao && { descricao }),
      },
    });
    res.status(201).json(suprimento);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const suprimento = await prisma.suprimento.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(suprimento);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { item, categoriaId, estoque, marca, minqtd, descricao } = req.body;

  if (!item || !categoriaId || !estoque) {
    res.status(400).json({
      erro: "Informe item, categoriaId, estoque, e unidade",
    });
    return;
  }

  try {
    const suprimento = await prisma.suprimento.update({
      where: { id: Number(id) },
      data: {
        item,
        estoque,
        categoriaId,
        ...(marca && { marca }),
        ...(minqtd && { minqtd }),
        ...(descricao && { descricao }),
      },
    });
    res.status(200).json(suprimento);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
