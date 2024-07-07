import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { phoneNumberRegex } from "../regex";

interface FormData {
    name: string;
    phoneNumber: string;
    email: string;
}

const initialState: FormData = {
    name: "",
    phoneNumber: "",
    email: "",
};

export const Login: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Extract the redirect URL from search parameters
    const redirectURL = useMemo(() => searchParams.get("redirect"), [searchParams]);

    const [formData, setFormData] = useState<FormData>(initialState);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Clear out redirect error message if present
        if (redirectURL) {
            // For now, need to clear the redirectURL, but I should preserve its state in case the user was navigating to a different page.
            setSearchParams("");
        }

        setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const isNumberValid = phoneNumberRegex.test(formData.phoneNumber);
        if (!isNumberValid) {
            alert(
                "Enter a valid 10-digit Indian phone number.. It should start with a digit between 6 and 9."
            );
            return;
        }

        // Save user data
        localStorage.setItem("user", JSON.stringify(formData));

        // Clear form values
        setFormData(initialState);

        // Navigate to the specified route (default to "/dashboard")
        navigate(`/${redirectURL ?? "dashboard"}`);
    };

    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
            }}
            height="100vh"
            onSubmit={handleSubmit}
            onChange={handleChange}
        >
            {redirectURL && (
                <Typography variant="h6" color="red">
                    Please log in first
                </Typography>
            )}
            <Typography variant="h5">Login</Typography>

            <FormControl>
                <TextField
                    id="name"
                    type="text"
                    required
                    label="Name"
                    size="small"
                    value={formData.name}
                />
            </FormControl>
            <FormControl>
                <TextField
                    id="phoneNumber"
                    type="tel"
                    required
                    label="Phone number"
                    size="small"
                    value={formData.phoneNumber}
                />
            </FormControl>
            <FormControl>
                <TextField
                    id="email"
                    type="email"
                    required
                    label="Email"
                    size="small"
                    value={formData.email}
                />
            </FormControl>

            <Button size="small" type="submit" variant="contained" sx={{ marginTop: ".5rem" }}>
                Submit
            </Button>
        </Box>
    );
};
