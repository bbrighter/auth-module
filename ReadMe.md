# Auth module
The auth module used for all UIs of me sharing the same backend authentication.

# Modules
## auth
Handles login, logout, product instance management and authentication. 

Needs a `AuthApi` which provides *Login* and *GetPermissions* endpoints. 

## users
Handles managing, inviting and deleting users to the product instance. 

Needs a `UserAPI` which provides endpoints *AddUserToProductInstance*, *RemoveUserFromProductInstance* and *GetUsersForProductInstance*. 

## settings
Handles settings like language and loading mode.

Needs a `SettingsApi` which provides endpoints **GetSettings* and *PatchSettings*. 

# Components

## User Management
Modal which displays a list of users and allows inviting and deleting them.

Is used in AppBar and is based on users module.

## App Bar
App bar which contains a user avatar and a menu for:
* Switch products
* User management
* Settings
* Logout

Based on auth, users and settings module.

## Avatar
Simple avatar which displays your initials and a computed color.

Is used in App Bar and User Management.

## Login
A simple login page based on the auth module.


# Ladle

Run `pnpm storybook` to see a storybook with the components.