import express, { Request, Response } from "express";
import Http from "./Http";

export default class ExpressHttp implements Http {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  /**
   * Conversão da URL recebida
   * /orders/${code} -> /orders/:code
   */
  private convertUrl(url: string) {
    return url.replace(/\$\{/g, ":").replace(/\}/g, "");
  }

  async on(method: string, url: string, fn: any): Promise<void> {
    this.app[method](
      this.convertUrl(url),
      async (request: Request, response: Response) => {
        const data = await fn(request.params, request.body);
        response.json(data);
      }
    );
  }

  async listen(port: number): Promise<void> {
    this.app.listen(port, () => console.log(`Server is running on ${port}`));
  }
}
