import './userlistitem.css'

const UserListItem = (props) => {

    const {name, username, email, address} = props.props;
    
    return (
        <tr>
            <td>{props.id>=10?props.id:`0${props.id}`}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>{address.city}</td>
            <td>{email}</td>
            <td>
                <button 
                    onClick={props.onEdit}
                    className="btn btn_edit">
                    Edit
                </button>
            </td>
            <td>
                <button 
                    onClick={props.onDelete}
                    className="btn btn_delete">
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default UserListItem;