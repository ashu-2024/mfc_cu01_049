import React, { useMemo } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

// React.memo prevents unnecessary re-renders if props don't change
const Post = React.memo(({ post, toggleVerify }) => {
  // Memoize random background color so it doesn't change on every render
  const bgColor = useMemo(() => {
    // Generate pastel random color
    const r = Math.floor(150 + Math.random() * 100);
    const g = Math.floor(150 + Math.random() * 100);
    const b = Math.floor(150 + Math.random() * 100);
    return `rgb(${r}, ${g}, ${b})`;
  }, []);

  return (
    <Box
      p={4}
      borderRadius="md"
      bg={bgColor}
      boxShadow="md"
      transition="background-color 0.3s"
    >
      <Text fontWeight="bold" fontSize="lg">
        {post.title}
      </Text>
      <Text mb={2}>{post.body}</Text>
      <Button size="sm" onClick={() => toggleVerify(post.id)}>
        {post.verifyPost ? "Verified" : "Verify"}
      </Button>
    </Box>
  );
});

export default Post;
