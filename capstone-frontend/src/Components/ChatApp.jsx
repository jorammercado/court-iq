import React, { useState } from 'react'
import ChatInput from './ChatInput'
import ChatOutput from './ChatOutput'
import axios from 'axios'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

const ChatApp = () => {
    const [conversation, setConversation] = useState([]);

    const handleSubmit = async (message) => {
        // add the user's message to the conversation
        const updatedConversation = [...conversation, { role: 'user', content: message }]
        setConversation(updatedConversation)

        try {
            const response = await axios.post(`${VITE_BASE_URL}/flask/ask`, { question: message })

            // add the response from the flask app to the conversation
            if (response.data && response.data.answer) {
                setConversation(conversation => [...conversation, { role: 'bot', content: response.data.answer }])
            }
        } catch (error) {
            console.error('Error getting response from flask app:', error)

        }
    }

    return (
        <div className="chat-app">
            <ChatOutput conversation={conversation} />
            <ChatInput onSubmit={handleSubmit} />
        </div>
    );
};

export default ChatApp
