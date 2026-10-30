"use client";

import { Ellipsis } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Starter-Kit — shadcn/ui-Referenz.
 *
 * Zweck (guidelines/09 §9.1, Vorrang-Regel): shadcn/ui auf Radix UI
 * ist die Komponenten-Basis. Wo Bridgemaker ein Rezept hat (Typo,
 * Buttons, Formulare, Karten, Badges), tragen die Komponenten in
 * src/components/ui dessen Optik; alles andere (Dialoge, Menüs,
 * Tabs, Auswahl, Regler) kommt von shadcn, gethemt über
 * shadcn-theme.css. Abstände: eine Stufe Luft (§9.6).
 */

function Section({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-surface-stone py-24 first:border-t-0">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <p className="type-eyebrow text-light">{eyebrow}</p>
        <h2 className="type-h3 mt-4 max-w-xl">{title}</h2>
        {lead && <p className="type-body mt-3 max-w-2xl text-mid">{lead}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}


export default function ComponentReference() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center border-b border-charcoal/10 bg-white/30 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 md:px-8">
          <a href="https://brandbook.bridgemaker.com" aria-label="Zum Brand-System">
            <Wordmark height={20} />
          </a>
          <a
            href="https://brandbook.bridgemaker.com/brandbook/index.html"
            className="type-nav text-charcoal transition-colors hover:text-bm-purple"
          >
            Brandbook
          </a>
        </div>
      </header>

      <main className="pt-16">
        <div className="mx-auto max-w-[1200px] px-4 pt-16 pb-16 md:px-8">
          <p className="type-eyebrow text-light">Starter-Kit</p>
          <h1 className="type-h1 mt-6 max-w-xl">Komponenten-Referenz</h1>
          <p className="type-body-l mt-4 max-w-2xl text-mid">
            shadcn/ui auf Radix UI, gebrandet über die Bridgemaker-Tokens.
            Buttons, Felder, Karten und Badges tragen unsere Rezepte, Dialoge,
            Menüs und Regler kommen von shadcn. Der Code dieser Seite ist die
            Gebrauchsanweisung.
          </p>
        </div>

        <Section
          eyebrow="Rezepte"
          title="Karte, Formular und Badges"
          lead="Card ist bm-card mit card-clean, Input ist bm-input, Button ist bm-btn. Innenabstand 32px, Felder 24px auseinander."
        >
          <Card className="max-w-md">
            <CardHeader>
              <Badge variant="purple">Quick-Win</Badge>
              <CardTitle className="mt-2">Zugang anlegen</CardTitle>
              <CardDescription>
                Wir schicken den Link an diese Adresse.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Vor- und Nachname" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mail">E-Mail</Label>
                <Input id="mail" type="email" placeholder="name@firma.de" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Zugang anlegen</Button>
              <Button variant="ghost">Abbrechen</Button>
            </CardFooter>
          </Card>
        </Section>

        <Section
          eyebrow="shadcn"
          title="Dialog und Loader"
          lead="AlertDialog für alles, was sich nicht rückgängig machen lässt. Die Aktionen sind unsere Pill-Buttons."
        >
          <div className="flex flex-wrap items-center gap-8">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary">Dialog öffnen</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Entwurf verwerfen?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Deine Änderungen gehen verloren. Das lässt sich nicht
                    rückgängig machen.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="ghost">Behalten</AlertDialogCancel>
                  <AlertDialogAction>Verwerfen</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Spinner className="size-6 text-bm-purple" />
            <Progress value={60} className="w-64" />
          </div>
        </Section>

        <Section
          eyebrow="shadcn"
          title="Tabs, Filter und Menü"
          lead="Tabs und Filter-Chips sind Pills. Alle Icons kommen aus Lucide, Strichstärke 1,5."
        >
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Übersicht</TabsTrigger>
              <TabsTrigger value="analysis">Auswertung</TabsTrigger>
              <TabsTrigger value="settings">Einstellungen</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="type-body text-mid">
              Der Inhalt startet 24px unter der Tab-Leiste.
            </TabsContent>
            <TabsContent value="analysis" className="type-body text-mid">
              Auswertung folgt.
            </TabsContent>
            <TabsContent value="settings" className="type-body text-mid">
              Einstellungen folgen.
            </TabsContent>
          </Tabs>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ToggleGroup type="multiple" spacing={2} defaultValue={["open"]}>
              <ToggleGroupItem value="open">Offen</ToggleGroupItem>
              <ToggleGroupItem value="review">Im Review</ToggleGroupItem>
              <ToggleGroupItem value="done">Erledigt</ToggleGroupItem>
            </ToggleGroup>

            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Weitere Aktionen">
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Weitere Aktionen</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Projekt</DropdownMenuLabel>
                <DropdownMenuItem>Umbenennen</DropdownMenuItem>
                <DropdownMenuItem>Duplizieren</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Löschen</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Section>

        <Section
          eyebrow="shadcn"
          title="Auswahl und Regler"
          lead="Checkbox, Switch, Radio und Slider haben kein eigenes Rezept. shadcn übernimmt, primary ist bm-purple."
        >
          <div className="grid max-w-2xl gap-8">
            <div className="flex flex-wrap items-center gap-8">
              <Label className="type-body">
                <Checkbox defaultChecked />
                Checkbox
              </Label>
              <Label className="type-body">
                <Switch defaultChecked />
                Switch
              </Label>
              <RadioGroup defaultValue="a" className="flex gap-6">
                <Label className="type-body">
                  <RadioGroupItem value="a" />
                  Radio A
                </Label>
                <Label className="type-body">
                  <RadioGroupItem value="b" />
                  Radio B
                </Label>
              </RadioGroup>
            </div>
            <Slider defaultValue={[60]} max={100} step={1} />
          </div>
        </Section>

        <footer className="border-t border-surface-stone">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 px-4 py-12 md:px-8">
            <Wordmark height={16} />
            <p className="type-small text-mid">
              Bridgemaker Starter-Kit, Design-System und Herleitung im Brandbook
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
