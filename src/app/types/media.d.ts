// Typescript does not inherently know how to type SVG imports,
// so we explicity define them here to match the webpack configuration in next.config.ts

declare module "*.svg?inline" {
  import type { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "*.svg" {
  const content: import("next/image").StaticImageData;
  export default content;
}
