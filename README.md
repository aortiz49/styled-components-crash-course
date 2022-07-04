<div align="center">
  <a href="https://www.styled-components.com">
    <img alt="styled-components" src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" height="150px" />
  </a>
</div>

<div align="center">
  <strong>Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress.</strong>
</div>

-------

**This is a short crash course on how to use the `styled-components` library.**

This library allows us to create beautifully styled React components. 

## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install foobar.

```bash
yarn add styled-components
```

Add type definitions for `styled-components`:

```bash
yarn add @types/styled-components
```

## Starting Out with styled-components

Instead of having an element with a classname used in a `css` file, with `styled-components` we have an actual component and the style is applied to what between the tag. 

For example: 

```tsx
export const App = () => {
    return (
        <Container>
            <h1>Hello, World.</h1>
        </Container>
    );
};
```

`Container` in this case is what gives the `h1` element its style. 

Create a directoy named `components` and create a directory named `helloWorld`. Inside this directory, create the following two files: `HelloWorld.tsx` and `styles.ts`. 

In `HelloWorld.tsx`, create the following component:

```tsx
// HelloWorld.tsx
export const HelloWorld = () => {
    return (
        <Container>
            <h1>Hello, World.</h1>
        </Container>
    );
};
```

In `styles.ts` we will add the necessary styling to this component. To do this we export a constant and using `styled`, we specify what kind of element it is. Let's create a div with 1000px width, 100% max-width, 0 top and botton padding, 20px left and right padding, 0 top and bottom margin, and auto left and right margins. 

```ts
import styled from 'styled-components';

export const Container = styled.div`
    width: 1000px;
    max-width: 100%;
    padding: 0 20px;
    margin: 0 auto;
`;
```

Let's create a `main.tsx` and place our `HelloWorld` component so we can see out div container style in action. 

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelloWorld } from './components/helloWorld/HelloWorld';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HelloWorld />
    </React.StrictMode>
);
```

So far, we should be able to see the rendered div on the app's main page.  If that's the case, let's add another component to `main.tsx`. 

Create a functional component inside its own folder and name ir `CoolHeader` :

```tsx
// CoolHeader.tsx
export const CoolHeader = () => {
    return <h1>I am a cool header 😎</h1>;
};
```

Add the following style to this component using `styled-components` :

```ts
import styled from 'styled-components';

export const StyledCoolHeader = styled.header`
    background-color: #6f5984;
    padding: 40px 0;
`;
```

Now, add the style to the `CoolHeader` component created above and then add it to `main.tsx`:

```tsx
// CoolHeader.tsx
import { StyledCoolHeader } from './styles';

export const CoolHeader = () => {
    return (
        <StyledCoolHeader>
            <h1>I am a cool header 😎</h1>
        </StyledCoolHeader>
    );
};
```

## Nested Styles

In our stylesheet for `CoolHeader` lets add a nested style for the `h1` element:

I want this header to have a red text color and for the background color to change on hover to blue.  (without going in depth, we use the `&` to manage the hover aspect.)

```ts
import styled from 'styled-components';

export const StyledCoolHeader = styled.header`
    background-color: #6f5984;
    padding: 40px 0;

    h1 {
        color: red;
    }

    &:hover {
        background-color: #7aa2f7;
    }
`;
```

## Props

If we want to pass props that modify the style of the component we can add them as usual to the component as follows:

```ts
<StyledCoolHeader bg="#96F4FF">
```

Since we are in TypeScript, we cannot pass the above prop without declaring an interface in the style definition. (See [styled-components: API Reference](https://styled-components.com/docs/api#using-custom-props) )

Let's image the two props we want to give our `CoolHeader` are `bg` to set the background-color and `padding_tb` to set the padding on top and bottom. 

Add the following interface to the style definitions to `CoolHeader` so that the `bg` prop is optional but the `paddinbg_tb` prop is mandatory.

```ts
interface CoolHeaderProps {
    bg?: string;
    padding_tb: number;
}
```

Now that the types of our props are known, we have to specify that we are using these types. Modify the definition so it resembles this:

```ts
export const StyledCoolHeader = styled.header<CoolHeaderProps>
`...`
```

To use the props, we must access them via arrow functions. There are two ways:

1. Accessing the properties from the `props` argument
   
   ```tsx
   padding: ${(props) => props.padding_tb}px 0;
   ```

2. Destructuring the property directly
   
   ```tsx
   padding: ${({ padding_tb }) => padding_tb}px 0;
   ```

Now, the way I like to handle optional properties is with the ternary operator. I want the background-color to be whatever matches the prop that was passed in or if no prop was passed, I want the background-color to be `#6f5984`. I can also do this using either of the two methods shown above:

