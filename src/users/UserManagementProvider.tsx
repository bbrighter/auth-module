import type { ReactNode } from "react";

import type { UserStateAdapter } from "./interface";
import { AdapterContext } from "./useAdapter";

export const UserManagementProvider = ({
	adapter,
	children,
}: {
	adapter: UserStateAdapter;
	children: ReactNode;
}) => {
	return (
		<AdapterContext.Provider value={adapter}>
			{children}
		</AdapterContext.Provider>
	);
};
