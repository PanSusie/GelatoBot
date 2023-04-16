// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate({ projectId: "gelato-slack-bot-383901" });

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // Set the path to the key file from the environment variable
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// Listen for the app_mention event and send a greeting message if the message contains "hello"
app.event("app_mention", async ({ event, context, client, say }) => {
  try {
    const messageText = event.text.toLowerCase().trim();
    if (messageText.includes("hello")) {
      await say(`Hello <@${event.user}>!`);
    }
  } catch (error) {
    console.error(error);
  }
});

// Listen for the app_mention event and translate the message to target language if the message contains "translate"
app.event("app_mention", async ({ event, context, say }) => {
  try {
    const messageText = event.text.toLowerCase().trim();
    if (messageText.includes("translate")) {
      // Get the input text and target language from the message
      const messageParts = messageText.split(" ");
      const inputText = messageParts.slice(2, -1).join(" ");
      const targetLanguage = messageParts[messageParts.length - 1];

      //Test on the console
      console.log(inputText);
      console.log(targetLanguage);

      // Check if input text exceeds 250 characters
      if (inputText.length > 250) {
        await say("Sorry, the maximum character input is 250.");
        return;
      }

      // Translate the input text to the target language using Google Translate API
      const result = await translate.translate(inputText, targetLanguage);

      // Test on the console
      console.log(result);

      // Reply with the translated text
      await say(`Translated text: ${result[0]}`);
    }
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
