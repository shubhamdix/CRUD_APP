
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './App.css'

function Table() {
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [uname, usetName] = useState('')
    const [uemail, usetEmail] = useState('')
    const [editId, setEditID] = useState(-1)

    useEffect(()=> {
        axios.get('http://localhost:3000/users')
        .then(res => setData(res.data))
        .catch(er => console.log(er));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = data[data.length - 1].id + 1;
        axios.post('http://localhost:3000/users', {id: id, name:name, email:email})
        .then(res => {
            location.reload()
        })
        .catch(er => console.log(er));
    }

    const handleEdit = (id) => {
        axios.get('http://localhost:3000/users/'+id)
        .then(res => {
            console.log(res.data)
            usetName(res.data.name)
            usetEmail(res.data.email)
        })
        .catch(er => console.log(er));
        setEditID(id)
    }

    const handleUpdate = () => {
        axios.put('http://localhost:3000/users/'+editId, {id: editId, name: uname, email: uemail})
        .then(res => {
            console.log(res);
            location.reload();
            setEditID(-1);
        }).catch(err => console.log(err));
    }

    const handleDelete =(id) => {
        axios.delete('http://localhost:3000/users/'+id)
        .then(res => {
            location.reload();
        })
        .catch(er => console.log(er));
    }
    return (
        <div className="container">
        
            <div className='form-div'>
            <form onSubmit={handleSubmit}>
                <table >
                    <tr className='form-data'>
                        <td>Name :</td>
                        <td><input type='text' name='username' placeholder='Enter Your Name' onChange={e => setName(e.target.value)} /></td>
                        <td>Email :</td>
                        <td><input type='password' name='password' placeholder='Enter Your Email' onChange={e => setEmail(e.target.value)}  /></td>
                        <td><button>Add</button></td>
                    </tr>
                </table>          
            </form>
            </div>

             <div className='table-div'>                                         
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody style={{ }}> 
                    {
                        data.map((user, index) => (
                            user.id === editId ?
                            <tr>
                                <td>{user.id}</td>
                                <td><input type="text" value={uname}  onChange={e => usetName(e.target.value)}/></td>
                                <td><input type="text" value={uemail} onChange={e => usetEmail(e.target.value)}/></td>
                                <td><button class="btn btn-update" onClick={handleUpdate}>Update</button></td>
                            </tr>
                            :
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button class="btn btn-success" onClick={() => handleEdit(user.id)} >EDIT</button>
                                <button class="btn btn-danger"  onClick={() => handleDelete(user.id)}>DELETE</button>
                            </td>
                        </tr>
                        )
                        )
                    }
                </tbody>
            </table>
            </div> 
            
        </div>
    )
}

export default Table
