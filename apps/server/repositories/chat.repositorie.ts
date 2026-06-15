
const conversationHistory: Array<{ role: "user" | "model"; parts: string[] }> = [];

export const chatRepository = {
    setConversation(role: "user" | "model", text: string) {
        conversationHistory.push({ role, parts: [text] });
    },
    getConversation() {
        return conversationHistory;
    }
}