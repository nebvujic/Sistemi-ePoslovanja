import * as express from "express";
import AerodromModel from "./model";
import { IAddAerodrom, IAddAerodromSchemaValidator } from "./dto/IAddAerodrom";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IEditAerodrom, IEditAerodromSchemaValidator } from "./dto/IEditAerodrom";
import BaseController from "../../common/BaseController";

class AerodromController extends BaseController {
    async add(req: express.Request, res: express.Response, next: express.NextFunction) {
        const item = req.body;

        if (!IAddAerodromSchemaValidator(item)) {
            res.status(400).send(IAddAerodromSchemaValidator.errors);
            return;
        }

        const data: IAddAerodrom = item;

        const newAerodrom: AerodromModel|IErrorResponse = await this.services.AerodromService.add(data);

        res.send(newAerodrom);
    }

    async editById(req: express.Request, res: express.Response, next: express.NextFunction) {
        const item       = req.body;
        const aerodromId = Number(req.params.id);

        if (aerodromId <= 0) {
            res.status(400).send(["The aerodrom ID must be a numerical value larger than 0."]);
            return;
        }

        if (!IEditAerodromSchemaValidator(item)) {
            res.status(400).send(IEditAerodromSchemaValidator.errors);
            return;
        }

        const data: IEditAerodrom = item;

        const editedAerodrom: AerodromModel|IErrorResponse = await this.services.aerodromService.edit(aerodromId, data);

        res.send(editedAerodrom);
    }

    async deleteById(req: express.Request, res: express.Response, next: express.NextFunction) {
        const aerodromId = Number(req.params.id);

        if (aerodromId <= 0) {
            res.status(400).send(["The Aerodrom ID must be a numerical value larger than 0."]);
            return;
        }

        res.send(await this.services.AerodromService.delete(aerodromId));
    }
}

export default AerodromController;
