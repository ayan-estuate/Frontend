import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "@carbon/react";

interface ModalComponentProps {
  open: boolean;
  onRequestClose: () => void;
  title: string;
  body: React.ReactNode;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  open,
  onRequestClose,
  title,
  body,
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}) => {
  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={onSecondaryButtonClick}>
          {secondaryButtonLabel}
        </Button>
        <Button kind="primary" onClick={onPrimaryButtonClick}>
          {primaryButtonLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