1. Accessing the properties from the `props` argument
   
   ```tsx
   background-color: ${(props) => (props.bg ? props.bg : "#6f5984")};
   ```

2. Destructuring the property directly
   
   ```tsx
   background-color: ${({ bg = "#6f5984" }) => bg};
   ```

## Themes

styled-components has full theming support by exporting a `<ThemeProvider>` wrapper component.
This component provides a theme to all React components underneath itself via the context API. In the render tree all styled-components will have access to the provided theme, even when they are multiple levels deep.

Let's add a theme to the main app. Create a `const` called `theme` above the root render:

```tsx
const niceTheme = {
    colors: {
        header: "#507a89",
        body: "#fff",
        footer: "#003333",
    },
};
```

Wrap everything in the theme with the `<ThemeProvider>` tag and pass in the `niceTheme` const as a `theme` prop:

```tsx
<ThemeProvider theme={niceTheme}>
    <CoolHeader />
    <HelloWorld />
</ThemeProvider>
```

Now, in the `CoolHeader` styled component, instead of having a style prop such as `bg` being passed directly in, we can now access anything that we want from the theme through props like this:

```tsx
background-color: ${({ theme }) => theme.colors.header};
```

## Global Styles

To add a global style for common elements, let's create a file named `GlobalStyles.ts` in the root directory. Inside this styled component, we can add styles that are considered to be global:

```tsx
// GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

`;
```

Here is an example of a global style:

```ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;700');

    * {
    box-sizing: border-box;
    };

    body{
        background:#0b0b0b;
        color:hsl(192,100%,9%);
        font-family:'Crimson+Pro',sans-serif;
        font-size:1.15em;
        margin:0;
    };

    p{
        opacity:0.6;
        line-height:1.5;
    };
    img{
        max-width:100%
        };
`;

export default GlobalStyles;
```

Now, in the main app we can import this and add the `GlobalStyles` style component:

```tsx
<ThemeProvider theme={niceTheme}>
    <>
        <GlobalStyles />
        <CoolHeader />
        <HelloWorld />
    </>
</ThemeProvider>
```

This is one way to make a theme switcher or if you want to have different themes depending on the situtation. 

## Example Project

We will be building and styling a UI clone of the Huddle app. For this I will create a new react project called huddle.

Copy the `public` folder in this repo and place it in your own project. This contains the icon and the images used in our project. 

Delete everything in the `src` directory except for `main.tsx`, `favicon.svg` and `logo.svg`. 

Replace `main.tsx` with the following code:

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

Now, create the `components` directory. Add a directory `StyledContainer` for the styled div we are about to create. In a file called `Container.styled.ts` add the following style:

```tsx
// styles.ts
import styled from 'styled-components';

export const Container = styled.div`
    width: 1000px;
    max-width: 0 20px;
    margin: 0 auto;
`;
```

Add a directory `StyledHeader` for the styled-component. 

In a file called `Header.styled.ts` in this directory, add the following styled component:

```tsx
// styles.ts
import styled from 'styled-components';

export const StyledHeader = styled.header`
    background-color: #ebfbff;
    padding: 40px 0;
`;
```

Let's now add the following code to `Header.tsx`:

```tsx
import { StyledHeader } from './Header.styled';

export const Header = () => {
    return (
        <StyledHeader>
            <Container>
                <h1>Hubble</h1>
            </Container>
        </StyledHeader>
    );
};
```

To add the icon, be sure to add the following HTML line to the `head` element:

```html
<link rel="icon" href="./public/favicon.ico" />
```

For the navigation, let's create a styled component called `Nav` inside `Header.styled.ts` which will represent our navigation bar. 

```ts
// Header.styled.ts
export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
`;
```

Since we will have a button in differnt parts of our app, lets create a directory called `StyledButton` where we will place our functional component and styled component. In `Button.styled.ts` add the following styled component:

```ts
import styled from 'styled-components';
interface ButtonProps {
    bg?: string;
    color?: string;
}

export const Button = styled.button<ButtonProps>`
    border-radius: 50px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    padding: 15px 60px;
    background-color: ${({ bg }) => bg || "#ffffff"};
    color: ${({ color }) => color || "#333333"};

    &:hover {
        opacity: 0.9;
        transform: scale(0.98);
    }
`;
```

Since we're using the same flex box is many different parts, it's convenient to create this utility styled component. Create a styled component named `Flex` like we did previously (in its own directory). This should be the style in `Flex.styled.ts`:

```ts
import styled from 'styled-components';

