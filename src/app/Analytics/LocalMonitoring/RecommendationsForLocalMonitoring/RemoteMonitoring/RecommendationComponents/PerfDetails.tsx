import React, { useEffect, useState } from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  PageSection,
  Grid,
  GridItem,
  Text,
  TextVariants,
  PageSectionVariants,
  Alert
} from '@patternfly/react-core';
import ReusableCodeBlock from './ReusableCodeBlock';
import { PerfHistoricCharts } from './LinePlot/PerfHistoricCharts';
import { addPlusSign } from './LinePlot/ChartDataPreparation';
import { PerfBoxPlotCharts } from './BoxPlots/PerfBoxPlotCharts';
import { NumberFormatP, MemoryFormatP } from './CostDetails';
type AlertType = 'info' | 'danger' | 'warning';

interface Alert {
  message: string;
  type: AlertType;
}

const PerfDetails = (props: {
  recommendedData;
  currentData;
  chartData;
  day;
  endtime;
  displayChart;
  tab;
  boxPlotData;
}) => {
  const limits = props.recommendedData[0]?.recommendation_engines?.performance?.config?.limits;
  const config_keys = limits ? Object.keys(limits) : [];

  let gpu_val;
  let nvidiaKey = config_keys.find((key) => key.toLowerCase().includes('nvidia'));

  if (nvidiaKey) {
    gpu_val = limits[nvidiaKey]?.amount;
  } else {
    console.log("No 'nvidia' key found.");
  }

  const convertBytes = (bytes) => {
    let value: any = parseFloat(bytes);
    let unit = 'Bytes';

    if (value >= 1024 ** 3) {
      value = Math.round(value / 1024 ** 3);
      unit = 'Gi';
    } else if (value >= 1024 ** 2) {
      value = Math.round(value / 1024 ** 2);
      unit = 'Mi';
    } else if (value >= 1024) {
      value = Math.round(value / 1024);
      unit = 'Ki';
    }

    return `${value} ${unit}`;
  };

  const MemoryFormat = (number) => {
    let parsedNo = parseFloat(number);
    if (!parsedNo) return '';
    return convertBytes(parsedNo);
  };

  const NumberFormat = (number) => {
    let parsedNo = parseFloat(number);
    if (!isNaN(parsedNo) && isFinite(parsedNo)) {
      if (Math.floor(parsedNo) !== parsedNo) {
        return parsedNo.toFixed(3);
      }
      return parsedNo.toString();
    }
    return '';
  };

  const current_code = `resources: 
  requests: 
    memory: "${MemoryFormat(props.currentData[0]?.requests?.memory?.amount)}" 
    cpu: "${NumberFormat(props.currentData[0]?.requests?.cpu?.amount)}" 
  limits: 
    memory: "${MemoryFormat(props.currentData[0]?.limits?.memory?.amount)}" 
    cpu: "${NumberFormat(props.currentData[0]?.limits?.cpu?.amount)}"`;

  const recommended_code = `resources: 
  requests: 
    memory: "${MemoryFormat(
      props.recommendedData[0]?.recommendation_engines?.performance?.config?.requests?.memory?.amount
    )}"    # ${MemoryFormatP(props.recommendedData[0]?.recommendation_engines?.performance?.variation?.requests?.memory?.amount)
    }
    cpu: "${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.performance?.config?.requests?.cpu?.amount
    )}"      # ${NumberFormatP(props.recommendedData[0]?.recommendation_engines?.performance?.variation?.requests?.cpu?.amount)
    }
  limits: 
    memory: "${MemoryFormat(
      props.recommendedData[0]?.recommendation_engines?.performance?.config?.limits?.memory?.amount
    )}"    # ${MemoryFormatP(props.recommendedData[0]?.recommendation_engines?.performance?.variation?.limits?.memory?.amount)
    }   
    cpu: "${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.performance?.config?.limits?.cpu?.amount
    )}"      # ${NumberFormatP(props.recommendedData[0]?.recommendation_engines?.performance?.variation?.limits?.cpu?.amount)
    }`;

  // Code for Alert / Notifications

  useEffect(() => {
    if (props.recommendedData !== null) {
      utilizationAlert(props.recommendedData);
    }
  }, [props.tab]);

  const [alerts, setAlerts] = useState<Alert[]>([]);

  const utilizationAlert = (recommendation) => {
    const notifications = recommendation[0]?.recommendation_engines?.performance?.notifications;
    try {
      if (!notifications) {
        console.warn('No notifications found.');
        return;
      }
      const newAlerts: Alert[] = [];
      Object.values(notifications).forEach((notification: any, index) => {
        const message = `${notification.code} - ${notification.message}`;
        let type: AlertType = 'info';

        if (notification.type == 'notice' || notification.type == 'info') {
          type = 'info';
        } else if (notification.type == 'error' || notification.type == 'critical') {
          type = 'danger';
        } else if (notification.type == 'warning') {
          type = 'warning';
        }
        newAlerts.push({ message, type });
        setAlerts(newAlerts);
        setShowSuccessAlert(true);
        // setTimeout(() => {
        //   setAlerts([]);
        //   setShowSuccessAlert(false);
        // }, 2000);
      });
    } catch (error) {
      console.error('Error during data import:', error);
      setAlerts([]);
      setShowSuccessAlert(false);
    }
  };
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Grid hasGutter>
        {showSuccessAlert == true ? (
          alerts.map((alert) => <Alert variant={alert.type} title={alert.message} ouiaId="InfoAlert" />)
        ) : (
          <></>
        )}
        <GridItem span={6} rowSpan={8}>
          <Card ouiaId="BasicCard" isFullHeight>
            <CardTitle>Current State</CardTitle>
            <CardBody>
              <Text component={TextVariants.h5}>Current Configuration</Text>
              <ReusableCodeBlock code={current_code} includeActions={false} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={6} rowSpan={8}>
          <Card ouiaId="BasicCard">
            <CardTitle>Recommendation</CardTitle>
            <CardBody>
              <Text component={TextVariants.h5}>Recommended Configuration + #Delta</Text>
              {config_keys && config_keys.length === 3 ? (
                <ReusableCodeBlock code={`${recommended_code}\n    ${nvidiaKey}: "${gpu_val}"`} includeActions={true} />
              ) : (
                <ReusableCodeBlock code={recommended_code} includeActions={true} />
              )}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      <PerfBoxPlotCharts
        boxPlotData={props.boxPlotData}
        limitRequestData={props.recommendedData[0]?.recommendation_engines?.performance?.config}
      />
      {props.displayChart && <PerfHistoricCharts chartData={props.chartData} day={props.day} endtime={props.endtime} />}{' '}
    </PageSection>
  );
};
export { PerfDetails };
