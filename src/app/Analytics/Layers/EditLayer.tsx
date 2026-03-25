import React, { useState, useEffect } from 'react';
import {
  PageSection,
  TextContent,
  Text,
  TextVariants,
  PageSectionVariants,
  Button,
  Alert,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Breadcrumb,
  BreadcrumbItem,
  Spinner
} from '@patternfly/react-core';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import { useHistory, useParams } from 'react-router-dom';

export const EditLayer = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const { layerName } = useParams<{ layerName: string }>();

  useEffect(() => {
    fetchLayerData();
  }, [layerName]);

  const fetchLayerData = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/layers/${layerName}`);
      // const data = await response.json();
      // setCode(JSON.stringify(data, null, 2));

      // Mock data
      const mockLayer = {
        apiVersion: 'recommender.com/v1',
        kind: 'KruizeLayer',
        metadata: {
          name: layerName
        },
        layer_name: layerName,
        layer_level: 1,
        details: 'hotspot tunables',
        layer_presence: {
          queries: [
            {
              datasource: 'prometheus',
              query: 'jvm_memory_used_bytes{area="heap",id=~".+Eden.+"}',
              key: 'pod'
            }
          ]
        },
        tunables: [
          {
            name: 'GCPolicy',
            description: 'Garbage collection policy',
            value_type: 'categorical',
            choices: ['G1GC', 'ParallelGC', 'SerialGC', 'ShenandoahGC', 'ZGC']
          }
        ]
      };

      setCode(JSON.stringify(mockLayer, null, 2));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching layer:', error);
      setErrorMessage('Failed to load layer data');
      setShowErrorAlert(true);
      setLoading(false);
    }
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleUpdateLayer = async () => {
    try {
      // Validate JSON
      const layerData = JSON.parse(code);

      // TODO: Replace with actual API call
      // const response = await fetch(`/api/layers/${layerName}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: code
      // });

      console.log('Updating layer with data:', layerData);

      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setTimeout(() => {
        setShowSuccessAlert(false);
        history.push('/layers');
      }, 2000);
    } catch (error) {
      console.error('Invalid JSON:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Invalid JSON format. Please check your syntax.');
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => setShowErrorAlert(false), 5000);
    }
  };

  const handleCancel = () => {
    history.push('/layers');
  };

  if (loading) {
    return (
      <PageSection variant={PageSectionVariants.light}>
        <Spinner size="lg" />
        <Text component={TextVariants.p}>Loading layer data...</Text>
      </PageSection>
    );
  }

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Breadcrumb>
        <BreadcrumbItem to="/layers">Layers</BreadcrumbItem>
        <BreadcrumbItem isActive>Edit Layer: {layerName}</BreadcrumbItem>
      </Breadcrumb>
      <br />

      <TextContent>
        <Text component={TextVariants.h1}>Edit Layer: {layerName}</Text>
        <Text component={TextVariants.p}>
          Update the layer configuration. Modify the JSON below to change tunables and presence queries.
        </Text>
      </TextContent>
      <br />

      {showSuccessAlert && (
        <Alert variant="success" title="Layer updated successfully! Redirecting..." isInline />
      )}

      {showErrorAlert && (
        <Alert variant="danger" title={errorMessage} isInline />
      )}

      <br />

      <CodeEditor
        code={code}
        onChange={handleCodeChange}
        language={Language.json}
        height="600px"
        options={{
          lineNumbers: 'on',
          readOnly: false,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontSize: 14,
          tabSize: 2,
          formatOnPaste: true,
          formatOnType: true
        }}
      />

      <br />
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <Button variant="primary" onClick={handleUpdateLayer}>
              Update Layer
            </Button>
          </ToolbarItem>
          <ToolbarItem>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    </PageSection>
  );
};
