import {AzureFunction, Context, HttpRequest} from "@azure/functions";
import {BotFrameworkAdapter, ConversationReference} from "botbuilder";
import {MicrosoftAppCredentials} from "botframework-connector";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const adapter = new BotFrameworkAdapter({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD,
  });

  context.res.headers = {"Content-Type": "application/json"};

  if (!(req.method === "POST")) {
    context.res.body = {error: "Method must be POST"};
    context.res.status = 405;
    return;
  }

  if (!req.query.message) {
    context.res.body = {error: "'message' missing in URL query"};
    context.res.status = 400;
    return;
  }

  if (!req.body) {
    context.res.body = {error: "Conversation reference missing as POST body"};
    context.res.status = 400;
    return;
  }

  const conversationReference = req.body as Partial<ConversationReference>;
  MicrosoftAppCredentials.trustServiceUrl(conversationReference.serviceUrl);

  try {
    await adapter.createConversation(
      conversationReference,
      async turnContext => {
        context.res.body = await turnContext.sendActivity(req.query.message);
        context.res.status = 200;
      }
    );
  } catch {
    context.res.status = 500;
  }
};

export default httpTrigger;