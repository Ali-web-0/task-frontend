import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

interface Props {
  sendMessage: (message: object) => void;
}

const WebSocketConnection: React.FC<Props> = ({ sendMessage }) => {
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input) {
      sendMessage({ content: input, type: 'general' });
      setInput('');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <TextField
        label="Message"
        variant="filled"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default WebSocketConnection;
