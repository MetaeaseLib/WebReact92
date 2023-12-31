import React from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { projectId, auth, signInWithGoogle } from "./Firebase";


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.userAuthHandler = this.userAuthHandler.bind(this);
    this.getMessage = this.getMessage.bind(this);

    this.state = {
      loginUser: null,
      message: "no message"
    };
  }

  userAuthHandler(user) {
    if (user) {
      // Login
      this.setState({loginUser: user});
    } else {
      // Logout
      this.setState({
        loginUser: null,
        message: "no message"
      });
    }
  }

  componentDidMount() {
    onAuthStateChanged(auth, this.userAuthHandler);
  }

  getMessage() {
    const callBackend = async () => {
//      const baseURL = "https://" + projectId + ".web.app";
      const apiEndpoint = "https://webapi92-zivirtjj3q-uc.a.run.app";
      const user = auth.currentUser;
      const token = await user.getIdToken();
      const request = {  
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
        })
      };
      fetch(apiEndpoint, request)
        .then((res) => res.json())
        .then((data) => this.setState({message: data.message}));
    };
    const waitMessage = new Promise(resolve => {
      this.setState({message: "Wait..."});
      resolve();
    });
    waitMessage.then(callBackend);
  }

  render() {
    const loginImageURL = process.env.PUBLIC_URL + "/btn_google_signin_light_normal_web.png";
    var element;

    if (this.state.loginUser) {
      const displayName = auth.currentUser.displayName;
      const photoURL = auth.currentUser.photoURL;
      element = (
        <>
          <button onClick={() => signOut(auth)}>Logout</button>
          <h1>Welcome {displayName}!</h1>
          <img style={{ margin: "10px" }} alt="Profile icon" src={photoURL}/>
          <button onClick={this.getMessage}>Get message from the backend API</button>
          <p>message: {this.state.message}</p>
        </>
      );
    } else {
      element = (
        <>
          <input type="image" alt="Sign in with Google"
            onClick={signInWithGoogle} src={loginImageURL} />
        </>
      );
    }

    return (
      <div className="App" style={{ margin: "10px" }}>{element}</div>
    );
  }
}
