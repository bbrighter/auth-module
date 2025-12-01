import { useSetAtom } from "jotai";
import { UserAPI } from "./interface";
import { apiAtom } from "./store/atoms";
import { useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserList from "./components/UserList";
import UserInvite from "./components/UserInvite";

export function UserManagement({ api, open, onClose }: { api: UserAPI, open: boolean, onClose: () => void }) {
    const setApi = useSetAtom(apiAtom)


    useEffect(() => {
        setApi(api)
    }, [])


    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={{
                width: '80%', bgcolor: 'background.paper', position: 'absolute',
                maxWidth: '750px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '1rem',
                borderRadius: '0.5rem',
            }}>
                <Typography variant='h4'>Nutzerverwaltung</Typography>
                <UserList />
                <UserInvite />
            </Box>
        </Modal>


    )
}