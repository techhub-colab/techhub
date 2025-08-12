-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();
