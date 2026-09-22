import { CustomAppBar } from "./AppBar";

export const AppBarStory_noChildren = () => <CustomAppBar />;

export const AppBarStory_oneChild = () => (
	<CustomAppBar>
		<div>Child 1</div>
	</CustomAppBar>
);

export const AppBarStory_twoChildren = () => (
	<CustomAppBar>
		<div>Child 1</div>
		<button type="button">Button</button>
	</CustomAppBar>
);
