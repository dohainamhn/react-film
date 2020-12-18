import React, { useRef, useState } from "react";
import "./style.scss";
function Input(props) {
  const { label, name, type, value, onChange, onBlur, showPassword } = props;
  const inputRef = useRef(null);
  const [isShowPass, setIsShowPass] = useState(false);
  const togglePass = () => {
    setIsShowPass(!isShowPass);
    if (!isShowPass) {
      inputRef.current.type = "text";
      return;
    }
    inputRef.current.type = "password";
  };

  return (
    <div className="input">
      <input
        autoComplete="off"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        onBlur={onBlur}
        ref={showPassword && inputRef}
      />

      {showPassword && (
        <div className="toggle-pass" onClick={togglePass}>
          {isShowPass ? (
            <i className="far fa-eye-slash"></i>
          ) : (
            <i className="far fa-eye"></i>
          )}
        </div>
      )}
    </div>
  );
}

export default Input;
