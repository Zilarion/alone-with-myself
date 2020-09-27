import * as React from 'react';

import styled from '../themed-components';

const StyledCell = styled.div<{ width: number }>`
    box-sizing: border-box;
    flex-grow: 1;
    padding: ${p => p.theme.margin.tiny} 0;
    overflow: hidden;
    list-style: none;
    width: ${p => p.width}%;
    color: ${p => p.theme.color.primary};
`;

const StyledTable = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
`;

const StyledHeader = styled(StyledCell)`
    color: ${p => p.theme.color.header};
    border-bottom: 1px solid ${p => p.theme.color.border};
`;

const NoDataWrapper = styled.div`
    width: 100%;
    text-align: center;
    color: ${p => p.theme.color.primary};
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
        return <NoDataWrapper>No data</NoDataWrapper>;
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
