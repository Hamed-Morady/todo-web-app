import { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUser = process.env.REACT_APP_API_URL;
console.log(apiUser);

export default function Home() {
  const navigate = useNavigate()
  const [form ,setForm]=useState({password:'',uname:''})
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [forget, setForget] = useState(false);

  const handleFocus = (field) => {
    setFocusedField(field);
  };
  const handleBlur = (e, field, ref) => {
    if (ref.current && ref.current.contains(e.relatedTarget)) return;
    if (focusedField === field) setFocusedField(null);
  };
  const unameRef = useRef();
  const passwordRef = useRef();
  const getvalueInput = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const submitFormHandler = async (e)=>{
    e.preventDefault()
    try {
      const respons = await axios.post(`${apiUser}/login`,form)
      if(respons.status === 200){
        localStorage.setItem('token',respons.data.token)
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <div className="login">
        <div className="right">
          <p className="title">Welcome back.</p>
          <p className="text">Log in and get things done.</p>
        </div>
          <form className="form-reg-log"  onSubmit={submitFormHandler}>
            <h2>Login</h2>
            <div
              className={`form-box ${
                focusedField === "uname" ? "focused" : ""
              }`}
              onFocus={() => handleFocus("uname")}
              onBlur={(e) => handleBlur(e, "uname", unameRef)}
              tabIndex={-1}
              ref={unameRef}
            >
              <label>username</label>
              <input type="text" name="uname"  onChange={getvalueInput}/>
            </div>
            <div
              className={`form-box ${
                focusedField === "password" ? "focused" : ""
              }`}
              onFocus={() => handleFocus("password")}
              onBlur={(e) => handleBlur(e, "password", passwordRef)}
              tabIndex={-1}
              ref={passwordRef}
            >
              <label>Password</label>
              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={getvalueInput}
                />
                <span
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-eye-icon lucide-eye"
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-eye-off-icon lucide-eye-off"
                    >
                      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                      <path d="m2 2 20 20" />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <div className="submit-section">
              <button
                onClick={() => setForget(true)}
                className="policy forget-password"
              >
                forget Password ?
              </button>
              <div className="end-form">
                <button className="sing-submit" type="submit">
                  Login
                </button>
                <a href="/">Don't have an account ?</a>
              </div>
            </div>
          </form>
      </div>
    </div>
  );
}
