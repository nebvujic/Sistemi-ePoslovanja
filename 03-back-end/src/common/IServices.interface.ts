import AdministratorService from "../components/administrator/service";
import AerodromService from "../components/aerodrom/service";
import CvoristeService from "../components/cvoriste/service";
import LinijaService from "../components/linija/service";
import UserService from "../components/user/service";

export default interface IServices {
    administratorService: AdministratorService;
	aerodromService: AerodromService;
	cvoristeService: CvoristeService;
	linijaService: LinijaService;
    userService: UserService;
}