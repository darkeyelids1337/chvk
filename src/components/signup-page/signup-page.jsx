import { Link } from "react-router-dom";
import "./signup-page.css";
import { Form, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";

const SignUp = ({setLogin}) => {
    const submitValidation = (e) => {
        e.preventDefault();
        const password = e.target.querySelector('.pass-input').value;
        const confirmPassword = e.target.querySelector('.pass-confirm-input').value;
       if(password !== confirmPassword){
        e.target.querySelector('.pass-feedback').setAttribute('invalid', true);
        e.target.querySelector('.pass-feedback').textContent = 'Пароли не совпадают';
       }
       else {
        e.target.querySelector('.pass-feedback').setAttribute('invalid', false);
        e.target.querySelector('.pass-feedback').textContent = '';
        setLogin(true);
       }
    }
    return(
        <div className="sgn-up-container">
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
                <Input type="email" placeholder="example@gmail.com" className="email-input" required></Input>
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Password"
                className="pass-input"
                required
              ></Input>
              <FormFeedback className="pass-feedback"></FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input type="password" className="pass-confirm-input" placeholder='Confirm Password' required></Input>
            </FormGroup>
            <Button className="register-button">Register</Button>
          </Form>
          <Link to="/login" className="to-log-btn">Уже есть аккаунт? Войдите</Link>
        </div>
      </div>
    )
}

export default SignUp;