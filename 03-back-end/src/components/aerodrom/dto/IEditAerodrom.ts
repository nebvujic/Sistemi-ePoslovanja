import * as Ajv from "ajv";

const ajv = Ajv();

interface IEditAerodrom {
    name: string;
	state: string;
	latitude: number;
	longitude: number;
}

const IEditAerodromSchemaValidator = ajv.compile({
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
    },
    required: [
        "name",
		"state",
		"latitude",
		"longitude",
    ],
    additionalProperties: false,
});

export { IEditAerodromSchemaValidator };
export { IEditAerodrom };
