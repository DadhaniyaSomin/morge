import serverless from "serverless-http";
import { createServer } from "../../server";

const app = createServer();
const serverlessHandler = serverless(app);

export const handler = async (event: any, context: any) => {
  // Netlify may base64-encode the body — decode it before Express sees it
  if (event.body && event.isBase64Encoded) {
    event.body = Buffer.from(event.body, "base64").toString("utf8");
    event.isBase64Encoded = false;
  }
  return serverlessHandler(event, context);
};
