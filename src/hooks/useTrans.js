import { useRouter } from "next/router";
import en from "../../public/lang/en";
import vi from "../../public/lang/vi";
export const useTrans = () => {
  const router = useRouter();
  if (router.locale === "vi") {
    return vi;
  }
  if (router.locale === "en") {
    return en;
  }
};
