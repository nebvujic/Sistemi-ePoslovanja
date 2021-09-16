import * as express from "express";
import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import AerodromController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class AerodromRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {

        const aerodromController: AerodromController = new AerodromController(resources);

        application.get(
            "/api/category/:cid/aerodrom",
            AuthMiddleware.getVerifier("user", "administrator"),
            aerodromController.getAllInCategory.bind(aerodromController),
        );

        application.post(
            "/api/aerodrom",
            AuthMiddleware.getVerifier("administrator"),
            aerodromController.add.bind(aerodromController),
        );

        application.put(
            "/api/aerodrom/:id",
            AuthMiddleware.getVerifier("administrator"),
            aerodromController.editById.bind(aerodromController),
        );

        application.delete(
            "/api/aerodrom/:id",
            AuthMiddleware.getVerifier("administrator"),
            aerodromController.deleteById.bind(aerodromController),
        );
    }
};
