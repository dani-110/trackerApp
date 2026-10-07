import { Box, InputAdornment, MenuItem, TextField } from "@mui/material";
import DataGrid from "./dataGrid";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { users } from "../../store/actions/users";
import ModalButton from "../../components/modalButton/modalButton";
import UserCreateForm from "./userCreateForm";
import PageHeader from "../../components/pageHeader/pageHeader";
import { Search } from "lucide-react";
import "./user.scss";

const User = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [openCreate, setOpenCreate] = useState(false);

  const fetchList = (data = {}, rowsPerPage, page) => {
    const next = { ...searchData, ...data };
    if (rowsPerPage) {
      next.pageSize = rowsPerPage;
      next.pageNo = page + 1;
    }
    setSearchData(next);
    setIsLoading(true);
    dispatch(users({ pageSize: 10, pageNo: 1, ...next })).then(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchList({
        search: search.trim() || undefined,
        status: status || undefined,
        pageNo: 1,
      });
    }, 350);
    return () => clearTimeout(timer);
  }, [search, status]);

  return (
    <Box className="screenPage userAccessPage">
      <PageHeader
        eyebrow="ADMINISTRATION"
        title="Users & access"
        description="Manage identities, roles and access without exposing complexity."
        action={
          <ModalButton
            open={openCreate}
            setOpen={setOpenCreate}
            label="Add User"
            type="button"
            startIcon={<IoMdAdd />}
            width="30%"
          >
            <UserCreateForm setOpen={setOpenCreate} fetchList={fetchList} />
          </ModalButton>
        }
      />
      <Box className="userSearchToolbar">
        <TextField
          size="small"
          placeholder="Search username, name, or email"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{
            width: { xs: "100%", sm: 320 },
            "& .MuiOutlinedInput-root": {
              bgcolor: "background.paper",
              borderRadius: 2,
              fontSize: 13,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} color="#91a0b5" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          size="small"
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          sx={{
            width: { xs: "100%", sm: 180 },
            "& .MuiOutlinedInput-root": {
              bgcolor: "background.paper",
              borderRadius: 2,
              fontSize: 13,
            },
          }}
        >
          <MenuItem value="">All statuses</MenuItem>
          {["active", "locked", "disabled", "pending"].map((value) => (
            <MenuItem key={value} value={value}>
              {value[0].toUpperCase() + value.slice(1)}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
  );
};
export default User;
