import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PointsOfSaleService from "../../../services/pointsOfSale.service";

const initialState = {
  pointsOfSale: [],
  current: "",
  status: "idle",
  error: null,
};

export const fetchPointsOfSale = createAsyncThunk(
  "pointsOfSale/getPointsOfSale",
  async (userToken) => {
    const response = await PointsOfSaleService.getAll(userToken);
    return response;
  }
);

const pointsOfSaleSlice = createSlice({
  name: "pointsOfSale",
  initialState,
  reducers: { setCurrent: (state, action) => {
    state.current = action.payload;
  },},
  extraReducers(builder) {
    builder
      .addCase(fetchPointsOfSale.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPointsOfSale.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pointsOfSale = state.pointsOfSale.concat(action.payload);
      })
      .addCase(fetchPointsOfSale.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pointsOfSaleSlice.reducer;

export const { setCurrent } = pointsOfSaleSlice.actions;

export const selectAllPointsOfSale = (state) => state.pointsOfSale.pointsOfSale;

export const selectPointOfSaleById = (state, pointOfSaleId) =>
  state.pointsOfSale.find((pointOfSale) => pointOfSale.id === pointOfSaleId);
