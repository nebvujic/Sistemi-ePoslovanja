import * as Ajv from "ajv";

const ajv = Ajv();

interface IEditLinija {
    name: string;
	day: string;
    start_time: string;
	price: number;
	vip_price: number;
}


const IEditLinijaSchemaValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 5,
            maxLength: 50,
        },
        day: {
            type: "string",
            minLength: 5,
            maxLength: 20,
        },
        start_time: {
            type: "string",
            minLength: 5,
            maxLength: 5,
        },
		price: {
            type: "integer",
            minimum: 1,
        },
		vip_price: {
            type: "integer",
            minimum: 1,
        },
    },
    required: [
        "name",
        "day",
		"start_time",
		"price",
		"vip_price",
    ],
    additionalProperties: false,
});

export { IEditLinijaSchemaValidator };
export { IEditLinija };
