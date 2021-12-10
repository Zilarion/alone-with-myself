import styled from '@emotion/styled';
import {
    Add,
    Clear,
    Remove,
} from '@mui/icons-material';
import {
    IconButton,
    useTheme,
} from '@mui/material';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

import {
    Printable,
    PrintTask,
} from '../internal';
import { PrintableTooltip } from './PrintableTooltip';
import { ProgressButton } from './ProgressButton';

interface PrintableItemProps {
    printable: Printable;
    task: PrintTask;
    printableCount: number;
}

const ButtonList = styled.div`
    display: flex;
`;

const QueueStatus = styled.div`
    flex: 1;
`;

const QueueWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const PrintableItem = observer(({
    printable,
    task,
    printableCount,
}: PrintableItemProps) => {
    const disabled = task.maxAffordable === 0;

    const {
        palette: {
            error,
            success,
            grey,
        },
    } = useTheme();

    return <div>
        <ProgressButton
            disabled={disabled}
            fullWidth={true}
            key={0}
            onClick={action(() => {
                task.count += printableCount;
            })}
            tooltip={<PrintableTooltip printable={printable} />}
            progress={task.progressPercentage}
        >
            { task.name }
            {' '}
(
            { printable.amount }
)
        </ProgressButton>
        <QueueWrapper>
            <QueueStatus>
                Queued:
                {' '}
                { task.count }
            </QueueStatus>
            <ButtonList>
                {task.count > 1 &&
                    <IconButton
                        size="small"
                        onClick={() => task.count = 1}>
                        <Clear htmlColor={grey[400]} />
                    </IconButton>}
                {task.count > 1 &&
                    <IconButton
                        size="small"
                        onClick={() => task.count -= printableCount}>
                        <Remove htmlColor={error.main} />
                    </IconButton>}
                <IconButton
                    disabled={disabled}
                    size="small"
                    onClick={() => task.count += printableCount} >
                    <Add htmlColor={disabled ? grey[900] : success.main} />
                </IconButton>
            </ButtonList>
        </QueueWrapper>
    </div>;
});
