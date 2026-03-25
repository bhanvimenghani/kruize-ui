import React, { useEffect, useState } from 'react';
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  TextVariants,
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Modal,
  ModalVariant,
  Alert,
  Flex,
  FlexItem
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { PlusCircleIcon, TrashIcon, EditIcon } from '@patternfly/react-icons';
import { useHistory } from 'react-router-dom';

interface Layer {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
  };
  layer_name: string;
  layer_level: number;
  details: string;
}

const LayersList = () => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();

  // Mock data for demonstration
  useEffect(() => {
    fetchLayers();
  }, []);

  const fetchLayers = async () => {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/layers');
    // const data = await response.json();

    // Mock data
    const mockLayers: Layer[] = [
      {
        apiVersion: 'recommender.com/v1',
        kind: 'KruizeLayer',
        metadata: {
          name: 'hotspot'
        },
        layer_name: 'hotspot',
        layer_level: 1,
        details: 'hotspot tunables'
      },
      {
        apiVersion: 'recommender.com/v1',
        kind: 'KruizeLayer',
        metadata: {
          name: 'quarkus'
        },
        layer_name: 'quarkus',
        layer_level: 2,
        details: 'quarkus framework tunables'
      }
    ];
    setLayers(mockLayers);
  };

  const handleCreateLayer = () => {
    history.push('/create-layer');
  };

  const handleEditLayer = (layerName: string) => {
    history.push(`/edit-layer/${layerName}`);
  };

  const handleDeleteClick = (layerName: string) => {
    setSelectedLayer(layerName);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/layers/${selectedLayer}`, { method: 'DELETE' });

      setLayers(layers.filter(layer => layer.layer_name !== selectedLayer));
      setAlertMessage(`Layer "${selectedLayer}" deleted successfully`);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } catch (error) {
      setAlertMessage('Failed to delete layer');
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 3000);
    }
    setIsDeleteModalOpen(false);
    setSelectedLayer(null);
  };

  const columnNames = {
    name: 'Layer Name',
    details: 'Details',
    apiVersion: 'API Version',
    actions: 'Actions'
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      {showSuccessAlert && (
        <Alert variant="success" title={alertMessage} isInline />
      )}
      {showErrorAlert && (
        <Alert variant="danger" title={alertMessage} isInline />
      )}

      <Flex alignItems={{ default: 'alignItemsFlexStart' }}>
        <FlexItem flex={{ default: 'flex_1' }}>
          <TextContent>
            <Text component={TextVariants.h1}>Layers</Text>
            <Text component={TextVariants.p}>
              Manage Kruize layers for application tuning and optimization
            </Text>
          </TextContent>
        </FlexItem>
        <FlexItem style={{ marginRight: '20px' }}>
          <Button
            variant="primary"
            icon={<PlusCircleIcon />}
            onClick={handleCreateLayer}
          >
            Create Layer
          </Button>
        </FlexItem>
      </Flex>

      <br />

      <Table aria-label="Layers table" variant="compact">
        <Thead>
          <Tr>
            <Th>{columnNames.name}</Th>
            <Th>{columnNames.details}</Th>
            <Th>{columnNames.apiVersion}</Th>
            <Th>{columnNames.actions}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {layers.length === 0 ? (
            <Tr>
              <Td colSpan={4}>
                <TextContent>
                  <Text component={TextVariants.p}>No layers found. Create a new layer to get started.</Text>
                </TextContent>
              </Td>
            </Tr>
          ) : (
            layers.map((layer, index) => (
              <Tr key={index}>
                <Td dataLabel={columnNames.name}>{layer.layer_name}</Td>
                <Td dataLabel={columnNames.details}>{layer.details}</Td>
                <Td dataLabel={columnNames.apiVersion}>{layer.apiVersion}</Td>
                <Td dataLabel={columnNames.actions}>
                  <Button
                    variant="link"
                    icon={<EditIcon />}
                    onClick={() => handleEditLayer(layer.layer_name)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    isDanger
                    icon={<TrashIcon />}
                    onClick={() => handleDeleteClick(layer.layer_name)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      <Modal
        variant={ModalVariant.small}
        title="Delete Layer"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        actions={[
          <Button key="confirm" variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>,
          <Button key="cancel" variant="link" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
        ]}
      >
        Are you sure you want to delete the layer <strong>{selectedLayer}</strong>? This action cannot be undone.
      </Modal>
    </PageSection>
  );
};

export { LayersList };
