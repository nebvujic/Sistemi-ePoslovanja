import * as express from "express";
import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import CvoristeController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class CvoristeRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const cvoristeController: CvoristeController = new CvoristeController(resources);

        application.get(
            "/api/category/:cid/cvoriste",
            AuthMiddleware.getVerifier("user", "administrator"),
            cvoristeController.getAllInCategory.bind(cvoristeController),
        );

        application.post(
            "/api/cvoriste",
            AuthMiddleware.getVerifier("administrator"),
            cvoristeController.add.bind(cvoristeController),
        );

        application.put(
            "/api/cvoriste/:id",
            AuthMiddleware.getVerifier("administrator"),
            cvoristeController.editById.bind(cvoristeController),
        );

        application.delete(
            "/api/cvoriste/:id",
            AuthMiddleware.getVerifier("administrator"),
            cvoristeController.deleteById.bind(cvoristeController),
        );
    }
};
