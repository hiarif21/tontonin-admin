import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useStreamingServices } from '../../../../context/streamingServicesContext';
import { useWatchOptions } from '../../../../context/watchOptionsContext';
import {
  InitialStateDataWatchOption,
  InitialStateFilteredAndSelectedDataWatchOption,
  InitialStateListWatchOption,
  WatchOptionsEditProps,
} from '../../../../types/watchOptions';
import Modal from '../../../atoms/Modal';
import AutoComplete from '../../../molecules/commons/AutoComplete';
import HeaderCreateAndEdit from '../../../molecules/commons/HeaderCreateAndEdit';
import TextField from '../../../molecules/commons/TextField';

const initialStateData: InitialStateDataWatchOption = {
  title: '',
  link_streaming: '',
};

const initialStateList: InitialStateListWatchOption = {
  label: 'Streaming Services',
  value_search: '',
  name_search: 'streaming services',
  data_list: [],
  data_index_list: 'name',
};

const initialStateFilteredAndSelectedData: InitialStateFilteredAndSelectedDataWatchOption =
  {
    streaming_services: [],
  };

const WatchOptionsEdit = ({ show }: WatchOptionsEditProps) => {
  const router = useRouter();

  const { id } = router.query;

  const [data, setData] = useState(initialStateData);
  const [list, setList] = useState(initialStateList);

  const [filteredData, setFilteredData] = useState(
    initialStateFilteredAndSelectedData
  );
  const [selectedData, setSelectedData] = useState(
    initialStateFilteredAndSelectedData
  );

  const { getData, editData } = useWatchOptions();
  const { loadData } = useStreamingServices();

  useEffect(() => {
    // get data
    if (id) {
      (async () => {
        const result = await getData(id.toString());
        setData({
          title: result.data!.title,
          link_streaming: result.data!.link_streaming,
        });
        setSelectedData({
          streaming_services: [result.data!.streaming_service],
        });
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //   load data list
  useEffect(() => {
    (async () => {
      const result = await loadData();
      setList({ ...list, data_list: result.data });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   filter list
  useEffect(() => {
    if (list.value_search === '') {
      setFilteredData({ streaming_services: list.data_list });
    } else {
      setFilteredData({
        streaming_services: list.data_list.filter((val) =>
          val.name.toLowerCase().includes(list.value_search.toLowerCase())
        ),
      });
    }
  }, [list.data_list, list.value_search]);

  const handleSubmit = async () => {
    const result = await editData(
      id!.toString(),
      {
        title: data.title,
        link_streaming: data.link_streaming,
        streaming_service: selectedData.streaming_services[0]._id,
      },
      {
        ...selectedData,
      }
    );

    if (result.success) {
      setData(initialStateData);
      setList(initialStateList);
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
            label={list.label}
            valueSearch={list.value_search}
            nameSearch={list.name_search}
            onChangeSearch={(e) =>
              setList({
                ...list,
                value_search: e.target.value,
              })
            }
            dataList={filteredData.streaming_services}
            dataIndexList={list.data_index_list}
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
