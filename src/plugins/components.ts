import {
  HomeOutline,
  ArrowBackOutline,
  AddOutline,
  EyeOutline,
  CreateOutline,
  TrashOutline,
} from "@vicons/ionicons5";
import Maska from "maska";
import BackButton from "@/components/BackButton.vue";

export const registerComponents = (app) => {
  // ionic icons
  app.component("home-outline", HomeOutline);
  app.component("arrow-back-outline", ArrowBackOutline);
  app.component("add-outline", AddOutline);
  app.component("eye-outline", EyeOutline);
  app.component("create-outline", CreateOutline);
  app.component("trash-outline", TrashOutline);

  // our custom components
  app.component("back-button", BackButton);

  // libraries
  app.use(Maska);
};
