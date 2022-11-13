import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUsers.module.css";
import Wrapper from "../Helpers/Wrapper";
const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [errorOccured, setErrorOccured] = useState();

  const addUserHandler = (e) => {
    e.preventDefault();
    const nameRef = nameInputRef.current.value;
    const ageRef = ageInputRef.current.value;

    //validation
    if (nameRef.trim().length === 0 || ageRef.trim().length === 0) {
      setErrorOccured({
        title: "invalid input",
        description: "please enter valid name and age (not empty)",
      });
      return;
    }
    if (+ageRef < 1 || +ageRef > 99) {
      setErrorOccured({
        title: "invalid input",
        description: "please enter valid age from 1 to 99",
      });
      return;
    }

    props.onAddUser(nameRef, ageRef);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setErrorOccured(null);
  };

  return (
    <Wrapper>
      {errorOccured && (
        <ErrorModal
          title={errorOccured.title}
          description={errorOccured.description}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username"> Username</label>
          <input
            id="username"
            type="text"
            // onChange={usernameChangeHandler}
            // value={enteredUsername}
            ref={nameInputRef}
          />
          <label htmlFor="age"> Age (years) </label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
