import { RouterProvider } from "@tanstack/react-router";
import "../locales/config";
import { router } from "./router";

export default function App() {

  // const { i18n } = useTranslation();
  // const isRtl = i18n.language === "fa";

  return <RouterProvider router={router} />;

    // <Box dir={isRtl ? "rtl" : "ltr"} >

    {/* </Box> */}
  

}
