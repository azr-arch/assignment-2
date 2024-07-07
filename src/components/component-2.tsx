import { useState } from "react";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { Box, Checkbox, FormGroup, FormControlLabel, IconButton, Stack } from "@mui/material";

// Sample data (similar to your attached version)
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
    const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);

    // Handle the expansion of department tree
    const handleExpand = (department: string) => {
        setExpandedDepartments((prevExpanded) =>
            prevExpanded.includes(department)
                ? prevExpanded.filter((dep) => dep !== department)
                : [...prevExpanded, department]
        );
    };

    const handleCheckboxChange = (department: string) => {
        setSelectedDepartment((prevSelected) => {
            const isSelected = prevSelected.includes(department);
            const updatedSelected = new Set(prevSelected);

            if (isSelected) {
                // If the current department was already selected, remove it from the set
                updatedSelected.delete(department);
            } else {
                // If the current department was to be selected, add it to the set
                updatedSelected.add(department);
            }

            // Find the parent department
            const parentDept = departmentData.find((d) => d.department === department);

            if (parentDept) {
                // Handle sub-departments of the parent
                parentDept.sub_departments.forEach((subDep) => {
                    if (isSelected) {
                        // If the parent was deselected, remove sub-departments
                        updatedSelected.delete(subDep);
                    } else {
                        // If the parent was selected, add sub-departments
                        updatedSelected.add(subDep);
                    }
                });
            } else {
                // If a sub-department is selected, find its parent
                const parentDeptOfSelectedChild = departmentData.find((d) =>
                    d.sub_departments.includes(department)
                );

                if (parentDeptOfSelectedChild) {
                    // Check if all child sub-departments are selected
                    const allSubDeptsSelected = parentDeptOfSelectedChild.sub_departments.every(
                        (subDep) => updatedSelected.has(subDep)
                    );

                    if (allSubDeptsSelected) {
                        // Mark the parent as selected too
                        updatedSelected.add(parentDeptOfSelectedChild.department);
                    } else {
                        // If any sub-department is deselected, remove the parent
                        updatedSelected.delete(parentDeptOfSelectedChild.department);
                    }
                }
            }

            // Convert the set back to an array and return
            return Array.from(updatedSelected);
        });
    };

    const renderDepartment = (dept: (typeof departmentData)[number]) => {
        // Check if the department is expanded or collapsed
        const isExpanded = expandedDepartments.includes(dept.department);
        // Check if the department is selected
        const isSelected = selectedDepartment.includes(dept.department);

        return (
            <Box key={dept.department}>
                <FormGroup>
                    <Box>
                        <IconButton onClick={() => handleExpand(dept.department)}>
                            {isExpanded ? (
                                <ExpandMore fontSize={"small"} />
                            ) : (
                                <ChevronRight fontSize={"small"} />
                            )}
                        </IconButton>
                        <FormControlLabel
                            sx={{ textTransform: "capitalize" }}
                            control={
                                <Checkbox
                                    size="small"
                                    onChange={() => handleCheckboxChange(dept.department)}
                                    checked={isSelected}
                                />
                            }
                            label={dept.department}
                        />
                    </Box>
                    {isExpanded && (
                        <Stack sx={{ marginLeft: "4rem" }}>
                            {dept.sub_departments.map((subDept, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    sx={{ textTransform: "capitalize" }}
                                    control={
                                        <Checkbox
                                            size="small"
                                            onChange={() => handleCheckboxChange(subDept)}
                                            checked={selectedDepartment.includes(subDept)}
                                        />
                                    }
                                    label={subDept}
                                />
                            ))}
                        </Stack>
                    )}
                </FormGroup>
            </Box>
        );
    };

    return <div>{departmentData.map((dept) => renderDepartment(dept))}</div>;
};
