import { StreamChat } from "stream-chat";
import "dotenv/config"

const apiKey = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("Stream API key or Secret is missing");
}
 // this is to make connection with stream
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

// upsertStreamUser is used to create a user in stream
export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error("Error upserting Stream user:", error);
    }
}
// todo: do it later
//channel banane ke liye use hoga (jaise 1-on-1 ya group chat ke liye).
export const generateStreamChannel = (userId) => {}giygyg