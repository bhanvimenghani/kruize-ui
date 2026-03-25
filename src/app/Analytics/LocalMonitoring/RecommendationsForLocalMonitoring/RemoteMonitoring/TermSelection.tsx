import {
  Flex,
  TextContent,
  TextVariants,
  FormSelect,
  FormSelectOption,
  Text,
  Grid,
  GridItem,
  FlexItem,
  Card,
  CardBody,
  ExpandableSection
} from '@patternfly/react-core';
import React, { useState } from 'react';

// Mock data for custom terms
const mockTermsData = {
  business_quarter_term: {
    duration: '17 days',
    schedule: 'Mon–Fri',
    dailyWindow: '07:00 – 19:00',
    advancedSettings: {
      measurementDuration: '15min',
      targetUtilization: '80%',
      optimizationFunction: 'cost'
    }
  },
  monthly_term: {
    duration: '30 days',
    schedule: 'Mon–Sun',
    dailyWindow: '00:00 – 23:59',
    advancedSettings: {
      measurementDuration: '30min',
      targetUtilization: '75%',
      optimizationFunction: 'performance'
    }
  },
  weekly_term: {
    duration: '7 days',
    schedule: 'Mon–Fri',
    dailyWindow: '08:00 – 18:00',
    advancedSettings: {
      measurementDuration: '10min',
      targetUtilization: '85%',
      optimizationFunction: 'balanced'
    }
  }
};

interface TermSelectionProps {
  selectedTerm: string;
  setSelectedTerm: (term: string) => void;
}

const TermSelection = ({ selectedTerm, setSelectedTerm }: TermSelectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const termOptions = Object.keys(mockTermsData);
  const currentTerm = mockTermsData[selectedTerm];

  const onChangeTerm = (value: string) => {
    setSelectedTerm(value);
  };

  return (
    <>
      <Flex direction={{ default: 'column' }}>
        <Grid hasGutter>
          <GridItem>
            <TextContent>
              <Text component={TextVariants.h3}>Select Term:</Text>
            </TextContent>
          </GridItem>
          <GridItem span={4}>
            <FormSelect
              value={selectedTerm}
              onChange={(_event, value: string) => onChangeTerm(value)}
              aria-label="Select Term"
            >
              {termOptions.map((option, index) => (
                <FormSelectOption key={index} value={option} label={option} />
              ))}
            </FormSelect>
          </GridItem>
        </Grid>
      </Flex>
      <br />
      {selectedTerm && currentTerm && (
        <Card>
          <CardBody>
            <TextContent>
              <Text component={TextVariants.h4}>Term Details</Text>
            </TextContent>
            <br />
            <Grid hasGutter>
              <GridItem span={12}>
                <TextContent>
                  <Text component={TextVariants.p}>
                    <strong>Duration:</strong>
                  </Text>
                  <Text component={TextVariants.p}>{currentTerm.duration}</Text>
                </TextContent>
              </GridItem>
              <GridItem span={12}>
                <TextContent>
                  <Text component={TextVariants.p}>
                    <strong>Schedule:</strong>
                  </Text>
                  <Text component={TextVariants.p}>{currentTerm.schedule}</Text>
                </TextContent>
              </GridItem>
              <GridItem span={12}>
                <TextContent>
                  <Text component={TextVariants.p}>
                    <strong>Daily Window:</strong>
                  </Text>
                  <Text component={TextVariants.p}>{currentTerm.dailyWindow}</Text>
                </TextContent>
              </GridItem>
              <GridItem span={12}>
                <br />
                <ExpandableSection
                  toggleText={isExpanded ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
                  onToggle={() => setIsExpanded(!isExpanded)}
                  isExpanded={isExpanded}
                >
                  <Grid hasGutter>
                    <GridItem span={12}>
                      <TextContent>
                        <Text component={TextVariants.p}>
                          <strong>Measurement Duration:</strong>
                        </Text>
                        <Text component={TextVariants.p}>{currentTerm.advancedSettings.measurementDuration}</Text>
                      </TextContent>
                    </GridItem>
                    <GridItem span={12}>
                      <TextContent>
                        <Text component={TextVariants.p}>
                          <strong>Target Utilization:</strong>
                        </Text>
                        <Text component={TextVariants.p}>{currentTerm.advancedSettings.targetUtilization}</Text>
                      </TextContent>
                    </GridItem>
                    <GridItem span={12}>
                      <TextContent>
                        <Text component={TextVariants.p}>
                          <strong>Optimization Function:</strong>
                        </Text>
                        <Text component={TextVariants.p}>{currentTerm.advancedSettings.optimizationFunction}</Text>
                      </TextContent>
                    </GridItem>
                  </Grid>
                </ExpandableSection>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export { TermSelection, mockTermsData };
