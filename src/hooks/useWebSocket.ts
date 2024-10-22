import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const useWebSocket = (url: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'open' | 'closed'>('connecting');

    useEffect(() => {
        const newSocket = io(url); 

        newSocket.on('connect', () => {
            console.log('Socket.IO connected');
            setConnectionStatus('open');
        });

        newSocket.on('disconnect', () => {
            console.log('Socket.IO disconnected');
            setConnectionStatus('closed');
        });

        newSocket.on('processedData', (data: any) => {
            console.log('Received message:', data);
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        newSocket.on('connect_error', (err) => {
            console.error('Connection error:', err);
            setConnectionStatus('closed');
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [url]);

    const sendMessage = (message: object) => {
        if (socket && socket.connected) {
            console.log('Sending message:', message);
            socket.emit('message', message);
        } else {
            console.error('Socket.IO is not open, cannot send message');
        }
    };

    return { messages, sendMessage, connectionStatus };
};

export default useWebSocket;
