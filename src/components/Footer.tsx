
import { Box, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t, i18n } = useTranslation();

  const locale = i18n.language.startsWith("fa")
    ? "fa-IR"
    : "en-US";

  const nowLabel = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        px: { xs: 2, md: 3 },
        py: 2,

        // Colors are derived from the MUI theme.
        bgcolor: "background.paper",
        color: "text.primary",
        borderTop: 1,
        borderColor: "divider",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: "wrap",

        // Compatibility with small screens
        "& .MuiTypography-root": {
          color: "text.secondary",
        },
      }}
    >
      {/* Logo and Text*/}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          component="img"
          alt="Nadin Soft Logo"
          src="/img/LogoNadinsoft.jpeg"
          sx={{
            width: "50px",
            objectFit: "contain",
          }}
        />

        <Typography variant="caption">
          {t("footer.rights")}
        </Typography>
      </Box>

      {/*  Contact and Date*/}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.5, md: 3 },
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <MailIcon
            sx={{
              fontSize: 20,
              color: "text.secondary",
            }}
          />

          <Typography variant="caption">
            {t("footer.contact", {
              email: "info@nadin.ir",
            })}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <CalendarMonthOutlinedIcon
            sx={{
              fontSize: 16,
              color: "text.secondary",
            }}
          />

          <Typography variant="caption">
            {nowLabel}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
