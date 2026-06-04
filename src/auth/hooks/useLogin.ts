import { useAdapter } from "../useAdapter";

export const useLogin = () => {
	const adapter = useAdapter();
	const api = adapter.useAuthApi();
	const { setToken } = adapter.useToken();
	const { setUserName } = adapter.useUserName();
	return async ({
		userName,
		password,
	}: {
		userName: string;
		password: string;
	}) => {
		if (!api) return false;

		try {
			const resp = await api.Login({ userName, password });
			setToken(resp.token);
			setUserName(userName);
			return true;
		} catch {
			return false;
		}
	};
};
