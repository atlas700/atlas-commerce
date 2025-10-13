import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const customImageRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({}) => {
      const { userId } = await auth();

      if (userId == null) throw new UploadThingError("Unauthorized");

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // const { userId } = metadata;

      return { imageUrl: file.ufsUrl, message: "Successfully uploaded image" };
    }),
} satisfies FileRouter;

export type CustomImageRouter = typeof customImageRouter;
