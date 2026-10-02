import { useAuth } from "../../../auth";
import ProductSelectionView from "./ProductSelectionView";

export default function ProductSelection() {
	const { permissions, activeInstance } = useAuth();
	return (
		<ProductSelectionView
			activeInstance={activeInstance}
			permissions={permissions}
		/>
	);
}
