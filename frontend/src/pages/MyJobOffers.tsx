import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress,
  Grid,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { type RecruiterJob } from "../models/RecruiterJob";
import api from "../api/api";

const MyJobOffersPage: React.FC = () => {
  const { token, user } = useAuth();
  const [jobs, setJobs] = useState<RecruiterJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs/recruiter/offers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching recruiter jobs", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "recruiter") {
      fetchJobs();
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
      <Typography variant="h4" gutterBottom>
        My Job Offers
      </Typography>

      {jobs.length === 0 ? (
        <Typography>No job offers found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid key={job.id} size={{ sm: 12 }} width={"100%"}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {job.location}
                  </Typography>
                  <Typography variant="body1" mt={1}>
                    {job.description}
                  </Typography>
                </CardContent>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      {job.applications.length} Applicant
                      {job.applications.length !== 1 && "s"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {job.applications.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        No candidates yet.
                      </Typography>
                    ) : (
                      <List dense>
                        {job.applications.map((app) => (
                          <ListItem key={app.id} alignItems="flex-start">
                            <ListItemText
                              primary={app.candidate.email}
                              secondary={app.coverLetter}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </AccordionDetails>
                </Accordion>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyJobOffersPage;
