import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Button,
  Box,
} from "@mui/material";
import JobCard from "../components/JobCard";
import JobOfferModal from "../components/JobOfferModal";
import api from "../api/api";

type JobOffer = {
  id: number;
  title: string;
  description: string;
  location: string;
  recruiter: Recruiter;
};

type Recruiter = {
  id: number;
  email: string;
  password: string;
  role: "recruiter" | "admin" | "user";
};

const Dashboard: React.FC = () => {
  const { token, user } = useAuth();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<JobOffer[]>("/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  const loadJobs = async () => {
    api
      .get<JobOffer[]>("/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        mb={2}
      >
        <Typography variant="h5">Welcome {user?.email}</Typography>

        {user?.role === "recruiter" && (
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            + New Job Offer
          </Button>
        )}
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid size={{ sm: 12, md: 6 }} width={"100%"} key={job.id}>
              <JobCard
                id={job.id}
                title={job.title}
                description={job.description}
                location={job.location}
                recruiter_email={job.recruiter.email}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <JobOfferModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={loadJobs}
      />
    </Container>
  );
};

export default Dashboard;
