import type { GlobalProvider } from "@ladle/react";
import { Providers } from "../src/ladle/components";

export const Provider: GlobalProvider = ({ children }) => {
	return <Providers>{children}</Providers>;
};
