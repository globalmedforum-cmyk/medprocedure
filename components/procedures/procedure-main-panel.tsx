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
              href="/"
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
            <Badge variant="muted" className="text-xs">
              Durée estimée : ~3 à 6 mois
            </Badge>
          </div>
        </div>
      </div>

      {/* Global Progress Card (Inspired by Image 1 "Study Progress" and Image 2) */}
      <Card className="rounded-2xl border border-border-default bg-bg-surface shadow-xs overflow-hidden">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-base font-semibold text-text-primary">
                  Progression de votre démarche
                </h3>
                {progressPercentage === 100 && (
                  <Badge variant="success" className="text-xs">
                    Terminée
                  </Badge>
                )}
              </div>
              <p className="text-xs text-text-muted">
                Suivez en temps réel la complétion des pièces requises et des étapes hospitalières.
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

          {/* Progress bar */}
          <Progress value={progressPercentage} className="h-2.5" />
        </CardContent>
      </Card>

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

      {/* Main Tabs Navigation (Inspired by Image 1) */}
      <Tabs defaultValue="summary" className="w-full space-y-6">
        <TabsList className="bg-bg-surface border border-border-default p-1 rounded-xl w-full sm:w-auto justify-start flex-wrap">
          <TabsTrigger value="summary" className="text-xs gap-1.5 font-medium">
            <FileText className="h-3.5 w-3.5" />
            <span>Démarche &amp; Contenu</span>
          </TabsTrigger>
          <TabsTrigger value="checklist" className="text-xs gap-1.5 font-medium">
            <FileCheck2 className="h-3.5 w-3.5" />
            <span>Checklist d&apos;étape</span>
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="text-xs gap-1.5 font-medium">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Opportunités ({opportunities.length})</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="text-xs gap-1.5 font-medium">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Ressources &amp; Contact</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Démarche & Contenu de l'étape */}
        <TabsContent value="summary" className="space-y-6 mt-0">
          <Card className="rounded-2xl border border-border-default bg-bg-surface shadow-xs">
            <CardHeader className="p-5 sm:p-6 pb-3 border-b border-border-default">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-md bg-accent-primary/10 text-accent-primary font-mono text-xs font-bold flex items-center justify-center">
                    {activeStep.order}
                  </span>
                  <CardTitle className="text-lg font-bold text-text-primary">
                    {activeStep.title}
                  </CardTitle>
                </div>

                <div className="flex items-center gap-2">
                  {activeStep.estimatedDuration && (
                    <Badge variant="muted" className="text-xs">
                      {activeStep.estimatedDuration}
                    </Badge>
                  )}
                  {activeStep.isRequired && (
                    <Badge variant="outline" className="text-xs">
                      Obligatoire
                    </Badge>
                  )}
                  {isCurrentStepCompleted ? (
                    <Badge variant="success" className="text-xs gap-1">
                      <Check className="h-3 w-3 stroke-[3]" />
                      <span>Validée</span>
                    </Badge>
                  ) : (
                    <Badge variant="accent" className="text-xs">
                      En cours
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6">
              {/* Synthèse de l'étape */}
              <div className="space-y-2">
                <h4 className="font-heading text-sm font-semibold text-text-primary">
                  Synthèse de l&apos;étape
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  {activeStep.description}
                </p>
              </div>

              {/* Instructions & Contenu pédagogique */}
              {activeStep.content && (
                <div className="space-y-2 p-4 rounded-xl bg-bg-base border border-border-default">
                  <h4 className="font-heading text-xs font-semibold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-accent-primary" />
                    <span>Directives et exigences de conformité</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-text-primary leading-relaxed whitespace-pre-line">
                    {activeStep.content}
                  </p>
                </div>
              )}

              {/* Key Concepts / Points clés (Inspired by Image 1) */}
              <div className="space-y-3 pt-2">
                <h4 className="font-heading text-sm font-semibold text-text-primary">
                  Points clés &amp; Bonnes pratiques
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-border-default bg-bg-surface flex items-start gap-3 shadow-xs">
                    <div className="h-6 w-6 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-text-primary">
                        Conformité des originaux
                      </div>
                      <div className="text-[11px] text-text-muted leading-relaxed">
                        Toutes les photocopies doivent être certifiées conformes par une autorité publique.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border-default bg-bg-surface flex items-start gap-3 shadow-xs">
                    <div className="h-6 w-6 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-text-primary">
                        Traduction officielle
                      </div>
                      <div className="text-[11px] text-text-muted leading-relaxed">
                        Exigez un traducteur assermenté pour tout document non rédigé en langue officielle.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border-default bg-bg-surface flex items-start gap-3 shadow-xs">
                    <div className="h-6 w-6 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-text-primary">
                        Conservation des preuves
                      </div>
                      <div className="text-[11px] text-text-muted leading-relaxed">
                        Conservez systématiquement les récépissés d&apos;envoi recommandé et accusés de réception.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border-default bg-bg-surface flex items-start gap-3 shadow-xs">
                    <div className="h-6 w-6 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-text-primary">
                        Délais d&apos;instruction
                      </div>
                      <div className="text-[11px] text-text-muted leading-relaxed">
                        Anticipez le temps de réponse des commissions (en moyenne 2 à 3 mois).
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Checklist détaillée & Validation */}
        <TabsContent value="checklist" className="space-y-6 mt-0">
          <Card className="rounded-2xl border border-border-default bg-bg-surface shadow-xs">
            <CardHeader className="p-5 sm:p-6 pb-3 border-b border-border-default">
              <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-accent-primary" />
                <span>Checklist de validation pour cette étape</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-4">
              <p className="text-xs text-text-muted">
                Cochez les éléments préparatoires avant de marquer l&apos;étape comme officiellement complétée.
              </p>

              {/* Main Step Validation Checkbox */}
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

              {/* Sub-checkpoints for medical practitioner */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Vérifications recommandées
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-bg-base border border-border-default flex items-center gap-3 text-xs text-text-primary">
                    <Check className="h-4 w-4 text-accent-primary shrink-0" />
                    <span>Copies de diplômes certifiées conformes datant de moins de 3 mois</span>
                  </div>
                  <div className="p-3 rounded-xl bg-bg-base border border-border-default flex items-center gap-3 text-xs text-text-primary">
                    <Check className="h-4 w-4 text-accent-primary shrink-0" />
                    <span>Attestation de moralité et d&apos;exercice (Good Standing) délivrée par l&apos;Ordre</span>
                  </div>
                  <div className="p-3 rounded-xl bg-bg-base border border-border-default flex items-center gap-3 text-xs text-text-primary">
                    <Check className="h-4 w-4 text-accent-primary shrink-0" />
                    <span>Preuve du niveau de langue certifié par un centre d&apos;examen agréé</span>
                  </div>
                  <div className="p-3 rounded-xl bg-bg-base border border-border-default flex items-center gap-3 text-xs text-text-primary">
                    <Check className="h-4 w-4 text-accent-primary shrink-0" />
                    <span>Formulaire officiel de candidature complété et signé</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Opportunités hospitalières associées */}
        <TabsContent value="opportunities" className="space-y-4 mt-0">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-base font-semibold text-text-primary">
              Postes &amp; Opportunités associées ({procedure.country})
            </h3>
            <span className="text-xs text-text-muted">
              {opportunities.length} offre{opportunities.length > 1 ? "s" : ""} disponible{opportunities.length > 1 ? "s" : ""}
            </span>
          </div>

          {opportunities.length === 0 ? (
            <Card className="p-8 text-center rounded-2xl border border-border-default bg-bg-surface">
              <p className="text-sm text-text-muted">
                Aucune opportunité directement associée pour le moment.
              </p>
            </Card>
          ) : (
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
                      <div className="space-y-1">
                        <div className="text-[11px] font-semibold text-text-primary uppercase tracking-wider">
                          Prérequis clés
                        </div>
                        <ul className="space-y-1 text-xs text-text-muted">
                          {opp.requirements.slice(0, 2).map((req, i) => (
                            <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                              <span className="text-accent-primary font-bold">&bull;</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-2 border-t border-border-default flex items-center justify-between">
                      {opp.contactEmail ? (
                        <a
                          href={`mailto:${opp.contactEmail}?subject=Candidature: ${encodeURIComponent(
                            opp.title
                          )}`}
                          className="text-xs font-semibold text-accent-primary hover:underline flex items-center gap-1"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Contacter / Postuler</span>
                        </a>
                      ) : (
                        <span className="text-xs text-text-muted">Candidature en ligne</span>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs h-8 text-accent-primary hover:bg-accent-primary/10"
                      >
                        <span>Détails</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Tab 4: Ressources & Guides officiels */}
        <TabsContent value="resources" className="space-y-4 mt-0">
          <Card className="rounded-2xl border border-border-default bg-bg-surface shadow-xs">
            <CardHeader className="p-5 sm:p-6 pb-3 border-b border-border-default">
              <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent-primary" />
                <span>Organismes officiels et contacts utiles</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-4 text-xs text-text-muted leading-relaxed">
              <p>
                Retrouvez les liens des autorités compétentes pour le dépôt légal de vos dossiers en Europe.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-bg-base border border-border-default space-y-1">
                  <div className="font-semibold text-text-primary text-xs">
                    OFSP / Commission MEBEKO (Suisse)
                  </div>
                  <div>Office fédéral de la santé publique, Section MEBEKO</div>
                  <div>CH-3003 Berne, Suisse</div>
                  <div className="text-accent-primary font-mono text-[11px] pt-1">
                    www.bag.admin.ch
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-bg-base border border-border-default space-y-1">
                  <div className="font-semibold text-text-primary text-xs">
                    Agences Régionales de Santé - ARS (France)
                  </div>
                  <div>Direction de l&apos;offre de soins et des professions de santé</div>
                  <div>Ministère de la Santé et de la Prévention</div>
                  <div className="text-accent-primary font-mono text-[11px] pt-1">
                    www.sante.gouv.fr
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sticky Bottom Action Bar (Inspired by Image 2 & 3) */}
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
            <span className="hidden sm:inline">Précédente</span>
          </Button>

          {!isCurrentStepCompleted ? (
            <Button
              size="sm"
              disabled={isPending}
              onClick={() => onToggleStep(activeStep.id)}
              className="text-xs h-9 gap-1.5 bg-accent-primary hover:bg-accent-hover text-white font-semibold shadow-xs"
            >
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Marquer comme validée</span>
            </Button>
          ) : nextStep ? (
            <Button
              size="sm"
              onClick={() => onSelectStep(nextStep.id)}
              className="text-xs h-9 gap-1 bg-accent-primary hover:bg-accent-hover text-white font-semibold shadow-xs"
            >
              <span>Étape suivante</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-9 gap-1.5 border-state-success text-state-success bg-state-success/10"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Procédure achevée !</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
