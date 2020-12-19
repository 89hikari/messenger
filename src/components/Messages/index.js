import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types'
import {Empty} from 'antd';
import {Message} from '../'

import './Messages.scss';

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const Messages = ({ blockRef, items, contactData, refresh, getMessages, me, notMe}) => {

        let messages = contactData.state.messages
        console.log(contactData.state.id)
        return (
        <div className="messages">
          {contactData.state.contact_name !== '' ?  messages.map(item =>
             <Message id={item.recipient_id == contactData.state.id ? contactData.state.id : item.recipient_id} 
             text={item.text} datetime={item.datetime} 
             isMe={item.recipient_id == contactData.state.id ? false : true} 
             contactData={contactData} 
             avatar={contactData.state.contact_avatar}
             user={item.recipient_id == contactData.state.id ? contactData.state.contact_name : contactData.state.username}/>)
          : <Empty description="Please refresh the page if there no your contacts on left" /> }
          <AlwaysScrollToBottom />
        </div> 
        )
};  

Message.propTypes = {
    avatar: PropTypes.string,
};

export default Messages;
