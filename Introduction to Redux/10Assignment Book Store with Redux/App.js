// src/App.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBook,
  deleteBook,
  editBook,
  toggleRead,
} from "./redux/booksSlice";
import {
  setAuthorFilter,
  setGenreFilter,
  setReadFilter,
} from "./redux/filtersSlice";

import {
  ChakraProvider,
  Box,
  Input,
  Button,
  Select,
  Checkbox,
  Text,
  Flex,
  Stack,
  Heading,
} from "@chakra-ui/react";

function App() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const filters = useSelector((state) => state.filters);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
  });

  // Filter logic
  const filteredBooks = books.filter((book) => {
    return (
      (filters.author === "" || book.author.includes(filters.author)) &&
      (filters.genre === "" || book.genre.includes(filters.genre)) &&
      (filters.readStatus === "all" ||
        (filters.readStatus === "read" && book.read) ||
        (filters.readStatus === "unread" && !book.read))
    );
  });

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.genre) return;
    dispatch(
      addBook({
        ...newBook,
        id: Date.now(),
        read: false,
      })
    );
    setNewBook({ title: "", author: "", genre: "" });
  };

  return (
    <ChakraProvider>
      <Box maxW="600px" mx="auto" p={5}>
        <Heading mb={5}>Book Store with Redux</Heading>
        <Stack spacing={3} mb={5}>
          <Input
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <Input
            placeholder="Author"
            value={newBook.author}
            onChange={(e) =>
              setNewBook({ ...newBook, author: e.target.value })
            }
          />
          <Input
            placeholder="Genre"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          />
          <Button onClick={handleAddBook} colorScheme="teal">
            Add Book
          </Button>
        </Stack>

        <Box mb={5}>
          <Text>Filter Books</Text>
          <Input
            placeholder="Filter by Author"
            value={filters.author}
            onChange={(e) => dispatch(setAuthorFilter(e.target.value))}
            mb={2}
          />
          <Input
            placeholder="Filter by Genre"
            value={filters.genre}
            onChange={(e) => dispatch(setGenreFilter(e.target.value))}
            mb={2}
          />
          <Select
            value={filters.readStatus}
            onChange={(e) => dispatch(setReadFilter(e.target.value))}
          >
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
          </Select>
        </Box>

        <Box>
          {filteredBooks.length === 0 ? (
            <Text>No books found.</Text>
          ) : (
            filteredBooks.map((book) => (
              <Flex
                key={book.id}
                justify="space-between"
                p={3}
                borderWidth={1}
                mb={2}
                borderRadius={5}
                alignItems="center"
              >
                <Box>
                  <Text fontWeight="bold">{book.title}</Text>
                  <Text fontSize="sm">
                    {book.author} - {book.genre}
                  </Text>
                </Box>
                <Flex align="center">
                  <Checkbox
                    isChecked={book.read}
                    onChange={() => dispatch(toggleRead(book.id))}
                    mr={3}
                  >
                    Read
                  </Checkbox>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => dispatch(deleteBook(book.id))}
                  >
                    Delete
                  </Button>
                </Flex>
              </Flex>
            ))
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
