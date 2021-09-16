import { IAddAdministrator } from "./dto/IAddAdministrator";
import IErrorResponse from "../../common/IErrorResponse.interface";
import BaseService from "../../common/BaseService";
import AdministratorModel from "./model";
import { IEditAdministrator } from "./dto/IEditAdministrator";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import * as bcrypt from "bcrypt";

class AdministratorModelAdapterOptions implements IModelAdapterOptions { }

class AdministratorService extends BaseService<AdministratorModel> {
    async adaptToModel(
        data: any,
        options: Partial<AdministratorModelAdapterOptions>,
    ): Promise<AdministratorModel> {
        const item: AdministratorModel = new AdministratorModel();

        item.administratorId = Number(data?.administrator_id);
        item.username = data?.username;
        item.passwordHash = data?.password_hash;

        return item;
    }

    public async getAll(): Promise<AdministratorModel[]> {
        return super.getAllFromTable<AdministratorModelAdapterOptions>("administrator");
    }

    public async getById(id: number): Promise<AdministratorModel|null> {
        return super.getByIdFromTable<AdministratorModelAdapterOptions>("administrator", id);
    }

    public async add(data: IAddAdministrator): Promise<AdministratorModel|IErrorResponse> {
        return new Promise<AdministratorModel|IErrorResponse>((result) => {
            const sql: string = "INSERT administrator SET username = ?, password_hash = ?;";

            const passwordHash = bcrypt.hashSync(data.password, 11);

            this.db.execute(sql, [data.username, passwordHash])
                .then(async res => {
                    const resultData: any = res;
                    const newAdministratorId: number = Number(resultData[0]?.insertId);
                    result(await this.getById(newAdministratorId));
                })
                .catch(err => {
                    result({
                        errorCode: err?.errno,
                        message: err?.sqlMessage,
                    });
                });
        });
    }

    public async edit(administratorId: number, data: IEditAdministrator): Promise<AdministratorModel|IErrorResponse> {
        return new Promise<AdministratorModel|IErrorResponse>((result) => {
            const sql: string = `
                UPDATE
                    administrator
                SET
                    password_hash = ?
                WHERE
                    administrator_id = ?;`;

            const passwordHash = bcrypt.hashSync(data.password, 11);

            this.db.execute(sql, [ passwordHash, administratorId])
                .then(async res => {
                    result(await this.getById(administratorId));
                })
                .catch(err => {
                    result({
                        errorCode: err?.errno,
                        message: err?.sqlMessage,
                    });
                });
        });
    }

    public async delete(administratorId: number): Promise<IErrorResponse> {
        return new Promise<IErrorResponse>((result) => {
            const sql: string = "DELETE FROM administrator WHERE administrator_id = ?;";

            this.db.execute(sql, [administratorId])
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

    public async getByUsername(username: string, options: Partial<AdministratorModelAdapterOptions> = {}): Promise<AdministratorModel|null> {
        const result = await super.getByFieldIdFromTable<AdministratorModelAdapterOptions>("administrator", "username", username, options);

        if (!Array.isArray(result) || result.length === 0) {
            return null;
        }

        return result[0];
    }

}

export default AdministratorService;
