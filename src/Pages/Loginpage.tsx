import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "960px",
            height: "560px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                margin: 5,
                width: "50%",
                height: "100%",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: 32,
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  margin: 10,
                }}
              >
                {t("login.title")}
              </Typography>

              <TextField
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginBottom: 20,
                }}
                label={t("login.nameRequired")}
                variant="outlined"
                {...register("name", {
                  required: "Name is required",
                  validate: (value) =>
                    value.trim().length > 0 || "Name cannot be empty",
                })}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />

              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {t("login.submit")}
              </Button> 
            </Box>

            <Box
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#202A40" : "#c7dbe4",
                width: "50%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <Box
                component="img"
                src="/img/dc5674da7415fc93ad3656c3d4ca4a2379e80c63.png"
                alt="image1"
                sx={{
                  width: "35vh",
                  position: "absolute",
                  top: 1,
                  right: 0,
                }}
              />

              <Box
                component="img"
                src="/img/06509ff97ca4966e34e878881cc49db475d84799.png"
                alt="image2"
                sx={{
                  width: "35vh",
                  position: "absolute",
                  left: 0,
                }}
              />

              <Box
                component="img"
                src="/img/52e7a10c792d6dd947742b32d669accc2f1a969a.png"
                alt="image3"
                sx={{
                  width: "35vh",
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                }}
              />
            </Box>
          </Box>
        </Box>

        <TextField
          select
          label={t("login.language")}
          value={i18n.language.startsWith("fa") ? "fa" : "en"}
          onChange={(event) => {
            void i18n.changeLanguage(event.target.value);
          }}
          variant="standard"
          sx={{
            m: 2,
            width: "25ch",
            marginTop: 2,
          }}
        >
          <MenuItem value="en">{t("login.languageEn")}</MenuItem>

          <MenuItem value="fa">{t("login.languageFa")}</MenuItem>
        </TextField>
      </Box>
    </form>
  );
}
