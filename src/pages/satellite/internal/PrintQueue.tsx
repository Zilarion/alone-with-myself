import {
    List,
    ListItem,
    ListItemText,
    styled,
} from '@mui/material';
import { observer } from 'mobx-react-lite';

import { CircularProgressWithLabel } from '../../../components/CircularProgressWithLabel';
import { Printers } from '../../../models/Printers';

interface PrintQueueProps {
    printers: Printers;
}

const StyledListItem = styled(ListItem)`
    display: flex;
    gap: ${p => p.theme.spacing(2)};
`;

const StyledList = styled(List)`
    overflow: scroll;
`;

export const PrintQueue = observer(({ printers: { tasks } }: PrintQueueProps) => {
    return <StyledList>
        {tasks.map((task, idx) =>
            <StyledListItem
                disableGutters
                key={idx}
            >
                <CircularProgressWithLabel
                    variant="determinate"
                    value={task.progressPercentage * 100}
                />
                <ListItemText
                    primary={task.printable.id}
                    secondary={`Printing ${task.count}`}
                />
            </StyledListItem>)}
    </StyledList>;
});
