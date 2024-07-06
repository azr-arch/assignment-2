import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div>
            <Typography variant="h5">
                Sorry the page you were looking for, does not exists!
            </Typography>
            <Link to={"/"}>back to home</Link>
        </div>
    );
};
