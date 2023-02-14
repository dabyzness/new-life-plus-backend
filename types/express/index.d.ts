import { JwtPayloadUser } from "../../middlewares/auth";

declare global {
  namespace Express {
    export interface Request {
      token?: JwtPayloadUser;
    }
  }
}
