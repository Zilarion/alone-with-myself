import {
    Table as MaterialTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';

import styled from '../themed-components';

const NoDataWrapper = styled.div`
    width: 100%;
    text-align: center;
    color: ${p => p.theme.color.primary};
`;

type Alignment = 'left' | 'right';

interface TableProps {
    headers?: string[];
    align?: Alignment[];
    data: (string | JSX.Element)[][];
}

const StyledTableCell = styled(TableCell)`
    border-bottom: none;
`;

export function Table({
    headers,
    data,
    align,
}: TableProps) {
    if (data.length === 0) {
        return <NoDataWrapper>No data</NoDataWrapper>;
    }

    const width = Math.floor(100 / data[0].length);

    const header = headers ?
        headers?.map((value, idx) =>
            <TableCell
                width={width}
                key={idx}
                align={align?.[idx]}
            >
                {value}
            </TableCell>,
        ) : undefined;

    const content = data.map((row, idx) =>
        <TableRow key={idx}>{
            row.map((cell, cellIdx) =>
                <StyledTableCell
                    width={width}
                    key={cellIdx}
                    align={align?.[cellIdx]}
                >
                    {cell}
                </StyledTableCell>,
            )}
        </TableRow>,
    );

    return <MaterialTable size="small">
        <TableHead><TableRow>{header}</TableRow></TableHead>
        <TableBody>{content}</TableBody>
    </MaterialTable>;
}
