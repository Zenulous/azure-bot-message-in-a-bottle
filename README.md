# Azure Bot Function: Message in a bottle

## Use case

This Azure Function simplifies sending a single message to an existing conversation reference via a Microsoft Bot Registration.
It can be useful to mock features such as sending reminders before committing to development.

# Prerequisites

## Local development

Ensure you have the [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local) installed on your machine.

To develop locally, create a `local.settings.json` in the root of the project. Copy over the contents of `local.settings.example.json` and fill in the missing values (your bot AAD APP ID and password).

You can also easily copy over the code to a new HTTP Trigger Azure Function project. After deploying this repo to Azure Functions, ensure that there is a `settings.json` file containing `APP_ID` and `APP_PASSWORD` just like the example JSON.

# Usage

The endpoint `/api/botSendMessageTrigger` is exposed. The endpoint expects `POST` request with the URL query `?message=`. A POST body should contain a (partial) [conversation reference](https://docs.microsoft.com/en-us/javascript/api/botframework-schema/conversationreference?view=botbuilder-ts-latest) (e.g. one retrieved from the chatbot's database). Note that the bot must have permissions to be able to send a message to a conversation reference.

Make sure to consider [securing this endpoint](https://docs.microsoft.com/en-us/azure/azure-functions/security-concepts) when this function is deployed to Azure.
