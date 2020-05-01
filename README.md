# Azure Bot Function: Message in a bottle

## Use case

This Azure Function simplifies sending a single message to an existing conversation reference via a Microsoft Bot Registration.
It can be useful to mock features such as sending reminders before committing to development.

# Prerequisite

After deploying this repo to Azure Functions, ensure that the `settings.json` file contains `APP_ID` and `APP_PASSWORD` in `Values`.

# Usage

The endpoint `/api/botSendMessageTrigger` is exposed. The endpoint expects `POST` request with the URL query `?message=`. A POST body should contain a (partial) [conversation reference](https://docs.microsoft.com/en-us/javascript/api/botframework-schema/conversationreference?view=botbuilder-ts-latest) (e.g. one retrieved from the chatbot's database).