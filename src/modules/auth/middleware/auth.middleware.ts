
import { Request, Response, NextFunction } from "express";
import jsonwebtoken from 'jsonwebtoken';
import { UNAUTHORIZED, FORBIDDEN } from "http-status-codes";
import HttpException from "../../../common/http-exception";

export const isAuthenticated = (
    request: Request, response: Response, next: NextFunction
) => {

    // Gather the jwt access token from the request header
    const authHeader = request.headers['Authorization'] as string;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return next(new HttpException(UNAUTHORIZED, 'Un Authorized'));
    }

    jsonwebtoken.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        // console.log(err)
        if (err) {
            if (err.name == 'TokenExpiredError') {
                return next(new HttpException(UNAUTHORIZED, 'Token Expired '));
            }
            return next(new HttpException(FORBIDDEN, 'Un Authorized'));
        }
        request.user = user
        next() // pass the execution off to whatever request the client intended
    });

};

export const hasRole = ( role: string) => {
    const isAllowed = (roles: string[]) => roles.indexOf(role) > -1;
    return (request: Request, response: Response, next: NextFunction) => {
        if (request.user && isAllowed(request.user.roles))
            next(); // role is allowed, so continue on the next middleware
        else {
            // user is forbidden
           next(new HttpException(FORBIDDEN, 'Forbidden'));     
       }
    }

}
