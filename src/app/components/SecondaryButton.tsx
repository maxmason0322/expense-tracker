import styled from "styled-components";
import colors from "../styles/colors";
import textStyles from "../styles/text";
import gsap from "gsap";
import { useRef } from "react";

type ButtonType = "submit" | "button";

type SecondaryButtonProps = {
  href?: any;
  children: React.ReactNode;
  onClick?: () => void;
  bgColor: string;
  bgColorHover: string;
  type?: ButtonType;
};

export default function SecondaryButton({
  href,
  children,
  onClick,
  bgColor,
  bgColorHover,
  type,
}: SecondaryButtonProps) {
  const textRef = useRef<HTMLDivElement>(null);

  const hoverAnimation = () => {
    const tl = gsap.timeline();
    tl.to(textRef.current, {
      y: -20,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const unhoverAnimation = () => {
    const tl = gsap.timeline();
    tl.to(textRef.current, {
      y: 20,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  return (
    <Wrapper
      type={type}
      onMouseEnter={hoverAnimation}
      onMouseLeave={unhoverAnimation}
      onClick={onClick}
      $bgColor={bgColor}
      $bgColorHover={bgColorHover}
    >
      <Inner ref={textRef}>
        <InnerText>{children}</InnerText>
        <InnerText>{children}</InnerText>
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.button<{ $bgColor: string; $bgColorHover: string }>`
  position: relative;
  height: 36px;
  width: fit-content;
  border-radius: 32px;
  padding: 0 16px;
  background-color: ${(props) => props.$bgColor};
  display: flex;
  align-items: center;
  overflow: hidden;
  z-index: 1;
  transition: all 0.25s ease;
  border: none;

  &:hover {
    background-color: ${(props) => props.$bgColorHover};
    cursor: pointer;
  }
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  transform: translateY(20px);
`;

const InnerText = styled.div`
  ${textStyles.bodyL};
  display: inline-block;
  margin-bottom: 2px;
  color: ${colors.js.charredUmber};
  transition: color 0.5s ease;
  line-height: 70%;
`;
