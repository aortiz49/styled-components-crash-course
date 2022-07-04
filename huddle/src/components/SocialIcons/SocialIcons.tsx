import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { StyledSocialIcons } from './SocialIcons.styled';
export const SocialIcons = () => {
    return (
        <StyledSocialIcons>
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
        </StyledSocialIcons>
    );
};
