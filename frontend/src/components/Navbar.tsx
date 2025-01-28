import AdbIcon from "@mui/icons-material/Article";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

/**
 * Navbar component that renders a responsive navigation bar with icons and a title.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 *
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 *
 * @remarks
 * This component uses Material-UI components such as Box, AppBar, Toolbar, Typography, and icons.
 * It is styled to have a white background, black text, and a border.
 *
 * @see {@link https://mui.com/components/app-bar/|Material-UI AppBar}
 */
export default function Navbar() {
  return (
    <div data-testid="navigation">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            border: "1px solid #E8E9ED",
            bgcolor: "white",
            color: "black",
          }}
          elevation={0}
        >
          <Toolbar>
            <AdbIcon
              data-testid="AdbIcon"
              sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "flex" },
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Synonyms Finder
            </Typography>
            <Typography sx={{ flexGrow: 1 }}></Typography>
            <PersonOutlineIcon data-testid="PersonOutlineIcon" sx={{ pr: 2 }} />
            <NotificationsNoneIcon
              data-testid="NotificationsNoneIcon"
              sx={{ pr: 2 }}
            />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
