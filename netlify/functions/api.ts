import serverless from "serverless-http";
import { createServer } from "../../server";

const app = createServer();

const serverlessHandler = serverless(app, {
  request(req: any, event: any) {
    // Pre-set body on the request so Express middleware can access it
    if (event.body) {
      req.body = event.isBase64Encoded
        ? Buffer.from(event.body, "base64").toString("utf8")
        : event.body;
    }
  },
});

export const handler = async (event: any, context: any) => {
  return serverlessHandler(event, context);
};
