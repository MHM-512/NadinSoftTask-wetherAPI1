
import type { ReactNode } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: "muiltr",
  stylisPlugins: [prefixer],
});

interface Props {
  children: ReactNode;
  direction: "rtl" | "ltr";
}

export default function RtlDemo({ children, direction }: Props) {
  return (
    <CacheProvider value={direction === "rtl" ? cacheRtl : cacheLtr}>
      <div dir={direction}>
        {children}
      </div>
    </CacheProvider>
  );
}
