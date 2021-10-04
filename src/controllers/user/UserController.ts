import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const users = await prisma.user.findMany({ select: { name: true, email: true, createdAt: true, updatedAt: true } })

    return response.json({ users })
  }

  async store(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body

      const hashedPassword = bcrypt.hashSync(password, 8)

      await prisma.user.create({
        data: { name, email, password: hashedPassword }
      })

      return response.send()
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { UserController }