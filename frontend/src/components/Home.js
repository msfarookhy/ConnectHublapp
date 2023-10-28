import React, { useState, useEffect } from "react";
import "./App.css";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form, Card } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


function UserCard({ user, onEditClick, onDeleteClick, updated }) {

  const handleViewDetails = () => {
    const userDetailsUrl = `/user/${user._id}`;
    window.open(userDetailsUrl, "_blank");
  };
  
  return (
    <div className={`user-card-container ${updated ? "zoom-in" : ""}`} style={{ width: "auto" }}>
    <Card style={{ width: "18rem" }}>
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {user.name}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{ fontStyle: "italic" }}>
          Email: {user.email}
        </Card.Subtitle>
        <Card.Text>Phone: {user.phone}</Card.Text>
        <div className="d-flex justify-content-around w-100">
          <Button
            variant="primary"
            onClick={() => onEditClick(user)}
            style={{ backgroundColor: "#007bff", marginRight: "0.5rem" }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => onDeleteClick(user)}
            style={{ backgroundColor: "#dc3545", marginRight: "0.5rem" }}
          >
            Delete
          </Button>
          <Button
            variant="success"
            onClick={handleViewDetails}
            style={{ backgroundColor: "#17a2b8" }}
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  </div>
  
  );
}

function Home() {

  const [tableData, setTableData] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);
  const [updatedCardId, setUpdatedCardId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(localStorage.getItem("selectedFilter") || "AZ");
  const navigate = useNavigate();


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      fetchInitialData();
    }
  }, [navigate]);

    const fetchInitialData = async () => {
    try {
      debugger
      const response = await axios.get(
        "http://localhost:5000/api/mindfull/get_sub_users"
      );
      if (response.data.Data.length > 0) {
        setTableData(response.data.Data);
        if (!localStorage.getItem("token")) {
          setTableData([]);
        }

      } else {
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
      toast.error("An error occurred while fetching mindfull data.");
    }
  };

  const sortTableData = (data, filter) => {
    if (filter === "AZ") {
      return [...data].sort((a, b) => {
        return a.name && b.name ? a.name.localeCompare(b.name) : 0;
      });
    } else if (filter === "ZA") {
      return [...data].sort((a, b) => {
        return a.name && b.name ? b.name.localeCompare(a.name) : 0;
      });
    } else if (filter === "LastModified") {
      return [...data].sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB - dateA;
      });
    } else if (filter === "LastInserted") {
      return [...data].sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB - dateA;
      });
    } else {
      return data;
    }
  };


  const handleAddUserClick = () => {
    setShowAddUserModal(true);
  };

  const handleAddUserSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/mindfull/add_sub_user",
        newUser
      );

      if (response.status === 201) {
        toast.success("User added successfully.");
        setShowAddUserModal(false);
        fetchInitialData();
      } else if (response.status === 409) {
        toast.error("User already exists");
      } else {
        toast.error("Failed to add user.");
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("User already exists with the provided email!");
      } else {
        console.error("Error adding user:", error);
        toast.error("An error occurred while adding a user.");
      }
    }
  };

  const handleAddUserCancel = () => {
    setShowAddUserModal(false);
  };

  const handleEditClick = (user) => {
    setSelectedUserForEdit(user);
    setShowEditModal(true);
  };

  const handleDeleteClick = (user) => {
    
    setSelectedUserForDelete(user);
    setShowDeleteModal(true);
  };

  const handleEditUserSave = async () => {
    if (selectedUserForEdit) {
      axios
        .put(
          `http://localhost:5000/api/mindfull/update_user/${selectedUserForEdit._id}`,
          selectedUserForEdit
        )
        .then((response) => {
          if (response.status === 201) {
            toast.success("User updated successfully.");
            setShowEditModal(false);
            setUpdatedCardId(selectedUserForEdit._id);
            fetchInitialData();
          } else {
            toast.error("Failed to update user.");
          }
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          toast.error("An error occurred while updating the user.");
        });
    }
  };

  const handleEditUserCancel = () => {
    setShowEditModal(false);
  };

  const handleDeleteUserSave = async () => {
    if (selectedUserForDelete) {
      axios
        .delete(
          `http://localhost:5000/api/mindfull/delete_user/${selectedUserForDelete._id}`
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success("User deleted successfully.");
            setShowDeleteModal(false);
            fetchInitialData();
          } else {
            toast.error("Failed to delete user.");
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("An error occurred while deleting the user.");
        });
    }
  };

  const handleDeleteUserCancel = () => {
    setShowDeleteModal(false);
  };
