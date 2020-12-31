
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { Transporter } from '../internal';
import { Card } from './Card';
import { MultipleSelector } from './MultipleSelector';
import { ResourceSetSpeedSummary } from './ResourceSetSpeedSummary';

interface TransporterActionsProps {
    transporter: Transporter;
}

export const TransporterActions = observer(({
    transporter: {
        speedOf,
        setSpeedPerSecond,
        from,
    },
}: TransporterActionsProps) => {
    const [ amount, setAmount ] = useState(1);
    return <Card header="Transport route">
        <MultipleSelector
            onChange={(newValue) => setAmount(newValue)}
            value={amount}
        />
        <ResourceSetSpeedSummary
            speedOf={speedOf}
            resources={from.storage.resources}
            setSpeed={setSpeedPerSecond}
            changePerClick={amount}
        />
    </Card>;

});
