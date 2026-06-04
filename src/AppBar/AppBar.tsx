import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import type { ReactNode } from "react";

import { ProductMenu } from "./components/ProductMenu";

export const CustomAppBar = (props: { children?: ReactNode }) => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Box sx={{ flexGrow: 1 }}>{props.children}</Box>
				<ProductMenu />
			</Toolbar>
		</AppBar>
	);
};
