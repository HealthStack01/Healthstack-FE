import React, { useEffect } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import FormView from '../../generic/FormView';
import ListView from '../../generic/ListView';
import { FormType } from '../../schema/util';
import { ConversationConfigSchema } from '../schema';

const AppConfiguration = () => {
  const { resource, setResource } = useObjectState();
  const {
    configurationResource: { selectedConfiguration },
  } = resource;

  const navigate = (show: string) => (selectedConfiguration?: any) =>
    setResource({
      ...resource,
      configurationResource: {
        ...resource.configurationResource,
        show,
        selectedConfiguration:
          show === FormType.CREATE ? {} : selectedConfiguration,
      },
    });

  const {
    list: configurations,
    find: handleSearch,
    remove: handleDelete,
    submit: handleSubmit,
    setFindQuery,
  } = useRepository<any>(Models.CONVERSATION_CONFIG, navigate);

  useEffect(() => {
    setFindQuery({ query: { facility: undefined } });
  }, []);

  return (
    <>
      {resource.configurationResource.show === 'lists' && (
        <ListView
          title="Conversation Config"
          schema={ConversationConfigSchema}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={handleSearch}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={configurations}
        />
      )}
      {(resource.configurationResource.show === FormType.CREATE ||
        resource.configurationResource.show === FormType.EDIT) && (
        <FormView
          title="Conversation Config"
          schema={ConversationConfigSchema}
          backClick={navigate(Views.LIST)}
          onSubmit={handleSubmit}
          selectedData={{
            ...selectedConfiguration,
            questionnaire: selectedConfiguration.questionnaire?._id,
            channel: selectedConfiguration.channel?._id,
          }}
        />
      )}
      {resource.configurationResource.show === FormType.DETAIL && (
        <DetailView
          title="Conversation Config"
          schema={ConversationConfigSchema}
          value={selectedConfiguration}
          backClick={navigate(Views.LIST)}
          onEdit={() => navigate(Views.EDIT)(selectedConfiguration)}
          onDelete={() => handleDelete(selectedConfiguration)}
        />
      )}
    </>
  );
};

export default AppConfiguration;
