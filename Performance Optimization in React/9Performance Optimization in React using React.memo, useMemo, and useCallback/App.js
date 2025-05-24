import React, { useState, useEffect, useCallback } from "react";
import Post from "./Post";
import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";

function App() {
  const [timer, setTimer] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);

  // Timer increments every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Add new post
  const addPost = () => {
    if (!title.trim() || !body.trim()) return;
    setPosts(prev => [
      ...prev,
      {
        id: Date.now(),
        title,
        body,
        verifyPost: false,
      },
    ]);
    setTitle("");
    setBody("");
  };

  // Memoized toggle function for verifyPost to avoid re-creation
  const toggleVerify = useCallback(
    (id) => {
      setPosts(prev =>
        prev.map(post =>
          post.id === id ? { ...post, verifyPost: !post.verifyPost } : post
        )
      );
    },
    [setPosts]
  );

  return (
    <Box maxW="600px" mx="auto" p={5}>
      <Text fontSize="xl" mb={4}>
        Timer: {timer} seconds
      </Text>

      <VStack spacing={3} mb={6}>
        <Input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          placeholder="Body"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <Button colorScheme="blue" onClick={addPost}>
          Add Post
        </Button>
      </VStack>

      <VStack spacing={4} align="stretch">
        {posts.map(post => (
          <Post key={post.id} post={post} toggleVerify={toggleVerify} />
        ))}
      </VStack>
    </Box>
  );
}

export default App;
