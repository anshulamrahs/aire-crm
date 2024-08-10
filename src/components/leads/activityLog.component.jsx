import React from 'react';
import styled from 'styled-components';
import TaskTable from './task-table.component';
import { FaPlus } from 'react-icons/fa';
import Popup from '../reusable/popup.component';
import AssignNewTask from './assignTask.popup.component';

const ActivityLogContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  height: 48vh;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background: black; /* Color of the scrollbar */
    border-radius: 10px; /* Rounded corners of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #fff; /* Background color of the scrollbar track */
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
`;

const Tabs = styled.div`
  display: flex;
`;

const Tab = styled.div`
  margin-right: 20px;
  padding-bottom: 5px;
  cursor: pointer;
  ${(props) => props.active && 'border-bottom: 2px solid #000;'}
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #fff;
  color: black;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

const ThreeDots = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #e7e7e7;
    width: 30px;
    height: 30px;
    border-radius: 5px;
  &::before, &::after, div {
    content: '';
    width: 3px;
    height: 3px;
    background: black;
    border-radius: 50%;
  }
`;

const LogItem = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e7e7e7;
  display: flex;
  gap: 60px;
  justify-content: space-between;
`;

const LogMessage = styled.p`
  margin: 0;
`;

const LogTime = styled.span`
  font-size: 12px;
  color: gray;
  white-space: nowrap;
`;

const ActionMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 35px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 100px;
  text-align: left;
  padding: 5px 5px;
`;

const ActionItem = styled.div`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ActivityLog = () => {
  const [activeTab, setActiveTab] = React.useState('Activity Log');
  const [isPopupOpen, setIsOpenPopup] = React.useState(false);
  const [actionPopup, setActionPopup] = React.useState(false);

  const handlePopupOpen = ()=> {
    setIsOpenPopup(true);
  }

  const handlePopupClose = ()=> {
    setIsOpenPopup(false);
  }

  const handleActionClick = ()=> {
    setActionPopup(!actionPopup);
  }
  return (
    <>
      <ActivityLogContainer>
        <TabsContainer>
          <Tabs>
            <Tab active={activeTab === 'Activity Log'} onClick={() => setActiveTab('Activity Log')}>Activity Log</Tab>
            <Tab active={activeTab === 'Assign Task'} onClick={() => setActiveTab('Assign Task')}>Assign Task</Tab>
          </Tabs>
          {activeTab === 'Assign Task' && (
            <ActionsContainer>
              <Button onClick={handlePopupOpen}><FaPlus style={{marginRight: '2px', paddingTop: '5px'}} />Assign New Task</Button>
              <Button onClick={handleActionClick} >
                <ThreeDots>
                  <div></div>
                </ThreeDots>
              </Button>
              {actionPopup && (
                <ActionMenu>
                  <ActionItem>Delete All</ActionItem>
                </ActionMenu>
              )}
            </ActionsContainer>
          )}
        </TabsContainer>
        {activeTab === 'Activity Log' ? (
          <>
            <LogItem>
              <LogMessage>You have a new message. Could you provide more details about the context or the specific message you're referring to?</LogMessage>
              <LogTime>28/06/2020 10:18:21 am</LogTime>
            </LogItem>
            <LogItem>
              <LogMessage>You have a new message. Could you provide more details about the context or the specific message you're referring to?</LogMessage>
              <LogTime>28/06/2020 10:18:21 am</LogTime>
            </LogItem>
            <LogItem>
              <LogMessage>You have a new message. Could you provide more details about the context or the specific message you're referring to?</LogMessage>
              <LogTime>28/06/2020 10:18:21 am</LogTime>
            </LogItem>
            <LogItem>
              <LogMessage>You have a new message. Could you provide more details about the context or the specific message you're referring to?</LogMessage>
              <LogTime>28/06/2020 10:18:21 am</LogTime>
            </LogItem>
            <LogItem>
              <LogMessage>You have a new message. Could you provide more details about the context or the specific message you're referring to?</LogMessage>
              <LogTime>28/06/2020 10:18:21 am</LogTime>
            </LogItem>
            <LogItem>
              <LogMessage>You have a new message. Could you provide more details about the context or the specific message you're referring to?</LogMessage>
              <LogTime>28/06/2020 10:18:21 am</LogTime>
            </LogItem>
            <LogItem>
              <LogMessage>Team Lead opportunity created</LogMessage>
              <LogTime>28/06/2020 10:18:21 am</LogTime>
            </LogItem>
            <LogItem>
              <LogMessage>You have a new message. Could you provide more details about the context or the specific message you're referring to?</LogMessage>
              <LogTime>Tomorrow</LogTime>
            </LogItem>
            <LogItem>
              <LogMessage>Admin Log note 1</LogMessage>
              <LogTime>55 min ago</LogTime>
            </LogItem>
          </>
        ) : (
          <TaskTable />
        )}
      </ActivityLogContainer>
      {isPopupOpen && (
        <Popup
          title="Assign Task"
          onClose={handlePopupClose}
          onCancel={handlePopupClose}
          buttonText="New Task"
        >
          <AssignNewTask  />
        </Popup>
      )}
    </>
  );
};

export default ActivityLog;