export const Flex = styled.div`
    display: flex;
    align-items: center;

    & > div,
    & > ul {
        flex: 1;
    }
`;
```

So far, `Header.tsx` should look like this:

```tsx
import { Button } from '../StyledButton/Button.styled';
import { Container } from '../StyledContainer/Container.styled';
import { Flex } from '../Flex/Flex.styled';
import { Logo, Nav, StyledHeader } from './Header.styled';
export const Header = () => {
    return (
        <StyledHeader>
            <Container>
                <Nav>
                    <Logo src="../../../public/images/logo.svg" alt=""></Logo>
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
                </Flex>
            </Container>
        </StyledHeader>
    );
};
```

I want to add an image now, so let's create a styled component for images.However, since I will only use this in the header, I'll add the Image styled component in `Header.styled.ts`:

```ts
export const Image = styled.img`
    width: 375px;
    margin-left: 40px;
`;
```

Now, add the image to `Header` after the `div`:

```html
<Image src="../../../public/images/illustration-mockups.svg"></Image>
```

#### Adding Fonts

Before we continue, let's take a look at how to add a specific font using Google Fonts. 

1. Go to [Google Fonts](https://fonts.google.com).
2. Select the font family you want. (I'll select Raleway)
3. Add the styles you want. (I'll select `Thin 100` and `Regular 400`)
4. This generates an `@import` 
   
   ```tsx
   @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;400&display=swap');
   ```
5. Now, create a global style like this:

```tsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;400&display=swap');
  * {
    box-sizing: border-box;
  }
  
  body {
    background:#fff;
    color:hsl(192,100%,9%);
    font-family: 'Raleway', sans-serif;  
    font-size: 1.15em;
    margin:0
  }

    `;

export default GlobalStyle;
```

Finally, wrap the code in this global style:

```tsx
export const App = () => {
    return (
        <>
            <GlobalStyle />
            <Header />
            <Container>
                <h1>Hello World</h1>
            </Container>
        </>
    );
};
```

In individual components, you can use the`font-weight` property to set it to `100` or `400`. If you import more styles with more weights, you can select from those as well. 



Continuing, let's make some of the styled components responsive by adding `@media` queries. To do this, let's add the following theme: 

```tsx
const theme = {
    colors: {
        header: "#ebfbff",
        body: "#fff",
        footer: "#003333",
    },
    mobile: "768px",
};


export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyle />
                <Header />
                <Container>
                    <h1>Hello World</h1>
                </Container>
            </>
        </ThemeProvider>
    );
};
```

Since in this case, we'll only have one media constraint, we can add it here so that we don't have to change it in every styled component we use it in. 

Returning to the `Header` styled component, add the following media queries:

```tsx
import styled from 'styled-components';

export const StyledHeader = styled.header`
    background-color: #ebfbff;
    padding: 40px 0;
`;

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: column;
    }
`;

export const Logo = styled.img`
    @media (max-width: ${({ theme }) => theme.mobile}) {
        margin-bottom: 40px;
    }
`;

export const Image = styled.img`
    width: 375px;
    margin-left: 40px;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        margin: 40px 0 30px;
    }
`;
```

In the `Flex`  styled component:

```tsx
import styled from 'styled-components';

export const Flex = styled.div`
    display: flex;
    align-items: center;

    & > div,
    & > ul {
        flex: 1;
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: column;
        text-align: center;
    }
`;
```

Let's add content cards. Add the following content array to the `src` directory in a file called `content.ts`. 

```ts
const content = [
  {
    id: 1,
    title: 'Grow Together',
    body: 'Generate meaningful discussions with your audience and build a strong, loyal community. Think of the insightful conversations you miss out on with a feedback form.',
    image: 'illustration-grow-together.svg',
  },
  {
    id: 2,
    title: 'Flowing Conversations',
    body: "You wouldn't paginate a conversation in real life, so why do it online? Our threads have just-in-time loading for a more natural flow.",
    image: 'illustration-flowing-conversation.svg',
  },
  {
    id: 3,
    title: 'Your Users',
    body: "It takes no time at all to integrate Huddle with your app's authentication solution. This means, once signed in to your app, your users can start chatting immediately.",
    image: 'illustration-your-users.svg',
  },
]

