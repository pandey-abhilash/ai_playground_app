
const conversationHistory= new Array<{role:"user"|"assistant",content:string}>

export const chatRepository={
    setConversation(role:"user"|"assistant",content:string){
        conversationHistory.push({role,content});
    },
    getConversation(){
        return conversationHistory;
    }
}