import { BaseKey } from "@pankod/refine-core";

export interface AgencyCardProp {
  totalFunding: number;
  projects: any;
  source: string;
  noOfProjects: number;
}

export interface InfoBarProps {
  icon: ReactNode;
  name: string;
}
