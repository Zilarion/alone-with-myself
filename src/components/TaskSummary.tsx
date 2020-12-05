import { useTheme } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { FiberManualRecord } from '@material-ui/icons';

import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';

import { PrintTask } from '../models/PrintTask';
import { assert } from '../util';
import { Table } from './Table';

interface TaskSummaryProps {
    tasks: PrintTask[];
}

export const TaskSummary = observer(({ tasks }: TaskSummaryProps) => {
    const totalPercentage = tasks.reduce((current, { percentageOfTotal }) => current + percentageOfTotal, 0);
    const percentageLeft = 100 - totalPercentage;

    const {
        success,
        error,
    } = useTheme().palette;

    const data = tasks.map((task) => [
        <FiberManualRecord key={0} htmlColor={task.active ? success.main : error.main} />,
        <label key={1} htmlFor={task.name}> { task.name }</label>,
        <Slider
            key={2}
            id={task.name}
            step={5}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            onChange={(_, newValue) => {
                assert(!Array.isArray(newValue), 'Expected slider to provide a single value');
                task.percentageOfTotal = Math.min(newValue, percentageLeft + task.percentageOfTotal);
            }}
            value={task.percentageOfTotal}
        />,
        <FormattedNumber
            key={3}
            value={task.progress / task.durationPerItem}
            style="percent"
        />,
    ]);

    return <Table
        data={data}
        headers={[ '', 'Name', 'Production', 'Progress' ]}
        align={[ 'left', 'left', 'left', 'right' ]}
    />;
});
