"use client";

import styled from "styled-components";
import Link from "next/link";
import { animated } from "@react-spring/web";
import useBoop from "./hooks/use-boop";
import ArrowRightSVG from "@/app/images/arrow-right.svg?inline";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import HamburgerSVG from "@/app/images/hamburger.svg?inline";
import colors from "./styles/colors";
import Boop from "./components/Boop";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Menu() {
  const [style, trigger] = useBoop({ scale: 0.85 });
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    if (isOpen) {
      tl.to(
        boxRef.current,
        {
          x: 100,
          y: -60,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );
      tl.to(
        box2Ref.current,
        {
          x: 100,
          y: 60,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );
    } else {
      tl.to(
        boxRef.current,
        {
          x: 0,
          y: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );
      tl.to(
        box2Ref.current,
        {
          x: 0,
          y: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );
    }
  }, [isOpen]);

  return (
    // <Wrapper>
    //   <MenuItem onMouseEnter={trigger}>
    //     <Link href="/">Settings</Link>
    //     {/* @ts-expect-error */}
    //     <animated.span style={style}>
    //       <RightArrow />
    //     </animated.span>
    //   </MenuItem>
    //   <Link href="/transactions">Transactions</Link>
    // </Wrapper>
    // <Root>
    //   <DropdownMenu.Trigger asChild>
    //     <Boop scale={0.85}>
    //       <Button>
    //         <Hamburger />
    //       </Button>
    //     </Boop>
    //   </DropdownMenu.Trigger>
    //   <DropdownMenu.Portal>
    //     <DropdownMenu.Content>
    //       <DropdownMenu.Item onMouseEnter={trigger}>
    //         Transactions
    //         {/* @ts-expect-error */}
    //         <animated.span style={style}>
    //           <RightArrow />
    //         </animated.span>
    //       </DropdownMenu.Item>
    //     </DropdownMenu.Content>
    //   </DropdownMenu.Portal>
    // </Root>

    // <Wrapper>
    //   <Goo />
    //   <Box ref={boxRef}></Box>
    //   <Box2 ref={box2Ref}></Box2>
    //   <MenuToggle
    //     onClick={() => {
    //       setIsOpen(!isOpen);
    //     }}
    //   >
    //     Toggle
    //   </MenuToggle>
    // </Wrapper>
    <div>Menu</div>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: auto;
  filter: url("#goo");

  svg {
    height: 500px;
  }
`;

const Box = styled.div`
  position: absolute;
  width: 75px;
  height: 75px;
  top: 53%;
  left: 10px;
  background-color: ${colors.js.amberGlow};
  border-radius: 50px;
`;

const Box2 = styled(Box)`
  background-color: ${colors.js.amberGlow};
  left: 10px;
  border-radius: 50px;
`;

const MenuWrapper = styled.div`
  position: relative;
`;

const MenuItems = styled.ul``;

const MenuItem = styled.li`
  background-color: ${colors.js.rustyRose};
  width: 30px;
  height: 30px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const MenuToggle = styled.div`
  background-color: ${colors.js.amberGlow};
  width: 100px;
  height: 100px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 10px;
`;

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   width: 200px;
//   background-color: white;
//   color: black;
//   height: 100%;
//   position: absolute;
// `;

// const MenuItem = styled.div`
//   display: flex;
//   gap: 10px;
//   align-items: center;
//   width: fit-content;
//   cursor: pointer;
// `;

const RightArrow = styled(ArrowRightSVG)`
  width: 24px;
  height: 24px;
`;

const AnimatedSpan = styled(animated.span)``;

const Button = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.js.oceanTeal};
  border: none;
`;

const Hamburger = styled(HamburgerSVG)`
  width: 16px;
  height: 16px;
`;

const Root = styled(DropdownMenu.Root)`
  position: absolute;
`;
