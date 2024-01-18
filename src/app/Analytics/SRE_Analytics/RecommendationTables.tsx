import {
  TextContent,
  TextVariants,
  Flex,
  FlexItem,
  FormSelect,
  FormSelectOption,
  Text,
  Split,
  SplitItem,
  Stack,
  StackItem
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import { getRecommendationsURL, getRecommendationsURLWithParams } from '@app/CentralConfig';
import { TabSection } from './RecommendationComponents/TabSection';
import { WorkloadDetails } from './RecommendationComponents/WorkloadDetails';

const RecommendationTables = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata }) => {
  // @ts-ignore
  const list_recommendations_url: string = getRecommendationsURLWithParams(
    sessionStorage.getItem('Experiment Name') || '',
    'false'
  );

  const [endtime, setEndtime] = useState<any | null>('');
  const [currentData, setCurrentData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [chartDetailsData, setChartDetailsData] = useState([]);
  const [day, setDay] = useState('short_term');
  const [displayChart, setDisplayChart] = useState(false);

  const days = [
    { id: '1', value: 'short_term', label: 'Last 1 day', disabled: false },
    { id: '2', value: 'medium_term', label: 'Last 7 days', disabled: false },
    { id: '3', value: 'long_term', label: 'Last 15 days', disabled: false }
  ];

  useEffect(() => {
    if (props.endTimeArray) {
      setEndtime(props.endTimeArray[0]);
    }
  }, [props.endTimeArray]);

  useEffect(() => {
    const fetchData = async () => {
      if (endtime && day) {
        const response = await fetch(list_recommendations_url);
        const result = await response.json();
        const recommended_arr: any = [];
        const current_arr: any = [];
        const chartDetailsObject = [];

        result[0].kubernetes_objects[0].containers.map((container, index) => {
          const currentDat = container.recommendations?.data[endtime]?.current;
          if (currentDat) {
            current_arr.push(currentDat);
          }
        });

        result[0].kubernetes_objects[0].containers.map((container, index) => {
          const recommendationDataNewAPI = container.recommendations.data[endtime]?.recommendation_terms[day];
          if (recommendationDataNewAPI) {
            recommended_arr.push(recommendationDataNewAPI);
          }
        });

        // all data before a particular time stamp
        result[0].kubernetes_objects[0].containers.map((container, index) => {
          const allRecommData = container.recommendations.data;
          const endTimeSortedKeys = Object.keys(allRecommData).sort();

          for (const key of endTimeSortedKeys) {
            chartDetailsObject[key] = allRecommData[key];
            if (key === endtime) {
              break;
            }
          }
          JSON.stringify(chartDetailsObject);
          for (const key in chartDetailsObject) {
            const value = chartDetailsObject[key];
            // console.log(`${key}`, value);

            if (key === endtime) {
              break;
            }
          }
        });
        if (recommended_arr[0].recommendation_engines && recommended_arr[0].recommendation_engines !== undefined) {
          console.log('render ', recommended_arr[0].recommendation_engines);
          setDisplayChart(true);
        } else {
          setDisplayChart(false);
        }
        setCurrentData(current_arr);
        setRecommendedData(recommended_arr);
        setChartDetailsData(chartDetailsObject);
      }
    };

    fetchData();
  }, [endtime, day, props.SREdata.experiment_name]);

  const onChange = async (value: string) => {
    setEndtime(value);
  };

  const onDayChange = (value: string) => {
    setDay(value);
    setDisplayChart(false);
  };

  return (
    <Stack hasGutter>
      <StackItem>
        <br />
        <WorkloadDetails
          experimentData={{
            experiment_name: props.SREdata.experiment_name,
            namespace: props.SREdata.namespace,
            name: props.SREdata.name,
            type: props.SREdata.type,
            cluster_name: props.SREdata.cluster_name,
            container_name: props.SREdata.container_name
          }}
        />
      </StackItem>
      <StackItem>
        <Stack hasGutter>
          <Flex className="example-border">
            <Flex>
              <FlexItem>
                <Split hasGutter>
                  <SplitItem>
                    <TextContent>
                      <Text component={TextVariants.p}>Monitoring End Time</Text>
                    </TextContent>
                  </SplitItem>

                  <SplitItem>
                    <FormSelect
                      value={endtime}
                      onChange={(_event, value: string) => onChange(value)}
                      aria-label="FormSelect Input"
                      style={{ width: '300px' }}
                    >
                      {props.endTimeArray &&
                        props.endTimeArray.map((option, index) => (
                          <FormSelectOption key={index} value={option} label={option} />
                        ))}
                    </FormSelect>
                  </SplitItem>
                </Split>
              </FlexItem>
            </Flex>
            <FlexItem>
              <Split hasGutter>
                <SplitItem>
                  <TextContent>
                    <Text component={TextVariants.p}>View optimization based on </Text>
                  </TextContent>
                </SplitItem>

                <SplitItem>
                  <FormSelect
                    value={day}
                    onChange={(_event, value: string) => onDayChange(value)}
                    aria-label="days dropdown"
                    style={{ width: '150px' }}
                  >
                    {days.map((selection, index) => (
                      <FormSelectOption key={index} value={selection.value} label={selection.label} />
                    ))}
                  </FormSelect>
                </SplitItem>
              </Split>
            </FlexItem>
          </Flex>
          <StackItem>
            <TabSection
              recommendedData={recommendedData}
              currentData={currentData}
              chartData={chartDetailsData}
              day={day}
              endtime={endtime}
              displayChart={displayChart}
            />
          </StackItem>
        </Stack>
      </StackItem>
    </Stack>
  );
};

export { RecommendationTables };
