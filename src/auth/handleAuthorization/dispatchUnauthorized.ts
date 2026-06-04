import { UNAUTHORIZED_EVENT } from "./constants";

export const dispatchUnauthorized = () => {
	const path = window.location.pathname;
	window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT, { detail: path }));
};
