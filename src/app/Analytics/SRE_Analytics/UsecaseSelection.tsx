import {
  Flex,
  TextContent,
  TextVariants,
  FormSelect,
  FormSelectOption,
  Button,
  Text,
  Grid,
  GridItem,
  TextInput,
  ValidatedOptions,
  List,
  ListItem,
  HelperText,
  HelperTextItem,
  Form,
  FormGroup,
  FormHelperText,
  Pagination
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import {
  getListExperimentsURLWithParams,
  getRecommendationsURL,
  getRecommendationsURLWithParams
} from '@app/CentralConfig';

const UsecaseSelection = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata; switchTab }) => {
  // const list_recommendations_url: string = getRecommendationsURLWithParams(props.SREdata.experiment_name, 'false');

  const [usecase, setUsecase] = useState('Select one');
  const [nestedUsecase, setNestedUsecase] = useState('Select nested');
  const [expName, setExpName] = useState<any | null>('');
  const [expData, setExpData] = useState([]);
  const [validationStatus, setValidationStatus] = useState(ValidatedOptions.default);
  const [validationMessage, setValidationMessage] = useState('');
  const [clickedExpName, setClickedExpName] = useState<any | null>('');

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // const list_recommendations_url: string = getRecommendationsURLWithParams(clickedExpName, 'false');

  const list_experiments_url: string = getListExperimentsURLWithParams(props.SREdata.experiment_name);

  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);
  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    setPage(newPage);
  };

  const onPerPageSelect = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
    newPerPage: number,
    newPage: number
  ) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };
  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, expData.length);

  const visibleItems = expData.slice(startIndex, endIndex);

  const options = [    { id: '1', value: 'Remote Monitoring', label: 'Remote Monitoring', disabled: false }  ];

  const onChange = (value: string) => {
    setUsecase(value);
  };

  const handleInputChange = (_event, value) => {
    setExpName(value);
    props.setSREdata({ ...{ ...props.SREdata }, experiment_name: value });

    const isValid = /^[a-zA-Z0-9_*-|]+$/.test(value);

    if (value.length > 3) {
      // Validate the input length
      if (isValid) {
        setValidationStatus(ValidatedOptions.default);
        setValidationMessage('');
      } else {
        setValidationStatus(ValidatedOptions.error);
        setValidationMessage("Invalid character detected. Only letters, numbers, and '*' are allowed");
      }
    } else {
      // Special character detected
      setValidationStatus(ValidatedOptions.error);
      setValidationMessage('Input must be more than 3 characters');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(list_experiments_url);
      const data = await response.json();
      setExpData(data.experimentNames || []);
      setIsButtonClicked(true);
    } catch {
      console.log('exp name unavaliable');
    }
  };

  const handleClick = async (experiment_name: string) => {
    try {
      setClickedExpName(experiment_name);
      props.setSREdata({ ...{ ...props.SREdata }, experiment_name: experiment_name });
      sessionStorage.setItem('Experiment Name', experiment_name);
      const list_recommendations_url: string = getRecommendationsURLWithParams(experiment_name, 'false');
      props.switchTab(1);
      const data = await (await fetch(list_recommendations_url)).json();
      console.log(data);
      var namespace = data[0].kubernetes_objects[0].namespace;
      var name = data[0].kubernetes_objects[0].name;
      var type = data[0].kubernetes_objects[0].type;
      var cluster_name = data[0].cluster_name;
      var container_name = data[0].kubernetes_objects[0].containers[0].container_name;

      var endtime: any[] = [];
      endtime = [...Object.keys(data[0].kubernetes_objects[0].containers[0].recommendations.data).sort().reverse()];

      props.setEndTimeArray(endtime);

      var containerArray: any[] = [];
      for (var i = 0; i < data[0].kubernetes_objects[0].containers.length; i++) {
        containerArray.push(data[0].kubernetes_objects[0].containers[i].container_name);
      }

      props.setSREdata({
        ...{ ...props.SREdata },
        containerArray: containerArray,
        namespace: namespace,
        name: name,
        type: type,
        cluster_name: cluster_name,
        container_name: container_name
      });
    } catch (err) {
      console.log('processing');
    }
  };

  return (
    <>
      <br />
      <Flex direction={{ default: 'column' }}>
        <TextContent>
          <Text component={TextVariants.h3}>UseCase Selection</Text>
        </TextContent>
        <Form isWidthLimited style={{ maxWidth: '20cm' }}>
          <FormGroup label="Usecase Selection" isRequired fieldId="simple-form-name-01">
            <FormSelect
              value={usecase}
              onChange={(_event, value: string) => onChange(value)}
              aria-label="FormSelect Input"
            >
              {options.map((option, index) => (
                <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
              ))}
            </FormSelect>
          </FormGroup>
          <>
            <FormGroup label="Experiment name" isRequired fieldId="simple-form-name-02">
              <TextInput
                isRequired
                value={expName}
                validated={validationStatus}
                type="text"
                onChange={handleInputChange}
                aria-label="text input example"
              />{' '}
              <FormHelperText>
                <HelperText>
                  <HelperTextItem>Input must be more than 3 characters</HelperTextItem>
                </HelperText>
              </FormHelperText>
            </FormGroup>
          </>

          {expName && (
            <Button variant="primary" onClick={fetchData}>
              Get Experiments
            </Button>
          )}
          {console.log(expData)}
          {expData !== undefined && expData.length === 0 ? (
            <>No experiments found</>
          ) : (
            <>
              <List>
                {visibleItems.map((experiment_name, index) => (
                  <ListItem key={experiment_name}>
                    <Button key={index} variant="link" isInline onClick={() => handleClick(experiment_name)}>
                      {experiment_name}
                    </Button>{' '}
                  </ListItem>
                ))}
              </List>
              <Pagination
                itemCount={expData.length}
                perPage={perPage}
                page={page}
                onSetPage={onSetPage}
                widgetId="top-example"
                onPerPageSelect={onPerPageSelect}
                ouiaId="PaginationTop"
              />
            </>
          )}
        </Form>
      </Flex>
    </>
  );
};

export { UsecaseSelection };
