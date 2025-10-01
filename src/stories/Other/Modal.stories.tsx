import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "../../design-system/components/Modal";

const meta: Meta<typeof Modal> = {
  title: "Content Display/Modal",
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: "Modal component for displaying overlay dialogs.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Modal Title",
    children: "This is the modal content.",
    onClose: () => console.log("Modal closed"),
  },
};

export const WithActions: Story = {
  args: {
    isOpen: true,
    title: "Confirm Action",
    children: "Are you sure you want to proceed?",
    onClose: () => console.log("Modal closed"),
    confirmText: "Confirm",
    cancelText: "Cancel",
    onConfirm: () => console.log("Confirmed"),
    onCancel: () => console.log("Cancelled"),
  },
};
