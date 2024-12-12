import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const admins = await prisma.funcionario.findMany();
    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const {
    nome,
    cpf,
    telefone,
    estadoCivil,
    dataNascimento,
    email,
    acessaSistema,
    observacoes,
    userSistemaId,
  } = req.body;

  if (acessaSistema) {
    if (!nome || email) {
      res.status(400).json({ erro: "Informe nome, email e senha" });
      return;
    }
    try {
      const admin = await prisma.funcionario.create({
        data: {
          nome,
          cpf,
          telefone,
          estadoCivil,
          dataNascimento,
          email,
          acessaSistema,
          observacoes,
          userSistemaId,
        },
      });
      res.status(201).json(admin);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    const admin = await prisma.funcionario.create({
      data: {
        nome,
        cpf,
        telefone,
        estadoCivil,
        dataNascimento,
        acessaSistema,
        observacoes,
        userSistemaId,
      },
    });
    res.status(201).json(admin);

    if (!nome) {
      res.status(400).json({ erro: "Informe nome" });
      return;
    }
  }
});

export default router;
