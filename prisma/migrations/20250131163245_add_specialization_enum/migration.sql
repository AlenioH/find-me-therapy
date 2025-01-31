/*
  Warnings:

  - The `specialization` column on the `therapists` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Specialization" AS ENUM ('Analytische_Psychologie', 'Autogene_Psychotherapie', 'Daseinsanalyse', 'Dynamische_Gruppenpsychotherapie', 'Existenzanalyse', 'Existenzanalyse_und_Logotherapie', 'Gestalttheoretische_Psychotherapie', 'Gruppenpsychoanalyse', 'Hypnosepsychotherapie', 'Individualpsychologie', 'Integrative_Gestalttherapie', 'Integrative_Therapie', 'Katathym_Imaginative_Psychotherapie', 'Klientenzentrierte_Psychotherapie', 'Konzentrative_Bewegungstherapie', 'Neurolinguistische_Psychotherapie', 'Personenzentrierte_Psychotherapie', 'Psychoanalyse', 'Psychodrama');

-- AlterTable
ALTER TABLE "therapists" DROP COLUMN "specialization",
ADD COLUMN     "specialization" "Specialization"[];
