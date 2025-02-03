import styled from "styled-components";
import colors from "../styles/colors";
import textStyles from "../styles/text";
import gsap from "gsap";
import { useRef } from "react";
import Icon from "./Icon";

type PrimaryButtonProps = {
  href?: any;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function PrimaryButton({
  href,
  children,
  onClick,
}: PrimaryButtonProps) {
  const plusRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const hoverAnimation = () => {
    const tl = gsap.timeline();
    tl.to(
      plusRef.current,
      {
        x: 0,
        ease: "power1.out",
      },
      0
    );
    tl.to(
      textRef.current,
      {
        x: 20,
        ease: "power2.inOut",
      },
      0
    );
    tl.to(
      dotRef.current,
      {
        scale: 0,
        duration: 0.25,
      },
      0
    );
  };

  const unhoverAnimation = () => {
    const tl = gsap.timeline();
    tl.to(
      plusRef.current,
      {
        x: -50,
        ease: "power1.inOut",
      },
      0
    );
    tl.to(
      textRef.current,
      {
        x: 0,
        ease: "power2.inOut",
      },
      0
    );
    tl.to(
      dotRef.current,
      {
        scale: 1,
        duration: 0.25,
      },
      0.25
    );
  };

  return (
    <Wrapper
      onMouseEnter={hoverAnimation}
      onMouseLeave={unhoverAnimation}
      onClick={onClick}
    >
      <Plus name={"plus"} ref={plusRef} />
      <Inner>
        <InnerText ref={textRef}>{children}</InnerText>
        <DotFilled name="filledDot" ref={dotRef} />
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  position: relative;
  height: 48px;
  width: fit-content;
  border-radius: 32px;
  padding: 12px 20px;
  background-color: ${colors.js.amberGlow};
  display: flex;
  gap: 8px;
  align-items: center;
  overflow: hidden;
  z-index: 1;
  transition: all 0.25s ease;
  border: none;

  &:hover {
    background-color: ${colors.js.oliveGrove};
    cursor: pointer;
  }
`;

const Plus = styled(Icon)`
  width: 15px;
  height: 15px;
  position: absolute;
  transform: translateX(-50px);

  path {
    fill: ${colors.js.charredUmber};
  }
`;

const Inner = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const InnerText = styled.div`
  ${textStyles.bodyL};
  display: inline-block;
  margin-bottom: 2px;
  color: ${colors.js.charredUmber};
  transition: color 0.5s ease;
`;

const DotFilled = styled(Icon)`
  width: 15px;
  height: 15px;

  path {
    fill: ${colors.js.charredUmber};
  }
`;
