import React, { useState } from "react";
import ModalComponent from "../components/ModalComponent";

const ArchivePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handlePrimaryAction = () => {
    // Your primary action logic here
    handleCloseModal();
  };

  const handleSecondaryAction = () => {
    // Your secondary action logic here
    handleCloseModal();
  };

  return (
    <div>
      {/* Your other page content */}

      {/* Single Modal Instance */}
      <ModalComponent
        open={isModalOpen}
        onRequestClose={handleCloseModal}
        title="Your Modal Title"
        body="Your Modal Content"
        primaryButtonLabel="Confirm"
        secondaryButtonLabel="Cancel"
        onPrimaryButtonClick={handlePrimaryAction}
        onSecondaryButtonClick={handleSecondaryAction}
      />
    </div>
  );
};

export default ArchivePage;
