import React, { useState } from 'react';
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
  BreadcrumbItem
} from '@patternfly/react-core';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import { useHistory } from 'react-router-dom';

const mockLayerJSON = `{
  "apiVersion": "recommender.com/v1",
  "kind": "KruizeLayer",
  "metadata": {
    "name": "hotspot"
  },
  "layer_name": "hotspot",
  "layer_level": 1,
  "details": "hotspot tunables",
  "layer_presence": {
    "queries": [
      {
        "datasource": "prometheus",
        "query": "jvm_memory_used_bytes{area=\\"heap\\",id=~\\".+Eden.+\\"}",
        "key": "pod"
      },
      {
        "datasource": "prometheus",
        "query": "jvm_memory_used_bytes{area=\\"heap\\",id=~\\".+Tenured.+\\"}",
        "key": "pod"
      },
      {
        "datasource": "prometheus",
        "query": "jvm_memory_used_bytes{area=\\"heap\\",id=~\\".+Old.+\\"}",
        "key": "pod"
      },
      {
        "datasource": "prometheus",
        "query": "jvm_memory_used_bytes{area=\\"heap\\",id=~\\"Eden.+\\"}",
        "key": "pod"
      },
      {
        "datasource": "prometheus",
        "query": "jvm_memory_used_bytes{area=\\"heap\\",id=~\\"Tenured.+\\"}",
        "key": "pod"
      },
      {
        "datasource": "prometheus",
        "query": "jvm_memory_used_bytes{area=\\"heap\\",id=~\\"Old.+\\"}",
        "key": "pod"
      }
    ]
  },
  "tunables": [
    {
      "name": "GCPolicy",
      "description": "Garbage collection policy",
      "value_type": "categorical",
      "choices": [
        "G1GC",
        "ParallelGC",
        "SerialGC",
        "ShenandoahGC",
        "ZGC"
      ]
    },
    {
      "name": "MaxRAMPercentage",
      "description": "Maximum RAM percentage to allocate",
      "value_type": "integer",
      "lower_bound": "25",
      "upper_bound": "90",
      "step": 1,
      "units": "%"
    }
  ]
}`;

export const CreateLayer = () => {
  const [code, setCode] = useState(mockLayerJSON);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleCreateLayer = async () => {
    try {
      // Validate JSON
      const layerData = JSON.parse(code);

      // TODO: Replace with actual API call
      // const response = await fetch('/api/layers', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: code
      // });

      console.log('Creating layer with data:', layerData);

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

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Breadcrumb>
        <BreadcrumbItem to="/layers">Layers</BreadcrumbItem>
        <BreadcrumbItem isActive>Create Layer</BreadcrumbItem>
      </Breadcrumb>
      <br />

      <TextContent>
        <Text component={TextVariants.h1}>Create Layer</Text>
        <Text component={TextVariants.p}>
          Define a new Kruize layer with tunables and presence queries. Edit the JSON below to customize your layer configuration.
        </Text>
      </TextContent>
      <br />

      {showSuccessAlert && (
        <Alert variant="success" title="Layer created successfully! Redirecting..." isInline />
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
            <Button variant="primary" onClick={handleCreateLayer}>
              Create Layer
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
