Slack Bot with Google Translate
=================

This is a Node.js application that uses Slack's Bolt package to create a Slack bot that can perform two functions.

1. The bot listens to the app_mention event and checks if the message contains the word "hello". If so, it sends a greeting message to the user.
2. The bot listens to the app_mention event and checks if the message contains the word "translate". If so, it translates the input text to the target language from the message using Google Translate API. If the input text exceeds 250 characters, it gives a warning.

The code requires the below environment variables to be set up in .env:
  - SLACK_BOT_TOKEN: Slack Bot Token.
  - SLACK_SIGNING_SECRET: Slack Signing Secret.
  - SLACK_APP_TOKEN: Slack App Token.
  - GOOGLE_APPLICATION_CREDENTIALS: the path to the Google Cloud service account key file.

To get Slack Token and Signing Secret, you need to set up a Slack bot app with the required scopes and permissions, and subscribe to bot events. 
To get Google Application credentials, you need to set up a Google Cloud Platform project, enable Google Translate API, and generates a service account key file.  

Once everything is set up, you can run the code and start interacting with the bot on Slack channel.


