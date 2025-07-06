import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

type RegisterForm = {
  email: string;
  password: string;
  role: "candidate" | "recruiter";
};

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await api.post("/auth/signup", data);
      navigate("/login");
    } catch (err: any) {
      alert(err.response.data.error);
      console.error("Error during registration", err);
    }
  };

  return (
    <Box className="login-class">
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              label="Role"
              select
              fullWidth
              margin="normal"
              defaultValue="candidate"
              {...register("role", { required: "Role is required" })}
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              <MenuItem value="candidate">Candidate</MenuItem>
              <MenuItem value="recruiter">Recruiter</MenuItem>
            </TextField>
            <Box mt={2}>
              <Button type="submit" variant="contained" fullWidth>
                Create Account
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
