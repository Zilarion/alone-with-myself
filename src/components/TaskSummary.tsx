import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';

import { PrintTask } from '../models/PrintTask';
import styled from '../themed-components';
import { Table } from './Table';

interface TaskSummaryProps {
    tasks: PrintTask[];
}

const StyledInput = styled.input`
    width: 100%;
`;

export const TaskSummary = observer(({ tasks }: TaskSummaryProps) => {
    const data = tasks.map((task) => [
        <label key={0} htmlFor={task.name}> { task.name }</label>,
        <StyledInput
            key={1}
            type="range"
            id={task.name}
            name={task.name}
            min="0"
            max="100"
            onChange={(event) => {
                task.percentageOfTotal = Number.parseFloat(event.target.value);
            }}
            value={task.percentageOfTotal}
        />,
        <FormattedNumber
            key={2}
            value={task.progress / task.durationPerItem}
            style="percent"
        />,
    ]);

    return <Table
        data={data}
        headers={[ 'Name', 'Production', 'Progress' ]}
        align={[ 'left', 'left', 'right' ]}
    />;
});
