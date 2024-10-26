import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});
let response;
let models;

export const gorqChat = async ({ message, model, code }) => {
  try {
    const serverResponse = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: model,
    });
    response = serverResponse.choices[0].message.content;
    console.log("Groq REs raw", serverResponse);
  } catch (error) {
    console.error(error);
    response = "Unable to serve you at the movement.";
  }
  return { response };
};

export const getModels = async () => {
  try {
    const modelResponse = await groq.models.list();
    models = modelResponse;
  } catch (error) {
    console.log(error);
    models = "Unable to get models.";
  }
  return { models };
};
