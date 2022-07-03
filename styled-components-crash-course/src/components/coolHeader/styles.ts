import styled from 'styled-components';
interface CoolHeaderProps {
    bg?: string;
    padding_tb: number;
}
export const StyledCoolHeader = styled.header<CoolHeaderProps>`
    background-color: ${({ bg = "#6f5984" }) => bg};
    padding: ${({ padding_tb }) => padding_tb}px 0;

    h1 {
        color: red;
    }

    &:hover {
        background-color: #7aa2f7;
    }
`;
