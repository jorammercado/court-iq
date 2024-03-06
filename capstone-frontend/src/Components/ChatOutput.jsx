
import React from 'react';

const ChatOutput = ({ conversation }) => {
  return (
    <div>
      {conversation.map((msg, index) => (
        <div key={index} className={msg.role}>
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatOutput;
