import localFont from "next/font/local";

export const manrope = localFont({
  adjustFontFallback: "Arial",
  display: "swap",
  src: [
    {
      path: "./Manrope-VariableFont_wght.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});
