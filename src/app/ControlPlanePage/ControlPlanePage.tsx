import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {InsightsContext} from "@app/utils/insights";
import {useDispatch} from 'react-redux';
import {addNotification} from '@redhat-cloud-services/frontend-components-notifications/';
import {AlertVariant} from "@patternfly/react-core";
import {FederatedModule} from "../../Components/FederatedModule";
import {ConfigContext} from "@app/Config/Config";

export const ControlPlanePage = () => {

  const insights = useContext(InsightsContext);
  const config = useContext(ConfigContext);

  const history = useHistory();

  const onConnectInstance = async (event) => {
    if (event.id === undefined) {
      throw new Error();
    }

    history.push(`/kafkas/${event.id}`);
  };

  const dispatch = useDispatch();

  const addAlert = (message: string, variant?: AlertVariant) => {
    dispatch(
      addNotification({
        variant: variant,
        title: message
      })
    );

  };

  return (
    <FederatedModule
      scope="mkUiFrontend"
      module="./OpenshiftStreams"
      render={(OpenshiftStreamsFederated) =>
        <OpenshiftStreamsFederated
          getToken={insights.chrome.auth.getToken}
          onConnectToInstance={onConnectInstance}
          addAlert={addAlert}
          basePath={config.controlPlane.serviceApiBasePath}
        />}
    />
  );
};