// src/components/ApplyModal.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/authContext";
import api from "../api/api";

type ApplyForm = {
  fullName: string;
  email: string;
  coverLetter: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  jobId: number;
};

const ApplyModal: React.FC<Props> = ({ open, onClose, jobId }) => {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplyForm>();

  const onSubmit = async (data: ApplyForm) => {
    try {
      await api.post(`/jobs/${jobId}/apply`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      reset();
      onClose();
    } catch (err) {
      console.error("Errore durante la candidatura", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Apply </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure to send this application?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>close</Button>
          <Button type="submit" variant="contained">
            Send application
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ApplyModal;
