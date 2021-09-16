import * as Ajv from "ajv";

const ajv = Ajv();

interface IAddUser {
    email: string;
    password: string;
    forename: string;
    surname: string;
    phoneNumber: string;
    address: string;
	vip: boolean;
}

const IAddUserSchemaValidator = ajv.compile({
    type: "object",
    properties: {
        email: {
            type: "string",
            minLength: 6,
            maxLength: 25,
        },
        password: {
            type: "string",
            minLength: 5,
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
        "email",
        "password",
        "forename",
        "surname",
        "phoneNumber",
        "address",
    ],
    additionalProperties: false,
});

export { IAddUserSchemaValidator };
export { IAddUser };
