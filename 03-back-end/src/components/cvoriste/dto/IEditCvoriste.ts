import * as Ajv from "ajv";

const ajv = Ajv();

interface IEditCvoriste {
    length: number;
	length2: number;
}

const IEditCvoristeSchemaValidator = ajv.compile({
    type: "object",
    properties: {
        length: {
            type: "float",
            minimum: 1,
        },
		length2: {
            type: "float",
            minimum: 1,
        },
    },
    required: [
        "length",
		"length2",
    ],
    additionalProperties: false,
});

export { IEditCvoristeSchemaValidator };
export { IEditCvoriste };
