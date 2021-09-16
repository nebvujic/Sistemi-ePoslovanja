import IModel from "../../common/IModel.interface";

class AerodromModel implements IModel {
    aerodromId: number;
    name: string;
    state: string;
	latitude: number;
	longitude: number;
    code: string;
}

export default AerodromModel;
