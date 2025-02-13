import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function App() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [Index, setIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const handleShow = () => {
    setIndex(null);
    setFormData({});
    setShow(true);
  };
  const handleEdit = (index) => {
    setIndex(index);
    setFormData(users[index]);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setIndex(null);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (Index !== null) {
      const updatedUsers = [...users];
      updatedUsers[Index] = formData;
      setUsers(updatedUsers);
    } else {
      setUsers([...users, formData]);
    }
    handleClose();
  };
  const deleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" placeholder="Age" name="age" value={formData.age} onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Skills</Form.Label>
              <Form.Control type="text" placeholder="Skills" name="skill" value={formData.skill} onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Designation</Form.Label>
              <Form.Control type="text" placeholder="Designation" name="designation" value={formData.designation} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Address" name="address" value={formData.address} onChange={handleChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container mt-3">
        <Button variant="success" onClick={handleShow}>
          Add New
        </Button>
      </div>
      <div className="container mt-3">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Skills</th>
              <th>Designation</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {users.length!==0?(
            users.map((user, index) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.skill}</td>
                <td>{user.designation}</td>
                <td>{user.address}</td>
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(index)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => deleteUser(index)}>
                    Delete
                  </Button>
                </td>
              </tr>
            )))
            :(
              <tr>
                <td colSpan="6" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
