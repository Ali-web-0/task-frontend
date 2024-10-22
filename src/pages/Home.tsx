import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import useWebSocket from '../hooks/useWebSocket';
import WebSocketConnection from '../components/WebSocketConnection';
import MessageList from '../components/MessageList';
import { config } from '../config';

const Home: React.FC = () => {
  const { messages, sendMessage, connectionStatus } = useWebSocket(
    config?.baseUrl
  );

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Real-Time WebSocket Chat
      </Typography>
      <Box>
        <MessageList messages={messages} />
        <WebSocketConnection sendMessage={sendMessage} />
      </Box>
      <Typography
        align="center"
        color={connectionStatus === 'open' ? 'green' : 'error'}
      >
        Connection Status: {connectionStatus}
      </Typography>
    </Container>
  );
};

export default Home;
