import { css } from "styled-components";
import { manrope } from "./fonts/typography";

export const transparentText = css`
  /* stylelint-disable-next-line property-no-vendor-prefix  */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-size: 100%;
  background-clip: text;
`;

export const clampText = (lines: number) => css`
  overflow: hidden;
  text-overflow: ellipsis;
  /* stylelint-disable-next-line property-no-vendor-prefix  */
  -webkit-text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lines};
`;

const textStyles = {
  h1: css`
    font-family: ${manrope.style.fontFamily};
    font-style: normal;
    font-size: 50px;
  `,
  h2: css`
    font-family: ${manrope.style.fontFamily};
    font-style: normal;
    font-size: 36px;
  `,
  h3: css`
    font-family: ${manrope.style.fontFamily};
    font-style: normal;
    font-size: 24px;
  `,
  bodyL: css`
    font-family: ${manrope.style.fontFamily};
    font-style: normal;
    font-size: 18px;
  `,
  bodyM: css`
    font-family: ${manrope.style.fontFamily};
    font-style: normal;
    font-size: 14px;
  `,
  bodyS: css`
    font-family: ${manrope.style.fontFamily};
    font-style: normal;
    font-size: 10px;
  `,
};

export default textStyles;