export default content
```

Now we will map through this content array and add a card for each one. For now we will display the title of each content item.

```tsx
<ThemeProvider theme={theme}>
    <>
        <GlobalStyle />
        <Header />
        <Container>
            {content.map((item, index) => (
                <p>{item.title}</p>
            ))}
        </Container>
    </>
</ThemeProvider>
```

Let's go ahead and create the `Card` functional component so we can show the information in each content item. 

```tsx
import React from 'react';

type Card = {
    item: {
        id: number;
        title: string;
        body: string;
        image: string;
    };
};

export const Card = ({ item }: Card) => {
    return (
        <div>
            <div>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
            </div>

            <div>
                <img src={`./images/${item.image}`} alt="" />
            </div>
        </div>
    );
};
```

Now, add the `Card` component to `App` to show the content item's info:

```tsx
<Container>
    {content.map((item) => (
        <Card key={item.id} item={item}></Card>
    ))}
</Container>
```

We should now see the content with the images. However, these aren't styled. Let's add a `Card.styled.ts` styled component:

```tsx
import styled from 'styled-components';

export const StyledCard = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    margin: 40px 0;
    padding: 60px;
    flex-direction: row-reverse;

    img {
        width: 80%;
    }

    & > div {
        flex: 1;
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: column;
    }
`;
```

Now, modify the `Card` functional component so that it has the `StyledCard` style:

```tsx
<StyledCard>
    <div>
        <h2>{item.title}</h2>
        <p>{item.body}</p>
    </div>

    <div>
        <img src={`./images/${item.image}`} alt="" />
    </div>
</StyledCard>
```

We now see the images next to the body and title and it changes to a vertical view on smaller screens. Let's alternate the order in which the image appears on even cards so that if the card is even, the image shows up before the body.

Change the first line of the return tsx to:

```tsx
<StyledCard layout={item.id % 2 == 0 ? "row-reverse" : "row"}>
```

This uses the ternary operator to return "row-reverse" if the id is even or "row" if the id is odd.

In the `StyledCard` styled component, change the `flex-direction` property to the following:

```tsx
flex-direction: ${({ layout }) => layout};
```

Finally, add the footer:

```tsx
import React from 'react';
import { Container } from '../StyledContainer/Container.styled';
import { Flex } from '../Flex/Flex.styled';

export const Footer = () => {
    return (
        <div>
            <Container>
                <img src="./images/logo_white.svg" alt="" />

                <Flex>
                    <ul>
                        <li>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua
                        </li>
                        <li>+1-543-123-4567</li>
                        <li>example@huddle.com</li>
                    </ul>
                    <ul>
                        <li>About Us</li>
                        <li>What We Do</li>
                        <li>FAQ</li>
                    </ul>

                    <ul>
                        <li>Career</li>
                        <li>Blog</li>
                        <li>Contact Us</li>
                    </ul>
                    {/* Social Icons */}
                </Flex>
                <p>&copy; 2021 Huddle. All rights reserved.</p>
            </Container>
        </div>
    );
};
```

Add the footer to `App` after `Container`. To wrap things up add a styled footer. 

```tsx
import styled from 'styled-components';

export const StyledFooter = styled.footer`
    background-color: ${({ theme }) => theme.colors.footer};
    color: #fff;
    padding: 100px 0 60px;
    ul {
        list-style-type: none;
    }
    ul li {
        margin-bottom: 20px;
    }
    p {
        text-align: right;
    }
    @media (max-width: ${({ theme }) => theme.mobile}) {
        text-align: center;
        ul {
            padding: 0;
        }
        p {
            text-align: center;
        }
    }
`;
```

Replace the `div` in Footer with `StyledDiv`. Now create a SocialIcons component.

In this component. we will add icons so be sure to install the package:

```bash
yarn add react-icons
```

```tsx
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
export const SocialIcons = () => {
    return (
        <div>
            <li>
                <a href="https:twitter.com">
                    <FaTwitter />
                </a>
                <a href="https:facebook.com">
                    <FaFacebook />
                </a>{" "}
                <a href="https:linkedin.com">
                    <FaLinkedin />
                </a>
            </li>
        </div>
    );
};
```

Add this to Footer.

Now, create the styled component to style the icons:

```tsx
import styled from 'styled-components';

export const StyledSocialIcons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    li {
        list-style: none;
    }
    a {
        border: 1px solid #fff;
        border-radius: 50%;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        height: 40px;
        width: 40px;
        text-decoration: none;
    }
`;
```

Then, in the `SocialIcons` functional component, add the style. 
