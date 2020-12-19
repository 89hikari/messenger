import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classNames from "classnames";
import {Avatar} from '../'

import { Time, IconReaded } from '../';

import './Message.scss';

// определяет какое будет сообщение (моё, собеседника, печатающего собеседника)
const Message = ({id, text, datetime, avatar, isMe, contactData, user}) => {
        return (
            <div className={classNames("message", {"message--isme" : isMe})}>
                <div className="message__avatar">
                    <Avatar user={user} id={id}/>
                </div>
                
                <div className="message__content">
                {/*isMe && <IconReaded isMe={isMe} isReaded={true} />*/ }
                    <div className="message__bubble">
                       
                        <p className="message__text">{text}</p>
                    </div>

                    {datetime && <span className="message__date"><Time date={datetime}/></span>}
                    
                </div>
            </div>
        );
};

Message.defaultProps = {
    user: {} 
}

Message.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    user: PropTypes.string,
    date: PropTypes.object,
    isTyping: PropTypes.bool,
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool
};

export default Message;
