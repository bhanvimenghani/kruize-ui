import React from 'react';
import { TextContent, Text, Level, LevelItem, Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import { Table, TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { Link } from 'react-router-dom';
// import { useNavigate} from 'react-router-dom';

const NspTableComponent = () => {
  const columnNames = {
    cluster_name: 'Cluster Name',
    classification: 'Classification',
    idle: 'idle',
    optimized: 'optimized',
    critical: 'critical',
    optimizable: 'optimizable',
    variation: 'Tariation',
    cpu: 'cpu',
    mem: 'memory',
    charts: 'Charts',
    total: 'Total',
    namespace: 'Namespace'
  };

  const cluster_summ_data = [
    {
      cluster_name: 'cluster 1',
      classification: { idle: 3, optimized: 10, optimizable: 33, critical: 4 },
      variation: { cpu: 0.6, memory: 4201 },
      charts: 'ee'
    },
    {
      cluster_name: 'cluster 2',
      classification: { idle: 3, optimized: 10, optimizable: 33, critical: 4 },
      variation: { cpu: 0.6, memory: 4201 },
      charts: 'ee'
    },
    {
      cluster_name: 'cluster 3',
      classification: { idle: 3, optimized: 10, optimizable: 33, critical: 4 },
      variation: { cpu: 0.6, memory: 4201 },
      charts: 'ee'
    },
    {
      cluster_name: 'cluster 4',
      classification: { idle: 3, optimized: 10, optimizable: 33, critical: 4 },
      variation: { cpu: 0.6, memory: 4201 },
      charts: 'ee'
    },
    {
      cluster_name: 'cluster 5',
      classification: { idle: 3, optimized: 10, optimizable: 33, critical: 4 },
      variation: { cpu: 0.6, memory: 4201 },
      charts: 'ee'
    },
    {
      cluster_name: 'cluster 6',
      classification: { idle: 3, optimized: 10, optimizable: 33, critical: 4 },
      variation: { cpu: 0.6, memory: 4201 },
      charts: 'ee'
    }
  ];
  const [activeSortIndex, setActiveSortIndex] = React.useState<number | null>(null);

  // Sort direction of the currently sorted column
  const [activeSortDirection, setActiveSortDirection] = React.useState<'asc' | 'desc' | null>(null);

  const getSortableRowValues = (repo: cluster_summ_data): (string | number)[] => {
    const { name, branches, prs, workspaces, lastCommit } = repo;
    return [name, branches, prs, workspaces, lastCommit];
  };

  let sortedRepositories = cluster_summ_data;
  if (activeSortIndex !== null) {
    sortedRepositories = cluster_summ_data.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex];
      const bValue = getSortableRowValues(b)[activeSortIndex];
      if (typeof aValue === 'number') {
        // Numeric sort
        if (activeSortDirection === 'asc') {
          return (aValue as number) - (bValue as number);
        }
        return (bValue as number) - (aValue as number);
      } else {
        // String sort
        if (activeSortDirection === 'asc') {
          return (aValue as string).localeCompare(bValue as string);
        }
        return (bValue as string).localeCompare(aValue as string);
      }
    });
  }

  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection,
      defaultDirection: 'asc' // starting sort direction when first sorting a column. Defaults to 'asc'
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex
  });

  return (
    <React.Fragment>
      <TableComposable aria-label="Nested column headers table" gridBreakPoint="" isStickyHeader>
        <Thead hasNestedHeader>
          <Tr>
            <Th hasRightBorder textCenter colSpan={1} sort={getSortParams(0)}>
              {columnNames.cluster_name}
            </Th>
            <Th hasRightBorder textCenter colSpan={1} sort={getSortParams(0)}>
              {columnNames.namespace}
            </Th>
            <Th hasRightBorder textCenter colSpan={1}>
              {columnNames.total}
            </Th>
            <Th hasRightBorder textCenter colSpan={4}>
              {columnNames.classification}
            </Th>

            <Th hasRightBorder textCenter colSpan={2}>
              {columnNames.variation}
            </Th>
          </Tr>

          <Tr>
            <Th hasRightBorder />
            <Th hasRightBorder />
            <Th hasRightBorder />
            <Th isSubheader hasRightBorder textCenter sort={getSortParams(1)}>
              {columnNames.critical}
            </Th>
            <Th isSubheader hasRightBorder textCenter sort={getSortParams(1)}>
              {columnNames.idle}
            </Th>
            <Th isSubheader hasRightBorder textCenter sort={getSortParams(1)}>
              {columnNames.optimizable}
            </Th>
            <Th isSubheader hasRightBorder textCenter sort={getSortParams(1)}>
              {columnNames.optimized}
            </Th>

            <Th isSubheader hasRightBorder textCenter sort={getSortParams(1)}>
              {columnNames.cpu}
            </Th>
            <Th isSubheader hasRightBorder textCenter sort={getSortParams(1)}>
              {columnNames.mem}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td dataLabel={columnNames.cluster_name} textCenter>
              {/* {cluster_summ_data.cluster_name} */}
              cluster 1
            </Td>

            <Td dataLabel={columnNames.namespace} textCenter>
              {/* {cluster_summ_data.cluster_name} */}
              advisor-stage
            </Td>
            <Td dataLabel={columnNames.total} textCenter>
              {/* {cluster_summ_data.} */}
              80
            </Td>
            <Td dataLabel={columnNames.idle} textCenter>
              {/* {cluster_summ_data.classification.idle} */}
              20
            </Td>
            <Td dataLabel={columnNames.optimized} textCenter>
              {/* {cluster_summ_data.name} */}
              20
            </Td>
            <Td dataLabel={columnNames.critical} textCenter>
              {/* {cluster_summ_data.} */}
              20
            </Td>
            <Td dataLabel={columnNames.optimizable} textCenter>
              {/* {cluster_summ_data.} */}
              20
            </Td>

            <Td dataLabel={columnNames.cpu} textCenter>
              {/* {cluster_summ_data.} */}
              1.574 cores
            </Td>
            <Td dataLabel={columnNames.mem} textCenter>
              {/* {cluster_summ_data.} */}
              620 MiB
            </Td>
          </Tr>
          <Tr>
            <Td dataLabel={columnNames.cluster_name} textCenter>
              {/* {cluster_summ_data.cluster_name} */}
              cluster 1
            </Td>
            <Td dataLabel={columnNames.namespace} textCenter>
              {/* {cluster_summ_data.cluster_name} */}
              blackbox-monitor-stage
            </Td>
            <Td dataLabel={columnNames.total} textCenter>
              {/* {cluster_summ_data.} */}
              50
            </Td>
            <Td dataLabel={columnNames.idle} textCenter>
              {/* {cluster_summ_data.classification.idle} */}5
            </Td>
            <Td dataLabel={columnNames.optimized} textCenter>
              {/* {cluster_summ_data.name} */}
              25
            </Td>
            <Td dataLabel={columnNames.critical} textCenter>
              {/* {cluster_summ_data.} */}10
            </Td>
            <Td dataLabel={columnNames.optimizable} textCenter>
              {/* {cluster_summ_data.} */}10
            </Td>

            <Td dataLabel={columnNames.cpu} textCenter>
              {/* {cluster_summ_data.} */}0.196 cores
            </Td>
            <Td dataLabel={columnNames.mem} textCenter>
              {/* {cluster_summ_data.} */}
              164 MiB
            </Td>
          </Tr>

          <Tr>
            <Td dataLabel={columnNames.cluster_name} textCenter>
              {/* {cluster_summ_data.cluster_name} */}
              cluster 1
            </Td>
            <Td dataLabel={columnNames.namespace} textCenter>
              {/* {cluster_summ_data.cluster_name} */}
              cert-manager
            </Td>
            <Td dataLabel={columnNames.total} textCenter>
              {/* {cluster_summ_data.} */}
              80
            </Td>
            <Td dataLabel={columnNames.idle} textCenter>
              {/* {cluster_summ_data.classification.idle} */}
              20
            </Td>
            <Td dataLabel={columnNames.optimized} textCenter>
              {/* {cluster_summ_data.name} */}
              20
            </Td>
            <Td dataLabel={columnNames.critical} textCenter>
              {/* {cluster_summ_data.} */}
              20
            </Td>
            <Td dataLabel={columnNames.optimizable} textCenter>
              {/* {cluster_summ_data.} */}
              20
            </Td>

            <Td dataLabel={columnNames.cpu} textCenter>
              {/* {cluster_summ_data.} */}
              0.0158 cores
            </Td>
            <Td dataLabel={columnNames.mem} textCenter>
              {/* {cluster_summ_data.} */}
              824 MiB
            </Td>
          </Tr>
          <Tr>
            <Td dataLabel={columnNames.cluster_name} textCenter>
              {/* {cluster_summ_data.cluster_name} */}
              cluster 1
            </Td>
            <Td dataLabel={columnNames.namespace} textCenter>
              {/* {cluster_summ_data.cluster_name} */}
              cloud-connector-stage
            </Td>
            <Td dataLabel={columnNames.total} textCenter>
              {/* {cluster_summ_data.} */}
              80
            </Td>
            <Td dataLabel={columnNames.idle} textCenter>
              {/* {cluster_summ_data.classification.idle} */}
              20
            </Td>
            <Td dataLabel={columnNames.optimized} textCenter>
              {/* {cluster_summ_data.name} */}
              20
            </Td>
            <Td dataLabel={columnNames.critical} textCenter>
              {/* {cluster_summ_data.} */}
              20
            </Td>
            <Td dataLabel={columnNames.optimizable} textCenter>
              {/* {cluster_summ_data.} */}
              20
            </Td>

            <Td dataLabel={columnNames.cpu} textCenter>
              {/* {cluster_summ_data.} */}
              0.681 cores
            </Td>
            <Td dataLabel={columnNames.mem} textCenter>
              {/* {cluster_summ_data.} */}
              663 MiB
            </Td>
          </Tr>
          <Tr>
            <Td dataLabel={columnNames.cluster_name} textCenter>
              {/* {cluster_summ_data.cluster_name} */}
              cluster 1
            </Td>
            <Td dataLabel={columnNames.namespace} textCenter>
              {/* {cluster_summ_data.cluster_name} */}
              historical-system-profiles-stage
            </Td>
            <Td dataLabel={columnNames.total} textCenter>
              {/* {cluster_summ_data.} */}
              80
            </Td>
            <Td dataLabel={columnNames.idle} textCenter>
              {/* {cluster_summ_data.classification.idle} */}
              20
            </Td>
            <Td dataLabel={columnNames.optimized} textCenter>
              {/* {cluster_summ_data.name} */}
              20
            </Td>
            <Td dataLabel={columnNames.critical} textCenter>
              {/* {cluster_summ_data.} */}
              20
            </Td>
            <Td dataLabel={columnNames.optimizable} textCenter>
              {/* {cluster_summ_data.} */}
              20
            </Td>

            <Td dataLabel={columnNames.cpu} textCenter>
              {/* {cluster_summ_data.} */}
              0.753 cores
            </Td>
            <Td dataLabel={columnNames.mem} textCenter>
              {/* {cluster_summ_data.} */}
              1089 MiB
            </Td>
          </Tr>
          <Tr>
            <Td dataLabel={columnNames.cluster_name} textCenter>
              {/* {cluster_summ_data.cluster_name} */}
              cluster 1
            </Td>
            <Td dataLabel={columnNames.namespace} textCenter>
              {/* {cluster_summ_data.cluster_name} */}
              vulnerability-engine-stage
            </Td>
            <Td dataLabel={columnNames.total} textCenter>
              {/* {cluster_summ_data.} */}
              80
            </Td>
            <Td dataLabel={columnNames.idle} textCenter>
              {/* {cluster_summ_data.classification.idle} */}
              20
            </Td>
            <Td dataLabel={columnNames.optimized} textCenter>
              {/* {cluster_summ_data.name} */}
              20
            </Td>
            <Td dataLabel={columnNames.critical} textCenter>
              {/* {cluster_summ_data.} */}
              20
            </Td>
            <Td dataLabel={columnNames.optimizable} textCenter>
              {/* {cluster_summ_data.} */}
              20
            </Td>

            <Td dataLabel={columnNames.cpu} textCenter>
              {/* {cluster_summ_data.} */}
              1.7527 cores
            </Td>
            <Td dataLabel={columnNames.mem} textCenter>
              {/* {cluster_summ_data.} */}
              2260 MiB
            </Td>
          </Tr>
        </Tbody>
      </TableComposable>
    </React.Fragment>
  );
};

export { NspTableComponent };
