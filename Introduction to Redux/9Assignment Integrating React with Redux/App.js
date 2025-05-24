import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "./todosSlice";

import {
  ChakraProvider,
  Box,
  Input,
  Button,
  List,
  ListItem,
  Checkbox,
  IconButton,
  Flex,
  Text
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const handleAddTodo = () => {
    if (title.trim() === "") return;
    dispatch(addTodo(title));
    setTitle("");
  };

  return (
    <ChakraProvider>
      <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
        <Text fontSize="2xl" mb={4} textAlign="center">
          Redux Todo List with Chakra UI
        </Text>

        <Flex mb={4}>
          <Input
            placeholder="Enter new todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button ml={2} onClick={handleAddTodo} colorScheme="teal">
            Add
          </Button>
        </Flex>

        <List spacing={3}>
          {todos.map((todo) => (
            <ListItem key={todo.id} borderWidth="1px" p={3} borderRadius="md">
              <Flex alignItems="center" justifyContent="space-between">
                <Checkbox
                  isChecked={todo.status}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                >
                  <Text
                    as={todo.status ? "s" : undefined}
                    ml={2}
                    fontSize="lg"
                  >
                    {todo.title}
                  </Text>
                </Checkbox>
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
    </ChakraProvider>
  );
}

export default App;
