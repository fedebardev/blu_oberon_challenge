// src/pages/AppliedJobsPage.tsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Box,
  Container,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { type AppliedJob } from "../models/AppliedJob";
import JobCard from "../components/JobCard";
import api from "../api/api";

const AppliedJobsPage: React.FC = () => {
  const { token, user } = useAuth();
  const [jobs, setJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await api.get("/jobs/applied", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching applied jobs", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "candidate") {
      fetchAppliedJobs();
    }
  }, [token, user]);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h5" mt={4} mb={2}>
        My Applications
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : jobs.length === 0 ? (
        <Typography>No applications found.</Typography>
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
    </Container>
  );
};

export default AppliedJobsPage;
