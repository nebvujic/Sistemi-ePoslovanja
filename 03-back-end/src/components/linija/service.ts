import IErrorResponse from "../../common/IErrorResponse.interface";
import BaseService from "../../common/BaseService";
import { IAddLinija } from "./dto/IAddLinija";
import { IEditLinija } from "./dto/IEditLinija";
import LinijaModel from "./model";
import AerodromModel from "../aerodrom/model";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IArticleLinijaValue } from "../article/dto/IAddArticle";

class LinijaModelAdapterOptions implements IModelAdapterOptions {
    loadParentAerodrom: boolean = false;
}

class LinijaService extends BaseService<LinijaModel> {
    async adaptToModel(
        data: any,
        options: Partial<LinijaModelAdapterOptions>,
    ): Promise<LinijaModel> {
        const item: LinijaModel = new LinijaModel();

        item.linijaId = Number(data?.linija_id);
        item.name = data?.naziv;
		item.day = data?.dan;
		item.start_time = data?.vreme_polaska;
        item.starting_airport_id = Number(data?.polazni_aerodrom_id);
		item.price = Number(data?.cena);
		item.vip_price = Number(data?.vip_cena);

        if (options.loadParentAerodrom && item.starting_airport_id !== null) {
            item.aerodrom = await this.services.aerodromService.getById(item.starting_airport_id);
        }

        return item;
    }

    public async getById(linijaId: number, options: Partial<LinijaModelAdapterOptions> = {}): Promise<LinijaModel|null> {
        return super.getByIdFromTable<LinijaModelAdapterOptions>("linija", linijaId, options);
    }

    public async getAllByParentAerodromId(starting_airport_id: number): Promise<LinijaModel[]> {
        const firstParent = await this.services.aerodromService.getById(starting_airport_id, {
            loadLinije: false,
            loadParentCategories: false,
            loadSubcategories: false,
        });

        if (!(firstParent instanceof AerodromModel)) {
            return [];
        }

        const linije: LinijaModel[] = [];

        let currentParent: AerodromModel|null = firstParent;

        while (currentParent !== null) {
            linije.push(... await super.getByFieldIdFromTable<LinijaModelAdapterOptions>("linija", "aerodrom_id", currentParent.starting_airport_id));
            currentParent = await this.services.aerodromService.getById(currentParent.parentAerodromId, {
                loadParentCategories: false,
                loadSubcategories: false,
                loadLinije: false,
            });
        }

        return linije;
    }

    public async add(data: IAddLinija): Promise<LinijaModel|IErrorResponse> {
        return new Promise<LinijaModel|IErrorResponse>((result) => {
            const sql: string = "INSERT linija SET naziv = ?, dan = ?, vreme_polaska = ?, polazni_aerodrom_id = ?, cena = ?, vip_cena = ?;";

            this.db.execute(sql, [data.name, data.day, data.start_time, data.starting_airport_id, data.price, data.vip_price])
                .then(async res => {
                    const resultData: any = res;
                    const newId: number = Number(resultData[0]?.insertId);
                    result(await this.getById(newId, { loadParentAerodrom: true, }));
                })
                .catch(err => {
                    result({
                        errorCode: err?.errno,
                        message: err?.sqlMessage,
                    });
                });
        });
    }

    public async edit(id: number, data: IEditLinija): Promise<LinijaModel|IErrorResponse> {
        return new Promise<LinijaModel|IErrorResponse>((result) => {
            const sql: string = `
                UPDATE
                    linija
                SET
                    naziv = ?, dan = ?, vreme_polaska = ?, cena = ?, vip_cena = ?
                WHERE
                    linija_id = ?;`;

            this.db.execute(sql, [data.name, data.day, data.start_time, data.price, data.vip_price, id])
                .then(async res => {
                    result(await this.getById(id, { loadParentAerodrom: true }));
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
            const sql: string = "DELETE FROM linija WHERE linija_id = ?;";

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

export default LinijaService;
