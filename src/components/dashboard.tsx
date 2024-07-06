import { Box, Typography } from "@mui/material";
import useFetch from "../hooks/use-fetch";
import { Table } from "./table";
import { DepartmentTree } from "./component-2";

const URL = `https://jsonplaceholder.typicode.com/todos`;

export const Dashboard = () => {
    const { data, loading, error } = useFetch(URL);

    if (loading) {
        <Typography variant="h5">Loading...</Typography>;
    }

    if (error) {
        <Typography variant="h5">{error}!</Typography>;
    }

    return (
        <Box paddingInline={"4rem"} paddingBlock={"2rem"}>
            <Typography variant="h5" gutterBottom>
                Table
            </Typography>
            <Table data={data} />

            <Typography variant="h5" gutterBottom>
                Tree from scratch
            </Typography>
            <DepartmentTree />
        </Box>
    );
};
