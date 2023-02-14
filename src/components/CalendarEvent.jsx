import { useState, useEffect } from "react";
import axios from 'axios';
import { Badge, Calendar, ConfigProvider, Modal } from "antd";
import styled from "styled-components";
import kkKZ from "antd/locale/kk_KZ";
import dayjs from "dayjs";
import "dayjs/locale/kk";
dayjs.locale("kk");



const Events = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;


const CalendarEvent = () => {
  const [events, setEvents] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setIsModalText] = useState(false);

  let eventObj = {}

  const fetchCalendarEvents = () => {
    axios.get('https://diploms.pythonanywhere.com/api/v1/calendar/tasks')
        .then(({ data }) => {
          setEvents(data)
        })
        .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchCalendarEvents();
  }, []);
  
  if (events) {
    events.map(item => Object.assign(eventObj, {[item["date_time"]]: [{type: item.type, content: item.content}]}));
  }

  const showModal = (text) => {
    setIsModalText(text)
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getListData = (value) => {
    let date = `${value.date()}-0${value.month() + 1}`;
    if (eventObj[date]) {
      return eventObj[date];
    } else {
      return [];
    }
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <Events>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              style={{
                width: "100%",
                overflow: "hidden",
                fontSize: "12px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              status={item.type}
              text={item.content}
              onClick={() => showModal(item.content)}
            />
            <Modal
              title="Оқиға"
              open={isModalOpen}
              destroyOnClose={true}
              onCancel={handleCancel}
              footer={null}
            >
              <p>{modalText}</p>
            </Modal>
          </li>
        ))}
      </Events>
    );
  };
  return (
    <ConfigProvider locale={kkKZ}>
      <Calendar
        dateCellRender={dateCellRender}
      />
    </ConfigProvider>
  );
};
export default CalendarEvent;
