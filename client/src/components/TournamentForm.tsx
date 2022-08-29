import React, { useEffect, useState } from "react";

import {
  Container,
  Box,
  Text,
  Stack,
  Input,
  Button,
  Textarea,
  Select,
  Flex,
  useColorModeValue,
  InputRightElement,
  FormControl,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  Icon,
  FormErrorMessage,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
import TeamAdd from "./TeamAdd";
import MatchAdd from "./MatchAdd";
import { FaExclamationCircle } from "react-icons/fa";
import api from "../services/api";
import { useAppSelector } from "../redux/hooks";
import UploadFiles from "./UploadFile";

type Inputs = {
  name: string;
  description: string;
  user_limit: number;
  creator_user_id: string;
  type: string;
  logo_url: string;
  password: string;
  teams: Team[];
  matches: Match[];
};

type Team = {
  name: string;
  shield_url: string;
  key: number;
};

type Match = {
  key: number;
  team_a_name: string;
  team_b_name: string;
  date: string;
  stage: string;
};

type Errors = {
  name: string;
  description: string;
  user_limit: string;
  password: string;
  teams: string;
  matches: string;
};

function validate(input: Inputs, submit = false) {
  const errors = {
    name: "",
    description: "",
    user_limit: "",
    password: "",
    teams: "",
    matches: "",
  };
  if (!!input.name.length) errors.name = "Completado";

  if (!!input.description.length) errors.description = "Completado";

  if (input.user_limit >= 2 && input.user_limit <= 500)
    errors.user_limit = "Completado";

  if (input.type === "PRIVATE") {
    if (!!input.password.length) errors.password = "Completado";
  } else {
    errors.password = "Completado";
  }
  if (input.teams.length >= 2) errors.teams = "Completado";

  if (!!input.matches.length) errors.matches = "Completado";

  if (submit) {
    if (errors.name === "") errors.name = "Campo Requerido";
    if (errors.description === "") errors.description = "Campo Requerido";
    if (errors.user_limit === "") errors.user_limit = "Entr 2 y 500 usuarios";
    if (errors.teams === "") errors.teams = "Debe haber al menos 2 equipos";
    if (errors.matches === "") errors.matches = "Debe haber al menos 1 partido";
    if (input.type === "PRIVATE") {
      if (errors.password === "") errors.password = "Campo Requerido";
    }
  }

  return errors;
}

export default function TournamentForm(): JSX.Element {
  const userCreatorId = useAppSelector((state) => state.auth.decoded?.id);
  const logoTorneo = useAppSelector((state) => state.team.logo_b);
  const [logo, setLogo] = useState(logoTorneo);
  const history = useHistory();
  const [CrearError, setCrearError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: "",
    description: "",
    user_limit: "",
    password: "",
    teams: "",
    matches: "",
  });
  const [input, setInput] = useState<Inputs>({
    name: "",
    description: "",
    user_limit: 0,
    creator_user_id: "",
    type: "PUBLIC",
    logo_url: "",
    password: "",
    teams: [],
    matches: [],
  });
  function addTeam(newTeams: Team[]) {
    setInput({ ...input, teams: newTeams });
  }
  function addMatch(newMatch: Match[]) {
    setInput({ ...input, matches: newMatch });
  }
  function actualizarMatches() {
    const teamsNames = input.teams.map((team) => {
      return team.name;
    });
    const newMatches = input.matches.filter((match) => {
      return (
        teamsNames.includes(match.team_a_name) &&
        teamsNames.includes(match.team_b_name)
      );
    });

    if (newMatches.length != input.matches.length)
      setInput({ ...input, matches: newMatches });
  }
  const cambiosEnInput = (
    e:
      | React.FormEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    setErrors(
      validate({ ...input, [e.currentTarget.name]: e.currentTarget.value })
    );
  };
  const cambiosENUser_Limit = (e: React.FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]: Number(e.currentTarget.value),
    });
    setErrors(
      validate({
        ...input,
        [e.currentTarget.name]: Number(e.currentTarget.value),
      })
    );
  };
  const crear = async () => {
    setErrors(validate(input, true));

    if (
      errors.name === "Completado" &&
      errors.description === "Completado" &&
      errors.user_limit === "Completado" &&
      errors.password === "Completado" &&
      errors.teams === "Completado" &&
      errors.matches === "Completado"
    ) {
      /* let finalLogo_url = logoTorneo;
      if (finalLogo_url === "") finalLogo_url = "/img/torneo.jpg"; */
      let finalLogo_url = "";
      if (logo != logoTorneo) {
        setLogo(logoTorneo);
        finalLogo_url = logoTorneo;
      }
      if (finalLogo_url === "") finalLogo_url = "/img/torneo.jpg";
      try {
        const tournamentID = await api.post("/tournaments/create", {
          ...input,
          creator_user_id: userCreatorId,
          logo_url: finalLogo_url,
        });

        history.push("/torneos/" + tournamentID.data);
      } catch (e: any) {
        console.log(e.response.data);
        setCrearError(e.response.data.message);
      }
    }
  };
  useEffect(() => {
    setErrors(validate(input));
    actualizarMatches();
    setCrearError("");
  }, [input.teams, input.matches]);
  useEffect(() => {
    setLogo(logoTorneo);
  }, []);

  return (
    <Container>
      <Flex alignItems="center" marginTop={"50px"} marginBlockEnd={"50px"}>
        <Box
          h="100%"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
          p="20px"
          rounded={"xl"}
          boxShadow={"lg"}
          bg={useColorModeValue("white", "gray.700")}
        >
          <Stack alignItems="space-between;" spacing="9px">
            <Tabs>
              <TabList>
                <Tab
                  textColor={
                    (errors.name === "Completado" || errors.name === "") &&
                    (errors.description === "Completado" ||
                      errors.description === "") &&
                    (errors.user_limit === "Completado" ||
                      errors.user_limit === "") &&
                    (errors.password === "Completado" || errors.password === "")
                      ? "gray.400"
                      : "red.500"
                  }
                >
                  Torneo
                </Tab>
                <Tab
                  textColor={
                    errors.teams === "Completado" || errors.teams === ""
                      ? "gray.400"
                      : "red.500"
                  }
                >
                  Equipos
                </Tab>
                <Tab
                  textColor={
                    errors.matches === "Completado" || errors.matches === ""
                      ? "gray.400"
                      : "red.500"
                  }
                >
                  Partidos
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Stack alignItems="space-between;" spacing="9px">
                    <Stack direction="row" spacing={4}>
                      {/* INPUT NAME */}
                      <FormControl
                        isInvalid={
                          errors.name === "Completado" || errors.name === ""
                            ? false
                            : true
                        }
                      >
                        <Input
                          type="text"
                          name="name"
                          value={input.name}
                          placeholder="Nombre del torneo"
                          onChange={cambiosEnInput}
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>
                      {/* SELECT TYPE PRIVADO/PUBLICO */}
                      <Select name="type" onChange={cambiosEnInput}>
                        <option value="PRIVATE">Privado</option>
                        <option value="PUBLIC" selected>
                          Público
                        </option>
                      </Select>
                    </Stack>
                    {/* CONTRASEÑA */}
                    {input.type === "PRIVATE" && (
                      <FormControl
                        isInvalid={
                          errors.password === "Completado" ||
                          errors.password === ""
                            ? false
                            : true
                        }
                      >
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                          ></InputLeftElement>
                          <Input
                            name="password"
                            onChange={cambiosEnInput}
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña para el torneo"
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              backgroundColor="gray"
                              mr="0.5"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? "Ocultar" : "Mostrar"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                    <Stack direction="row" spacing={4}>
                      {/* ////USER_LIMIT */}

                      <FormControl
                        isInvalid={
                          errors.user_limit === "Completado" ||
                          errors.user_limit === ""
                            ? false
                            : true
                        }
                      >
                        <NumberInput>
                          <NumberInputField
                            inputMode="numeric"
                            type="number"
                            name="user_limit"
                            value={input.user_limit}
                            placeholder="Cantidad máx. de usuarios"
                            onChange={cambiosENUser_Limit}
                          />
                        </NumberInput>
                        <FormErrorMessage fontSize="15px">
                          {errors.user_limit}
                        </FormErrorMessage>
                      </FormControl>

                      {/*  ///LOGO/// */}
                      <UploadFiles
                        imagen={true}
                        logo_torneo={true}
                        funcion={"Imagen Torneo"}
                        titulo={"Sube una imagen para el torneo"}
                      />
                    </Stack>

                    {/* ////DESCRIPTION */}
                    <FormControl
                      isInvalid={
                        errors.description === "Completado" ||
                        errors.description === ""
                          ? false
                          : true
                      }
                    >
                      <Stack spacing={1}>
                        <Text mb="8px">Descripción: </Text>
                        <Textarea
                          name="description"
                          value={input.description}
                          placeholder="Descripción"
                          size="sm"
                          onChange={cambiosEnInput}
                        />
                      </Stack>
                      <FormErrorMessage>{errors.description}</FormErrorMessage>
                    </FormControl>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  {/* AGREGAR EQUIPOS */}
                  <TeamAdd cb={addTeam} />
                  <Flex mt="4" alignItems="center">
                    <FormControl
                      isInvalid={
                        errors.teams === "Completado" || errors.teams === ""
                          ? false
                          : true
                      }
                    >
                      <FormErrorMessage>{errors.teams}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  {/* AGREGAR PARTIDOS */}
                  <MatchAdd cb={addMatch} equipos={input.teams} />
                  <Flex mt="4" alignItems="center">
                    <FormControl
                      isInvalid={
                        errors.matches === "Completado" || errors.matches === ""
                          ? false
                          : true
                      }
                    >
                      <FormErrorMessage>{errors.matches}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>

            {CrearError && (
              <Flex mt="4" alignItems="center">
                <Icon as={FaExclamationCircle} color="red.500" mr="2" />
                <Text
                  as="span"
                  color="red.500"
                  fontWeight="500"
                  fontSize="20px"
                >
                  {CrearError}
                </Text>
              </Flex>
            )}

            <Button
              fontSize="22px"
              bg={"blue.400"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={crear}
            >
              Crear Torneo
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}
