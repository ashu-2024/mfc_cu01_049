import { SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCoffee } from '../redux/actions';
import CoffeeCard from './CoffeeCard';

const CoffeeList = ({ sort }) => {
  const dispatch = useDispatch();
  const { loading, coffee, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getCoffee(sort));
  }, [dispatch, sort]);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error}</Text>;

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
      {coffee.map((item) => (
        <CoffeeCard key={item.id} coffee={item} />
      ))}
    </SimpleGrid>
  );
};

export default CoffeeList;
