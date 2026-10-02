import {
	type AuthStateAdapter,
	type LoginParams,
	type ProductInstance,
	ProductKeys,
} from "../auth";

export type AuthTestOptions = {
	userName?: string;
	userId?: string;
	token?: string;
	location?: string;
	instances?: ProductInstance[];
	language?: string;
	loadingMode?: string;
};

export function createAuthAdapter(
	options: AuthTestOptions = {},
): AuthStateAdapter {
	const {
		userName = "name",
		userId = "1234",
		token = "token",
		location = "/",
		instances = [
			{
				id: "1",
				productId: "prod",
				productName: "Prod Name",
				url: "",
			},
		],
	} = options;

	return {
		useAuthApi: () => ({
			GetPermissions: async () => ({
				instances: [
					{
						product: instances[0].productId,
						piid: instances[0].id,
						appMapping: {},
					},
				],
				userId: userId,
				userName: userName,
			}),
			Login: async (_params: LoginParams) => ({ token: token }),
		}),

		useLocation: () => ({
			location,
			navigate: console.log,
		}),

		useProductInstances: () => ({
			instances,
			setInstances: () => {},
			isLoaded: true,
			setIsLoaded: console.log,
		}),

		useProductKey: () => ProductKeys.HistaComplete,

		useToken: () => ({
			token,
			setToken: console.log,
		}),

		useUserName: () => ({
			userName,
			setUserName: console.log,
		}),
	};
}
