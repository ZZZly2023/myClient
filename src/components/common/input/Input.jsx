import "./input.less"

export function PhoneInput() {
  return (
    <div className="input-wrapper">
      <span className="country-code">+86</span>
      <input type="text" placeholder="请输入手机号" />
      <span className="switch-btn">邮箱</span>
    </div>
  )
  // return <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
}

export function AuthCodeInput() {
  return <input type="text"/>
}