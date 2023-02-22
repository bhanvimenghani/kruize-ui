/* eslint-disable no-console */
import React, { useState } from 'react';
import {
    TableComposable,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    ExpandableRowContent,
    ActionsColumn,
    IAction
} from '@patternfly/react-table';
import { Tab, Tabs, TabTitleText, TextContent, TextVariants, Text } from '@patternfly/react-core';

interface Table {
    srno: string;
    experimentname: string;
    namespace: string;
    deployment: string;
    status: string;
    nestedComponent?: React.ReactNode;
    noPadding?: boolean;
}
interface cpuColumns {
    cpuRequestSum: string | null,
    cpuRequestAvg: string | null,

    cpuLimitsSum: string | null,
    cpuLimitsAvg: string | null,

    cpuUsageSum: string | null,
    cpuUsageAvg: string | null,
    cpuUsageMin: string | null,
    cpuUsageMax: string | null,

    cpuThrottleSum: string | null,
    cpuThrottleAvg: string | null,
    cpuThrottleMax: string | null
}

const CPUMetricsTable = () => {
    const cpuData: cpuColumns[] = [
        {
            cpuRequestSum: '16.11',
            cpuRequestAvg: '5.37',

            cpuLimitsSum: '24',
            cpuLimitsAvg: '8',

            cpuUsageSum: '9.23642774156611',
            cpuUsageAvg: '3.0788092471887',
            cpuUsageMin: '0.122641301400588',
            cpuUsageMax: '4.05884393815185',

            cpuThrottleSum: '0.00125369576092',
            cpuThrottleAvg: ' 4.17898586973E-4',
            cpuThrottleMax: ' 0.00125369576092'
        },
    ];

    const cpuColumns = {
        cpuRequestSum: 'Sum',
        cpuRequestAvg: 'Average',

        cpuLimitsSum: 'Sum',
        cpuLimitsAvg: 'Average',

        cpuUsageSum: 'Sum',
        cpuUsageAvg: 'Average',
        cpuUsageMin: 'Min',
        cpuUsageMax: 'Max',

        cpuThrottleSum: 'Sum',
        cpuThrottleAvg: 'Average',
        cpuThrottleMax: 'Max'
    }
    return (
        <TableComposable aria-label="Nested column headers table" gridBreakPoint="" isStickyHeader>
            <Thead hasNestedHeader>
                <Tr>
                    <Th hasRightBorder colSpan={2}>
                        CPU Request
                    </Th>
                    <Th hasRightBorder colSpan={2}>
                        CPU Limits
                    </Th>
                    <Th hasRightBorder colSpan={4} >
                        CPU Usage
                    </Th>
                    <Th hasRightBorder colSpan={3}>
                        CPU Throttle
                    </Th>
                </Tr>

                <Tr>
                    <Th isSubheader modifier="fitContent" hasRightBorder>
                        {cpuColumns.cpuRequestSum}
                    </Th>
                    <Th isSubheader modifier="fitContent" hasRightBorder>
                        {cpuColumns.cpuRequestAvg}
                    </Th>
                    <Th isSubheader modifier="fitContent" hasRightBorder>
                        {cpuColumns.cpuLimitsSum}
                    </Th>
                    <Th isSubheader modifier="fitContent" hasRightBorder>
                        {cpuColumns.cpuLimitsAvg}
                    </Th>
                    <Th isSubheader modifier="fitContent" hasRightBorder>
                        {cpuColumns.cpuUsageSum}
                    </Th>
                    <Th isSubheader modifier="fitContent" hasRightBorder>
                        {cpuColumns.cpuUsageAvg}
                    </Th>
                    <Th isSubheader modifier="fitContent" hasRightBorder>
                        {cpuColumns.cpuUsageMin}
                    </Th>
                    <Th isSubheader modifier="fitContent" hasRightBorder>
                        {cpuColumns.cpuUsageMax}
                    </Th>
                    <Th isSubheader modifier="fitContent" hasRightBorder>
                        {cpuColumns.cpuThrottleSum}
                    </Th>
                    <Th isSubheader modifier="fitContent" hasRightBorder>
                        {cpuColumns.cpuThrottleAvg}
                    </Th>
                    <Th isSubheader modifier="fitContent" hasRightBorder>
                        {cpuColumns.cpuThrottleMax}
                    </Th>
                </Tr>
                <Tr isBorderRow aria-hidden="true">
                    <Td colSpan={11}></Td>
                </Tr>
            </Thead>
            <Tbody>
                {cpuData.map(connection => (
                    <Tr key="CPU Request">
                        <Td dataLabel={cpuColumns.cpuRequestSum}>{connection.cpuRequestSum}</Td>
                        <Td dataLabel={cpuColumns.cpuRequestAvg}>{connection.cpuRequestAvg}</Td>
                        <Td dataLabel={cpuColumns.cpuLimitsSum}>{connection.cpuLimitsSum}</Td>
                        <Td dataLabel={cpuColumns.cpuLimitsAvg}>{connection.cpuLimitsAvg}</Td>
                        <Td dataLabel={cpuColumns.cpuUsageSum}>{connection.cpuUsageSum}</Td>
                        <Td dataLabel={cpuColumns.cpuUsageAvg}>{connection.cpuUsageAvg}</Td>
                        <Td dataLabel={cpuColumns.cpuUsageMin}>{connection.cpuUsageMin}</Td>
                        <Td dataLabel={cpuColumns.cpuUsageMax}>{connection.cpuUsageMax}</Td>
                        <Td dataLabel={cpuColumns.cpuThrottleSum}>{connection.cpuThrottleSum}</Td>
                        <Td dataLabel={cpuColumns.cpuThrottleAvg}>{connection.cpuThrottleAvg}</Td>
                        <Td dataLabel={cpuColumns.cpuThrottleMax}>{connection.cpuThrottleMax}</Td>
                    </Tr>
                ))}
            </Tbody>
        </TableComposable>
    )
}
const MMRMetricsTable = () => {

}

