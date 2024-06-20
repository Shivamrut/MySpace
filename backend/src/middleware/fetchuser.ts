import jwt, {JwtPayload} from "jsonwebtoken"
import { Request,Response,NextFunction } from "express"
const JWT_KEY : string = "MYSECRETKEY"

export interface CustomRequest extends Request {
    user?: string
}

interface JwtPayloadWithUser extends JwtPayload {
    user?: string; 
}

export const fetchUserId = (req :CustomRequest,res :Response, next : NextFunction )=>{
    try {
        const token : string | undefined= req.header("token");
        if (!token) {
          throw new Error("No token provided!")
        }
        const data = jwt.verify(token, JWT_KEY) as JwtPayloadWithUser
        req.user = data.user
        next()
      } catch (error) {
        res.json({
          error: "JsonWebTokenError",
          message: error.message === "jwt malformed" ? "Invalid Token" : error.message
        })
      }
}