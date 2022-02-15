import UserList from "../usersList/UserList";
import UserAddForm from "../usersAddForm/UserAddForm";
import EditUser from "../editUser/EditUser";

import { useSelector } from "react-redux";
import './app.css';

const App = () => {

    const { curEditUserId, userCreate } = useSelector(state => state);

    let contentWindow = <UserList/>; 
    
    if (userCreate) {
        contentWindow = <UserAddForm/>
    } else if (curEditUserId) {
        contentWindow = <EditUser/>
    }

    return (
        <main className="app">
            {contentWindow}
        </main>
    )
}

export default App;