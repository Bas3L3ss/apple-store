import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../constants/index";
import { Account as AccountType } from "../@types";
import Account from "../models/Account";
import redis from "./redis";

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

      const uid = decoded?.uid;

      if (!uid) {
        console.error("Invalid token: No uid in payload");
        return null;
      }

      const cacheKey = `user:${uid}`;

      const cachedUser = await redis.get<AccountType>(cacheKey);

      if (cachedUser) {
        console.log(`✅ Cache hit for user:${uid}`);
        return cachedUser;
      }

      console.log(`❌ Cache miss for user:${uid}, fetching from database`);

      const user = await Account.findById(uid).select("-password"); // Exclude sensitive fields

      if (!user) {
        return null;
      }

      // Store user in cache for future requests (cache for 15 minutes)
      // Short TTL for user data to ensure permissions/roles are relatively fresh
      await redis.set(cacheKey, user, 900);
      console.log(`✅ Cached user:${uid} for 15 minutes`);

      return user;
    } catch (error) {
      console.error("Invalid Token:", error);
      return null;
    }
  }
}

export default new JWT();
