import express, { Router, Response, Request } from "express"

import { IUser, User } from "../models/Users"

import { validationResult, body, Result, ValidationError } from "express-validator"

import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"

const JWT_KEY: string = "MYSECRETKEY"

const router: Router = express.Router()


router.post(
    "/login",
    [
        body("email")
            .notEmpty()
            .withMessage("Email cannot be blank")
            .isEmail()
            .withMessage("Invalid email format"),
        body("password")
            .notEmpty()
            .withMessage("Password cannot be blank"),
    ],
    async (req: Request, res: Response): Promise<void> => {

        const result: Result<ValidationError> = validationResult(req);
        if (!result.isEmpty()) {
            res.json({
                success: false,
                error: result.array().map((e) => e.msg),
            });
            return
        }
        let { email, password } = req.body;

        User.findOne({ email: email })
            .then(async (user) => {
                if (user) {
                    let hash: boolean = await bcrypt.compare(password, user.password);
                    if (hash) {
                        const data = {
                            user: user._id,
                        };
                        const token: string = jwt.sign(data, JWT_KEY);
                        res.json({
                            success: true,
                            token: token,
                            username: user.username
                        });
                    } else {
                        res.json({
                            success: false,
                            error: ["Password Incorrect"],
                        });
                    }
                } else {
                    res.json({
                        success: false,
                        error: ["User not found"],
                    });
                }
            })
            .catch((e) => {
                res.json({
                    success: false,
                    error: e,
                });
            });
    }
);

router.post(
    "/signup",
    [
        body("username")
            .isLength({ min: 3 })
            .withMessage("Username too short"),
        body("email")
            .isEmail()
            .withMessage("Enter valid email"),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Password is too short"),
    ],
    async (req: Request, res: Response): Promise<void> => {
        const result: Result<ValidationError> = validationResult(req);

        if (result.isEmpty()) {
            let { username, email, password } = req.body;
            let user: IUser = await User.findOne({ email: email });
            if (user) {
                res.json({
                    success: false,
                    error: ["User email already exists"],
                });
                return
            }
            const hash: string = await bcrypt.hash(password, 10);
            User.create({
                username: username,
                email: email,
                password: hash,
            })
                .then((user) => {
                    const data = {
                        user: user._id,
                    };
                    const token: string = jwt.sign(data, JWT_KEY);
                    res.json({
                        success: true,
                        token: token,
                        username: user.username
                    });
                })
                .catch((e) => {
                    res.json({
                        success: false,
                        error: [e.errorResponse.errmsg],
                    });
                });
        } else {
            res.json({
                success: false,
                error: result.array().map((e) => e.msg),
            });
        }
    }
);

export default router