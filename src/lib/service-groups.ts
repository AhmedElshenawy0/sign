import { cmsText, type LocaleField } from "@/lib/cms-text";
import type { SanityOurServicesPage } from "@/lib/sanity.queries";
import {
  PROJECT_TYPES,
  SERVICE_GROUPS,
  type ProjectType,
  type ServiceGroupId,
} from "@/types/project";

export type ServiceAccent = "green" | "red" | "move";

export type ResolvedServiceGroup = {
  id: string;
  types: ProjectType[];
  label: LocaleField;
  intro: LocaleField;
  accent: ServiceAccent;
};

const DEFAULT_ACCENT: Record<ServiceGroupId, ServiceAccent> = {
  branding: "green",
  marketing: "red",
  photoVideo: "move",
  nfc: "green",
};

const DEFAULT_COPY: Record<
  ServiceGroupId,
  { label: LocaleField; intro: LocaleField }
> = {
  branding: {
    label: { en: "Branding", ar: "البراندنج" },
    intro: {
      en: "Where you are, who you are, and how the brand looks every day — identity, packaging, and print from one guideline.",
      ar: "إنت فين، شخصيتك إيه، والبراند شكله إيه كل يوم — هوية، باكجينج، ومطبوعات من جادلاين واحد.",
    },
  },
  marketing: {
    label: { en: "Marketing", ar: "التسويق" },
    intro: {
      en: "A plan tied to your budget and horizon, then the strategy: social, outdoors, and how we get there.",
      ar: "خطة مربوطة بميزانية وأفق زمني، بعدين الاستراتيجية: سوشيال، أوت دور، وإزاي نوصل.",
    },
  },
  photoVideo: {
    label: { en: "Photography & Videography", ar: "التصوير والفيديو" },
    intro: {
      en: "The pictures and films that carry the brand into the world.",
      ar: "الصور والأفلام اللي بتطلع البراند للعالم.",
    },
  },
  nfc: {
    label: { en: "NFC Services", ar: "خدمات NFC" },
    intro: {
      en: "Cards, rings, and medals — products that sit beside the brand work, not instead of it.",
      ar: "كروت، خواتم، وميداليات — منتجات جنب شغل البراند، مش بديله.",
    },
  },
};

export const DEFAULT_RESOLVED_GROUPS: ResolvedServiceGroup[] =
  SERVICE_GROUPS.map((group) => ({
    id: group.id,
    types: group.types,
    label: DEFAULT_COPY[group.id].label,
    intro: DEFAULT_COPY[group.id].intro,
    accent: DEFAULT_ACCENT[group.id],
  }));

function asProjectTypes(values: unknown): ProjectType[] {
  if (!Array.isArray(values)) return [];
  return values.filter((value): value is ProjectType =>
    typeof value === "string" &&
    (PROJECT_TYPES as readonly string[]).includes(value),
  );
}

function asAccent(value: unknown): ServiceAccent {
  return value === "red" || value === "move" ? value : "green";
}

export function resolveServiceGroups(
  cms: SanityOurServicesPage | null | undefined,
): ResolvedServiceGroup[] {
  const rows = (cms?.groups ?? [])
    .map((group) => {
      const id = group?.id?.trim() || "";
      const types = asProjectTypes(group?.types);
      if (!id || !types.length) return null;
      return {
        id,
        types,
        label: group?.title ?? {},
        intro: group?.intro ?? {},
        accent: asAccent(group?.accent),
      } satisfies ResolvedServiceGroup;
    })
    .filter((group): group is ResolvedServiceGroup => Boolean(group));

  return rows.length ? rows : DEFAULT_RESOLVED_GROUPS;
}

export function serviceGroupLabel(group: ResolvedServiceGroup, lang: string) {
  return cmsText(group.label, lang, group.id);
}

export function serviceGroupIntro(group: ResolvedServiceGroup, lang: string) {
  return cmsText(group.intro, lang, "");
}
