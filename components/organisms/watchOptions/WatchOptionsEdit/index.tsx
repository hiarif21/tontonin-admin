import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useStreamingServices } from '../../../../context/streamingServicesContext';
import { useWatchOptions } from '../../../../context/watchOptionsContext';
import Modal from '../../../atoms/Modal';
import AutoComplete from '../../../molecules/commons/AutoComplete';
import HeaderCreateAndEdit from '../../../molecules/commons/HeaderCreateAndEdit';
import TextField from '../../../molecules/commons/TextField';

interface WatchOptionsEditProps {
  show: boolean;
}

interface StreamingServicesData {
  _id: string;
  name: string;
}

interface InitialStateStreamingServices {
  label: string;
  value_search: string;
  name_search: string;
  data_list: StreamingServicesData[];
  data_index_list: string;
}

interface InitialStateFilteredAndSelectedData {
  streaming_services: StreamingServicesData[];
}

const initialStateData = {
  title: '',
  link_streaming: '',
};

const initialStateStreamingServices: InitialStateStreamingServices = {
  label: 'Streaming Services',
  value_search: '',
  name_search: 'streaming services',
  data_list: [],
  data_index_list: 'name',
};

const initialStateFilteredAndSelectedData: InitialStateFilteredAndSelectedData =
  {
    streaming_services: [],
  };

const WatchOptionsEdit = ({ show }: WatchOptionsEditProps) => {
  const router = useRouter();

  const { id } = router.query;

  const [data, setData] = useState(initialStateData);
  const [streamingServices, setStreamingServices] = useState(
    initialStateStreamingServices
  );

  const [filteredData, setFilteredData] = useState(
    initialStateFilteredAndSelectedData
  );
  const [selectedData, setSelectedData] = useState(
    initialStateFilteredAndSelectedData
  );

  const { getData, editData }: any = useWatchOptions();
  const { loadData }: any = useStreamingServices();

  useEffect(() => {
    // get data
    if (id) {
      (async () => {
        const result = await getData(id);
        setData({
          title: result.data.title,
          link_streaming: result.data.link_streaming,
        });
        setSelectedData({
          streaming_services: [result.data.streaming_service],
        });
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //   load data list
  useEffect(() => {
    (async () => {
      const result = await loadData();
      setStreamingServices({ ...streamingServices, data_list: result.data });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   filter list
  useEffect(() => {
    if (streamingServices.value_search === '') {
      setFilteredData({ streaming_services: streamingServices.data_list });
    } else {
      setFilteredData({
        streaming_services: streamingServices.data_list.filter((val) =>
          val.name
            .toLowerCase()
            .includes(streamingServices.value_search.toLowerCase())
        ),
      });
    }
  }, [streamingServices.data_list, streamingServices.value_search]);

  const handleSubmit = async () => {
    const result = await editData(
      id,
      {
        title: data.title,
        link_streaming: data.link_streaming,
        streaming_service: selectedData.streaming_services[0]._id,
      },
      {
        name: selectedData.streaming_services[0].name,
      }
    );

    if (result.success) {
      setData(initialStateData);
      setStreamingServices(initialStateStreamingServices);
      setFilteredData(initialStateFilteredAndSelectedData);
      setSelectedData(initialStateFilteredAndSelectedData);
      handleBack();
      toast(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleBack = () => {
    router.push(`${router.pathname}`, undefined, { shallow: true });
  };

  return (
    <Modal show={show}>
      <div
        className={classNames(
          'fixed h-full w-full overflow-auto bg-white transition-all duration-500  ease-in-out',
          {
            'right-0': show,
            '-right-full': !show,
          }
        )}>
        <HeaderCreateAndEdit
          type={'Edit'}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
        <div className="flex flex-col gap-5 p-5">
          <TextField
            label="Title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <AutoComplete
            label={streamingServices.label}
            valueSearch={streamingServices.value_search}
            nameSearch={streamingServices.name_search}
            onChangeSearch={(e) =>
              setStreamingServices({
                ...streamingServices,
                value_search: e.target.value,
              })
            }
            dataList={filteredData.streaming_services}
            dataIndexList={streamingServices.data_index_list}
            onClickList={(val) =>
              setSelectedData({ streaming_services: [val] })
            }
            onDeleteList={(id) =>
              setSelectedData({
                streaming_services: selectedData.streaming_services.filter(
                  (val) => val._id !== id
                ),
              })
            }
            selectedData={selectedData.streaming_services}
          />
          <TextField
            label="Link Streaming"
            value={data.link_streaming}
            onChange={(e) =>
              setData({ ...data, link_streaming: e.target.value })
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default WatchOptionsEdit;
