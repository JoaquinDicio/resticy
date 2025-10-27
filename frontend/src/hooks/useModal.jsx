import { useState } from "react";

export default function useModal() {
  const [modal, setModal] = useState(null);

  const [payload, setPayload] = useState(null);

  const openModal = (type, data = null) => {
    setModal({ type });
    setPayload(data);
  };

  const closeModal = () => {
    setModal(null);
    setPayload(null);
  };

  return { openModal, modal, closeModal, payload };
}
