"use client";

import type { Project } from "@/types/project";
import IdentityJourney from "./journey/IdentityJourney";
import {
  NfcJourney,
  OutdoorsJourney,
  PackagingJourney,
  PhotosJourney,
  PrintsJourney,
  SocialJourney,
  StrategyJourney,
  VideosJourney,
} from "./journey/templates";

export default function ProjectJourney({ project }: { project: Project }) {
  switch (project.type) {
    case "brand_identity":
      return <IdentityJourney project={project} />;
    case "packaging":
      return <PackagingJourney project={project} />;
    case "prints":
      return <PrintsJourney project={project} />;
    case "social_media":
      return <SocialJourney project={project} />;
    case "outdoors":
      return <OutdoorsJourney project={project} />;
    case "brand_strategy":
    case "marketing_strategy":
      return <StrategyJourney project={project} />;
    case "photos":
      return <PhotosJourney project={project} />;
    case "videos":
      return <VideosJourney project={project} />;
    case "nfc_card":
    case "nfc_ring":
    case "nfc_medal":
      return <NfcJourney project={project} />;
    default:
      return <IdentityJourney project={project} />;
  }
}
