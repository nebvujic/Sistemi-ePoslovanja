import * as express from "express";
import LinijaModel from "./model";
import { IAddLinija, IAddLinijaSchemaValidator } from "./dto/IAddLinija";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IEditLinija, IEditLinijaSchemaValidator } from "./dto/IEditLinija";
import BaseController from "../../common/BaseController";

class LinijaController extends BaseController {
    async getAllInAerodrom(req: express.Request, res: express.Response, next: express.NextFunction) {
        const aerodromId: number = +req.params?.cid;
        res.send(await this.services.linijaService.getAllByParentAerodromId(aerodromId));
    }

    async add(req: express.Request, res: express.Response, next: express.NextFunction) {
        const item = req.body;

        if (!IAddLinijaSchemaValidator(item)) {
            res.status(400).send(IAddLinijaSchemaValidator.errors);
            return;
        }

        const data: IAddLinija = item;

        const newLinija: LinijaModel|IErrorResponse = await this.services.linijaService.add(data);

        res.send(newLinija);
    }

    async editById(req: express.Request, res: express.Response, next: express.NextFunction) {
        const item       = req.body;
        const linijaId = Number(req.params.id);

        if (linijaId <= 0) {
            res.status(400).send(["The linija ID must be a numerical value larger than 0."]);
            return;
        }

        if (!IEditLinijaSchemaValidator(item)) {
            res.status(400).send(IEditLinijaSchemaValidator.errors);
            return;
        }

        const data: IEditLinija = item;

        const editedLinija: LinijaModel|IErrorResponse = await this.services.linijaService.edit(linijaId, data);

        res.send(editedLinija);
    }

    async deleteById(req: express.Request, res: express.Response, next: express.NextFunction) {
        const linijaId = Number(req.params.id);

        if (linijaId <= 0) {
            res.status(400).send(["The linija ID must be a numerical value larger than 0."]);
            return;
        }

        res.send(await this.services.linijaService.delete(linijaId));
    }
}

export default LinijaController;
