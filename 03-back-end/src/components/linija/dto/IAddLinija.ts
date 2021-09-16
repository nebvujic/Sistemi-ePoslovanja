import * as Ajv from "ajv";

const ajv = Ajv();

interface IAddLinija {
    name: string;
	day: string;
    start_time: string;
    starting_airport_id: number;
	price: number;
	vip_price: number;
}

const IAddLinijaSchema = {
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
		starting_airport_id: {
            type: "integer",
            minimum: 1,
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
		"starting_airport_id",
		"price",
		"vip_price",
    ],
    additionalProperties: false,
}

const IAddLinijaSchemaValidator = ajv.compile(IAddLinijaSchema);

export { IAddLinijaSchema };
export { IAddLinijaSchemaValidator };
export { IAddLinija };
