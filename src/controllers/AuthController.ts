import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

class AuthController {
  async store(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body

      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) return response.status(404).json({ error: 'User not found.' })

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword)
        return response.status(401).json({ error: 'Invalid email or password' })

      const token = jwt.sign({ id: user.id }, process.env.SECRET || '', { expiresIn: '1d' })

      return response.json({ user: { name: user.name, email: user.email }, token })
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { AuthController }