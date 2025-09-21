import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [Users, setUsers] = useState([]);
  const [filterdata, setFiltterdata] = useState([]);
  const [ismodeldata,setismodeldata]=useState(false);
  const [userData,setUserdata]=useState({name:"",age:"",city:""});
  const getdata = async () => {
    const res = await axios.get("http://localhost:8000/Users");
    console.log(res.data);
    setUsers(res.data);
    setFiltterdata(res.data);
  };

  useEffect(() => {
    getdata();
  }, []);
  const closemodel =()=>{
    setUserdata({name:"",age:"",city:""});
    setismodeldata(false);
  }

  const handlesearch = (e) => {
    const search = e.target.value.toLowerCase();
    const filter = Users.filter((User) =>
      User.name.toLowerCase().includes(search) ||
      User.city.toLowerCase().includes(search)
    );
    setFiltterdata(filter);
  };
  const deleteevent=async (id)=>{
    await axios.delete(`http://localhost:8000/Users/${id}`).then((res)=>{
    setUsers(res.data);
    setFiltterdata(res.data);  
    })
  }
  const Addrecord=()=>{
   setismodeldata(true);
  }
  const handledata=(e)=>{
     setUserdata({...userData,[e.target.name]:e.target.value})
     setismodeldata(true);
  }
  const submit = async () => {
  try {
    const res = await axios.post("http://localhost:8000/Users", userData);
    console.log(res.data);
    getdata(); // refresh user list
    closemodel();
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div>
      <div className='container'>
        <h3>CRUD Application with React JS Frontend and Backend</h3>
        <div className='input-search'>
          <input type="search" placeholder='Search here' onChange={handlesearch} />
          <button className='btn green'onClick={Addrecord}>Add Record</button>
        </div>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>age</th>
            <th>city</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {filterdata && filterdata.map((User) => (
            <tr key={User.id}>
              <td>{User.id}</td>
              <td>{User.name}</td>
              <td>{User.age}</td>
              <td>{User.city}</td>
              <td><button className='btn green'>Edit</button></td>
              <td><button className='btn red' onClick={()=>{deleteevent(User.id)}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {ismodeldata && <div className='model'>
        <div className='model-content'>
          <span className='close' onClick={closemodel}>
            &times;
          </span>
          <h2>modelrecord</h2> 
          <div className='input-group'>
          <label htmlFor="">fullname</label> 
          <input type="text" name='name' value={userData.name} onChange={handledata}/>
          </div>
          <div className='input-group'>
          <label htmlFor="">age</label>
          <input type="number" name='age' value={userData.age} onChange={handledata}/>
          </div>
          <div className='input-group'>
          <label htmlFor="">city</label>
          <input type="text" name='city' value={userData.city} onChange={handledata}/>
          </div>
          <button className='btn green' onClick={submit} >Add users</button>
        </div>  
        
      </div>}
    </div>
  );
}

export default App;

//cd 'C:\Users\Admin\OneDrive\Desktop\tempreact\clientSide'