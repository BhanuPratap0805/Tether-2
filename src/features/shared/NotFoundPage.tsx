import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import TetherMark from '../../components/common/TetherMark';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <TetherMark size={48} />
      <h1 className="mt-6 text-3xl font-medium text-sky-50 tracking-tight">Lost the thread</h1>
      <p className="mt-2 text-sm text-sky-300/75 max-w-xs">
        This page drifted out of range. Let's get you back to solid ground.
      </p>
      <Link to="/" className="mt-8">
        <Button icon={<FiArrowLeft />}>Back to safety</Button>
      </Link>
    </div>
  );
}
