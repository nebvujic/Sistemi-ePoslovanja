import * as express from "express";
import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import UserController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class AuthRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const authController: UserController = new UserController(resources);

        application.post("/api/auth/user/login",          authController.userLogin.bind(authController));
        application.post("/api/auth/administrator/login", authController.administratorLogin.bind(authController));

        application.get(
            "/api/auth/user/ok",
            AuthMiddleware.getVerifier("user"),
            authController.sendOk.bind(authController)
        );

        application.get(
            "/api/auth/administrator/ok",
            AuthMiddleware.getVerifier("administrator"),
            authController.sendOk.bind(authController)
        );
    }
};
