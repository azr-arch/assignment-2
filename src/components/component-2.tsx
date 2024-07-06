import { useState } from "react";
import { ExpandMore, ChevronRight, Check } from "@mui/icons-material";
import {
    Box,
    Typography,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button,
    IconButton,
} from "@mui/material";

// Sample data (similar to your selectData)
const departmentData = [
    {
        department: "customer_service",
        sub_departments: ["support", "customer_success"],
    },
    {
        department: "design",
        sub_departments: ["graphic_design", "product_design", "web_design"],
    },
    // Add more departments as needed
];

export const DepartmentTree = () => {
    const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);

    const handleExpand = (department: string) => {
        setExpandedDepartments(
            (prevExpanded) =>
                prevExpanded.includes(department)
                    ? prevExpanded.filter((dep) => dep !== department) // If current department is availbel in expanded list then remove it
                    : [...prevExpanded, department] // Else add the current depart to expanded list
        );
    };

    const renderDepartment = (dept: (typeof departmentData)[number]) => {
        const isExpanded = expandedDepartments.includes(dept.department);

        return (
            <Box key={dept.department}>
                <FormGroup>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0rem .5rem" }}>
                        <IconButton onClick={() => handleExpand(dept.department)}>
                            {isExpanded ? (
                                <ExpandMore fontSize={"small"} />
                            ) : (
                                <ChevronRight fontSize={"small"} />
                            )}
                        </IconButton>
                        <FormControlLabel
                            sx={{ textTransform: "capitalize" }}
                            control={<Checkbox size="small" />}
                            label={dept.department}
                        />
                    </div>
                    {/* <div
                    onClick={() => handleToggle(dept.department)}
                    style={{ display: "flex", alignContent: "center" }}
                >
                    {isExpanded ? (
                        <ExpandMore fontSize={"small"}/>
                    ) : (
                        <ChevronRight fontSize={"small"} />
                    )}
                    <Typography sx={{ textTransform: "capitalize" }}>{dept.department}</Typography>
                </div> */}
                    {isExpanded && (
                        <FormGroup sx={{ marginLeft: "3rem" }}>
                            {dept.sub_departments.map((subDept) => (
                                <FormControlLabel
                                    sx={{ textTransform: "capitalize" }}
                                    control={<Checkbox size="small" />}
                                    label={subDept}
                                />
                            ))}
                        </FormGroup>
                    )}
                </FormGroup>
            </Box>
        );
    };

    return <div>{departmentData.map((dept) => renderDepartment(dept))}</div>;
};
