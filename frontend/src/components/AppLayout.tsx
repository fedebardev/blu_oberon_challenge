// src/layout/AppLayout.tsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const AppLayout: React.FC = () => {
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Applied", path: "/applied", role: "candidate" },
    { label: "Offers", path: "/offers", role: "recruiter" },
    { label: "Logout", path: "/login" },
  ];

  const drawerContent = (
    <List>
      {navLinks.map((link) =>
        !(link?.role && link?.role !== user?.role) ? (
          ""
        ) : (
          <>
            {console.log(link)}
            <ListItem
              key={link.path}
              onClick={() => handleNavigation(link.path)}
            >
              <ListItemText primary={link.label} />
            </ListItem>
          </>
        )
      )}
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Job Portal
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              {navLinks.map((link) =>
                link?.role && link?.role !== user?.role ? (
                  ""
                ) : (
                  <Button
                    key={link.path}
                    color="inherit"
                    onClick={() => handleNavigation(link.path)}
                    sx={{ ml: 2 }}
                  >
                    {link.label}
                  </Button>
                )
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer solo su mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { sm: "none" } }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
