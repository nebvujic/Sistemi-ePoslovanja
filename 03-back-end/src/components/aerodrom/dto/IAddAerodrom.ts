import * as Ajv from "ajv";

const ajv = Ajv();

interface IAddAerodrom {
    name: string;
	state: string;
	latitude: number;
	longitude: number;
    code: string;
}


const IAddAerodromSchemaValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 2,
            maxLength: 32,
        },
		state: {
            type: "string",
            minLength: 2,
            maxLength: 32,
        },
		latitude: {
            type: "float",
            minimum: -180,
			maximum: +180,
        },
		longitude: {
            type: "float",
            minimum: -180,
            maximum: 180,
        },
        code: {
            type: "string",
            minLength: 1,
			maxLength: 10
        },
    },
    required: [
        "name",
		"state",
		"latitude",
		"longitude",
        "code",
    ],
    additionalProperties: false,
});

export { IAddAerodromSchemaValidator };
export { IAddAerodrom };
