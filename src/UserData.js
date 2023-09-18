import React, { Component } from "react";
import "./App.css";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const phoneRegex = /^\d{10}$/;

class UserData extends Component {
  constructor(props) {
    super(props);

    const usersFromStorage = JSON.parse(localStorage.getItem("users")) || [];

    this.state = {
      users: usersFromStorage,
      name: "",
      email: "",
      profilePicture: "",
      phoneNumber: "",
      isEditing: false,
      editIndex: null,
    };
  }

  addUser = () => {
    const { name, email, profilePicture, phoneNumber } = this.state;

    if (
      name &&
      emailRegex.test(email) &&
      profilePicture &&
      phoneRegex.test(phoneNumber)
    ) {
      const newUser = {
        name,
        email,
        profilePicture,
        phoneNumber,
      };

      this.setState(
        (prevState) => ({
          users: [...prevState.users, newUser],
          name: "",
          email: "",
          profilePicture: "",
          phoneNumber: "",
        }),
        () => {
          localStorage.setItem("users", JSON.stringify(this.state.users));
        }
      );
    } else {
      alert("Please enter a valid email and phone number.");
    }
  };

  updateUser = () => {
    const { name, email, profilePicture, phoneNumber, editIndex } = this.state;

    if (
      name &&
      emailRegex.test(email) &&
      profilePicture &&
      phoneRegex.test(phoneNumber) &&
      editIndex !== null
    ) {
      const updatedUsers = [...this.state.users];
      updatedUsers[editIndex] = {
        name,
        email,
        profilePicture,
        phoneNumber,
      };

      this.setState(
        {
          users: updatedUsers,
          name: "",
          email: "",
          profilePicture: "",
          phoneNumber: "",
          isEditing: false,
          editIndex: null,
        },
        () => {
          localStorage.setItem("users", JSON.stringify(this.state.users));
        }
      );
    } else {
      alert("Please enter a valid email and phone number.");
    }
  };

  editUser = (index) => {
    const userToEdit = this.state.users[index];
    this.setState({
      name: userToEdit.name,
      email: userToEdit.email,
      profilePicture: userToEdit.profilePicture,
      phoneNumber: userToEdit.phoneNumber,
      isEditing: true,
      editIndex: index,
    });
  };

  deleteUser = (index) => {
    const { users } = this.state;
    users.splice(index, 1);
    this.setState(
      { users },
      () => {
        localStorage.setItem("users", JSON.stringify(this.state.users));
      }
    );
  };

  renderUsers() {
    return this.state.users.map((user, index) => (
      <div key={index} className="user-card">
        <img className="profile" src={user.profilePicture} alt={user.name} />
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.phoneNumber}</p>
        <button className="edit" onClick={() => this.editUser(index)}>
          Edit
        </button>
        <button onClick={() => this.deleteUser(index)}>Delete</button>
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        <h1>CRUD Application</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Profile Picture URL</label>
          <input
            type="text"
            placeholder="Profile Picture URL"
            value={this.state.profilePicture}
            onChange={(e) =>
              this.setState({ profilePicture: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            value={this.state.phoneNumber}
            onChange={(e) =>
              this.setState({ phoneNumber: e.target.value })
            }
          />
        </div>
        {this.state.isEditing ? (
          <button className="edit" onClick={this.updateUser}>
            Update User
          </button>
        ) : (
          <button onClick={this.addUser} className="add-user">Add User</button>
        )}
        <div className="user-list">{this.renderUsers()}</div>
      </div>
    );
  }
}

export default UserData;