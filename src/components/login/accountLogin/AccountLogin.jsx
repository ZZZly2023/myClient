
import './accountLogin.less';
import Avater from '@src/components/common/avater/avater';
import {PhoneInput, AuthCodeInput } from '@src/components/common/input/Input';
export default function AccountLogin() {
  return (
    <div className="account-login">
      <div className='login-avater'>
        <Avater type={'roster'} />
      </div>
      <div className='img-text'>{ '良云，欢迎来到友空间' }</div>
      <PhoneInput />
      <AuthCodeInput />
    </div>
  );
}