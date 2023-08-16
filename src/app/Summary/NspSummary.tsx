import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Dropdown,
  Text,
  FormSelect,
  FormSelectOption,
  PageSection,
  PageSectionVariants,
  TextContent,
  TextVariants,
  Grid,
  GridItem
} from '@patternfly/react-core';
import { NspTableComponent } from './NspTableComponent'; // Replace with your table component
import Img from './Nspimg.png';
const NspSummary = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [usecase, setUsecase] = useState('Select one');

  const handleTabClick = (event, tabIndex) => {
    setActiveTab(tabIndex);
  };

  const tabs = ['Cost', 'Performance'];
  const options = [
    { id: '1', value: '1 day', label: '1 day', disabled: false },
    { id: '2', value: '7 days', label: '7 days', disabled: false },
    { id: '3', value: '15 days', label: '15 days', disabled: false }
  ];
  const onChange = (value: string) => {
    setUsecase(value);
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      <br />
      <TextContent>
        <Text component={TextVariants.h1}>Namespace level Summary for Cluster 1</Text>
      </TextContent>
      <br />

      <Grid hasGutter component="ul">
        <GridItem span={3} component="li">
          <FormSelect value={usecase} onChange={onChange} aria-label="FormSelect Input">
            {options.map((option, index) => (
              <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
            ))}
          </FormSelect>
        </GridItem>
      </Grid>
      <br />
      <Tabs
        isFilled
        activeKey={activeTab}
        onSelect={handleTabClick}
        isBox={true}
        aria-label="Tabs in the filled example"
        role="region"
      >
        {tabs.map((tabTitle, index) => (
          <Tab key={index} eventKey={index} title={tabTitle}>
            <br />
            <NspTableComponent />
            <img src={Img} alt="Logo" />;
          </Tab>
        ))}
      </Tabs>
    </PageSection>
  );
};

export default NspSummary;
