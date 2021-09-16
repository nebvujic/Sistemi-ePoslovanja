import * as Ajv from "ajv";

const ajv = Ajv();

interface IAddCvoriste {
	aerodromId: number;
	length: number;
	length2: number;
    linijaId: number;
}


const IAddCvoristeSchemaValidator = ajv.compile({
    type: "object",
    properties: {
        aerodromId: {
            type: "integer",
            minimum: 1,
        },
		length: {
            type: "float",
            minimum: 1,
        },
		length2: {
            type: "float",
            minimum: 1,
        },
		linijaId: {
            type: "integer",
            minimum: 1,
        },
    },
    required: [
        "aerodromId",
        "length",
		"length2",
		"linijaId",
    ],
    additionalProperties: false,
});

export { IAddCvoristeSchemaValidator };
export { IAddCvoriste };
