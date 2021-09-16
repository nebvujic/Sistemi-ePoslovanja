import IModel from "../../common/IModel.interface";
import LinijaModel from "../linija/model";
import AerodromModel from "../aerodrom/model";

class CvoristeModel implements IModel {
    cvoristeId: number;
	aerodromId: number | null = null;
    aerodrom: AerodromModel | null = null;
    length: number;
	length2: number;
    linijaId: number | null = null;
    linija: LinijaModel | null = null;
}

export default CvoristeModel;
