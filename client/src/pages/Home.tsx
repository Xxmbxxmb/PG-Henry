import React, { useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import PublicTournaments from "../components/PublicTournament";
import Carousel from "../components/NewsCarousel";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import UserTournaments from "../components/UserTournaments";
import OwnerTournament from "../components/TornamentOwner";
import { IoTrophy } from "react-icons/io5";
import ReviewCarousel from "../components/ReviewCarousel";
import { useAuth0 } from "@auth0/auth0-react";
import { loginAuth0 } from "../redux/slices/authThunk";
import { getReviews } from "../redux/slices/userThunk";
import { useHistory } from "react-router-dom";

function Home() {
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const data = useAppSelector((state) => state.user.userComments);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAuth0();
  const infoUser = useAppSelector((state) => state.auth.decoded);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated)
      dispatch(
        loginAuth0({
          email: user?.email as string,
          username: user?.nickname as string,
          full_name: user?.name as string,
          birth_date: user?.birthdate as string,
          check: true,
        })
      );
    dispatch(getReviews(null));
  }, []);

  useEffect(() => {
    if (infoUser?.is_banned === true) history.push("/banned");
  }, [infoUser]);

  return (
    <Container
      maxW="100vw"
      h="100vh"
      p="0"
      bgColor="DPrimary"
      bgSize="cover"
      bgImage="url('/img/bgImg.png')"
      bgPosition="center"
    >
      <NavBar />
      <Flex
        backgroundColor="primary"
        mt="90vh"
        pb={5}
        pl="5%"
        borderTopWidth={5}
        borderTopColor="Dtext"
        borderBottomWidth={5}
        borderBottomColor="Dtext"
        justifyContent="space-between"
      >
        <Box mt={10}>
          <IoTrophy size="20em" color="#0096FF" />
        </Box>
        <Box maxWidth="3xl" me={20} mt={10} mb={10}>
          <Heading
            fontSize={["2xl", "5xl"]}
            fontWeight="thin"
            color="text"
            textAlign="end"
            textTransform="uppercase"
          >
            La mejor página de pronósticos deportivos
          </Heading>
          <Text
            mt="5%"
            textAlign="end"
            fontSize={"x-large"}
            fontFamily="heading"
            fontWeight="thin"
            color="text"
          >
            Participá de los torneos mas famosos por premios en efectivo, o creá
            el tuyo personalizado para competir con tus amigos!
          </Text>
        </Box>
      </Flex>
      {!isLoggedIn && (
        <Box marginTop="75px" mx={{ base: "4", md: "10", lg: "20" }}>
          <Box mt={10}>
            <PublicTournaments />
          </Box>
          <Flex mt="12">
            <Carousel />
            {data.length === 0 ? null : (
              <Box width={"100%"} mb="10" ml={20}>
                <ReviewCarousel />
              </Box>
            )}
          </Flex>
        </Box>
      )}
      {isLoggedIn && (
        <VStack spacing={10} mx={20} alignSelf="baseline">
          <Box width={"full"} mt={10}>
            <PublicTournaments />
          </Box>
          <Flex flexDir={"column"} width="full">
            <OwnerTournament />
            <UserTournaments />
            <Flex mt="12">
              <Carousel />
              {data.length === 0 ? null : (
                <Box width={"100%"} mb="10" ml={20}>
                  <ReviewCarousel />
                </Box>
              )}
            </Flex>
          </Flex>
        </VStack>
      )}
      <Box
        p={5}
        color="text"
        textAlign="right"
        display={"block"}
        position="fixed"
        top="93%"
        right="13px"
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/message/UXBRMBXKCZJ7H1?src=qr"
          aria-label="WhatsApp"
        >
          <svg
            width="45"
            height="45"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
              fill="#25D366"
            />
            <path
              d="M24.7911 37.3525H24.7852C22.3967 37.3517 20.0498 36.7524 17.9653 35.6154L10.4 37.6L12.4246 30.2048C11.1757 28.0405 10.5186 25.5855 10.5196 23.0702C10.5228 15.2017 16.9248 8.79999 24.7909 8.79999C28.6086 8.80164 32.1918 10.2879 34.8862 12.9854C37.5806 15.6828 39.0636 19.2683 39.0621 23.0815C39.059 30.9483 32.6595 37.3493 24.7911 37.3525ZM18.3159 33.0319L18.749 33.2889C20.5702 34.3697 22.6578 34.9415 24.7863 34.9423H24.7911C31.3288 34.9423 36.6499 29.6211 36.6525 23.0807C36.6538 19.9112 35.4212 16.9311 33.1817 14.689C30.9422 12.4469 27.964 11.2115 24.7957 11.2104C18.2529 11.2104 12.9318 16.5311 12.9292 23.0711C12.9283 25.3124 13.5554 27.4951 14.7427 29.3836L15.0248 29.8324L13.8265 34.2095L18.3159 33.0319ZM31.4924 26.154C31.7411 26.2742 31.9091 26.3554 31.9808 26.4751C32.0699 26.6238 32.0699 27.3378 31.7729 28.1708C31.4756 29.0038 30.051 29.764 29.3659 29.8663C28.7516 29.9582 27.9741 29.9965 27.1199 29.725C26.602 29.5607 25.9379 29.3413 25.0871 28.9739C21.7442 27.5304 19.485 24.2904 19.058 23.678C19.0281 23.6351 19.0072 23.6051 18.9955 23.5895L18.9927 23.5857C18.804 23.3339 17.5395 21.6468 17.5395 19.9008C17.5395 18.2582 18.3463 17.3973 18.7177 17.001C18.7432 16.9739 18.7666 16.9489 18.7875 16.926C19.1144 16.569 19.5007 16.4797 19.7384 16.4797C19.9761 16.4797 20.2141 16.4819 20.4219 16.4924C20.4475 16.4937 20.4742 16.4935 20.5017 16.4933C20.7095 16.4921 20.9686 16.4906 21.2242 17.1045C21.3225 17.3407 21.4664 17.691 21.6181 18.0604C21.9249 18.8074 22.264 19.6328 22.3236 19.7522C22.4128 19.9307 22.4722 20.1389 22.3533 20.3769C22.3355 20.4126 22.319 20.4463 22.3032 20.4785C22.2139 20.6608 22.1483 20.7948 21.9967 20.9718C21.9372 21.0413 21.8756 21.1163 21.814 21.1913C21.6913 21.3407 21.5687 21.4901 21.4619 21.5965C21.2833 21.7743 21.0975 21.9672 21.3055 22.3242C21.5135 22.6812 22.2292 23.8489 23.2892 24.7945C24.4288 25.8109 25.4192 26.2405 25.9212 26.4582C26.0192 26.5008 26.0986 26.5352 26.1569 26.5644C26.5133 26.7429 26.7213 26.713 26.9294 26.4751C27.1374 26.2371 27.8208 25.4338 28.0584 25.0769C28.2961 24.7201 28.5339 24.7795 28.8607 24.8984C29.1877 25.0176 30.9408 25.8801 31.2974 26.0586C31.367 26.0934 31.4321 26.1249 31.4924 26.154Z"
              fill="#FDFDFD"
            />
          </svg>
        </a>
      </Box>
    </Container>
  );
}

export default Home;
