import React, { useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Container,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import UploadFiles from "../components/UploadFile";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";

export default function UserProfileEdit(): JSX.Element {
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <Flex
          h="900px"
          p="0"
          bgSize="cover"
          bgImage="url('https://www.xtrafondos.com/wallpapers/uefa-champions-league-estadio-2932.jpg')"
          maxW={"100vw"}
          align={"center"}
          justify={"center"}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Editar Perfil
            </Heading>
            <FormControl id="userName">
              <FormLabel>Imagen</FormLabel>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar size="xl" src={user?.picture}>
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <UploadFiles
                    funcion={"Cambiar Avatar"}
                    titulo={"Subir Imagen"}
                  />
                  {/* <Button w="full">Cambiar Imagen</Button> */}
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="userName" isRequired>
              <FormLabel>Usuario</FormLabel>
              <Input
                placeholder="Nombre de usuario"
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Correo Electronico</FormLabel>
              <Input
                placeholder="Email"
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                placeholder="Contraseña"
                _placeholder={{ color: "gray.500" }}
                type="password"
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancelar
              </Button>
              <Button
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
              >
                Confirmar
              </Button>
            </Stack>
          </Stack>
        </Flex>
      ) : (
        <Flex
          h="900px"
          p="0"
          bgSize="cover"
          bgImage="url('https://www.xtrafondos.com/wallpapers/uefa-champions-league-estadio-2932.jpg')"
          maxW={"100vw"}
          align={"center"}
          justify={"center"}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Editar Perfil
            </Heading>
            <FormControl id="userName">
              <FormLabel>Imagen</FormLabel>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar size="xl" src="/img/sin_foto_perfil.png">
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <Button w="full">Cambiar Imagen</Button>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="userName" isRequired>
              <FormLabel>Usuario</FormLabel>
              <Input
                placeholder="Nombre de usuario"
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Correo Electronico</FormLabel>
              <Input
                placeholder="Email"
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                placeholder="Contraseña"
                _placeholder={{ color: "gray.500" }}
                type="password"
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancelar
              </Button>
              <Button
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
              >
                Confirmar
              </Button>
            </Stack>
          </Stack>
        </Flex>
      )}
    </>
  );
}
