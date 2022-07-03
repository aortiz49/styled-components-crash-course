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
   background-color: ${({ bg = "#6f5984" }) => bg};
   ```
2. ```tsx
   background-color: ${({ bg }) => (bg ? bg : "#6f5984")};
   ```


