import { PrismaClient } from ".prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

class BillController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      const { userId } = request

      const bills = await prisma.bill.findMany({ where: { userId } })

      return response.json({ bills })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  async store(request: Request, response: Response): Promise<Response> {
    try {
      const { title, description, date, value, type } = request.body

      const { userId } = request

      const bill = await prisma.bill.create({
        data: {
          title, description, date, value, type, userId
        }
      })

      return response.json({ bill })
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params

      const bill = await prisma.bill.findUnique({ where: { id } })

      return response.json({ bill })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

}

export { BillController }