import React, { useState } from 'react';
import {
  PageSection,
  TextContent,
  Text,
  TextVariants,
  PageSectionVariants,
  Button,
  Alert
} from '@patternfly/react-core';
import { CodeEditor, Language } from '@patternfly/react-code-editor';

const mockExperimentJSON = `[
  {
    "version": "v2.0",
    "experiment_name": "default|default|deployment|tfb-qrh-deployment",
    "cluster_name": "default",
    "performance_profile": "resource-optimization-local-monitoring",
    "mode": "monitor",
    "target_cluster": "local",
    "kubernetes_objects": [
      {
        "type": "deployment",
        "name": "tfb-qrh-deployment",
        "namespace": "default",
        "containers": [
          {
            "container_image_name": "kruize/tfb-db:1.15",
            "container_name": "tfb-server-0"
          },
          {
            "container_image_name": "kruize/tfb-qrh:1.13.2.F_et17",
            "container_name": "tfb-server-1"
          }
        ]
      }
    ],
    "trial_settings": {
      "measurement_duration": "15min"
    },
    "recommendation_settings": {
      "threshold": "0.1",
      "term_settings": {
        "terms": ["daily", "my_shift_term"],
        "terms_definition": {
          "my_shift_term": {
            "duration_in_days": 17,
            "start_time_stamp": "2025-11-01T00:00:00Z",
            "end_time_stamp": "2025-11-17T23:59:59Z",
            "days_of_week": ["mon", "tue", "wed", "thu", "fri"],
            "daily_start_time": "07:00",
            "daily_end_time": "19:00",
            "duration_threshold": "7",
            "plots_datapoint": 17,
            "plots_datapoint_delta_in_days": 1
          }
        }
      }
    },
    "datasource": "prometheus-1"
  }
]`;

export const CreateExperimentJSON = () => {
  const [code, setCode] = useState(mockExperimentJSON);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleCreateExperiment = () => {
    try {
      // Validate JSON
      JSON.parse(code);

      // Mock API call
      console.log('Creating experiment with JSON:', code);

      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setTimeout(() => setShowSuccessAlert(false), 5000);
    } catch (error) {
      console.error('Invalid JSON:', error);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => setShowErrorAlert(false), 5000);
    }
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component={TextVariants.h1}>Create Experiment JSON</Text>
        <Text component={TextVariants.p}>
          This is the standard json for creating an experiment for your desired container name, you can make changes to it or proceed further.
        </Text>
        <Text component={TextVariants.small}>
          Note: In term_settings, you can use either <strong>duration_in_days</strong> OR <strong>start_time_stamp/end_time_stamp</strong> fields to define the term duration.
        </Text>
      </TextContent>
      <br />

      {showSuccessAlert && (
        <Alert variant="success" title="Experiment Successfully Created" isInline />
      )}

      {showErrorAlert && (
        <Alert variant="danger" title="Invalid JSON format. Please check your syntax." isInline />
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
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          tabSize: 2,
          formatOnPaste: true,
          formatOnType: true
        }}
      />

      <br />
      <Button variant="primary" onClick={handleCreateExperiment}>
        Create Experiment
      </Button>
    </PageSection>
  );
};
