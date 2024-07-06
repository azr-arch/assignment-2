import { ApiDataType } from "../hooks/use-fetch";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface TableProps {
    data: ApiDataType[];
}

export const Table = ({ data }: TableProps) => {
    const rowItems: GridRowsProp = data.map((item) => ({
        id: item.id,
        col1: item.title,
        col2: item.completed,
    }));

    const colItems: GridColDef[] = [
        { field: "col1", headerName: "Title", width: 300 },
        { field: "col2", headerName: "Completed", width: 100 },
    ];

    return (
        <div style={{ height: 500, width: "100%" }}>
            <DataGrid rows={rowItems} columns={colItems} />
        </div>
    );
};
