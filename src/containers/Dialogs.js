import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux'
import {dialogsActions} from './../redux/actions'
import {Dialogs as BaseDialogs} from './../components';

const Dialogs = ({fetchDialogs, setCurrentDialogId, items, userId}) => {

    const [inputValue, setValue] = useState('');
    const [filtered, setFilteredItems] = useState(items);
    const onChangeInput = value => {
        setFilteredItems(items.filter(dialog => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0))
        setValue(value); 
    }
    useEffect(() => {
        if (!items.length) {
            fetchDialogs();
        } else {
            setFilteredItems(items);
        }
    }, [items])

    let key = 0;
    
    let arr = {};

    userId.then((value) => {
        value.map(function(name) {
            
          });
    })

    return <BaseDialogs 
    userId={userId} 
    items={filtered} 
    onSearch={onChangeInput} 
    inputValue={inputValue}
    onSelectDialog={setCurrentDialogId}
    />
}

export default connect(({dialogs}) => dialogs, dialogsActions)(Dialogs);