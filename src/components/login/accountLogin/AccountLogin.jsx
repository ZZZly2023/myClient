
import './accountLogin.less';
import Avatar from '@src/components/common/avatar/avatar';
import {PhoneInput, AuthCodeInput } from '@src/components/common/input/Input';
export default function AccountLogin() {
  return (
    <div className="account-login">
      <div className='login-avatar'>
        <Avatar type={'roster'} />
      </div>
      <div className='img-text'>{ '良云，欢迎来到友空间' }</div>
      <PhoneInput />
      <AuthCodeInput />
    </div>
  );
}