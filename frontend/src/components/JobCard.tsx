import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/authContext";
import ApplyModal from "./ApplyModal";
import { Check } from "@mui/icons-material";

interface JobCardProps {
  id: number;
  title: string;
  location: string;
  description: string;
  recruiter_email?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  location,
  description,
  recruiter_email,
}) => {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Card className="job-card">
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{title}</Typography>
          {recruiter_email && (
            <Typography variant="body2" color="text.secondary">
              Author: {recruiter_email}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Location: {location}
          </Typography>
          <Typography variant="body1" mt={1}>
            {description}
          </Typography>
        </CardContent>
        {user?.role === "candidate" && (
          <CardActions
            className="card-actions"
            sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}
          >
            {window.location.pathname !== "/applied" && (
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                endIcon={<Check />}
              >
                Apply
              </Button>
            )}
          </CardActions>
        )}
      </Card>
      <ApplyModal open={open} onClose={() => setOpen(false)} jobId={id} />
    </>
  );
};

export default JobCard;
