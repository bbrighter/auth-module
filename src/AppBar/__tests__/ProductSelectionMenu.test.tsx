import { Menu } from "@mui/material";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ProductSelectionView from "../ProductMenu/ProductSelection/ProductSelectionView";
import { getProductMenu, openProductMenu } from "./selectors";

describe("ProductSelectionMenu component", () => {
	const prod1 = {
		id: "123",
		productId: "p1",
		productName: "Product 1",
		url: "http://great-product.de",
	};
	const prod2 = {
		id: "ABC",
		productId: "p2",
		productName: "Product 2",
		url: "http://bad-product.de",
	};

	const renderProductMenu = () =>
		render(
			<Menu open disableRestoreFocus>
				<ProductSelectionView
					activeInstance={prod1}
					permissions={[prod1, prod2]}
				/>
			</Menu>,
		);

	it("Product menu opens and renders products", async () => {
		renderProductMenu();

		const productMenu = getProductMenu();
		await userEvent.click(productMenu);

		expect(screen.getByText("Product 1")).toBeInTheDocument();
		expect(screen.getByText("Product 2")).toBeInTheDocument();
	});

	it("Only current product is highlighted", async () => {
		renderProductMenu();
		await openProductMenu();

		const activeProduct = screen.getByRole("menuitem", {
			name: "Product 1 123",
		});
		expect(activeProduct).toHaveClass("Mui-selected");

		const inactiveProduct = screen.getByRole("menuitem", {
			name: "Product 2 ABC",
		});
		expect(inactiveProduct).not.toHaveClass("Mui-selected");
	});

	it("Menu items have correct URL", async () => {
		renderProductMenu();
		await openProductMenu();

		const activeProduct = screen.getByRole("menuitem", {
			name: "Product 1 123",
		});
		expect(activeProduct).toHaveAttribute(
			"href",
			"http://great-product.de/123",
		);

		const inactiveProduct = screen.getByRole("menuitem", {
			name: "Product 2 ABC",
		});
		expect(inactiveProduct).toHaveAttribute(
			"href",
			"http://bad-product.de/ABC",
		);
	});
});
