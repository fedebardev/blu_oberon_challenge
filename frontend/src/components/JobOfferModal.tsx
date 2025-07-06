// src/components/JobOfferModal.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/authContext";
import api from "../api/api";

type JobOfferForm = {
  title: string;
  location: string;
  description: string;
};

type JobOfferModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

const JobOfferModal: React.FC<JobOfferModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobOfferForm>();

  const onSubmit = async (data: JobOfferForm) => {
    try {
      await api.post("/jobs", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      reset();
      onClose();
      onSuccess?.();
    } catch (err) {
      console.error("Error during creation", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Job Offer</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...register("title", { required: "mandatory" })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            {...register("location", { required: "mandatory" })}
            error={!!errors.location}
            helperText={errors.location?.message}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            {...register("description", {
              required: "mandatory",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annulla</Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default JobOfferModal;
