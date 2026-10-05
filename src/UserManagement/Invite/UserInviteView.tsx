import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { type ChangeEvent, useState } from "react";
import { useTranslation } from "../../localization/useTranslation";

export type UserInviteProps = {
	inviteUser: ({
		userName,
	}: {
		userName: string;
	}) => Promise<number | undefined>;
};

export const UserInviteView = ({ inviteUser }: UserInviteProps) => {
	const t = useTranslation();
	const [userToInvite, setUserToInvite] = useState("");
	const [inviteLoading, setInviteLoading] = useState(false);
	const [status, setStatus] = useState<undefined | number>();

	const onInvite = async () => {
		setInviteLoading(true);
		const userStatus = await inviteUser({ userName: userToInvite });
		setStatus(userStatus);
		setInviteLoading(false);
		if (userStatus === undefined) {
			setUserToInvite("");
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserToInvite(e.currentTarget.value);
		setStatus(undefined);
	};

	return (
		<Stack direction="row" spacing={2}>
			<TextField
				fullWidth
				label={t("Nutzer einladen")}
				value={userToInvite}
				onChange={onChange}
				error={status !== undefined}
				helperText={status === 404 ? t("Nutzer existiert nicht") : ""}
				onKeyDown={(e) => e.stopPropagation()}
			/>
			<Button onClick={onInvite} loading={inviteLoading}>
				{t("Einladen")}
			</Button>
		</Stack>
	);
};
