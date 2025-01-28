import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { SearchBarProps } from "../props";

/**
 * SearchBar component renders a search input field with a search button.
 *
 * @component
 * @param {object} props - The properties object.
 * @param {string} props.value - The current value of the search input.
 * @param {function} props.onChange - The function to call when the input value changes.
 * @param {function} props.onClick - The function to call when the search button is clicked.
 * @param {function} props.onKeyDown - The function to call when a key is pressed down in the input field.
 *
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClick,
  onKeyDown,
}) => {
  return (
    <Paper
      component="form"
      style={{ height: 40 }}
      elevation={0}
      sx={{
        p: "2px 4px",
        display: "flex",
        border: "1px solid #E8E9ED",
        borderRadius: 2,
      }}
    >
      <InputBase
        data-testid="searchBarInput"
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for a word..."
        inputProps={{ "aria-label": "search for aword..." }}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={onClick}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
