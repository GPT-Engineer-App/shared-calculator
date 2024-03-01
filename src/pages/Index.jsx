import React, { useState, useEffect } from "react";
import { Box, Button, Container, Heading, Text, VStack, HStack, Code, useToast, CircularProgress } from "@chakra-ui/react";
import { FaCalculator } from "react-icons/fa";

const isMersennePrime = (number) => {
  // This is a placeholder function. In reality, checking if a number is a
  // Mersenne prime is a complex task and would require a more robust implementation.
  for (let i = 1; i < number; i *= 2) {
    if (number === i - 1) {
      return true;
    }
  }
  return false;
};

const Index = () => {
  const [currentNumber, setCurrentNumber] = useState(3);
  const [mersennePrimes, setMersennePrimes] = useState([3]);
  const [isCalculating, setIsCalculating] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Start the calculation process when the component mounts
    // This is a simulated process for the sake of this example
    const interval = setInterval(() => {
      if (isCalculating) {
        const nextNumber = currentNumber * 2 + 1;
        setCurrentNumber(nextNumber);
        if (isMersennePrime(nextNumber)) {
          setMersennePrimes([...mersennePrimes, nextNumber]);
          toast({
            title: "New Mersenne Prime Found!",
            description: `A new Mersenne prime number has been discovered: ${nextNumber}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentNumber, isCalculating, mersennePrimes, toast]);

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={4} marginY={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Collaborative Mersenne Prime Generator
        </Heading>
        <Text>Connect and contribute to finding the next Mersenne prime number.</Text>
        <Button leftIcon={<FaCalculator />} colorScheme="teal" onClick={() => setIsCalculating(!isCalculating)}>
          {isCalculating ? "Pause Calculation" : "Start Calculating"}
        </Button>
        {isCalculating && <CircularProgress isIndeterminate color="green.300" />}
        <HStack wrap="wrap" spacing={2} justify="center">
          {mersennePrimes.map((prime, index) => (
            <Code key={index} children={prime} />
          ))}
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
