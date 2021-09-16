import * as express from "express";
import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import LinijaController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class LinijaRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const linijaController: LinijaController = new LinijaController(resources);

        application.get(
            "/api/aerodrom/:cid/linija",
            AuthMiddleware.getVerifier("user", "administrator"),
            linijaController.getAllInAerodrom.bind(linijaController),
        );

        application.post(
            "/api/linija",
            AuthMiddleware.getVerifier("administrator"),
            linijaController.add.bind(linijaController),
        );

        application.put(
            "/api/linija/:id",
            AuthMiddleware.getVerifier("administrator"),
            linijaController.editById.bind(linijaController),
        );

        application.delete(
            "/api/linija/:id",
            AuthMiddleware.getVerifier("administrator"),
            linijaController.deleteById.bind(linijaController),
        );
    }
};
