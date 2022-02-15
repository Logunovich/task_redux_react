import './userAddForm.css';
import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userCreate, userCreated } from '../../actions';

const UserAddForm = () => {

    let newId = useSelector(state => state).lastId;
    newId += 1;
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    function validate(emailItem){
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,4}$/
        if(emailItem.match(pattern)) {
            return true
        }
        else{
            return false
        }
    } 
    const onCancel = () => {
        setUserName('');
        setUserEmail('');
        dispatch(userCreate())
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(validate(userEmail)) {
            const newUser = {
                id: newId,
                name: userName,
                email: userEmail,
                username: '',
                address: {
                    city: ''
                }
            }
    
            request("https://jsonplaceholder.typicode.com/posts", "POST", JSON.stringify(newUser))
                .then(res => console.log(res, 'Success!'))
                .then(dispatch(userCreated(newUser)))
                .catch((err) => console.log(err));
    
            setUserName('');
            setUserEmail('');
            dispatch(userCreate())
        } else {
            document.getElementById('email').style.border = '2px solid red';
            document.getElementById('email_req').style.visibility = 'visible';
            document.getElementById('email_req').style.color = 'red';
            setTimeout(() => {
                document.getElementById('email').style.border = null;
                document.getElementById('email_req').style.visibility = 'hidden';
            }, 2000)
        }
        
    }

    return (
        <main className="dashboard">        
            <h1>Dashboard</h1>
            <div className="block">
            <div className="top_block">
                <div className="left"><h3>Form</h3></div>
            </div>
                <form onSubmit={onSubmitHandler}>
                <label htmlFor="name" className="label label_name">Name: </label>    
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form_control" 
                    id="name" 
                    placeholder="Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    /> <br />
                <label htmlFor="email" className="label abel_email">Email: <span style={{visibility: 'hidden'}} id='email_req'>Incorrect format of the Email</span></label>    
                <input 
                    required
                    type="text" 
                    name="email" 
                    className="form_control" 
                    id="email" 
                    placeholder="Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    /> <br />
                    <button type="submit" className="btn btn-add">Submit</button>
                    <button type="reset" className="btn btn-cancel" onClick={() => onCancel()}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default UserAddForm;