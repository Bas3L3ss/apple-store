class Helper {
  constructor() {}

  async safeParse(message: string) {
    try {
      return JSON.parse(message);
    } catch (error) {
      console.error("❌ Failed to parse Redis message:", message);
      return null;
    }
  }
}

export default new Helper();
