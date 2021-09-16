import * as express from "express";
import CvoristeModel from "./model";
import { IAddCvoriste, IAddCvoristeSchemaValidator } from "./dto/IAddCvoriste";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IEditCvoriste, IEditCvoristeSchemaValidator } from "./dto/IEditCvoriste";
import BaseController from "../../common/BaseController";

class CvoristeController extends BaseController {
    async getAllInLinija(req: express.Request, res: express.Response, next: express.NextFunction) {
        const linijaId: number = +req.params?.cid;
        res.send(await this.services.cvoristeService.getAllByParentLinijaId(linijaId));
    }

    async add(req: express.Request, res: express.Response, next: express.NextFunction) {
        const item = req.body;

        if (!IAddCvoristeSchemaValidator(item)) {
            res.status(400).send(IAddCvoristeSchemaValidator.errors);
            return;
        }

        const data: IAddCvoriste = item;

        const newCvoriste: CvoristeModel|IErrorResponse = await this.services.cvoristeService.add(data);

        res.send(newCvoriste);
    }

    async editById(req: express.Request, res: express.Response, next: express.NextFunction) {
        const item       = req.body;
        const cvoristeId = Number(req.params.id);

        if (cvoristeId <= 0) {
            res.status(400).send(["The cvoriste ID must be a numerical value larger than 0."]);
            return;
        }

        if (!IEditCvoristeSchemaValidator(item)) {
            res.status(400).send(IEditCvoristeSchemaValidator.errors);
            return;
        }

        const data: IEditCvoriste = item;

        const editedCvoriste: CvoristeModel|IErrorResponse = await this.services.cvoristeService.edit(cvoristeId, data);

        res.send(editedCvoriste);
    }

    async deleteById(req: express.Request, res: express.Response, next: express.NextFunction) {
        const cvoristeId = Number(req.params.id);

        if (cvoristeId <= 0) {
            res.status(400).send(["The cvoriste ID must be a numerical value larger than 0."]);
            return;
        }

        res.send(await this.services.cvoristeService.delete(cvoristeId));
    }
}

export default CvoristeController;
