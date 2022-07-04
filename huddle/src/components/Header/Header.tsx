import { Button } from '../StyledButton/Button.styled';
import { Container } from '../StyledContainer/Container.styled';
import { Flex } from '../Flex/Flex.styled';
import {
    Image,
    Logo,
    Nav,
    StyledHeader
    } from './Header.styled';
export const Header = () => {
    return (
        <StyledHeader>
            <Container>
                <Nav>
                    <Logo src="./images/logo.svg" alt=""></Logo>
                    <Button>Try it For Free</Button>
                </Nav>
                <Flex>
                    <div>
                        <h1>Build the Community Your Fans Will Love</h1>
                        <p>
                            Huddle re-imagines the way we build communities. You
                            have a voice, but so does your audience. Create
                            connections with your users as you engage in genuine
                            discussion.
                        </p>

                        <Button bg="#ff0099" color="#fff">
                            Get Started For Free
                        </Button>
                    </div>
                    <Image src="./images/illustration-mockups.svg"></Image>
                </Flex>
            </Container>
        </StyledHeader>
    );
};
