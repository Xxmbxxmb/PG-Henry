import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

type ChangePassword = {
  email: string;
  password: string;
};

type DeleteUser = {
  is_active: boolean;
  id: string;
};

type UpdateProfile = {
  alias_mp: string;
  id: string;
  email: string;
  password: string;
};

export const getUserInfo = createAsyncThunk(
  "get/userinfo",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/getprofileinfo");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "update/profile",
  async (payload: UpdateProfile, { rejectWithValue }) => {
    try {
      const { id, alias_mp, email, password } = payload;
      const response = await api.put(`/users/${id}/editProfile`, {
        alias_mp,
        email,
        password,
      });
      console.log(response.data);
      if (response.status === 200) return response.data.msg;
    } catch (err: any) {
      return rejectWithValue(err.response.error);
    }
  }
);

export const deleteActiveUser = createAsyncThunk(
  "delete/user",
  async (payload: DeleteUser, { rejectWithValue }) => {
    try {
      const { id, is_active } = payload;
      const response = await api.put(`/users/${id}/status`, {
        is_active: is_active,
      });
      if (response.data.status === 200) return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchUserTournaments = createAsyncThunk(
  "user/fetchUserTournaments",
  async (
    { page, pageSize }: { page?: number; pageSize?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/users/tournaments", {
        params: {
          page,
          pageSize,
        },
      });
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
