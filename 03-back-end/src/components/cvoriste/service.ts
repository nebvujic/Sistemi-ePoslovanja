import IErrorResponse from "../../common/IErrorResponse.interface";
import BaseService from "../../common/BaseService";
import { IAddCvoriste } from "./dto/IAddCvoriste";
import { IEditCvoriste } from "./dto/IEditCvoriste";
import CvoristeModel from "./model";
import LinijaModel from "../linija/model";
import AerodromModel from "../aerodrom/model";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IArticleCvoristeValue } from "../article/dto/IAddArticle";

class CvoristeModelAdapterOptions implements IModelAdapterOptions {
    loadParentLinija: boolean = false;
}

class CvoristeService extends BaseService<CvoristeModel> {
    async adaptToModel(
        data: any,
        options: Partial<CvoristeModelAdapterOptions>,
    ): Promise<CvoristeModel> {
        const item: CvoristeModel = new CvoristeModel();

        item.cvoristeId = Number(data?.cvoriste_id);
		item.aerodromId = Number(data?.aerodrom_id);
        item.length = Number(data?.vreme_leta);
		item.length2 = Number(data?.vreme_zadrzavnaja);
        item.linijaId = Number(data?.linija_id);

        if (options.loadParentLinija && item.linijaId !== null) {
            item.linija = await this.services.linijaService.getById(item.linijaId);
        }
		
		if (options.loadParentAerodrom && item.aerodromId !== null) {
            item.aerodrom = await this.services.aerodromService.getById(item.aerodromId);
        }

        return item;
    }

    public async getById(cvoristeId: number, options: Partial<CvoristeModelAdapterOptions> = {}): Promise<CvoristeModel|null> {
        return super.getByIdFromTable<CvoristeModelAdapterOptions>("cvoriste", cvoristeId, options);
    }

    public async getAllByParentLinijaId(linijaId: number): Promise<CvoristeModel[]> {
        const firstParent = await this.services.linijaService.getById(linijaId, {
            loadCvorista: false,
            loadParentCategories: false,
            loadSubcategories: false,
        });

        if (!(firstParent instanceof LinijaModel)) {
            return [];
        }

        const cvorista: CvoristeModel[] = [];

        let currentParent: LinijaModel|null = firstParent;

        while (currentParent !== null) {
            cvorista.push(... await super.getByFieldIdFromTable<CvoristeModelAdapterOptions>("cvoriste", "linija_id", currentParent.linijaId));
            currentParent = await this.services.linijaService.getById(currentParent.parentLinijaId, {
                loadParentCategories: false,
                loadSubcategories: false,
                loadCvorista: false,
            });
        }

        return cvorista;
    }

    public async getAllByParentAerodromId(aerodromId: number): Promise<CvoristeModel[]> {
        const firstParent = await this.services.aerodromService.getById(aerodromId, {
            loadCvorista: false,
            loadParentCategories: false,
            loadSubcategories: false,
        });

        if (!(firstParent instanceof AerodromModel)) {
            return [];
        }

        const cvorista: CvoristeModel[] = [];

        let currentParent: AerodromModel|null = firstParent;

        while (currentParent !== null) {
            cvorista.push(... await super.getByFieldIdFromTable<CvoristeModelAdapterOptions>("cvoriste", "aerodrom_id", currentParent.aerodromId));
            currentParent = await this.services.aerodromService.getById(currentParent.parentAerodromId, {
                loadParentCategories: false,
                loadSubcategories: false,
                loadCvorista: false,
            });
        }

        return cvorista;
    }


    public async add(data: IAddCvoriste): Promise<CvoristeModel|IErrorResponse> {
        return new Promise<CvoristeModel|IErrorResponse>((result) => {
            const sql: string = "INSERT cvoriste SET aerodrom_id = ?, vreme_leta = ?, vreme_zadrzavnaja = ?, linija_id = ?;";

            this.db.execute(sql, [data.aerodromId, data.length, data.length2, data.linijaId])
                .then(async res => {
                    const resultData: any = res;
                    const newId: number = Number(resultData[0]?.insertId);
                    result(await this.getById(newId, { loadParentLinija: true, }));
                })
                .catch(err => {
                    result({
                        errorCode: err?.errno,
                        message: err?.sqlMessage,
                    });
                });
        });
    }

    public async edit(id: number, data: IEditCvoriste): Promise<CvoristeModel|IErrorResponse> {
        return new Promise<CvoristeModel|IErrorResponse>((result) => {
            const sql: string = `
                UPDATE
                    cvoriste
                SET
                    vreme_leta = ?, vreme_zadrzavnaja = ?
                WHERE
                    cvoriste_id = ?;`;

            this.db.execute(sql, [data.length, data.length2, id])
                .then(async res => {
                    result(await this.getById(id, { loadParentLinija: true }));
                })
                .catch(err => {
                    result({
                        errorCode: err?.errno,
                        message: err?.sqlMessage,
                    });
                });
        });
    }

    public async delete(id: number): Promise<IErrorResponse> {
        return new Promise<IErrorResponse>((result) => {
            const sql: string = "DELETE FROM cvoriste WHERE cvoriste_id = ?;";

            this.db.execute(sql, [id])
                .then(async res => {
                    const data: any = res;
                    result({
                        errorCode: 0,
                        message: `Deleted ${data[0].affectedRows} rows.`,
                    });
                })
                .catch(err => {
                    result({
                        errorCode: err?.errno,
                        message: err?.sqlMessage,
                    });
                });
        });
    }
}

export default CvoristeService;
