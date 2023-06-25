import { BaseKey } from "@pankod/refine-core";
import { Document } from "mongoose";
export interface FormFieldProp {
  title: string;
  labelName: string;
}

export interface FormValues {
  title: string;
  description: string;
  sectorType: string;
  fund: number | undefined;
  proponents: string;
  duration: string;
  source: string;
  objective: string;
  activity: string;
  expectOutput: string;
  expectOutputDuration: string;
  college: string;
  file: string;
  intext: string;
}

export interface ProjectCardProps {
  id?: BaseKey | undefined;
  title: string;
  fund: string;
  duration: string;
  proponent: string;
  source: string;
  sectorType: string;
  status: string;
}
