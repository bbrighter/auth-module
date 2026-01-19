import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import { ProductMenu } from './components/ProductMenu'

export const CustomAppBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <ProductMenu />
                </Box>
            </Toolbar>
        </AppBar>

    )
}
