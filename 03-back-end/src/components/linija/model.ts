import IModel from "../../common/IModel.interface";
import AerodromModel from "../aerodrom/model";

class LinijaModel implements IModel {
    linijaId: number;
    name: string;
	day: string;
	start_time: string;
    starting_airport_id: number | null = null;
    airport: AerodromModel | null = null;
	price: number;
	vip_price: number;
}

export default LinijaModel;
