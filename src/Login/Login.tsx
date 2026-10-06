import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { type ChangeEvent, useEffect, useState } from "react";

import { useAuth } from "../auth";
import { useTranslation } from "../localization/useTranslation";

export function Login() {
	const t = useTranslation();
	const { login, navigate, activeInstance } = useAuth();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const [loginState, setLoginState] = useState<
		"default" | "error" | "loading" | "success"
	>("default");

	const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onLogin = async () => {
		setLoginState("loading");
		const ok = await login({ password: password, userName: name });
		if (!ok) {
			setLoginState("error");
			return;
		}
		setLoginState("success");
	};

	useEffect(() => {
		if (loginState !== "success") return;
		navigate(activeInstance);
	}, [activeInstance, navigate, loginState]);

	return (
		<Container sx={{ padding: "2rem", width: "20rem" }}>
			<Stack
				onSubmit={(e) => {
					e.preventDefault();
					onLogin();
				}}
				component="form"
				spacing={2}
			>
				<TextField
					label={t("Name")}
					value={name}
					onChange={onNameChange}
					autoComplete="username"
				/>
				<TextField
					label={t("Passwort")}
					type="password"
					value={password}
					onChange={onPasswordChange}
					autoComplete="current-password"
				/>
				<Button
					variant="contained"
					type="submit"
					loading={loginState === "loading"}
					color={loginState === "error" ? "error" : "primary"}
				>
					{t("Login")}
				</Button>
			</Stack>
		</Container>
	);
}