const TabOptions = () => {
    const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
    const handleTabClick = (
        event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
        tabIndex: string | number
    ) => {
        setActiveTabKey(tabIndex);
    };

    return (
        <> <TextContent>
            <Text component={TextVariants.h3}>Monitoring Data</Text>
        </TextContent>
            <br />
            <Tabs
                isFilled
                activeKey={activeTabKey}
                onSelect={handleTabClick}
                isBox={true}
                aria-label="Tabs in the filled example"
                role="region"
            >
                <Tab eventKey={0} title={<TabTitleText>CPU Container Metrics</TabTitleText>} aria-label="Tabs filled example content users">
                    <br />{CPUMetricsTable()}
                </Tab>
                <Tab eventKey={1} title={<TabTitleText>Memory Container Metrics</TabTitleText>}>
                    Containers
                </Tab>
            </Tabs>
        </>
    )
}

const MonitoringTable = () => {
    // In real usage, this data would come from some external source like an API via props.
    const tables: Table[] = [
        { srno: '1', experimentname: 'quarkus-resteasy-autotune-min-http-response-time-db4', namespace: 'default', deployment: 'tfb-qrh-sample', status: 'active', nestedComponent: <><TabOptions /></> },
        { srno: '2', experimentname: 'quarkus-resteasy-kruize-min-http-response-time-db_3', namespace: 'default_3', deployment: 'tfb-qrh-sample_3', status: 'active' },
        {
            srno: '3',
            experimentname: 'quarkus-resteasy-kruize-min-http-response-time-db_0',
            namespace: 'default_0',
            deployment: 'tfb-qrh-sample_0',
            status: 'active',
            nestedComponent: (
                <p>
                    Loading Monitoring Data...
                </p>
            )

        },
        {
            srno: '4',
            experimentname: 'quarkus-resteasy-kruize-min-http-response-time-db_5',
            namespace: 'default_5',
            deployment: 'tfb-qrh-sample_5',
            status: 'active',
            nestedComponent: 'Loading Monitoring Data...'

        }
    ];

    const columnNames = {
        srno: 'Sr. No.',
        experimentname: 'Experiment Name',
        namespace: 'Namespace',
        deployment: 'Deployments',
        status: 'Status'
    };
    // In this example, expanded rows are tracked by the repo names from each row. This could be any unique identifier.
    // This is to prevent state from being based on row order index in case we later add sorting.
    // Note that this behavior is very similar to selection state.
    const initialExpandedRepoNames = tables.filter(repo => !!repo.nestedComponent).map(repo => repo.srno); // Default to all expanded
    const [expandedRepoNames, setExpandedRepoNames] = React.useState<string[]>(initialExpandedRepoNames);
    const setRepoExpanded = (repo: Table, isExpanding = true) =>
        setExpandedRepoNames(prevExpanded => {
            const otherExpandedRepoNames = prevExpanded.filter(r => r !== repo.srno);
            return isExpanding ? [...otherExpandedRepoNames, repo.srno] : otherExpandedRepoNames;
        });
    const isRepoExpanded = (repo: Table) => expandedRepoNames.includes(repo.srno);
    return (
        <TableComposable aria-label="Simple table">
            <Thead>
                <Tr>
                    <Td />
                    <Th width={20}>{columnNames.srno}</Th>
                    <Th>{columnNames.experimentname}</Th>
                    <Th>{columnNames.namespace}</Th>
                    <Th>{columnNames.deployment}</Th>
                    <Th>{columnNames.status}</Th>
                </Tr>
            </Thead>
            {tables.map((repo, rowIndex) => (
                <Tbody key={repo.srno} isExpanded={isRepoExpanded(repo)}>
                    <Tr>
                        <Td
                            expand={
                                repo.nestedComponent
                                    ? {
                                        rowIndex,
                                        isExpanded: isRepoExpanded(repo),
                                        onToggle: () => setRepoExpanded(repo, !isRepoExpanded(repo)),
                                        expandId: 'composable-nested-table-expandable-example'
                                    }
                                    : undefined
                            }
                        />
                        <Td dataLabel={columnNames.srno}>{repo.srno}</Td>
                        <Td dataLabel={columnNames.experimentname}>{repo.experimentname}</Td>
                        <Td dataLabel={columnNames.namespace}>{repo.namespace}</Td>
                        <Td dataLabel={columnNames.deployment}>{repo.deployment}</Td>
                        <Td dataLabel={columnNames.status}>{repo.status}</Td>
                    </Tr>
                    {repo.nestedComponent ? (
                        <Tr isExpanded={isRepoExpanded(repo)}>
                            <Td
                                noPadding={repo.noPadding}
                                dataLabel={`${columnNames.srno} expended`}
                                colSpan={Object.keys(columnNames).length + 1}
                            >
                                <ExpandableRowContent>{repo.nestedComponent}</ExpandableRowContent>
                            </Td>
                        </Tr>
                    ) : null}
                </Tbody>
            ))}
        </TableComposable>
    );
};

export { MonitoringTable }