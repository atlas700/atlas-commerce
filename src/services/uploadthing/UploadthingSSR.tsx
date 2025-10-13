import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { connection } from "next/server";
import { Suspense } from "react";
import { extractRouterConfig } from "uploadthing/server";
import { customImageRouter } from "./router";

export function UploadthingSSR() {
  return (
    <Suspense>
      <UTSSR />
    </Suspense>
  );
}

async function UTSSR() {
  await connection();
  return (
    <NextSSRPlugin routerConfig={extractRouterConfig(customImageRouter)} />
  );
}
