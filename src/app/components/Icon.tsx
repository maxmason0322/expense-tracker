import { forwardRef, SVGProps } from "react";

import ArrowRightSVG from "@/app/images/arrow-right.svg?inline";
import DotFilledSVG from "@/app/images/dot-filled.svg?inline";
import EditSVG from "@/app/images/edit.svg?inline";
import HamburgerSVG from "@/app/images/hamburger.svg?inline";
import PlusSVG from "@/app/images/plus.svg?inline";
import TrashSVG from "@/app/images/trash.svg?inline";
import ShareSVG from "@/app/images/share.svg?inline";

const iconMap = {
  rightArrow: ArrowRightSVG,
  filledDot: DotFilledSVG,
  edit: EditSVG,
  hamburger: HamburgerSVG,
  plus: PlusSVG,
  trash: TrashSVG,
  share: ShareSVG,
};

export type IconType = keyof typeof iconMap;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconType;
  className?: string;
}

const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { name, className = "", ...rest } = props;
  const Svg = iconMap[name];
  return <Svg ref={ref} className={className} {...rest} />;
});

Icon.displayName = "Icon";

export default Icon;
