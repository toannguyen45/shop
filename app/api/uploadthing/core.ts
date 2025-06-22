import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
// import { auth } from '@/auth';

const f = createUploadthing();

const auth = (
  // req: Request
) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB" },
  })
    .middleware(async (
      // { req }
    ) => {
      // const session = await auth();
      // if (!session) throw new UploadThingError('Unauthorized');
      // return { userId: session?.user?.id };
      // This code runs on your server before upload
      const user = await auth();
      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
