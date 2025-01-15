import classNames from "classnames";
import "./login.less";
import { useState } from "react";
import AccountLogin from "./accountLogin/AccountLogin";
import QRCodeLogin from "./qrCodeLogin/QrCodeLogin";
const LOGINTYPE = {
  ACCOUNT: 'account',
  QRCODE: 'qrcode'
}
export default function Login() {
  const [loginType, setLoginType] = useState(LOGINTYPE.ACCOUNT);
  return (
    <div className="login-container">
      <div className="ads">
       <h1>Welcome to YouZone</h1>
       <h3>协同云超级群，满足你的一切需求</h3>
      </div>
      <div className="login">
        <div className="body">
          <div className="switch-login-type"></div>
          <div className="login-content">
            { loginType == 'account' ? <AccountLogin /> : <QRCodeLogin /> }
          </div>
        </div>
      </div>
    </div>
  );
}