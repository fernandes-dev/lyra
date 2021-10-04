import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface ITokenPayload {
  id: string
  iat: number
  exp: number
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Response | void {
  const { authorization } = request.headers

  if (!authorization)
    return response.status(401).json({ error: 'Missing token' })

  const token = String(authorization.replace('Bearer', '').trim())

  try {
    const data = jwt.verify(token, String(process.env.SECRET))

    const { id } = data as ITokenPayload

    request.userId = id

    return next()
  } catch (error) {
    return response.status(401).json({ error: 'Invalid token' })
  }
}
