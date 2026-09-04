"use client";

import React from "react";
import Link from "next/link";
import {
  Check,
  Calendar,
  Building2,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileCheck2,
  FileText,
  Briefcase,
  BookOpen,
  Mail,
  Share2,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StepItem } from "./procedure-stepper-sidebar";

export interface OpportunityItem {
  id: string;
  title: string;
  hospital: string;
  location: string;
  country: string;
  specialty: string;
  deadline?: Date | string | null;
  requirements: string[];
  contactEmail?: string | null;
}

export interface ProcedureData {
  id: string;
  slug: string;
  title: string;
  description: string;
  country: string;
  category: string;
  steps: StepItem[];
}

interface ProcedureMainPanelProps {
  procedure: ProcedureData;
  activeStep: StepItem;
  completedStepIds: string[];
  opportunities: OpportunityItem[];
  isPending: boolean;
  onToggleStep: (stepId: string) => void;
  onSelectStep: (stepId: string) => void;
  onOpenMobileMenu?: () => void;
}

export function ProcedureMainPanel({
  procedure,
  activeStep,
  completedStepIds,
  opportunities,
  isPending,
  onToggleStep,
  onSelectStep,
  onOpenMobileMenu,
}: ProcedureMainPanelProps) {
  const completedSet = new Set(completedStepIds);
  const isCurrentStepCompleted = completedSet.has(activeStep.id);
  const totalSteps = procedure.steps.length;
  const completedCount = procedure.steps.filter((s) => completedSet.has(s.id)).length;
  const progressPercentage = Math.round(
    totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0
  );

  const currentIndex = procedure.steps.findIndex((s) => s.id === activeStep.id);
  const prevStep = currentIndex > 0 ? procedure.steps[currentIndex - 1] : null;
  const nextStep =
    currentIndex < procedure.steps.length - 1
      ? procedure.steps[currentIndex + 1]
      : null;

  return (
    <div className="flex-1 min-w-0 space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-text-muted">
          <nav className="flex items-center gap-1.5 font-medium">
            <Link
              href="/editor"
              className="hover:text-text-primary transition-colors duration-150"
            >
              Procédures
            </Link>
            <span>&rsaquo;</span>
            <span className="text-text-muted">{procedure.category}</span>
            <span>&rsaquo;</span>
            <span className="text-text-primary font-semibold truncate max-w-[240px]">
              {procedure.title}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            {onOpenMobileMenu && (
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenMobileMenu}
                className="lg:hidden text-xs h-8 gap-1.5 border-border-default"
              >
                <span>Étapes ({completedCount}/{totalSteps})</span>
              </Button>
            )}
            <Button
              variant="outline"
              size="icon-sm"
              className="border-border-default text-text-muted hover:text-text-primary"
              title="Enregistrer"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              className="border-border-default text-text-muted hover:text-text-primary"
              title="Partager"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Big Procedure Title & Metadata */}
        <div className="space-y-2.5">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text-primary leading-tight">
            {procedure.title}
          </h1>

          <p className="text-sm text-text-muted leading-relaxed max-w-3xl">
            {procedure.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge variant="accent" className="text-xs">
              {procedure.country}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {procedure.category}
            </Badge>
            <Badge variant="muted" className="text-xs">
              {totalSteps} étapes séquentielles
            </Badge>
          </div>
        </div>
      </div>

      {/* Informations importantes avant de commencer (Faithfully matching Image 3) */}
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 dark:bg-amber-950/20 dark:border-amber-800/40 p-5 space-y-3 shadow-2xs">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-semibold text-sm">
          <div className="h-6 w-6 rounded-full bg-amber-200/60 dark:bg-amber-800/50 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-700 dark:text-amber-300" />
          </div>
          <span>Informations importantes avant de commencer</span>
        </div>

        <ul className="text-xs text-amber-950/80 dark:text-amber-300/80 space-y-1.5 pl-8 list-disc">
          <li>
            <strong className="text-amber-950 dark:text-amber-200">Durée :</strong> Limitez vos prévisions de séjour à la durée stricte de l&apos;événement ou du stage initial.
          </li>
          <li>
            <strong className="text-amber-950 dark:text-amber-200">Cohérence :</strong> Les dates de logement, réservations de transport et d&apos;assurance doivent être parfaitement identiques.
          </li>
          <li>
            <strong className="text-amber-950 dark:text-amber-200">Finances :</strong> Justifiez clairement vos ressources ou présentez une attestation de prise en charge hospitalière.
          </li>
          <li>
            <strong className="text-amber-950 dark:text-amber-200">Passeport :</strong> Valide au moins 3 à 6 mois après la date de retour prévue.
          </li>
        </ul>
      </div>

      {/* Global Progress Card */}
      <Card className="rounded-2xl border border-border-default bg-bg-surface shadow-xs overflow-hidden">
        <CardContent className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-base font-semibold text-text-primary">
                  Progression globale du dossier
                </h3>
                {progressPercentage === 100 && (
                  <Badge variant="success" className="text-xs">
                    Complet
                  </Badge>
                )}
              </div>
              <p className="text-xs text-text-muted">
                Suivez en temps réel la complétion de vos pièces justificatives.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="font-heading text-2xl font-bold text-accent-primary">
                  {progressPercentage}%
                </span>
                <div className="text-[11px] text-text-muted">
                  {completedCount} sur {totalSteps} validées
                </div>
              </div>
            </div>
          </div>

          <Progress value={progressPercentage} className="h-2.5" />
        </CardContent>
      </Card>

      {/* Active Step Highlight Banner (Faithfully matching Image 3) */}
      <div className="rounded-2xl bg-gradient-to-r from-[#2e1065] via-[#3b0764] to-[#1e1b4b] text-white p-5 sm:p-6 shadow-md flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="text-[11px] font-mono tracking-wider text-purple-200/80 uppercase font-semibold">
            ÉTAPE {activeStep.order} SUR {totalSteps} &bull; {activeStep.isRequired ? "DOCUMENT MAÎTRE" : "DÉMARCHE"}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {activeStep.title}
          </h2>
        </div>

        <div>
          <button
            type="button"
            disabled={isPending}
            onClick={() => onToggleStep(activeStep.id)}
            className={cn(
              "px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs",
              isCurrentStepCompleted
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-white text-zinc-900 hover:bg-zinc-100"
            )}
          >
            <Check className="h-4 w-4 stroke-[3]" />
            <span>{isCurrentStepCompleted ? "Étape Validée" : "Valider l'Étape"}</span>
          </button>
        </div>
      </div>

      {/* Conditional 16:9 Responsive Media Container */}
      {activeStep.videoUrl && (
        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-border-default shadow-sm bg-black relative">
          <iframe
            src={activeStep.videoUrl}
            title={activeStep.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      )}

      {/* Main Tabs Navigation */}
      <Tabs defaultValue="summary" className="w-full space-y-6">
        <TabsList className="bg-bg-surface border border-border-default p-1 rounded-xl w-full sm:w-auto justify-start flex-wrap">
          <TabsTrigger value="summary" className="text-xs gap-1.5 font-medium">
            <FileText className="h-3.5 w-3.5" />
            <span>Détails &amp; Liens</span>
          </TabsTrigger>
          <TabsTrigger value="checklist" className="text-xs gap-1.5 font-medium">
            <FileCheck2 className="h-3.5 w-3.5" />
            <span>Checklist d&apos;étape</span>
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="text-xs gap-1.5 font-medium">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Opportunités &amp; Congrès ({opportunities.length})</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="text-xs gap-1.5 font-medium">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Ressources Officielles</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Détails & Liens utiles (Matching Image 3 Dual Box layout) */}
        <TabsContent value="summary" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left box: Description / Synthèse */}
            <div className="lg:col-span-2 rounded-2xl border border-border-default bg-bg-surface p-6 space-y-4 shadow-xs">
              <div className="space-y-2">
                <h3 className="font-heading text-sm font-semibold text-text-primary">
                  Description de la démarche
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {activeStep.description}
                </p>
              </div>

              {activeStep.content && (
                <div className="p-4 rounded-xl bg-bg-base border border-border-default/80 space-y-2">
                  <h4 className="font-heading text-xs font-semibold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-accent-primary" />
                    <span>Instructions et directives spécifiques</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-text-primary leading-relaxed whitespace-pre-line">
                    {activeStep.content}
                  </p>
                </div>
              )}
            </div>

            {/* Right box: Ressources & Liens utiles (Image 3) */}
            <div className="rounded-2xl border border-border-default bg-bg-surface p-6 space-y-4 shadow-xs">
              <div className="text-xs font-bold text-text-primary uppercase tracking-wider">
                Ressources &amp; Liens utiles
              </div>

              <div className="space-y-2.5">
                <a
                  href="https://france-visas.gouv.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3 rounded-xl border border-border-default bg-bg-base hover:bg-accent-primary/10 hover:border-accent-primary/50 transition-all flex items-center justify-between text-xs font-semibold text-text-primary"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="h-3.5 w-3.5 text-accent-primary" />
                    <span>Portail Officiel Visas</span>
                  </span>
                </a>

                <a
                  href="https://www.bag.admin.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3 rounded-xl border border-border-default bg-bg-base hover:bg-accent-primary/10 hover:border-accent-primary/50 transition-all flex items-center justify-between text-xs font-semibold text-text-primary"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="h-3.5 w-3.5 text-accent-primary" />
                    <span>Sociétés Savantes &amp; OFSP</span>
                  </span>
                </a>

                <a
                  href="mailto:contact@medprocedure.com?subject=Assistance dossier"
                  className="w-full p-3 rounded-xl border border-border-default bg-bg-base hover:bg-accent-primary/10 hover:border-accent-primary/50 transition-all flex items-center justify-between text-xs font-semibold text-text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-accent-primary" />
                    <span>Support Médical Dédié</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Checklist & Validation */}
        <TabsContent value="checklist" className="space-y-6 mt-0">
          <Card className="rounded-2xl border border-border-default bg-bg-surface shadow-xs">
            <CardHeader className="p-5 sm:p-6 pb-3 border-b border-border-default">
              <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-accent-primary" />
                <span>Checklist de validation</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-4">
              <div
                className={cn(
                  "p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer",
                  isCurrentStepCompleted
                    ? "bg-state-success/5 border-state-success/30 shadow-xs"
                    : "bg-bg-surface border-border-default hover:border-accent-primary/50"
                )}
                onClick={() => !isPending && onToggleStep(activeStep.id)}
              >
                <Checkbox
                  checked={isCurrentStepCompleted}
                  onCheckedChange={() => onToggleStep(activeStep.id)}
                  disabled={isPending}
                  className="mt-0.5"
                />
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-text-primary flex items-center gap-2">
                    <span>Valider l&apos;étape {activeStep.order} : {activeStep.title}</span>
                    {isCurrentStepCompleted && (
                      <span className="text-xs text-state-success font-medium flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Validée en base
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Marquez cette étape comme accomplie. La progression globale de votre dossier sera mise à jour instantanément.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Opportunités hospitalières et congrès (Image 2) */}
        <TabsContent value="opportunities" className="space-y-4 mt-0">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-base font-semibold text-text-primary">
              Événements, Congrès &amp; Postes Associés
            </h3>
            <span className="text-xs text-text-muted">
              {opportunities.length} opportunité{opportunities.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opportunities.map((opp) => (
              <Card
                key={opp.id}
                className="rounded-2xl border border-border-default bg-bg-surface hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
              >
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="accent" className="text-xs">
                      {opp.specialty}
                    </Badge>
                    {opp.deadline && (
                      <Badge variant="muted" className="text-[11px] gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(opp.deadline).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base font-bold text-text-primary pt-2">
                    {opp.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-4">
                  <div className="space-y-1.5 text-xs text-text-muted">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5 text-accent-primary shrink-0" />
                      <span className="font-medium text-text-primary">
                        {opp.hospital}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-text-muted shrink-0" />
                      <span>
                        {opp.location}, {opp.country}
                      </span>
                    </div>
                  </div>

                  {opp.requirements.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold text-text-primary uppercase tracking-wider">
                        Inclusions &amp; Accompagnement
                      </div>
                      <ul className="space-y-1 text-xs text-text-muted">
                        {opp.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="h-3.5 w-3.5 text-state-success shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 border-t border-border-default flex items-center justify-between gap-2">
                    {opp.contactEmail && (
                      <a
                        href={`mailto:${opp.contactEmail}?subject=Réservation/Candidature: ${encodeURIComponent(
                          opp.title
                        )}`}
                        className="text-xs font-semibold text-accent-primary hover:underline flex items-center gap-1"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span>Réserver / Contacter</span>
                      </a>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs h-8 text-accent-primary hover:bg-accent-primary/10 ml-auto"
                    >
                      <span>Site officiel</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 4: Ressources Officielles */}
        <TabsContent value="resources" className="space-y-4 mt-0">
          <Card className="rounded-2xl border border-border-default bg-bg-surface shadow-xs p-6 space-y-4">
            <h4 className="font-heading text-sm font-semibold text-text-primary">
              Informations Institutionnelles
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Consultez les textes légaux, décrets ministériels et directives de l&apos;Union Européenne encadrant l&apos;exercice médical, l&apos;accueil d&apos;internes et la délivrance des visas professionnels.
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sticky Bottom Action Bar */}
      <div className="sticky bottom-4 z-20 rounded-2xl bg-bg-surface/95 backdrop-blur-md border border-border-default p-4 shadow-xl flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-bold text-sm">
            {activeStep.order}
          </div>
          <div>
            <div className="text-xs font-semibold text-text-primary">
              Étape {activeStep.order} sur {totalSteps}
            </div>
            <div className="text-[11px] text-text-muted truncate max-w-[200px] sm:max-w-xs">
              {activeStep.title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!prevStep}
            onClick={() => prevStep && onSelectStep(prevStep.id)}
            className="text-xs h-9 gap-1 border-border-default"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Étape précédente</span>
          </Button>

          {!isCurrentStepCompleted ? (
            <Button
              size="sm"
              disabled={isPending}
              onClick={() => onToggleStep(activeStep.id)}
              className="text-xs h-9 gap-1.5 bg-accent-primary hover:bg-accent-hover text-white font-semibold shadow-xs"
            >
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Valider cette étape</span>
            </Button>
          ) : nextStep ? (
            <Button
              size="sm"
              onClick={() => onSelectStep(nextStep.id)}
              className="text-xs h-9 gap-1 bg-accent-primary hover:bg-accent-hover text-white font-semibold shadow-xs"
            >
              <span>Valider et continuer</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-9 gap-1.5 border-state-success text-state-success bg-state-success/10"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Dossier complet !</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
