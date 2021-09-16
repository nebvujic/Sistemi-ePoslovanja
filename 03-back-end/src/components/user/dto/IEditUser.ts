import * as Ajv from "ajv";

const ajv = Ajv();

interface IEditUser {
    password: string;
    forename: string;
    surname: string;
    phoneNumber: string;
    address: string;
	vip:boolean;
}

const IEditUserSchemaValidator = ajv.compile({
    type: "object",
    properties: {
        password: {
            type: "string",
            minLength: 6,
            maxLength: 128
        },
        forename: {
            type: "string",
            minLength: 2,
            maxLength: 64
        },
        surname: {
            type: "string",
            minLength: 2,
            maxLength: 64
        },
        phoneNumber: {
            type: "string",
            minLength: 7,
            maxLength: 24
        },
        address: {
            type: "string",
            minLength: 5,
            maxLength: 64 * 1024
        },
		vip: {
			type: "boolean",
		},
    },
    required: [
        "password",
        "forename",
        "surname",
        "phoneNumber",
        "address",
    ],
    additionalProperties: false,
});

export { IEditUserSchemaValidator };
export { IEditUser };
