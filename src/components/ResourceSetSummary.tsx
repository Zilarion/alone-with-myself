import { ResourceSet } from '../models/types/ResourceSet';
import { FormattedResource } from './FormattedResource';
import { Table } from './Table';

interface ResourceSetSummaryProps {
    resources: ResourceSet;
    showHeader?: boolean;
    compact?: boolean;
}

export const ResourceSetSummary = (props: ResourceSetSummaryProps) => {
    const data = () => {
        return props.resources.map((resource) => [
            resource.type,
            <FormattedResource
                value={resource.amount}
                type={resource.type}
                compact={props.compact}
            />,
        ]);
    };

    return <Table
        headers={props.showHeader ? [ 'Resource', 'Amount', 'Production' ] : []}
        data={data()}
    />;
};
