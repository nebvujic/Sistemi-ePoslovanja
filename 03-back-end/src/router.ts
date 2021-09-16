import * as express from "express";
import IRouter from "./common/IRouter.interface";
import IApplicationResources from "./common/IApplicationResources.interface";

export default class Router {
    static setupRoutes(application: express.Application, resources: IApplicationResources, routers: IRouter[]): void {
        for (const route of routers) {
            route.setupRoutes(application, resources);
        }
    }
}
