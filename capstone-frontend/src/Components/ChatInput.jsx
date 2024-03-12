import React, { useState } from 'react';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Input
        value={message}
        onChange={handleChange}
        placeholder="Search our database, type in a question..."
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              flex: 1,
            }),
          },
        }}
      />
      <Button onClick={handleSubmit} kind="primary">
        Send
      </Button>
    </form>
  );
};

export default ChatInput;
