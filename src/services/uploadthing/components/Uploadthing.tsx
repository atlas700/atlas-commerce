"use client";

import { generateUploadDropzone } from "@uploadthing/react";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import type { CustomImageRouter } from "../router";

const UploadDropzoneComponent = generateUploadDropzone<CustomImageRouter>();

export function UploadDropzone({
  className,
  ...props
}: ComponentProps<typeof UploadDropzoneComponent>) {
  return (
    <UploadDropzoneComponent
      {...props}
      className={cn(
        "border-dashed border-2 border-muted rounded-lg flex items-center justify-center",
        className
      )}
    />
  );
}
