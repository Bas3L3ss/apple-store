import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../constants/index";
import { Account as AccountType } from "../@types";
import Account from "../models/Account";

class JWT {
  instance: typeof jsonwebtoken = jsonwebtoken;
  secret: string;

  constructor() {
    this.secret = JWT_SECRET;
  }

  signToken(
    payload: Record<string, any>,
    expiresIn: jsonwebtoken.SignOptions["expiresIn"] = "12h"
  ) {
    const token = this.instance.sign(payload, JWT_SECRET, { expiresIn });

    return token;
  }

  async verifyToken(token: string): Promise<AccountType | null> {
    try {
      const decoded = this.instance.verify(token, this.secret) as {
        uid: string;
        email?: string;
      };

      const user = await Account.findById(decoded?.uid).select("-password"); // Exclude sensitive fields

      return user;
    } catch (error) {
      console.error("Invalid Token:", error);
      return null;
    }
  }
}

export default new JWT();
