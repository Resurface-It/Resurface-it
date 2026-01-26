import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  resume: f({
    pdf: { maxFileSize: '8MB', maxFileCount: 1 },
    'application/msword': { maxFileSize: '8MB', maxFileCount: 1 },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      maxFileSize: '8MB',
      maxFileCount: 1,
    },
  })
    .onUploadComplete(async ({ file }) => {
      console.log('Resume uploaded:', file.url)
      return { uploadedBy: 'career-applicant' }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
