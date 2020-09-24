import * as React from 'react';

import styled from '../themed-components';

const StyledCell = styled.div<{ width: number }>`
    box-sizing: border-box;
    flex-grow: 1;
    padding: ${p => p.theme.margin.tiny};
    overflow: hidden;
    list-style: none;
    width: ${p => p.width}%;
    color: ${p => p.theme.color.primary};
    border-bottom: 1px solid ${p => p.theme.color.primaryLight};
`;

const StyledTable = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 0 3em 0;
    padding: 0;
`;

const StyledHeader = styled(StyledCell)`
    color: ${p => p.theme.color.header};
`;

interface TableProps {
    headers?: string[];
    data: (string | JSX.Element)[][];
}

export function Table({
    headers,
    data,
}: TableProps) {
    if (data.length === 0) {
        return 'No data';
    }

    const width = Math.floor(100 / data[0].length);

    const header = headers ?
            headers?.map((value, idx) =>
                <StyledHeader
                    width={width}
                    key={idx}
                >
                    {value}
                </StyledHeader>
            ) : undefined;

    const content = data.map((row) =>
        row.map((cell, cellIdx) =>
            <StyledCell
                width={width}
                key={cellIdx}
            >
                {cell}
            </StyledCell>,
        ),
    );

    return <StyledTable>
        {header}
        {content}
    </StyledTable>;
}
