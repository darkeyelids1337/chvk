import "./login-page.css";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
const LoginPage = ({setLogin, setUserInfo}) => {
  const submitValidation = (e) => {
    e.preventDefault();
    const login = e.target.querySelector(".user-input").value;
    const pass = e.target.querySelector(".pass-input").value;
    const signinData = {
      'login': login,
      'cash_password': pass
    }
    fetch("http://127.0.0.1:7000/backend/signin/", {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(signinData)
    }).then((res) =>{
      if(res.status === 200){
        return res.json()
      }
    }).then((res) => {
      setUserInfo(res);
      setLogin(true);
      localStorage.setItem('user', JSON.stringify(res));
    });
  };
  return (
    <div className="container">
      <div className="company-name">
        <h1>CHVK</h1>
      </div>
      <div className="form-container">
        <Form className="input-form" onSubmit={submitValidation}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Username"
              className="user-input"
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              placeholder="Password"
              className="pass-input"
              required
            ></Input>
          </FormGroup>
          <Button className="login-button">Login</Button>
        </Form>
        <Link to={`/signup`} className="to-sgn-btn">Нет аккаунта? Зарегистрируйтесь</Link>
      </div>
    </div>
  );
};

export default LoginPage;
