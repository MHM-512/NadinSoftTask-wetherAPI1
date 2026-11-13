
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../features/auth/useAuth";

type LoginFormValues = {
  name: string;
};

export default function Login() {
  const { t, i18n } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const name = data.name.trim();

    if (!name) return;

    login({ name });

    await navigate({ to: "/dashboard" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 2, sm: 3 },
      }}
    >
      {/* Main Card */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          maxWidth: 960,
          minHeight: { xs: "auto", md: 560 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 4,
          bgcolor: "background.paper",
        }}
      >
        {/* Login Form Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 3, sm: 5, md: 6 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: 26, sm: 30, md: 32 },
              fontWeight: 600,
              mb: { xs: 4, md: 6 },
              textAlign: "center",
            }}
          >
            {t("login.title")}
          </Typography>

          <TextField
            fullWidth
            label={t("login.nameRequired")}
            variant="outlined"
            {...register("name", {
              required: t("login.nameRequired"),
              validate: (value) =>
                value.trim().length > 0 ||
                "Name cannot be empty",
            })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            sx={{
              mb: 4,
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{
              py: 1.5,
            }}
          >
            {t("login.submit")}
          </Button>
        </Box>

        {/* Illustration Section */}
        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? "#202A40"
                : "#c7dbe4",

            width: { xs: "100%", md: "50%" },
            minHeight: { xs: 220, sm: 280, md: 560 },
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Image 1 */}
          <Box
            component="img"
            src="/img/dc5674da7415fc93ad3656c3d4ca4a2379e80c63.png"
            alt="image1"
            sx={{
              width: { xs: 110, sm: 150, md: 220 },
              maxWidth: "45%",
              position: "absolute",
              top: 0,
              right: 0,
            }}
          />

          {/* Image 2 */}
          <Box
            component="img"
            src="/img/06509ff97ca4966e34e878881cc49db475d84799.png"
            alt="image2"
            sx={{
              width: { xs: 110, sm: 150, md: 220 },
              maxWidth: "45%",
              position: "absolute",
              left: 0,
              top: { xs: "50%", md: "30%" },
              transform: "translateY(-50%)",
            }}
          />

          {/* Image 3 */}
          <Box
            component="img"
            src="/img/52e7a10c792d6dd947742b32d669accc2f1a969a.png"
            alt="image3"
            sx={{
              width: { xs: 110, sm: 150, md: 220 },
              maxWidth: "45%",
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          />
        </Box>
      </Box>

      {/* Language Selector */}
      <TextField
        select
        label={t("login.language")}
        value={i18n.language.startsWith("fa") ? "fa" : "en"}
        onChange={(event) => {
          void i18n.changeLanguage(event.target.value);
        }}
        variant="standard"
        sx={{
          mt: 3,
          width: { xs: "100%", sm: "25ch" },
          maxWidth: 300,
        }}
      >
        <MenuItem value="en">
          {t("login.languageEn")}
        </MenuItem>

        <MenuItem value="fa">
          {t("login.languageFa")}
        </MenuItem>
      </TextField>
    </Box>
  );
}
