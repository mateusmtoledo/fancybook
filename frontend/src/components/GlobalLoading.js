import Loader from './Loader';
import Modal from './Modal';

function GlobalLoading() {
  return (
    <Modal portalElementId="loading">
      <Loader />
    </Modal>
  );
}

export default GlobalLoading;
