import bcrypt from 'bcryptjs'
import { validationResult } from "express-validator";
import { PrismaClient } from '@prisma/client'
import  jwt  from 'jsonwebtoken';
const prisma = new PrismaClient()


export const register = async (req, res) => {
    try {
  
        const getUser = await prisma.user.findUnique({
          where: {
            email: req.body.email
          }
        })
        if(getUser){
          throw new Error("данный пользователь уже существует")
        }
  
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)
  
        const result = await prisma.user.create({
          data: {
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl:req.body.avatarUrl,
            passwordHash
          }
        })
  
  
    
        const user = await prisma.user.findUnique({
          where: {
            email: req.body.email
          }
        })
  
    
        const token = jwt.sign({id: user.id},'pega123',{expiresIn: '30d'})
        res.json({
          ...result,
          token
        })
      } catch (e) {
        console.log(e)
        res.status(500).json({
          message: 'Не удалось зарегистрироваться'
        })
      }
      }

export const login = async (req,res) => {
    try {
      const isUser = await prisma.user.findUnique({
        where: {
          email: req.body.email
        }
      })
      if(!isUser){
        return res.status(404).json({
          message: 'Данный пользователь не найден'
        })
      }
  
      const isValidPass = await bcrypt.compare(req.body.password, isUser.passwordHash)
      if(!isValidPass){
        return res.status(404).json({
          message: 'Неверный логин или пароль'
        })
      }
      const token = jwt.sign({id: isUser.id},'pega123',{expiresIn: '30d'})
      res.json({
        id: isUser.id,
            email: isUser.email,
            fullName: isUser.fullName,
            avatarUrl: isUser.avatarUrl,
            token
      })
    } catch(e) {
      console.log(e)
        res.status(500).json({
          message: 'Не удалось авторизоваться'
        })
    }
  
  }

export const getMe = async (req,res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.userId
        }
      })
      if(!user){
        return res.status(404).json({
          message: 'Пользователь не найден'
        })
      }
      res.json({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl
      })
    } catch(e) {
      console.log(e)
    res.status(500).json({
      message: 'Нет доступа'
    })
    }
  }