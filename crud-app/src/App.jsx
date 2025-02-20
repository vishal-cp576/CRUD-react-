import { useState, useEffect } from 'react';
import './App.css';
import { employeeData } from './components/EmployeeData';

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [index, setIndex] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(employeeData);
  }, []);

  function handleEdit(index) {
    const employee = data[index];
    setIsUpdate(true);
    setIndex(index);
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setAge(employee.age);
  }

  function handleSave() {
    const newEmployee = {
      id: data.length + 1,
      firstName,
      lastName,
      age,
    };

    setData((prevData) => [...prevData, newEmployee]);
    handleClear();
  }

  function handleUpdate() {
    const updatedData = [...data];
    updatedData[index] = {
      id: updatedData[index].id,
      firstName,
      lastName,
      age,
    };

    setData(updatedData);
    handleClear();
  }

  function handleClear() {
    setIndex(null);
    setFirstName("");
    setLastName("");
    setAge("");
    setIsUpdate(false);
  }

  function handleDelete(index) {
    const updatedData = data.filter((item, i) => i !== index);
    setData(updatedData);
  }

  return (
    <div>
      <div className="flex justify-center bg-amber-100">
        <label>
          First Name:
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="border-2 m-2"
            placeholder="Enter first name "
          />
        </label>

        <label>
          Last Name:
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border-2 m-2"
            placeholder="Enter last name"
          />
        </label>

        <label>
          Age:
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border-2 m-2"
            placeholder="Enter age"
          />
        </label>

        {!isUpdate ? (
          <button
            className="text-blue-800 border-2 rounded p-1 m-2 cursor-pointer" onClick={handleSave}> Save </button>) :
          (<button className="text-blue-800 border-2 rounded p-1 m-2 cursor-pointer" onClick={handleUpdate}>Update</button>
          )}

        <button
          className="text-red-800 border-2 rounded p-1 m-2 cursor-pointer"
          onClick={handleClear}>Clear</button>
      </div>

      <table className="w-full text-left border-1 font-bold">
        <thead className="bg-red-400">
          <tr>
            <th>Sr No.</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="bg-red-200">
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button className="text-blue-600 border-2 rounded p-1 m-2 cursor-pointer" onClick={() => handleEdit(index)}>Edit</button>

                <button className="text-red-600 border-2 rounded p-1 m-2 cursor-pointer" onClick={() => handleDelete(index)}>delete </button>

              </td>
            </tr>))

          }
        </tbody>
      </table>
    </div>
  )
}

export default App;