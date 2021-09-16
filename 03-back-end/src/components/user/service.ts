import { IAddUser } from "./dto/IAddUser";
import IErrorResponse from "../../common/IErrorResponse.interface";
import BaseService from "../../common/BaseService";
import UserModel from "./model";
import { IEditUser } from "./dto/IEditUser";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import * as bcrypt from "bcrypt";

class UserModelAdapterOptions implements IModelAdapterOptions {
    loadOrders: boolean = false;
}

class UserService extends BaseService<UserModel> {
    async adaptToModel(
        data: any,
        options: Partial<UserModelAdapterOptions>,
    ): Promise<UserModel> {
        const item: UserModel = new UserModel();

        item.userId = Number(data?.user_id);
        item.email = data?.email;
        item.passwordHash = data?.password_hash;
        item.forename = data?.forename;
        item.surname = data?.surname;
        item.phoneNumber = data?.phone_number;
        item.address = data?.address;
		item.vip = data?.vip;

        return item;
    }

    public async getAll(options: Partial<UserModelAdapterOptions> = {}): Promise<UserModel[]> {
        return super.getAllFromTable<UserModelAdapterOptions>("user", options);
    }

    public async getById(id: number, options: Partial<UserModelAdapterOptions> = {}): Promise<UserModel|null> {
        return super.getByIdFromTable<UserModelAdapterOptions>("user", id, options);
    }

    public async getByEmail(email: string, options: Partial<UserModelAdapterOptions> = {}): Promise<UserModel|null> {
        const result = await super.getByFieldIdFromTable<UserModelAdapterOptions>("user", "email", email, options);

        if (!Array.isArray(result) || result.length === 0) {
            return null;
        }

        return result[0];
    }

    public async add(data: IAddUser): Promise<UserModel|IErrorResponse> {
        return new Promise<UserModel|IErrorResponse>((result) => {
            const passwordHash = bcrypt.hashSync(data.password, 11);

            this.db.execute(
                `INSERT
                    user
                SET
                    email = ?,
                    password_hash = ?,
                    forename = ?,
                    surname = ?,
                    phone_number = ?,
                    address = ?,
					vip = ?;`,
                [
                    data.email,
                    passwordHash,
                    data.forename,
                    data.surname,
                    data.phoneNumber,
                    data.address,
					data.vip,
                ]
            )
            .then(async res => {
                const resultData: any = res;
                const newUserId: number = Number(resultData[0]?.insertId);
                result(await this.getById(newUserId));
            })
            .catch(err => {
                result({
                    errorCode: err?.errno,
                    message: err?.sqlMessage,
                });
            });
        });
    }

    public async edit(userId: number, data: IEditUser): Promise<UserModel|IErrorResponse> {
        return new Promise<UserModel|IErrorResponse>((result) => {
            const passwordHash = bcrypt.hashSync(data.password, 11);

            this.db.execute(`
                UPDATE
                    user
                SET
                    password_hash = ?,
                    forename = ?,
                    surname = ?,
                    phone_number = ?,
                    address = ?,
					vip = ?
                WHERE
                    user_id = ?;`,
                [
                    passwordHash,
                    data.forename,
                    data.surname,
                    data.phoneNumber,
                    data.address,
					data.vip,
                    userId,
                ]
            )
            .then(async res => {
                result(await this.getById(userId));
            })
            .catch(err => {
                result({
                    errorCode: err?.errno,
                    message: err?.sqlMessage,
                });
            });
        });
    }

    public async delete(userId: number): Promise<IErrorResponse> {
        return new Promise<IErrorResponse>((result) => {
            const sql: string = "DELETE FROM user WHERE user_id = ?;";

            this.db.execute(sql, [userId])
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

export default UserService;
