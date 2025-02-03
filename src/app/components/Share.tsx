import React, { useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import styled from "styled-components";
import Goo from "./Goo";
import TrashSVG from "@/app/images/trash.svg?inline";
import Icon, { type IconType } from "./Icon";
import colors from "../styles/colors";

interface ShareMenuProps {
  shareItems: {
    id: number;
    icon: IconType;
    href: string;
  }[];
}

export default function ShareMenu({
  shareItems = [
    { id: 0, icon: "share", href: "#" },
    { id: 1, icon: "share", href: "#" },
    { id: 2, icon: "share", href: "#" },
    { id: 3, icon: "share", href: "#" },
  ],
}: ShareMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  // const shareButtonRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const shareButton1Ref = useRef<HTMLLIElement>(null);
  const shareButton2Ref = useRef<HTMLLIElement>(null);
  const shareButton3Ref = useRef<HTMLLIElement>(null);
  const shareButton4Ref = useRef<HTMLLIElement>(null);

  const spacing = 100;
  const buttonsMid = Math.floor(shareItems.length / 2);

  // const setShareButtonRef = useCallback(
  //   (index: number) => (el: HTMLAnchorElement | null) => {
  //     shareButtonRefs.current[index] = el;
  //   },
  //   []
  // );

  const toggleShareMenu = () => {
    const tl = gsap.timeline();
    const toggleButton = toggleButtonRef.current;

    if (!toggleButton) return;

    if (!menuOpen) {
      // Open animation
      tl.to(
        toggleButton,
        {
          scale: 0.6,
          duration: 2.8,
          ease: "elastic.out(1.1, 0.6)",
        },
        0.1
      );

      tl.to(
        shareButton1Ref.current,
        {
          x: -100,
          scale: 0.6,
          duration: 3.3,
          ease: "elastic.out(1.01, 0.5)",
        },
        0
      );

      // tl.to(shareButton2Ref.current, {});

      // Animate share buttons
      // shareButtonRefs.current.forEach((button, i) => {
      //   if (!button) return;

      //   const pos = i - buttonsMid;
      //   const adjustedPos = pos >= 0 ? pos + 1 : pos;
      //   const dist = Math.abs(adjustedPos);

      //   timeline.to(
      //     button,
      //     {
      //       x: adjustedPos * spacing,
      //       scale: 0.6,
      //       duration: 1.1 * dist,
      //       ease: "elastic.out(1.01, 0.5)",
      //     },
      //     0
      //   )
      //   .fromTo(
      //     button,
      //     { scale: 0.95 },
      //     {
      //       scale: 0.6,
      //       duration: 0.8,
      //       delay: 0.2 * dist - 0.1,
      //       ease: "elastic.out(1.1, 0.6)",
      //     }
      //   );
      // });
    } else {
      // Close animation
      tl.to(toggleButton, {
        scale: 1,
        duration: 1.4,
        delay: 0.1,
        ease: "elastic.out(1.1, 0.3)",
      });

      // shareButtonRefs.current.forEach((button, i) => {
      //   if (!button) return;

      //   const pos = i - buttonsMid;
      //   const adjustedPos = pos >= 0 ? pos + 1 : pos;
      //   const dist = Math.abs(adjustedPos);

      //   timeline.to(button, {
      //     x: 0,
      //     scale: 0.95,
      //     duration: 0.4 + (buttonsMid - dist) * 0.1,
      //     ease: "quad.inOut",
      //   });
      // });
    }

    setMenuOpen(!menuOpen);
  };

  return (
    <Wrapper>
      <Content>
        <Goo />
        <Toggle ref={toggleButtonRef} onClick={toggleShareMenu}>
          toggle
        </Toggle>
        <ShareItems>
          {/* {shareItems.map((item, index) => (
            <ShareItem key={item.id}>
              <ShareButton href={item.href} ref={setShareButtonRef(index)}>
                <Share name={item.icon} />
              </ShareButton>
            </ShareItem>
          ))} */}
          <ShareItem ref={shareButton1Ref}>
            <ShareButton href="#">
              <Share name="share" />
            </ShareButton>
          </ShareItem>
          {/* <ShareItem ref={shareButton2Ref}>
            <ShareButton href="#">
              <Share name="share" />
            </ShareButton>
          </ShareItem>
          <ShareItem ref={shareButton3Ref}>
            <ShareButton href="#">
              <Share name="share" />
            </ShareButton>
          </ShareItem>
          <ShareItem ref={shareButton4Ref}>
            <ShareButton href="#">
              <Share name="share" />
            </ShareButton>
          </ShareItem> */}
        </ShareItems>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
`;

const Content = styled.div`
  max-width: 600px;
  height: 300px;
  margin: 0 auto;
  -webkit-filter: url("#goo");
  filter: url("#goo");
  position: relative;
`;

const Toggle = styled.button`
  position: absolute;
  display: inline-block;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  line-height: 80px;
  margin-left: -40px;
  margin-top: -40px;
  text-align: center;
  color: #fff;
  border: none;
  outline: none;
  z-index: 9;
  background: #666;
  font-size: 20px;
`;

const ShareItems = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
`;

const ShareItem = styled.li`
  display: inline-block;
`;

const ShareButton = styled.a`
  display: inline-block;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  line-height: 80px;
  margin-left: -40px;
  margin-top: -40px;
  text-align: center;
  border: none;
  outline: none;
  font-size: 30px;
  background: #737070;
  -webkit-transform: scale(0.95, 0.95);
  transform: scale(0.95, 0.95);
  color: #222;

  &:hover {
    color: #dfd7d7;
  }

  &:focus {
    color: #dfd7d7;
  }
`;

const Share = styled(Icon)`
  width: 30px;
  height: 30px;
`;
