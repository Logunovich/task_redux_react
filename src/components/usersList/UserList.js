import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './userlist.css';
import UserListItem from '../usersListItem/UserListItem';
import { useState } from 'react';

import { fetchUsers, usersFetching, usersFetched, usersFetchingError, userEditNum, userCreate, userDelete, fetchSwitch } from '../../actions';

const UserList = () => {
    const {users, usersLoadingStatus, fetched} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [sort, setSort] = useState([1, -1, '↑']);


    const sortAZ = (arr) => {
        users.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return arr[0];
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return arr[1];
            }
              return 0;  
        })
        setSort(sort => {
            if (sort[0] === 1) {
                return [-1, 1, '↑']
            } else {
                return [1, -1, '↓']
            }
        })
    }

    const [openModal, setOpenModal] = useState(false);
    const [deleteUser, setDeleteUser] = useState('');
    if(openModal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    useEffect(() => {
        if(users.length <= 0 && !fetched){
            dispatch(fetchUsers(request))
        }
    }, []);

    const onEdit = useCallback((id) => {
        dispatch(userEditNum(id))
    }, [request]);

    const onDelete = (id) => {
        setOpenModal(true)
        setDeleteUser(id)
    };

    const confirmDeleteUser = () => {
        request(`https://jsonplaceholder.typicode.com/posts/${deleteUser}`, 'DELETE')
            .then(data => console.log(data, 'Deleted!'))
            .then(dispatch(userDelete(deleteUser)))
            .catch(err => console.log(err))

        setOpenModal(false)
    };

    const onAdd =() => {
        dispatch(userCreate())
    } 

    let content;

    const renderUsers = (arr) => {
        return arr.map(({id, ...props}) => {
            return (
                <UserListItem
                    props={props}
                    id={id}
                    key={id}
                    onEdit={() => onEdit(id)}
                    onDelete={() => onDelete(id)}/>
            )
        })
    }

    let noMoreUsers = null;

    if (users.length === 0 && usersLoadingStatus !== 'loading') {
        noMoreUsers = 
        <div className="no-more-users">
            <h3>No more users</h3>
            <button onClick={() => onAdd()}className="btn btn-add">Add new</button>
        </div>
    }
    
    if (usersLoadingStatus === 'loading') {
        content = <p style={{textAlign: 'center'}}>Loading...</p>;
    } else if (usersLoadingStatus === 'error') {
        content = <p style={{textAlign: 'center'}}>Loading Error :(</p>
    } else if (usersLoadingStatus === 'idle') {
        content = 
        <table className="dashboard_list">
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Name <button onClick={() => sortAZ(sort)}>{sort[2]}</button></td>
                    <td>Username</td>
                    <td>City</td>
                    <td>Email</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
            </thead>
            <tbody>
                {renderUsers(users)}
            </tbody>
        </table> 
    }

    let addNewBtn = null;

    if(usersLoadingStatus === 'idle') {
        addNewBtn = <div className="right"><button onClick={() => onAdd()}className="btn btn-add">Add new</button></div>
    }

    let modalClose = () => {
        let classModal = 'popup'
        if(openModal) {
            classModal += ' open'
        }
        return (
            <div className={classModal}>
                <div className="popup__body">
                    <div className="popup__content">
                        <div className="popup__title">Confirm</div>
                        <div className="popup__text">
                            <p>Are you sure you want to delete the user <b>#{deleteUser}</b>?</p>
                            <button 
                                onClick={() => setOpenModal(false)}
                                className="btn btn-cancel">
                                Cancel
                            </button>

                            <button 
                                onClick={() => confirmDeleteUser()}
                                className="btn btn_delete">
                                Delete
                            </button>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }

    const modalWindow = modalClose();

    return (
        <main className="dashboard">
            <h1>Dashboard</h1>
            <div className="block">
            <div className="top_block">
                <div className="left"><h3>User list</h3></div>
                {addNewBtn}
            </div>
            {content}
            {noMoreUsers}
            </div>
            {modalWindow}
        </main>
    )
}

export default UserList;