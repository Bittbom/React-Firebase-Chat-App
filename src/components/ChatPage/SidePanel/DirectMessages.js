import React, { Component } from "react";
import { FaRegSmile } from "react-icons/fa";
import firebase from "../../../firebase";
import { connect } from "react-redux";
export class DirectMessages extends Component {
  state = {
    usersRef: firebase.database().ref("users"),
  };

  componentDidMount() {
    if (this.props.user) {
      this.addUsersListeners(this.props.user.uid);
    }
  }

  addUsersListeners = (currentUserId) => {
    const { usersRef } = this.state;
    let usersArray = [];
    usersRef.on("child_added", (DataSnapshot) => {
      if (currentUserId !== DataSnapshot.key) {
        let user = DataSnapshot.val();
        user["uid"] = DataSnapshot.key;
        user["status"] = "offline";
        usersArray.push(user);
        this.setState({ users: usersArray });
      }
    });
  };

  renderDirectMessages = () => {};

  render() {
    console.log("users", this.state.users);
    return (
      <div>
        <span style={{ display: "flex", alignItems: "center" }}>
          <FaRegSmile style={{ marginRight: 3 }} /> DIRECT MESSAGES(1)
        </span>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {this.renderDirectMessages()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(DirectMessages);
