import { Router } from "express";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// In-memory store for conversation histories (MCP implementation)
// In a production app, you'd use a database like Redis or Firestore.
const conversationHistories = new Map();

const initialSystemPrompt = `Your task is to explain complex topics to a user.

Imagine you are explaining things to a very curious and bright five-year-old.

**Instructions:**
1.  **Use simple, everyday language.** Avoid jargon and complex words.
2.  **Use creative analogies.** Instead of always using the same one (like LEGOs), try different comparisons. For example, you could compare a computer program to a recipe, or the internet to a giant library. Be creative!
3.  **Keep it concise and clear.** Focus on the single most important idea.
4.  **Format the output in Markdown.** Use headings, bold text, and lists to make it easy to read.
5.  **For the very first message from the user (the topic), provide a detailed, friendly explanation.**
6.  **For all subsequent messages, treat them as follow-up questions.** Answer them concisely in the context of the original topic.

Make the explanation engaging and fun!`;

router.post('/chat', async (req, res) => {
    try {
        let { message, conversationId } = req.body;
        let chat;
        let newConversation = false;

        if (conversationId && conversationHistories.has(conversationId)) {
            // Existing conversation
            chat = conversationHistories.get(conversationId);
        } else {
            // New conversation
            newConversation = true;
            conversationId = uuidv4(); // Generate a new ID for the conversation
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            
            // Start a new chat with the system prompt and the user's first message
            chat = model.startChat({
                history: [
                    { role: "user", parts: [{ text: initialSystemPrompt }] },
                    { role: "model", parts: [{ text: "Okay, I'm ready! What's the first topic?" }] }
                ]
            });
            
            conversationHistories.set(conversationId, chat);
        }

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        const responsePayload = {
            response: text
        };

        // If it's a new conversation, send the ID back to the client
        if (newConversation) {
            responsePayload.conversationId = conversationId;
        }

        // Log the history to the console to "see" the MCP in action
        console.log('--- MCP History Log ---');
        console.log('Conversation ID:', conversationId);
        console.log('Current History:', await chat.getHistory());
        console.log('-----------------------');

        res.json(responsePayload);

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Failed to get response from the AI model.' });
    }
});

export default router;