debugger
  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    localStorage.setItem("selectedFilter", newFilter);

    if (newFilter === "LastModified") {
      fetchDataFromBackend(newFilter);
    }
  };

  const fetchDataFromBackend = (filter) => {
    axios
      .get(`http://localhost:5000/api/mindfull/get_filtered_sub_users?filter=${filter}`)
      .then((response) => {
        if (response.data.Data.length > 0) {
          setTableData(response.data.Data);
        } else {
          setTableData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
        toast.error("An error occurred while fetching filtered data.");
      });
  };

  const filteredData = tableData.filter((user) => {
    const { name, phone, email } = user;
    const query = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(query) ||
      phone.toLowerCase().includes(query) ||
      email.toLowerCase().includes(query)
    );
  });

  const sortedTableData = sortTableData(filteredData, selectedFilter);
  if (!localStorage.getItem("token")) {
    return <Header />;
  }
  return (
    <div className="home-container">
      <Header />
      <main className="content">
        <Row className="align-items-center">
          <Col md={4} className="text-center">
          <div className="search-bar input-group">
  <input
    type="text"
    placeholder="Search..."
    className="form-control search-box"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  {searchQuery && (
    <div className="input-group-append">
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => setSearchQuery("")}
      >
        X
      </button>
    </div>
  )}
</div>


          </Col>
          <Col md={2} className="text-center">
            <select
              value={selectedFilter}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="AZ">A-Z</option>
              <option value="ZA">Z-A</option>
              <option value="LastModified">Last Modified</option>
              <option value="LastInserted">Last Inserted</option>
            </select>
          </Col>
          <Col md={2} className="text-center">
        <button className="new-user-button add-user-button" onClick={handleAddUserClick}>
          + ADD USER
        </button>
      </Col>
        </Row>
        <div className="user-list">
          <div className="horizontal-scroll">
            {sortedTableData.length > 0 ? (
              sortedTableData.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                  updated={user._id === updatedCardId}
                />
              ))
            ) : (
              <div className="no-data-container">
              <img
                src={require("../img/nodata.jpg")}
                alt="No Data Found"
                style={{ width: "1000px", height: "700px" }} // Adjust the width and height as needed
              />
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Add User Modal */}
      <Modal show={showAddUserModal} onHide={handleAddUserCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddUserCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddUserSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={handleEditUserCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUserForEdit && (
            <Form>
              <Form.Group controlId="editName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={selectedUserForEdit.name}
                  onChange={(e) =>
                    setSelectedUserForEdit({
                      ...selectedUserForEdit,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="editPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  value={selectedUserForEdit.phone}
                  onChange={(e) =>
                    setSelectedUserForEdit({
                      ...selectedUserForEdit,
                      phone: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="editEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={selectedUserForEdit.email}
                  onChange={(e) =>
                    setSelectedUserForEdit({
                      ...selectedUserForEdit,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditUserCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditUserSave}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete User Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteUserCancel} centered>
  <Modal.Header closeButton>
    <Modal.Title>Delete User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedUserForDelete && (
       <div className="delete-confirmation">
       <p className="confirmation-text"><strong>Are you sure you want to delete the following user? </strong></p>
       <p><strong>Name:</strong> {selectedUserForDelete.name}</p>
       <p><strong>Email:</strong> {selectedUserForDelete.email}</p>
     </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleDeleteUserCancel}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleDeleteUserSave}>
      Delete
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}

export default Home;
