import Groq from "groq-sdk";

const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });
let response;
export const gorqChat = async(message) => {
    try {
        const serverResponse  = await groq.chat.completions.create({
            messages: [
              {
                role: "user",
                content: message,
              },
            ],
            model: "llama3-8b-8192",
          });
          response = serverResponse.choices[0].message.content;
    } catch (error) {
        console.error(error);
        response = "Unable to connect server"
    }
    return {response};
}
