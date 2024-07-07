import { Box, IconButton, Typography } from "@mui/material";
import useFetch from "../hooks/use-fetch";
import { Table } from "./table";
import { DepartmentTree } from "./component-2";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const URL = `https://jsonplaceholder.typicode.com/todos`;

export const Dashboard = () => {
    const { data, loading, error } = useFetch(URL);
    const navigate = useNavigate();

    if (loading) {
        <Typography variant="h5">Loading...</Typography>;
    }

    if (error) {
        <Typography variant="h5">{error}!</Typography>;
    }

    const handleLogout = () => {
        localStorage.clear();
        return navigate("/", { replace: true });
    };

    return (
        <Box paddingInline={"4rem"} paddingBlock={"2rem"} position={"relative"}>
            {/* Logout button */}
            <IconButton
                title="Logout"
                sx={{ position: "absolute", zIndex: "100", top: "1rem", right: "1rem" }}
                color="error"
                onClick={handleLogout}
            >
                <Logout />
            </IconButton>

            <Typography variant="h5" gutterBottom>
                Table
            </Typography>
            <Table data={data} />

            <Typography variant="h5" marginTop={"2rem"}>
                Tree from scratch
            </Typography>
            <DepartmentTree />
        </Box>
    );
};
