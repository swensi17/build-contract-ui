import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const rawBase = import.meta.env.BASE_URL.replace(/\/$/, "");
const basepath = rawBase.length > 0 ? rawBase : undefined;

export function getRouter() {
  return createRouter({
    routeTree,
    basepath,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
