import { Redis } from "ioredis";
import { REDIS_URL } from "../constants/index";

class RedisClient {
  public client: Redis;
  private subscriber: Redis | null = null;
  private publishers: Map<string, Redis> = new Map();
  private isConnected: boolean = false;
  private redisUrl: string;

  constructor() {
    this.redisUrl = REDIS_URL;
    this.client = new Redis(this.redisUrl);
    this.setupConnectionEvents();
  }

  private setupConnectionEvents() {
    this.client.on("connect", () => {
      console.log("✅ Redis connected");
      this.isConnected = true;
    });

    this.client.on("error", (error) => {
      console.log("❌ Redis connection error:", error);
      this.isConnected = false;
    });

    this.client.on("close", () => {
      console.log("❌ Redis connection closed");
      this.isConnected = false;
    });
  }

  async connect(): Promise<void> {
    if (this.isConnected) return;

    try {
      console.log("⏳ Connecting to Redis");
      await this.client.connect();
    } catch (error: unknown) {
      // @ts-expect-error:no prob
      console.log("❌ Redis connection error:", error.message);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.subscriber) {
        await this.subscriber.quit();
      }

      for (const publisher of this.publishers.values()) {
        await publisher.quit();
      }

      await this.client.quit();
      this.isConnected = false;
      console.log("Redis disconnected");
    } catch (error: unknown) {
      // @ts-expect-error:no prob
      console.log("❌ Redis disconnect error:", error.message);
    }
  }

  // Cache operations
  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      if (ttlSeconds) {
        await this.client.set(key, serializedValue, "EX", ttlSeconds);
      } else {
        await this.client.set(key, serializedValue);
      }
    } catch (error: unknown) {
      // @ts-expect-error:no prob
      console.log("❌ Redis set error:", error.message);
      throw error;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (error: unknown) {
      // @ts-expect-error:no prob
      console.log("❌ Redis get error:", error.message);
      throw error;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error: unknown) {
      // @ts-expect-error:no prob
      console.log("❌ Redis del error:", error.message);
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error: unknown) {
      // @ts-expect-error:no prob
      console.log("❌ Redis exists error:", error.message);
      throw error;
    }
  }

  // Pub/Sub operations
  async subscribe(
    channel: string,
    callback: (message: string, channel: string) => void
  ): Promise<void> {
    try {
      if (!this.subscriber) {
        this.subscriber = new Redis(this.redisUrl);
        this.subscriber.on("error", (error) => {
          console.log("❌ Redis subscriber error:", error);
        });
      }

      await this.subscriber.subscribe(channel);
      this.subscriber.on("message", (subscribedChannel, message) => {
        if (channel === subscribedChannel) {
          try {
            callback(message, channel);
          } catch (error) {
            console.log("❌ Error in subscriber callback:", error);
          }
        }
      });

      console.log(`Subscribed to channel: ${channel}`);
    } catch (error: unknown) {
      // @ts-expect-error:no prob
      console.log("❌ Redis subscribe error:", error.message);
      throw error;
    }
  }

  async publish(channel: string, message: unknown): Promise<void> {
    try {
      let publisher = this.publishers.get(channel);

      if (!publisher) {
        publisher = new Redis(this.redisUrl);
        publisher.on("error", (error) => {
          console.log(
            `❌ Redis publisher error for channel ${channel}:`,
            error
          );
        });
        this.publishers.set(channel, publisher);
      }

      const serializedMessage =
        typeof message === "string" ? message : JSON.stringify(message);
      await publisher.publish(channel, serializedMessage);
    } catch (error: unknown) {
      // @ts-expect-error:no prob
      console.log("❌ Redis publish error:", error.message);
      throw error;
    }
  }

  async unsubscribe(channel: string): Promise<void> {
    try {
      if (this.subscriber) {
        await this.subscriber.unsubscribe(channel);
        console.log(`Unsubscribed from channel: ${channel}`);
      }
    } catch (error: unknown) {
      // @ts-expect-error:no prob
      console.log("❌ Redis unsubscribe error:", error.message);
      throw error;
    }
  }
}

export default new RedisClient();
