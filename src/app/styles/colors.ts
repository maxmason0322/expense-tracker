const rawColors = {
  white: ["white"],
  red: ["red", "color(display-p3 1 0 0)"],

  marineTide: ["#42819F"],
  sagebrushGreen: ["#86AA7D"],
  wheatstoneBeige: ["#CBB396"],
  oliveBark: ["#555234"],
  chestnutEarth: ["#4D280F"],

  deepOceanTeal: ["#597475"],
  oceanTeal: ["#7A989A"],
  forestOlive: ["#5F6B52"],
  oliveGrove: ["#849271"],
  tawnySand: ["#9C8C71"],
  desertSand: ["#C1AE8D"],
  burntAmber: ["#A86F2F"],
  amberGlow: ["#CF9546"],
  deepRust: ["#9E4D3B"],
  rustyRose: ["#C67052"],
  charredUmber: ["#1A1A18"],
  ebonySlate: ["#2B2B28"],
  charcoalSlate: ["#4F4F4F"],
  stoneGray: ["#A8A8A8"],
  driftwoodBrown: ["#8C7A70"],
  taupeBeige: ["#B8A89D"],
  parchmentWhite: ["#F5F0E6"],
  creamLinen: ["#ECE1D3"],
  ivoryMist: ["#FAF9F6"],

  skylineBlue: ["#529DCB"],
  sunsetPeach: ["#ECA063"],
  springMeadow: ["#71BF50"],
  goldenHoney: ["#F3CC4F"],
  burntSienna: ["#D46934"],

  royalAzure: ["#4368B6 "],
  mossyGreen: ["#78A153"],
  goldenMustard: ["#DEC23B"],
  amberFlame: ["#E4930A"],
  crimsonEmber: ["#C53211"],

  deepCerulean: ["#2677A5"],
  arcticSky: ["#639BC1"],
  lemongrassGreen: ["#90A74A"],
  fernGreen: ["#5D8722"],
} as const satisfies Record<string, [string, string] | [string]>;

/** widen the type a bit for processing */
const colorEntries: [string, [string, string] | [string]][] =
  Object.entries(rawColors);

/**
 * convert the raw colors to an object with the correct color for the current browser
 */
const CSSColors = Object.fromEntries(
  colorEntries.map(([key]) => {
    return [key, `var(--${key})`];
  })
) as {
  [key in keyof typeof rawColors]: `var(--${key})`;
};

/**
 * gsap can't animate variables, so we need to use the hex always
 */
const jsColors = Object.fromEntries(
  colorEntries.map(([key, [color]]) => {
    return [key, color];
  })
) as {
  [key in keyof typeof rawColors]: (typeof rawColors)[key][0];
};

export default {
  ...CSSColors,
  js: jsColors,
};
