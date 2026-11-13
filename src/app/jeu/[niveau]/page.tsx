import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LevelGame } from "@/components/LevelGame";
import { LEVELS, getLevel } from "@/data/game";

interface Props {
  params: Promise<{ niveau: string }>;
}

export function generateStaticParams() {
  return LEVELS.map((level) => ({ niveau: level.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niveau } = await params;
  const level = getLevel(niveau);
  return { title: level ? `Niveau ${level.name}` : "Niveau introuvable" };
}

export default async function LevelPage({ params }: Props) {
  const { niveau } = await params;
  const level = getLevel(niveau);
  if (!level) notFound();

  return <LevelGame levelId={level.id} />;
}
