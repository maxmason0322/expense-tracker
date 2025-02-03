"use client";

import { useEffect, useState } from "react";

// sanity will run in JSDOM, so check for that to ensure we're not running extra code for schema scripts
const isJSDOM =
  typeof window !== "undefined" &&
  window.navigator.userAgent.toLowerCase().includes("jsdom");
const isGithubActions = !!process.env.GITHUB_ACTIONS;
export const isBrowser =
  typeof window !== "undefined" && !isJSDOM && !isGithubActions;

export const isIOS = () => {
  if (!isBrowser) return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  const userAgentMatch = /iphone|ipad|ipod/.test(userAgent);
  const isMacWithTouch =
    userAgent.includes("mac") && navigator.maxTouchPoints > 1;

  return userAgentMatch || isMacWithTouch;
};

export const isAndroid = () => {
  if (!isBrowser) return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return userAgent.includes("android");
};

export const isMobileOS = () => {
  return isIOS() || isAndroid();
};

export const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const isDesktopSafari = () => {
  const isMobile = isMobileOS();

  return !isMobile && isSafari();
};

export const isIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

/**
 * hookify a get function to update after hydration
 */
export const useHookify = (fn: () => boolean) => {
  const [value, setValue] = useState<boolean>();
  useEffect(() => {
    if (isBrowser) setValue(fn());
  }, [fn]);
  return value;
};

export const useIsIOS = () => {
  return useHookify(isIOS);
};

export const useIsAndroid = () => {
  return useHookify(isAndroid);
};

export const useIsMobileOS = () => {
  return useHookify(isMobileOS);
};

export const useIsDesktopSafari = () => {
  return useHookify(isDesktopSafari);
};

export const useIsIframe = () => {
  return useHookify(isIframe);
};
