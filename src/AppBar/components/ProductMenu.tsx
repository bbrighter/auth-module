import Menu from '@mui/material/Menu'
import { MouseEvent, useState } from 'react'

import { useAuth } from '../../auth'
import { UserAvatar } from '../../Avatar'
import { LogoutMenuEntry } from './LogoutMenuEntry'
import ProductSelection from './ProductSelection'
import UserManagement from './UserManagementButton'

export function ProductMenu() {
    const [anchor, setAnchor] = useState<null | HTMLElement>(null)
    const open = Boolean(anchor)
    const { userName } = useAuth()

    const handleClose = () => setAnchor(null)
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        setAnchor(e.currentTarget)
    }

    return (
        <>
            <UserAvatar
                onClick={handleClick}
                userName={userName}
            />
            <Menu
                open={open}
                anchorEl={anchor}
                onClose={handleClose}
            >
                <ProductSelection />
                <UserManagement />
                <LogoutMenuEntry />
            </Menu>
        </>

    )
}
