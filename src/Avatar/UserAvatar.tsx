// /** biome-ignore-all lint/suspicious/noBitwiseOperators: Use this  */
import Avatar from "@mui/material/Avatar";
import type { MouseEventHandler } from "react";

export const UserAvatar = (props: {
	onClick: MouseEventHandler<HTMLDivElement>;
	userName: string;
}) => {
	return <Avatar onClick={props.onClick} {...stringAvatar(props.userName)} />;
};

function stringAvatar(name: string | undefined) {
	let bgColor = "rgb(107, 107, 107)";
	let initials = "";
	if (name) {
		const letters = name.split(" ");
		initials = letters[0][0].toUpperCase();
		if (letters.length > 1) {
			initials += letters[1][0].toUpperCase();
		}
		bgColor = stringToColor(name);
	}
	return {
		sx: {
			bgcolor: bgColor,
			marginLeft: "auto",
		},
		children: initials,
	};
}

function stringToColor(value: string) {
	if (value === "Julia") return "#4169E1";

	let hash = 0;

	for (const char of value) {
		hash = (hash * 31 + char.charCodeAt(0)) % 0xffffff;
	}

	return `#${hash.toString(16).padStart(6, "0")}`;
}
