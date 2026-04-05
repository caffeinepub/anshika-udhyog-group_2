import type { backendInterface } from "../backend";

export class BackendService {
  private actor: backendInterface;

  constructor(actor: backendInterface) {
    this.actor = actor;
  }

  async loadAllContent(): Promise<Record<string, unknown>> {
    try {
      const entries = await this.actor.getAllContent();
      const map: Record<string, unknown> = {};
      for (const [key, value] of entries) {
        try {
          map[key] = JSON.parse(value);
        } catch {
          map[key] = value;
        }
      }
      return map;
    } catch {
      return {};
    }
  }

  async saveContent(key: string, value: unknown): Promise<void> {
    await this.actor.saveContent(key, JSON.stringify(value));
  }

  async getContent<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const raw = await this.actor.getContent(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  }
}
