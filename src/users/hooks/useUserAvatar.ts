export function useUserAvatar(name: string) {
	return stringAvatar(name);
}

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

function stringToColor(string: string) {
	if (string === "Julia") return "#4169E1";
	let hash = 0;
	let i: number;

	for (i = 0; i < string.length; i += 1) {
		// biome-ignore lint/suspicious/noBitwiseOperators: Why not?
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		// biome-ignore lint/suspicious/noBitwiseOperators: Why not?
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}

	return color;
}
