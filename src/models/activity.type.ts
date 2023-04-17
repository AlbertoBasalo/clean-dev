import { ActivityState } from "./activity-state.type";
import { AgeCategory } from "./age-category.type";
import { Id } from "./id.type";

export type Activity = {
  id: Id;
  organizerId: Id;
  title: string;
  location: string;
  date: string;
  price: number;
  currency: string;
  ageCategory: AgeCategory;
  capacity: number;
  quorum: number;
  description: string;
  slug: string;
  state: ActivityState;
};

export const EMPTY_ACTIVITY: Activity = {
  id: 0,
  organizerId: 0,
  title: "",
  location: "",
  date: "",
  price: 0,
  currency: "",
  ageCategory: "adult",
  capacity: 0,
  quorum: 0,
  description: "",
  slug: "",
  state: "draft",
};
