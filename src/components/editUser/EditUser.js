import './edituser.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { userEdit, clearNum } from '../../actions';

const EditUser = () => {
    const idUser = useSelector(state => state).curEditUserId;
    const editUser = useSelector(state => state).users.filter(item => item.id == idUser);
    const [userNameEdit, setUserNameEdit] = useState(editUser[0].name);
    const [userEmailEdit, setUserEmailEdit] = useState(editUser[0].email);
    const [userUserNameEdit, setUserUserNamelEdit] = useState(editUser[0].username);
    const [userAddressEdit, setUserAddressEdit] = useState(editUser[0].address.city);

    const dispatch = useDispatch();
    const {request} = useHttp();

    const onCancel = () => {
        dispatch(clearNum())
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();

        function validate(emailItem){
            const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,4}$/
            if(emailItem.match(pattern)) {
                return true
            }
            else{
                return false
            }
        } 

        if(validate(userEmailEdit)) {
            const newUser = {
                id: editUser[0].id,
                name: userNameEdit,
                email: userEmailEdit,
                username: userUserNameEdit,
                address: {
                    city: userAddressEdit
                }
            }

        request("https://jsonplaceholder.typicode.com/posts", "POST", JSON.stringify(newUser))
            .then(res => console.log(res, 'Success!'))
            .then(dispatch(userEdit(newUser)))
            .catch((err) => console.log(err));

        setUserNameEdit('');
        setUserEmailEdit('');
        setUserUserNamelEdit('');
        setUserAddressEdit('');

        dispatch(clearNum());

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
                <div className="left"><h3>Edit user #{editUser[0].id}</h3></div>
            </div>
                <form 
                onSubmit={onSubmitHandler}
                >
                <label htmlFor="name" className="label label_name">Name: </label>    
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form_control" 
                    id="name" 
                    placeholder="Name"
                    value={userNameEdit}
                    onChange={(e) => setUserNameEdit(e.target.value)}
                    /> <br />
                <label htmlFor="email" className="label abel_email">User name: </label>    
                <input 
                    required
                    type="text" 
                    name="username" 
                    className="form_control" 
                    id="username" 
                    placeholder="User name"
                    value={userUserNameEdit}
                    onChange={(e) => setUserUserNamelEdit(e.target.value)}
                    /> <br />
                <label htmlFor="name" className="label label_name">City: </label>   
                <input 
                    required
                    type="text" 
                    name="city" 
                    className="form_control" 
                    id="city" 
                    placeholder="City"
                    value={userAddressEdit}
                    onChange={(e) => setUserAddressEdit(e.target.value)}
                    /> <br />
                <label htmlFor="name" className="label label_name">Email: <span style={{visibility: 'hidden'}} id='email_req'>Incorrect format of the Email</span></label>
                <input 
                    required
                    type="text" 
                    name="email" 
                    className="form_control" 
                    id="email" 
                    placeholder="Email"
                    value={userEmailEdit}
                    onChange={(e) => setUserEmailEdit(e.target.value)}
                    /> <br />
                    <button type="submit" className="btn btn-add">Submit</button>
                    <button type="reset" className="btn btn-cancel" onClick={() => onCancel()}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default EditUser;