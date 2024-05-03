import "./Radio.css";

export const Radio = ({ children, value, name, defaultChecked, checked, disabled, onChange, required }) => (
  <label>
    <input
      type="radio"
      value={value}
      name={name}
      defaultChecked={defaultChecked}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      className="gender-input"
      required={required}
    />
    {children}
  </label>
);