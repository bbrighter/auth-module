import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import { useEffect, useRef, useState } from "react";
import { CustomAppBar } from "./AppBar";
import ProductSelectionView from "./ProductMenu/ProductSelection/ProductSelectionView";

export const NoChildren = () => <CustomAppBar />;

export const OneChild = () => (
	<CustomAppBar>
		<div>Child 1</div>
	</CustomAppBar>
);

export const TwoChildren = () => (
	<CustomAppBar>
		<div>Child 1</div>
		<button type="button">Button</button>
	</CustomAppBar>
);

const prod1 = {
	id: "123",
	productId: "p1",
	productName: "Product 1",
	url: "http://123",
};
const prod2 = {
	id: "ABC",
	productId: "p2",
	productName: "Product 2",
	url: "http://123",
};

export const ProductSelection_2ProductsFirstSelected = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const anchorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setAnchorEl(anchorRef.current);
	}, []);

	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
				ref={anchorRef}
				sx={{ width: "4 rem", height: "4rem", backgroundColor: "red" }}
			>
				<Menu open={Boolean(anchorEl)} anchorEl={anchorEl}>
					<ProductSelectionView
						activeInstance={prod1}
						permissions={[prod1, prod2]}
					/>
				</Menu>
			</Box>
		</Box>
	);
};
