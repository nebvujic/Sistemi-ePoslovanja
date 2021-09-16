import IErrorResponse from "../../common/IErrorResponse.interface";
import BaseService from "../../common/BaseService";
import { IAddAerodrom } from "./dto/IAddAerodrom";
import { IEditAerodrom } from "./dto/IEditAerodrom";
import AerodromModel from "./model";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IArticleAerodromValue } from "../article/dto/IAddArticle";

class AerodromModelAdapterOptions implements IModelAdapterOptions {
    loadOrders: boolean = false;
}

class AerodromService extends BaseService<AerodromModel> {
    async adaptToModel(
        data: any,
        options: Partial<AerodromModelAdapterOptions>,
    ): Promise<AerodromModel> {
        const item: AerodromModel = new AerodromModel();

        item.aerodromId = Number(data?.aerodrom_id);
        item.name = data?.naziv;
		item.state = data?.drzava;
		item.latitude = Number(data?.geografska_sirina);
		item.longitude = Number(data?.geografska_duzina);
        item.code = data?.kod;

        return item;
    }

    public async getById(aerodromId: number, options: Partial<AerodromModelAdapterOptions> = {}): Promise<AerodromModel|null> {
        return super.getByIdFromTable<AerodromModelAdapterOptions>("aerodrom", aerodromId, options);
    }

    public async getAll(options: Partial<UserModelAdapterOptions> = {}): Promise<UserModel[]> {
        return super.getAllFromTable<UserModelAdapterOptions>("aerodrom", options);
    }


    public async add(data: IAddAerodrom): Promise<AerodromModel|IErrorResponse> {
        return new Promise<AerodromModel|IErrorResponse>((result) => {
            const sql: string = "INSERT aerodrom SET naziv = ?, drzava = ?, geografska_sirina = ?, geografska_duzina = ?, kod = ?;";

            this.db.execute(sql, [data.name, data.state, data.latitude, data.longitude, data.code])
                .then(async res => {
                    const resultData: any = res;
                    const newId: number = Number(resultData[0]?.insertId);
                    result(await this.getById(newId));
                })
                .catch(err => {
                    result({
                        errorCode: err?.errno,
                        message: err?.sqlMessage,
                    });
                });
        });
    }

    public async edit(id: number, data: IEditAerodrom): Promise<AerodromModel|IErrorResponse> {
        return new Promise<AerodromModel|IErrorResponse>((result) => {
            const sql: string = `
                UPDATE
                    aerodrom
                SET
                    naziv = ?,
					drzava = ?,
					geografska_sirina = ?,
					geografska_duzina = ?,
					kod = ?
					
                WHERE
                    aerodrom_id = ?;`;

            this.db.execute(sql, [data.name, data.state, data.latitude, data.longitude, data.code, id])
                .then(async res => {
                    result(await this.getById(id));
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
            const sql: string = "DELETE FROM aerodrom WHERE aerodrom_id = ?;";

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

export default AerodromService;
