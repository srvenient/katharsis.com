import ChangePasswordForm from './components/form/ChangePasswordForm';
import TwoFactorSettingsForm from './components/form/TwoFactorSettingsForm';
import UserUpdateForm from './components/form/UserUpdateForm';
import SubSidebar from './components/sidebar/SubSidebar';

export default function UserSettingsPage() {
  return (
    <div className="relative flex h-[400vh] w-full">
      <div className="px-3 py-2">
        <SubSidebar />
      </div>

      <div className='flex-1 py-2 ml-2 space-y-8 w-full'>
        <UserUpdateForm />
        <ChangePasswordForm />
        <TwoFactorSettingsForm />
      </div>
    </div>
    
  );
}