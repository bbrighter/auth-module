import Logout from '@mui/icons-material/Logout'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'

import { useAuth } from '../../auth'

export function LogoutMenuEntry() {
    const { token, logout } = useAuth()

    return (
        <MenuItem onClick={logout} disabled={token == ''}>
            <ListItemIcon>
                <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </MenuItem>
    )
}
