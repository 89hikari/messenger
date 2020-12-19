import React from 'react';
import { DialogItem } from "../";
import orderBy from "lodash/orderBy";
import { Input } from "antd";

import './Dialogs.scss';

// сайдбар слева (поиск и диалоги)
const Dialogs = ({items, userId, onSearch, inputValue, onSelectDialog, contactName, messages, lastMessageData}) => {

    const { Search } = Input;

    const [user, setUser] = React.useState("");

    //contactName.getContacts()

    return (
        <div className="dialogs">
            <div className="chat__sidebar-search">
                    <Search
                        placeholder="// TODO"
                        allowClear
                        value={inputValue}
                    />
                </div>   
            {       
    items.length > 0 ? items.map(item => (
                 <DialogItem
                    text={item.text}
                    contactName={contactName}
                    id={item.id}
                    user={item.username}
                    avatar={item.avatar}
                    isMe={item.id === userId}
                    onSelect={onSelectDialog}
                    messages={item.last_message_text}
                    lastMessageData={lastMessageData}
                    />
            ))
    : null
}            
        </div>
    );
};

export default Dialogs;
 