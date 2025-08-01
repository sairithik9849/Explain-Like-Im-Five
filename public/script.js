document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const spinner = sendButton.querySelector('.spinner-border');

    let conversationId = null; // This will store the ID for the current conversation session

    // Function to add a message to the chat window
    const addMessage = (sender, message, isHtml = false) => {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message', `${sender}-message`);
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        if (isHtml) {
            messageContent.innerHTML = message;
        } else {
            messageContent.textContent = message;
        }
        
        messageWrapper.appendChild(messageContent);
        chatContainer.appendChild(messageWrapper);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
    };

    // Function to show a typing indicator
    const showTypingIndicator = () => {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatContainer.appendChild(typingIndicator);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    // Function to remove the typing indicator
    const removeTypingIndicator = () => {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    };

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (!message) return;

        addMessage('user', message);
        messageInput.value = '';
        showTypingIndicator();

        spinner.classList.remove('d-none');
        sendButton.disabled = true;

        try {
            const response = await axios.post('/api/gemini/chat', {
                message,
                conversationId // This will be null for the first message
            });

            const { response: botResponse, conversationId: newConversationId } = response.data;
            
            // If it's a new conversation, store the ID
            if (newConversationId) {
                conversationId = newConversationId;
            }

            removeTypingIndicator();
            // Use marked.parse to render Markdown from the server
            addMessage('bot', marked.parse(botResponse), true);

        } catch (error) {
            removeTypingIndicator();
            const errorMsg = error.response?.data?.error || 'Sorry, something went wrong.';
            addMessage('bot', `Error: ${errorMsg}`);
        } finally {
            spinner.classList.add('d-none');
            sendButton.disabled = false;
            messageInput.focus();
        }
    });
});
